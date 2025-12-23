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

const ProjectPortfolio = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lang = searchParams.get('lang') || 'en';
  const isArabic = lang === 'ar';
  const dir = isArabic ? 'rtl' : 'ltr';

  const [portfolio, setPortfolio] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);

  // Fetch project portfolio data
  useEffect(() => {
    const fetchProjectPortfolio = async () => {
      setFetchLoading(true);
      clearFormErrors();
      try {
        const response = await axiosInstance.get(`/admin/project/portfolio?lang=${lang}`);
        setPortfolio(response.data.portfolio);
      } catch (error) {
        console.error('Fetch Error:', error);
        toast.error('Failed to load portfolio section data');
      } finally {
        setFetchLoading(false);
      }
    };

    fetchProjectPortfolio();
  }, [lang]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await handleFormSubmission(e, `/admin/project/portfolio`, 'POST');
    } catch (error) {
      toast.error('Failed to update portfolio section');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        <span className="ml-3 text-gray-600">
          Loading portfolio data...
        </span>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600 text-lg font-medium">
          Portfolio section data not found
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <h1 className={`text-2xl text-gray-700 flex items-center gap-2`}>
        <span className='text-green-primary'>Update Portfolio Section</span> - Projects Page
        <span className="text-gray-500 text-xl">({lang.toUpperCase()})</span>
      </h1>

      {/* Language Tabs */}
      <div className="flex justify-center">
        <Tabs value={lang} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="en"
              onClick={() => navigate(`/admin/project/portfolio?lang=en`)}
            >
              English
            </TabsTrigger>
            <TabsTrigger
              value="ar"
              onClick={() => navigate(`/admin/project/portfolio?lang=ar`)}
            >
              العربية
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card>
        <CardHeader className="pb-2">
          {/* Optional: small note or description can be added here */}
        </CardHeader>

        <CardContent dir={dir}>
          <form className="space-y-8" onSubmit={onSubmit}>
            <input type="hidden" name="lang" value={lang} />

            {/* Main Fields - Title, Top Title, Subtitle */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Main Title */}
              <div className={isArabic ? 'text-right' : 'text-left'}>
                <Label htmlFor="title">{isArabic ? 'العنوان الرئيسي' : 'Main Title'}</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={portfolio?.title || ''}
                  placeholder={
                    isArabic
                      ? 'اكتب العنوان الرئيسي لملف المشاريع...'
                      : 'Main title for portfolio section...'
                  }
                  className={isArabic ? 'text-right' : 'text-left'}
                  dir={dir}
                />
                <span className="text-rose-500 field-error text-sm error-title">&nbsp;</span>
              </div>

              {/* Top Title */}
              <div className={isArabic ? 'text-right' : 'text-left'}>
                <Label htmlFor="toptitle">{isArabic ? 'العنوان العلوي' : 'Top Title'}</Label>
                <Input
                  id="toptitle"
                  name="toptitle"
                  defaultValue={portfolio?.toptitle || ''}
                  placeholder={
                    isArabic ? 'العنوان البارز في الأعلى...' : 'Prominent top heading...'
                  }
                  className={isArabic ? 'text-right' : 'text-left'}
                  dir={dir}
                />
                <span className="text-rose-500 field-error text-sm error-toptitle">&nbsp;</span>
              </div>

              {/* Subtitle */}
              <div className={isArabic ? 'text-right' : 'text-left'}>
                <Label htmlFor="subtitle">{isArabic ? 'العنوان الفرعي' : 'Subtitle'}</Label>
                <Input
                  id="subtitle"
                  name="subtitle"
                  defaultValue={portfolio?.subtitle || ''}
                  placeholder={
                    isArabic ? 'اكتب وصفاً فرعياً مختصراً...' : 'Short descriptive subtitle...'
                  }
                  className={isArabic ? 'text-right' : 'text-left'}
                  dir={dir}
                />
                <span className="text-rose-500 field-error text-sm error-subtitle">&nbsp;</span>
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

export default ProjectPortfolio;