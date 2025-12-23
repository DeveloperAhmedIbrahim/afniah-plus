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
import { ASSETS_URL, clearFormErrors } from '@/lib/utils';
import { Textarea } from '@/components/admin/ui/textarea';

const AboutVision = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lang = searchParams.get('lang') || 'en';
  const isArabic = lang === 'ar';
  const dir = isArabic ? 'rtl' : 'ltr';

  const [vision, setVision] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);

  // Fetch about vision data
  useEffect(() => {
    const fetchAboutVision = async () => {
      setFetchLoading(true);
      clearFormErrors();
      try {
        const response = await axiosInstance.get(`/admin/about/vision?lang=${lang}`);
        setVision(response.data.vision);
      } catch (error) {
        console.error('Fetch Error:', error);
        toast.error("Failed to load vision section data");
      } finally {
        setFetchLoading(false);
      }
    };

    fetchAboutVision();
  }, [lang]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await handleFormSubmission(e, `/admin/about/vision`, 'POST');
    } catch (error) {
      toast.error("Failed to update vision section");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        <span className="ml-3 text-gray-600">Loading vision data...</span>
      </div>
    );
  }

  if (!vision) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600 text-lg font-medium">
          Vision section data not found
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <h1 className={`text-2xl text-gray-700 flex items-center gap-2`}>
        <span className='text-green-primary'>Update Vision Section</span> - About Page
        <span className="text-gray-500 text-xl">({lang.toUpperCase()})</span>
      </h1>

      {/* Language Tabs */}
      <div className="flex justify-center">
        <Tabs value={lang} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="en"
              onClick={() => navigate(`/admin/about/vision?lang=en`)}
            >
              English
            </TabsTrigger>
            <TabsTrigger
              value="ar"
              onClick={() => navigate(`/admin/about/vision?lang=ar`)}
            >
              العربية
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card>
        <CardHeader className="pb-2">
          {/* Optional: Add small description or note here if needed */}
        </CardHeader>

        <CardContent dir={dir}>
          <form className="space-y-8" onSubmit={onSubmit}>
            <input type="hidden" name="lang" value={lang} />

            {/* Title + Background Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Main Title */}
              <div className={isArabic ? 'text-right' : 'text-left'}>
                <Label htmlFor="title">{isArabic ? 'العنوان الرئيسي' : 'Main Title'}</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={vision?.title || ''}
                  placeholder={
                    isArabic
                      ? 'اكتب العنوان الرئيسي للرؤية...'
                      : 'Main title for vision section...'
                  }
                  className={isArabic ? 'text-right' : 'text-left'}
                  dir={dir}
                />
                <span className="text-rose-500 field-error text-sm error-title">&nbsp;</span>
              </div>

              {/* Background Image */}
              <div className={isArabic ? 'text-right' : 'text-left'}>
                <Label htmlFor="image">
                  {isArabic ? 'صورة الخلفية' : 'Background Image'}
                  {vision?.image && (
                    <span className="text-xs text-gray-500 mr-2">
                      ({isArabic ? 'الحالية موجودة' : 'Current exists'})
                    </span>
                  )}
                </Label>
                <Input id="image" name="image" type="file" />
                <span className="text-rose-500 field-error text-sm error-image">&nbsp;</span>

                {vision?.image && (
                  <div className="mt-4">
                    <img
                      src={`${ASSETS_URL}/${vision.image}`}
                      alt="Current vision background"
                      className="w-48 h-32 object-cover rounded border shadow-sm"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      {isArabic ? 'الصورة الحالية:' : 'Current background image:'}
                      <span className="font-medium ml-1 break-all">
                        {vision.image}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Vision Description */}
            <div className={isArabic ? 'text-right' : 'text-left'}>
              <Label htmlFor="description">{isArabic ? 'الوصف / الرؤية' : 'Description / Vision Statement'}</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={vision?.description || ''}
                placeholder={
                  isArabic
                    ? 'اكتب رؤية الشركة بشكل واضح وملهم...'
                    : 'Write the company vision statement clearly and inspiringly...'
                }
                className={`${isArabic ? 'text-right' : 'text-left'} min-h-[200px]`}
                dir={dir}
                rows={8}
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

export default AboutVision;