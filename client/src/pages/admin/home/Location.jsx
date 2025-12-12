import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/admin/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/admin/ui/tabs";
import { ChevronLeftIcon, ChevronRightIcon, FolderKanban, Loader2 } from "lucide-react";
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
                const data = response.data.location;
                setLocation(data);
            } catch (error) {
                console.error('Fetch Error:', error);
                toast.error('Failed to load home location data');
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
        } finally {                
            setLoading(false);
        }
    };

    if (fetchLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                <span className="ml-2">Loading home data...</span>
            </div>
        );
    }

    if (!location) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500">Home location data not found</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">

            <h1 className={`text-2xl text-gray-600 flex items-center gap-2`}>
                Home {isArabic ? <ChevronLeftIcon className="w-5 h-5" /> : <ChevronRightIcon className="w-5 h-5" />} 
                Location {isArabic ? <ChevronLeftIcon className="w-5 h-5" /> : <ChevronRightIcon className="w-5 h-5" />} 
                Update ({lang.toUpperCase()})
            </h1>

            <div className='flex justify-center'>
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
                <CardHeader>
                </CardHeader>

                <CardContent dir={dir}>
                    <form className="space-y-8" onSubmit={onSubmit}>
                        <input type="hidden" name="lang" value={lang} />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            {/* Title */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="title">{isArabic ? 'العنوان' : 'Title'}</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    defaultValue={location?.title || ''}
                                    key={`title-${lang}-${location?.title}`}
                                    placeholder={isArabic ? 'عنوان الواجهة الرئيسية' : 'Home Location Title'}
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
                                    defaultValue={location?.btn_text || ''}
                                    key={`btnText-${lang}-${location?.btn_text}`}
                                    placeholder={isArabic ? 'نص زر الواجهة' : 'Home Location Button Text'}
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
                                    defaultValue={location?.btn_link || ''}
                                    key={`btnLink-${lang}-${location?.btn_link}`}
                                    placeholder={isArabic ? 'رابط زر قسم الواجهة' : 'Home Location Button Link'}
                                    className={isArabic ? 'text-right' : 'text-left'}
                                    dir={dir}
                                />
                                <span className="text-rose-500 field-error text-sm error-btnLink">&nbsp;</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Latitude */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="latitude">{isArabic ? 'خط العرض' : 'Latitude'}</Label>
                                <Input
                                    id="latitude"
                                    name="latitude"
                                    defaultValue={location?.latitude || ''}
                                    key={`latitude-${lang}-${location?.latitude}`}
                                    placeholder={isArabic ? 'أدخل خط العرض' : 'Enter Latitude'}
                                    className={isArabic ? 'text-right' : 'text-left'}
                                    dir={dir}
                                />
                                <span className="text-rose-500 field-error text-sm error-latitude">&nbsp;</span>
                            </div>

                            {/* Longitude */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="longitude">{isArabic ? 'خط الطول' : 'Longitude'}</Label>
                                <Input
                                    id="longitude"
                                    name="longitude"
                                    defaultValue={location?.longitude || ''}
                                    key={`longitude-${lang}-${location?.longitude}`}
                                    placeholder={isArabic ? 'أدخل خط الطول' : 'Enter Longitude'}
                                    className={isArabic ? 'text-right' : 'text-left'}
                                    dir={dir}
                                />
                                <span className="text-rose-500 field-error text-sm error-longitude">&nbsp;</span>
                            </div>
                        </div>

                        {/* Message Textarea */}
                        <div className={isArabic ? 'text-right' : 'text-left'}>
                            <Label htmlFor="message">{isArabic ? 'الرسالة' : 'Message'}</Label>
                            <Textarea
                                id="message"
                                name="message"
                                defaultValue={location?.message || ''}
                                key={`message-${lang}-${location?.message}`}
                                placeholder={isArabic ? 'أدخل الرسالة' : 'Enter Message'}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${isArabic ? 'text-right' : 'text-left'}`}
                                dir={dir}
                                rows={5}
                            />
                            <span className="text-rose-500 field-error text-sm error-message">&nbsp;</span>
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin ml-2" />
                                    {isArabic ? 'جاري التحديث...' : 'Updating...'}
                                </>
                            ) : (
                                isArabic ? 'تحديث الواجهة الرئيسية' : 'Update Home Location'
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <style jsx global>{`
                .jodit-wysiwyg[dir="rtl"] ~ .jodit-toolbar,
                .jodit-container[dir="rtl"] .jodit-toolbar {
                    direction: ltr !important;
                    text-align: left !important;
                }
                .jodit-wysiwyg[dir="rtl"] ~ .jodit-toolbar .jodit-toolbar__box {
                    justify-content: flex-start !important;
                }
                .jodit-wysiwyg[dir="rtl"] {
                    text-align: right;
                }
            `}</style>
        </div>
    );
};

export default HomeLocation;
