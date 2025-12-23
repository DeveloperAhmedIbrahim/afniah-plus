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
import { Textarea } from '@/components/admin/ui/textarea';

const HomeLocation = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lang = searchParams.get('lang') || 'en';
  const isArabic = lang === 'ar';
  const dir = isArabic ? 'rtl' : 'ltr';

  const [location, setLocation] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    const fetchHomeLocation = async () => {
      setFetchLoading(true);
      clearFormErrors();
      try {
        const response = await axiosInstance.get(`/admin/home/location?lang=${lang}`);
        setLocation(response.data.location);
      } catch (error) {
        console.error('Fetch Error:', error);
        toast.error('Failed to load location section');
      } finally {
        setFetchLoading(false);
      }
    };
    fetchHomeLocation();
  }, [lang]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await handleFormSubmission(e, `/admin/home/location`, 'POST');
      toast.success('Location updated successfully');
    } catch (error) {
      toast.error('Failed to update location');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        <span className="ml-3 text-gray-600">
          Loading location data...
        </span>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600 text-lg font-medium">
          Location section data not found
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <h1 className={`text-2xl text-gray-700 flex items-center gap-2`}>
        <span className="text-green-primary">Update Location Section</span> - Home Page <span className="text-gray-500 text-xl">({lang.toUpperCase()})</span>
      </h1>

      {/* Language Tabs */}
      <div className="flex justify-center">
        <Tabs value={lang} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="en"
              onClick={() => navigate(`/admin/home/location?lang=en`)}
            >
              English
            </TabsTrigger>
            <TabsTrigger
              value="ar"
              onClick={() => navigate(`/admin/home/location?lang=ar`)}
            >
              العربية
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card>
        <CardHeader className="pb-2">
          {/* You can add a small subtitle here if needed */}
        </CardHeader>

        <CardContent dir={dir}>
          <form className="space-y-8" onSubmit={onSubmit}>
            <input type="hidden" name="lang" value={lang} />

            {/* First Row - Title, Button Text, Button Link */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={isArabic ? 'text-right' : 'text-left'}>
                <Label htmlFor="title">{isArabic ? 'العنوان الرئيسي' : 'Main Title'}</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={location?.title || ''}
                  placeholder={isArabic ? 'اكتب العنوان الرئيسي...' : 'Main location title...'}
                  className={isArabic ? 'text-right' : 'text-left'}
                  dir={dir}
                />
                <span className="text-rose-500 field-error text-sm error-title">&nbsp;</span>
              </div>

              <div className={isArabic ? 'text-right' : 'text-left'}>
                <Label htmlFor="btnText">{isArabic ? 'نص الزر' : 'Button Text'}</Label>
                <Input
                  id="btnText"
                  name="btnText"
                  defaultValue={location?.btn_text || ''}
                  placeholder={isArabic ? 'اكتب نص الزر...' : 'Button text...'}
                  className={isArabic ? 'text-right' : 'text-left'}
                  dir={dir}
                />
                <span className="text-rose-500 field-error text-sm error-btnText">&nbsp;</span>
              </div>

              <div className={isArabic ? 'text-right' : 'text-left'}>
                <Label htmlFor="btnLink">{isArabic ? 'رابط الزر' : 'Button Link'}</Label>
                <Input
                  id="btnLink"
                  name="btnLink"
                  defaultValue={location?.btn_link || ''}
                  placeholder={isArabic ? 'https://example.com/map' : 'https://maps.google.com/...'}
                  className={isArabic ? 'text-right' : 'text-left'}
                  dir={dir}
                />
                <span className="text-rose-500 field-error text-sm error-btnLink">&nbsp;</span>
              </div>
            </div>

            {/* Second Row - Latitude & Longitude */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={isArabic ? 'text-right' : 'text-left'}>
                <Label htmlFor="latitude">{isArabic ? 'خط العرض (Latitude)' : 'Latitude'}</Label>
                <Input
                  id="latitude"
                  name="latitude"
                  defaultValue={location?.latitude || ''}
                  placeholder={isArabic ? 'مثال: 24.713552' : 'Example: 24.713552'}
                  className={isArabic ? 'text-right' : 'text-left'}
                  dir={dir}
                />
                <span className="text-rose-500 field-error text-sm error-latitude">&nbsp;</span>
              </div>

              <div className={isArabic ? 'text-right' : 'text-left'}>
                <Label htmlFor="longitude">{isArabic ? 'خط الطول (Longitude)' : 'Longitude'}</Label>
                <Input
                  id="longitude"
                  name="longitude"
                  defaultValue={location?.longitude || ''}
                  placeholder={isArabic ? 'مثال: 46.675297' : 'Example: 46.675297'}
                  className={isArabic ? 'text-right' : 'text-left'}
                  dir={dir}
                />
                <span className="text-rose-500 field-error text-sm error-longitude">&nbsp;</span>
              </div>
            </div>

            {/* Message */}
            <div className={isArabic ? 'text-right' : 'text-left'}>
              <Label htmlFor="message">{isArabic ? 'الرسالة / الوصف' : 'Message / Description'}</Label>
              <Textarea
                id="message"
                name="message"
                defaultValue={location?.message || ''}
                placeholder={
                  isArabic
                    ? 'اكتب رسالة ترحيبية أو وصفًا عن الموقع...'
                    : 'Write a welcome message or location description...'
                }
                className={`${isArabic ? 'text-right' : 'text-left'} min-h-[120px]`}
                dir={dir}
                rows={5}
              />
              <span className="text-rose-500 field-error text-sm error-message">&nbsp;</span>
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

export default HomeLocation;