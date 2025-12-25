import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/admin/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/admin/ui/tabs";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/admin/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Label } from "@/components/admin/ui/label";
import { Input } from "@/components/admin/ui/input";
import { handleFormSubmission } from '@/lib/axios';
import axiosInstance from '@/lib/axios';
import { toast } from 'sonner';
import { clearFormErrors } from '@/lib/utils';

const HomeProject = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lang = searchParams.get('lang') || 'en';
  const isArabic = lang === 'ar';
  const dir = isArabic ? 'rtl' : 'ltr';

  const [project, setProject] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    const fetchHomeProject = async () => {
      setFetchLoading(true);
      clearFormErrors();
      try {
        const response = await axiosInstance.get(`/admin/home/project?lang=${lang}`);
        setProject(response.data.project);
      } catch (error) {
        console.error('Fetch Error:', error);
        toast.error('Failed to load featured projects data');
      } finally {
        setFetchLoading(false);
      }
    };
    fetchHomeProject();
  }, [lang]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await handleFormSubmission(e, `/admin/home/project`, 'POST');
      toast.success('Featured projects updated successfully');
    } catch (error) {
      toast.error('Failed to update featured projects');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        <span className="ml-3 text-gray-600">
          Loading featured projects data
        </span>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600 text-lg font-medium">
          Featured projects section data not found
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <h1 className={`text-2xl text-gray-700 flex items-center gap-2`}>
        <span className="text-green-primary">Update Featured Projects Section</span> - Home Page <span className="text-gray-500 text-xl">({lang.toUpperCase()})</span>
      </h1>

      {/* Language Tabs */}
      <div className="flex justify-center">
        <Tabs value={lang} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="en"
              onClick={() => navigate(`/admin/home/project?lang=en`)}
            >
              English
            </TabsTrigger>
            <TabsTrigger
              value="ar"
              onClick={() => navigate(`/admin/home/project?lang=ar`)}
            >
              العربية
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card>
        <CardHeader className="pb-2">
          {/* Optional: You can add subtitle/description here if needed */}
        </CardHeader>

        <CardContent dir={dir}>
          <form className="space-y-8" onSubmit={onSubmit}>
            <input type="hidden" name="lang" value={lang} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Main Title */}
              <div className={isArabic ? 'text-right' : 'text-left'}>
                <Label htmlFor="title">{isArabic ? 'العنوان الرئيسي' : 'Main Title'}</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={project?.title || ''}
                  placeholder={isArabic ? 'اكتب العنوان الرئيسي للمشاريع...' : 'Featured projects main title...'}
                  className={isArabic ? 'text-right' : 'text-left'}
                  dir={dir}
                />
                <span className="text-rose-500 field-error text-sm error-title">&nbsp;</span>
              </div>

              {/* Button Text */}
              <div className={isArabic ? 'text-right' : 'text-left'}>
                <Label htmlFor="btnText">{isArabic ? 'نص الزر' : 'Button Text'}</Label>
                <Input
                  id="btnText"
                  name="btnText"
                  defaultValue={project?.btn_text || ''}
                  placeholder={isArabic ? 'اكتب نص الزر (مثال: عرض جميع المشاريع)' : 'Button text (e.g., View All Projects)'}
                  className={isArabic ? 'text-right' : 'text-left'}
                  dir={dir}
                />
                <span className="text-rose-500 field-error text-sm error-btnText">&nbsp;</span>
              </div>

              {/* Button Link */}
              <div className={isArabic ? 'text-right' : 'text-left'}>
                <Label htmlFor="btnLink">{isArabic ? 'رابط الزر' : 'Button Link'}</Label>
                <Input
                  id="btnLink"
                  name="btnLink"
                  defaultValue={project?.btn_link || ''}
                  placeholder={isArabic ? 'https://example.com/projects' : 'https://example.com/projects'}
                  className={isArabic ? 'text-right' : 'text-left'}
                  dir={dir}
                />
                <span className="text-rose-500 field-error text-sm error-btnLink">&nbsp;</span>
              </div>
            </div>

            {/* Submit Button */}
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

      {/* RTL Toolbar fix (if needed in future) */}
      <style jsx global>{`
        .jodit-wysiwyg[dir="rtl"] ~ .jodit-toolbar,
        .jodit-container[dir="rtl"] .jodit-toolbar {
          direction: ltr !important;
          text-align: left !important;
        }
      `}</style>
    </div>
  );
};

export default HomeProject;