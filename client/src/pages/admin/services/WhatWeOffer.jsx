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
import { Switch } from '@/components/admin/ui/switch';

const ServiceWhatWeOffer = () => {
  const [section01Toggle, setSection01Toggle] = useState(true);
  const [section02Toggle, setSection02Toggle] = useState(true);
  const [section03Toggle, setSection03Toggle] = useState(true);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lang = searchParams.get('lang') || 'en';
  const isArabic = lang === 'ar';
  const dir = isArabic ? 'rtl' : 'ltr';

  const [whatWeOffer, setWhatWeOffer] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);

  // Fetch service whatWeOffer data
  useEffect(() => {
    const fetchServiceWhatWeOffer = async () => {
      setFetchLoading(true);
      clearFormErrors();
      try {
        const response = await axiosInstance.get(`/admin/service/what-we-offer?lang=${lang}`);
        setWhatWeOffer(response.data.whatWeOffer);

        const overviewStatus = await axiosInstance.get(`/admin/others/toggle-view?section=service_section01`);
        setSection01Toggle(overviewStatus.data.status);        

        const caseStudyStatus = await axiosInstance.get(`/admin/others/toggle-view?section=service_section02`);
        setSection02Toggle(caseStudyStatus.data.status);        

        const galleryStatus = await axiosInstance.get(`/admin/others/toggle-view?section=service_section03`);
        setSection03Toggle(galleryStatus.data.status);        
      } catch (error) {
        console.error('Fetch Error:', error);
        toast.error('Failed to load what-we-offer section data');
      } finally {
        setFetchLoading(false);
      }
    };

    fetchServiceWhatWeOffer();
  }, [lang]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await handleFormSubmission(e, `/admin/service/what-we-offer`, 'POST');
    } catch (error) {
      toast.error('Failed to update what-we-offer section');
    } finally {
      setLoading(false);
    }
  };

  const submitViewToggle = async (checked, section) => {
    try {
        await axiosInstance.post(`/admin/others/toggle-view`, { status: checked, section: section });
        if (section === 'service_section01') {
          setSection01Toggle(checked);
          toast.success(`Section 01 is now ${checked ? 'visible' : 'hidden'} on the services page`);
        } else if (section === 'service_section02') {
          setSection02Toggle(checked);
          toast.success(`Section 02 is now ${checked ? 'visible' : 'hidden'} on the services page`);
        } else if (section === 'service_section03') {
          setSection03Toggle(checked);
          toast.success(`Section 03 is now ${checked ? 'visible' : 'hidden'} on the services page`);
        }        
    } catch (error) {
        console.error('Toggle View Error:', error);
        toast.error("Failed to update service section visibility");
    }
  }      

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        <span className="ml-3 text-gray-600">
          Loading whatWeOffer data
        </span>
      </div>
    );
  }

  if (!whatWeOffer) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600 text-lg font-medium">
          WhatWeOffer section data not found
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <h1 className={`text-2xl text-gray-700 flex items-center gap-2`}>
        <span className='text-green-primary'>Update What-We-Offer Section</span> - Services Page
        <span className="text-gray-500 text-xl">({lang.toUpperCase()})</span>
      </h1>

      {/* Language Tabs */}
      <div className="flex justify-center">
        <Tabs value={lang} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="en"
              onClick={() => navigate(`/admin/service/what-we-offer?lang=en`)}
            >
              English
            </TabsTrigger>
            <TabsTrigger
              value="ar"
              onClick={() => navigate(`/admin/service/what-we-offer?lang=ar`)}
            >
              العربية
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className='grid grid-cols-3'>
          <div>
              <Label htmlFor="title">Section 01 Visibility</Label>
              <br />
              <Switch
                  checked={section01Toggle}
                  onCheckedChange={(checked) => submitViewToggle(checked, 'service_section01')}
                  className="data-[state=checked]:bg-green-primary mt-2"
              />                 
          </div>
          <div>
              <Label htmlFor="title">Section 02 Visibility</Label>
              <br />
              <Switch
                  checked={section02Toggle}
                  onCheckedChange={(checked) => submitViewToggle(checked, 'service_section02')}
                  className="data-[state=checked]:bg-green-primary mt-2"
              />                 
          </div>
          <div>
              <Label htmlFor="title">Section 03 Visibility</Label>
              <br />
              <Switch
                  checked={section03Toggle}
                  onCheckedChange={(checked) => submitViewToggle(checked, 'service_section03')}
                  className="data-[state=checked]:bg-green-primary mt-2"
              />                 
          </div>                            
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
                  defaultValue={whatWeOffer?.title || ''}
                  placeholder={
                    isArabic
                      ? 'اكتب العنوان الرئيسي لملف المشاريع...'
                      : 'Main title for what-we-offer section...'
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
                  defaultValue={whatWeOffer?.toptitle || ''}
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
                  defaultValue={whatWeOffer?.subtitle || ''}
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

export default ServiceWhatWeOffer;