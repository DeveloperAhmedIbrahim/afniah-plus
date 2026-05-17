import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/admin/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/admin/ui/tabs";
import { FolderKanban, Loader2 } from "lucide-react";
import { Button } from "@/components/admin/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Label } from "@/components/admin/ui/label";
import { Input } from "@/components/admin/ui/input";
import { handleFormSubmission } from '@/lib/axios';
import axiosInstance from '@/lib/axios';
import { toast } from 'sonner';
import { clearFormErrors } from '@/lib/utils';
import { Textarea } from '@/components/admin/ui/textarea';
import { Switch } from '@/components/admin/ui/switch';

const AboutTeam = () => {
  const [viewToggle, setViewToggle] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lang = searchParams.get('lang') || 'en';
  const isArabic = lang === 'ar';
  const dir = isArabic ? 'rtl' : 'ltr';

  const [team, setTeam] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);

  // Fetch about team data
  useEffect(() => {
    const fetchAboutTeam = async () => {
      setFetchLoading(true);
      clearFormErrors();
      try {
        const response = await axiosInstance.get(`/admin/about/team?lang=${lang}`);
        setTeam(response.data.team);

        const status = await axiosInstance.get(`/admin/others/toggle-view?section=about_team`);
        setViewToggle(status.data.status);        
      } catch (error) {
        console.error('Fetch Error:', error);
        toast.error('Failed to load team section data');
      } finally {
        setFetchLoading(false);
      }
    };

    fetchAboutTeam();
  }, [lang]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await handleFormSubmission(e, `/admin/about/team`, 'POST');
    } catch (error) {
      toast.error('Failed to update team section');
    } finally {
      setLoading(false);
    }
  };

  const submitViewToggle = async (checked) => {
      setViewToggle(checked);
      try {
          await axiosInstance.post(`/admin/others/toggle-view`, { status: checked, section: 'about_team' });
          toast.success(`Team section is now ${checked ? 'visible' : 'hidden'} on the about page`);
      } catch (error) {
          console.error('Toggle View Error:', error);
          toast.error("Failed to update team section visibility");
      }
  }   

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        <span className="ml-3 text-gray-600">Loading team data</span>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600 text-lg font-medium">
          Team section data not found
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl text-gray-700 flex items-center gap-2`}>
          <span className='text-green-primary'>Update Team Section</span> - About Page
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

      {/* Language Tabs */}
      <div className="flex justify-center">
        <Tabs value={lang} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="en"
              onClick={() => navigate(`/admin/about/team?lang=en`)}
            >
              English
            </TabsTrigger>
            <TabsTrigger
              value="ar"
              onClick={() => navigate(`/admin/about/team?lang=ar`)}
            >
              العربية
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className={`flex ${isArabic ? 'justify-start' : 'justify-end'}`}>
            <FolderKanban
                className="w-10 h-10 p-0 border-5 rounded-md bg-gray-100 border-gray-100 cursor-pointer text-green-primary"
                onClick={() => navigate(`/admin/about/team/gallery?lang=${lang}`)}
                title={isArabic ? 'معرض الصور' : 'Team Gallery'}
            >
            </FolderKanban>
          </CardTitle>
        </CardHeader>

        <CardContent dir={dir}>
          <form className="space-y-8" onSubmit={onSubmit}>
            <input type="hidden" name="lang" value={lang} />

            {/* Title */}
            <div className={isArabic ? 'text-right' : 'text-left'}>
              <Label htmlFor="title">{isArabic ? 'العنوان الرئيسي' : 'Main Title'}</Label>
              <Input
                id="title"
                name="title"
                defaultValue={team?.title || ''}
                placeholder={
                  isArabic
                    ? 'اكتب العنوان الرئيسي لقسم الفريق...'
                    : 'Main title for team section...'
                }
                className={isArabic ? 'text-right' : 'text-left'}
                dir={dir}
              />
              <span className="text-rose-500 field-error text-sm error-title">&nbsp;</span>
            </div>

            {/* Description */}
            <div className={isArabic ? 'text-right' : 'text-left'}>
              <Label htmlFor="description">{isArabic ? 'الوصف' : 'Description'}</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={team?.description || ''}
                placeholder={
                  isArabic
                    ? 'اكتب وصفاً شاملاً عن فريق العمل...'
                    : 'Write a detailed description about the team...'
                }
                className={`${isArabic ? 'text-right' : 'text-left'} min-h-[100px]`}
                dir={dir}
              />
              <span className="text-rose-500 field-error text-sm error-description">&nbsp;</span>
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

      {/* CSS Fix for RTL editors (if used in future) */}
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

export default AboutTeam;