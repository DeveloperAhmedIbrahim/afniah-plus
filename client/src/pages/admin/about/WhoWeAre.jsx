import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/admin/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/admin/ui/tabs";
import { Loader2, FolderKanban } from "lucide-react"; // FolderKanban optional rakh sakte ho
import { Button } from "@/components/admin/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Label } from "@/components/admin/ui/label";
import { Input } from "@/components/admin/ui/input";
import { handleFormSubmission } from '@/lib/axios';
import axiosInstance from '@/lib/axios';
import { toast } from 'sonner';
import { ASSETS_URL, clearFormErrors } from '@/lib/utils';
import JoditEditor from 'jodit-react';
import { Switch } from '@/components/admin/ui/switch';

const AboutWhoWeAre = () => {
  const [viewToggle, setViewToggle] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lang = searchParams.get('lang') || 'en';
  const isArabic = lang === 'ar';
  const dir = isArabic ? 'rtl' : 'ltr';

  const descriptionEditorRef = useRef(null);
  const [description, setDescription] = useState('');
  const [whoWeAre, setWhoWeAre] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);

  const editorConfig = useMemo(() => ({
    readonly: false,
    placeholder: isArabic ? 'ابدأ الكتابة...' : 'Start typing...',
    direction: dir,
    language: isArabic ? 'ar' : 'en',
    height: 300,                    // thoda zyada height di hai kyunki description lambi ho sakti hai
    toolbarAdaptive: true,
    toolbarSticky: true,
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: true,
    buttons: 'bold,italic,underline,|,align,|,link,image,|,undo,redo',
    buttonsMD: 'bold,italic,underline,|,align,|,link,image,|,undo,redo',
    buttonsSM: 'bold,italic,underline,|,align,|,link,image,|,undo,redo',
    buttonsXS: 'bold,italic,underline,|,align,|,link,image,|,undo,redo',
    uploader: { insertImageAsBase64URI: true },
    toolbarButtonSize: 'middle',
  }), [isArabic, dir]);

  const handleDescriptionChange = useCallback((newContent) => {
    setDescription(newContent);
  }, []);

  // Fetch data
  useEffect(() => {
    const fetchAboutWhoWeAre = async () => {
      setFetchLoading(true);
      clearFormErrors();
      try {
        const response = await axiosInstance.get(`/admin/about/who-we-are?lang=${lang}`);
        const data = response.data.whoWeAre;
        setWhoWeAre(data);
        setDescription(data.description || '');

        const status = await axiosInstance.get(`/admin/others/toggle-view?section=about_whoWeAre`);
        setViewToggle(status.data.status);
      } catch (error) {
        console.error('Fetch Error:', error);
        toast.error('Failed to load "Who We Are" section');
      } finally {
        setFetchLoading(false);
      }
    };

    fetchAboutWhoWeAre();
  }, [lang]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Most important: latest editor value le lo submit se pehle
      const latestDescription = descriptionEditorRef.current?.value || description;

      const formData = new FormData(e.target);
      formData.set('description', latestDescription); // override kar do

      await handleFormSubmission(e, `/admin/about/who-we-are`, 'POST', formData);
    } catch (error) {
      toast.error('Failed to update "Who We Are" section');
    } finally {
      setLoading(false);
    }
  };

  const submitViewToggle = async (checked) => {
      setViewToggle(checked);
      try {
          await axiosInstance.post(`/admin/others/toggle-view`, { status: checked, section: 'about_whoWeAre' });
          toast.success(`About who we are section is now ${checked ? 'visible' : 'hidden'} on the about page`);
      } catch (error) {
          console.error('Toggle View Error:', error);
          toast.error("Failed to update who we are section visibility");
      }
  }  

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        <span className="ml-3 text-gray-600">
          Loading "Who We Are" data
        </span>
      </div>
    );
  }

  if (!whoWeAre) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600 text-lg font-medium">
          "Who We Are" section data not found
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl text-gray-700 flex items-center gap-2`}>
          <span className='text-green-primary'>Update "Who We Are" Section</span> - About Page 
          <span className="text-gray-500 text-xl">({lang.toUpperCase()})</span>         
        </h1>
        <div>
            <Switch
                checked={viewToggle}
                onCheckedChange={submitViewToggle}
                className="data-[state=checked]:bg-green-primary"
            />                 
        </div>      
      </div>

      <div className="flex justify-center">
        <Tabs value={lang} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="en" onClick={() => navigate(`/admin/about/who-we-are?lang=en`)}>
              English
            </TabsTrigger>
            <TabsTrigger value="ar" onClick={() => navigate(`/admin/about/who-we-are?lang=ar`)}>
              العربية
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card>
        <CardContent dir={dir} className="pt-6">
          <form className="space-y-8" onSubmit={onSubmit}>
            <input type="hidden" name="lang" value={lang} />
            <input type="hidden" name="description" value={description} /> {/* fallback ke liye */}

            {/* Title + Background Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={isArabic ? 'text-right' : 'text-left'}>
                <Label htmlFor="title">{isArabic ? 'العنوان الرئيسي' : 'Main Title'}</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={whoWeAre?.title || ''}
                  placeholder={isArabic ? 'اكتب العنوان الرئيسي...' : 'Main title...'}
                  className={isArabic ? 'text-right' : 'text-left'}
                  dir={dir}
                />
                <span className="text-rose-500 field-error text-sm error-title"> </span>
              </div>

              <div className={isArabic ? 'text-right' : 'text-left'}>
                <Label htmlFor="image">
                  {isArabic ? 'صورة الخلفية' : 'Background Image'}
                  {whoWeAre?.image && (
                    <span className="text-xs text-gray-500 ml-2">
                      ({isArabic ? 'موجودة حالياً' : 'Current exists'})
                    </span>
                  )}
                </Label>
                <Input id="image" name="image" type="file" />
                <span className="text-rose-500 field-error text-sm error-image"> </span>

                {whoWeAre?.image && (
                  <div className="mt-4">
                    <img
                      src={`${ASSETS_URL}/${whoWeAre.image}`}
                      alt="Current background"
                      className="w-48 h-32 object-cover rounded border shadow-sm"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      {isArabic ? 'الصورة الحالية:' : 'Current image:'} 
                      <span className="font-medium ml-1 break-all">{whoWeAre.image}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Rich Text Description - Jodit Editor */}
            <div className={isArabic ? 'text-right' : 'text-left'}>
              <Label>{isArabic ? 'الوصف / عن الشركة' : 'Description / About Us'}</Label>
              <div dir={dir} key={`editor-${lang}`}>
                <JoditEditor
                  ref={descriptionEditorRef}
                  value={description}
                  config={editorConfig}
                  onBlur={handleDescriptionChange}
                />
              </div>
              <span className="text-rose-500 field-error text-sm error-description"> </span>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin ml-2" />
                  {isArabic ? 'جاري الحفظ...' : 'Saving...'}
                </>
              ) : (
                isArabic ? 'حفظ التغييرات' : 'Save Changes'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* RTL Toolbar fix */}
      <style jsx global>{`
        .jodit-wysiwyg[dir="rtl"] ~ .jodit-toolbar,
        .jodit-container[dir="rtl"] .jodit-toolbar {
          direction: ltr !important;
          text-align: left !important;
        }
        .jodit-wysiwyg[dir="rtl"] {
          text-align: right;
        }
      `}</style>
    </div>
  );
};

export default AboutWhoWeAre;