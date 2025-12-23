import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/admin/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/admin/ui/tabs";
import { ChevronLeftIcon, ChevronRightIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/admin/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Label } from "@/components/admin/ui/label";
import { Input } from "@/components/admin/ui/input";
import { handleFormSubmission } from '@/lib/axios';
import axiosInstance from '@/lib/axios';
import { toast } from 'sonner';
import { ASSETS_URL, clearFormErrors } from '@/lib/utils';
import { Textarea } from '@/components/admin/ui/textarea';

const AboutWhoWeAre = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lang = searchParams.get('lang') || 'en';
  const isArabic = lang === 'ar';
  const dir = isArabic ? 'rtl' : 'ltr';

  const [whoWeAre, setWhoWeAre] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);

  // Fetch "Who We Are" section data
  useEffect(() => {
    const fetchAboutWhoWeAre = async () => {
      setFetchLoading(true);
      clearFormErrors();
      try {
        const response = await axiosInstance.get(`/admin/about/who-we-are?lang=${lang}`);
        setWhoWeAre(response.data.whoWeAre);
      } catch (error) {
        console.error('Fetch Error:', error);
        toast.error(
          isArabic ? 'فشل تحميل بيانات قسم "من نحن"' : 'Failed to load "Who We Are" section'
        );
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
      await handleFormSubmission(e, `/admin/about/who-we-are`, 'POST');
      toast.success(isArabic ? 'تم الحفظ بنجاح' : '"Who We Are" section updated successfully');
    } catch (error) {
      toast.error(isArabic ? 'فشل الحفظ' : 'Failed to update "Who We Are" section');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        <span className="ml-3 text-gray-600">
          {isArabic ? 'جاري تحميل بيانات "من نحن"...' : 'Loading "Who We Are" data...'}
        </span>
      </div>
    );
  }

  if (!whoWeAre) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600 text-lg font-medium">
          {isArabic ? 'تعذر العثور على بيانات قسم "من نحن"' : '"Who We Are" section data not found'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <h1 className={`text-2xl font-semibold text-gray-700 flex items-center gap-2`}>
        {isArabic
          ? '← تعديل قسم "من نحن" - صفحة من نحن'
          : 'Update "Who We Are" Section - About Page'}
        <span className="text-gray-500 text-xl">({lang.toUpperCase()})</span>
      </h1>

      {/* Language Tabs */}
      <div className="flex justify-center">
        <Tabs value={lang} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="en"
              onClick={() => navigate(`/admin/about/who-we-are?lang=en`)}
            >
              English
            </TabsTrigger>
            <TabsTrigger
              value="ar"
              onClick={() => navigate(`/admin/about/who-we-are?lang=ar`)}
            >
              العربية
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card>
        <CardHeader className="pb-2">
          {/* Optional: You can add small note/description here if needed */}
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
                  defaultValue={whoWeAre?.title || ''}
                  placeholder={
                    isArabic
                      ? 'اكتب العنوان الرئيسي لقسم "من نحن"...'
                      : 'Main title for "Who We Are" section...'
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
                  {whoWeAre?.image && (
                    <span className="text-xs text-gray-500 mr-2">
                      ({isArabic ? 'الحالية موجودة' : 'Current exists'})
                    </span>
                  )}
                </Label>
                <Input id="image" name="image" type="file" />
                <span className="text-rose-500 field-error text-sm error-image">&nbsp;</span>

                {whoWeAre?.image && (
                  <div className="mt-4">
                    <img
                      src={`${ASSETS_URL}/${whoWeAre.image}`}
                      alt="Current Who We Are background"
                      className="w-48 h-32 object-cover rounded border shadow-sm"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      {isArabic ? 'الصورة الحالية:' : 'Current background image:'}
                      <span className="font-medium ml-1 break-all">
                        {whoWeAre.image}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className={isArabic ? 'text-right' : 'text-left'}>
              <Label htmlFor="description">{isArabic ? 'الوصف / عن الشركة' : 'Description / About Us'}</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={whoWeAre?.description || ''}
                placeholder={
                  isArabic
                    ? 'اكتب وصفاً شاملاً عن الشركة، تاريخها، رسالتها...'
                    : 'Write a comprehensive description about the company, its history, mission...'
                }
                className={`${isArabic ? 'text-right' : 'text-left'} min-h-[250px]`}
                dir={dir}
                rows={10}
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

export default AboutWhoWeAre;