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

const ServiceHero = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const lang = searchParams.get('lang') || 'en';
    const isArabic = lang === 'ar';
    const dir = isArabic ? 'rtl' : 'ltr';

    const [hero, setHero] = useState(null);
    const [fetchLoading, setFetchLoading] = useState(true);

    // Fetch service hero data
    useEffect(() => {
        const fetchServiceHero = async () => {
            setFetchLoading(true);
            clearFormErrors();
            try {
                const response = await axiosInstance.get(`/admin/service/hero?lang=${lang}`);
                const data = response.data.hero;
                setHero(data);
            } catch (error) {
                console.error('Fetch Error:', error);
                toast.error('Failed to load service hero data');
            } finally {
                setFetchLoading(false);
            }
        };

        fetchServiceHero();
    }, [lang]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await handleFormSubmission(e, `/admin/service/hero`, 'POST');
        } finally {
            setLoading(false);
        }
    };

    if (fetchLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                <span className="mx-2">
                    Loading section data
                </span>
            </div>
        );
    }

    if (!hero) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500">
                    Hero section data not found
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Title */}
            <h1 className={`text-2xl text-gray-600 flex items-center gap-2`}>
                <span className='text-green-primary'>Update Hero Section</span> - Services Page
                <span className="text-gray-500 text-xl">({lang.toUpperCase()})</span>
            </h1>

            {/* Language Tabs */}
            <div className='flex justify-center'>
                <Tabs value={lang} className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger
                            value="en"
                            onClick={() => navigate(`/admin/service/hero?lang=en`)}
                        >
                            English
                        </TabsTrigger>
                        <TabsTrigger
                            value="ar"
                            onClick={() => navigate(`/admin/service/hero?lang=ar`)}
                        >
                            العربية
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <Card>
                <CardHeader>
                    {/* Empty for now - you can add title or actions here later if needed */}
                </CardHeader>

                <CardContent dir={dir}>
                    <form className="space-y-8" onSubmit={onSubmit}>
                        <input type="hidden" name="lang" value={lang} />

                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Main Title */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="title">{isArabic ? 'العنوان الرئيسي' : 'Main Title'}</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    defaultValue={hero?.title || ''}
                                    key={`title-${lang}-${hero?.title}`}
                                    placeholder={isArabic ? 'اكتب العنوان الرئيسي...' : 'Type main title here...'}
                                    className={isArabic ? 'text-right' : 'text-left'}
                                    dir={dir}
                                />
                                <span className="text-rose-500 field-error text-sm error-title">&nbsp;</span>
                            </div>

                            {/* Subtitle */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="subtitle">{isArabic ? 'العنوان الفرعي / الوصف' : 'Subtitle / Description'}</Label>
                                <Input
                                    id="subtitle"
                                    name="subtitle"
                                    defaultValue={hero?.subtitle || ''}
                                    key={`subtitle-${lang}-${hero?.subtitle}`}
                                    placeholder={isArabic ? 'اكتب وصفاً مختصراً جذاباً...' : 'Write a short, attractive description...'}
                                    className={isArabic ? 'text-right' : 'text-left'}
                                    dir={dir}
                                />
                                <span className="text-rose-500 field-error text-sm error-subtitle">&nbsp;</span>
                            </div>

                            {/* Image */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="image">
                                    {isArabic ? 'صورة الخلفية' : 'Background Image'}
                                    {hero?.image && <span className="text-xs text-gray-500 mr-2">{isArabic ? '(الحالية موجودة)' : '(Current exists)'}</span>}
                                </Label>
                                <Input id="image" name="image" type="file" />
                                {hero?.image && (
                                    <div className="mt-2">
                                        <img
                                            src={ASSETS_URL + '/' + hero.image}
                                            alt="Current"
                                            className="w-32 h-32 object-cover rounded border"
                                        />
                                        <p className="text-sm text-gray-500 mt-1">
                                            {isArabic ? 'الصورة الحالية' : 'Current Image'}
                                        </p>
                                    </div>
                                )}
                                <span className="text-rose-500 field-error text-sm error-image">&nbsp;</span>
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

            {/* CSS Fix */}
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

export default ServiceHero;