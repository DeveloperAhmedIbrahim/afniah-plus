import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/admin/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/admin/ui/tabs";
import { ChevronLeftIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/admin/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Label } from "@/components/admin/ui/label";
import { Input } from "@/components/admin/ui/input";
import { Textarea } from "@/components/admin/ui/textarea"; // Assuming you have Textarea component
import { clearFormErrors } from '@/lib/utils';
import { handleFormSubmission } from '@/lib/axios';

const ServiceInsert = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const lang = searchParams.get('lang') || 'en';
    const isArabic = lang === 'ar';
    const dir = isArabic ? 'rtl' : 'ltr';

    useEffect(() => {
        clearFormErrors();
    }, [lang]);

    const onSubmit = async (e) => {
        setLoading(true);
        try {
            await handleFormSubmission(e, '/admin/service/insert');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl text-gray-700 flex items-center gap-2">
                Services - <span className='text-green-primary'>Insert</span> - Services Page
                <span className="text-gray-500 text-xl">({lang.toUpperCase()})</span>
            </h1>

            <div className='flex justify-center'>
                <Tabs defaultValue={lang} className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="en" onClick={() => navigate("/admin/service/insert?lang=en")}>English</TabsTrigger>
                        <TabsTrigger value="ar" onClick={() => navigate("/admin/service/insert?lang=ar")}>العربية</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => navigate("/admin/service/list")}
                            className="flex items-center gap-2"
                        >
                            <ChevronLeftIcon className="w-4 h-4" /> Back to List
                        </Button>
                    </CardTitle>
                </CardHeader>

                <CardContent dir={dir}>
                    <form className="space-y-8" onSubmit={onSubmit} encType="multipart/form-data">
                        <input type="hidden" name="lang" value={lang} />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Title */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="title">{isArabic ? 'العنوان' : 'Title'}</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder={isArabic ? 'عنوان الخدمة' : 'Service Title'}
                                    className={isArabic ? 'text-right' : 'text-left'}
                                    dir={dir}
                                />
                                <span className="text-rose-500 field-error text-sm error-title">&nbsp;</span>
                            </div>

                            {/* Featured Image */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="featured_image">{isArabic ? 'الصورة المميزة' : 'Featured Image'}</Label>
                                <Input id="featured_image" name="featured_image" type="file" accept="image/*" />
                                <span className="text-rose-500 field-error text-sm error-featured_image">&nbsp;</span>
                            </div>

                            {/* Banner Image */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="banner_image">{isArabic ? 'صورة البانر' : 'Banner Image'}</Label>
                                <Input id="banner_image" name="banner_image" type="file" accept="image/*" />
                                <span className="text-rose-500 field-error text-sm error-banner_image">&nbsp;</span>
                            </div>
                        </div>

                        {/* Short Description */}
                        <div className={isArabic ? 'text-right' : 'text-left'}>
                            <Label htmlFor="description">{isArabic ? 'الوصف المختصر' : 'Short Description'}</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder={isArabic
                                    ? 'اكتب وصفًا مختصرًا للخدمة )'  
                                    : 'Write a short description of the service'}
                                rows={4}
                                className={isArabic ? 'text-right' : 'text-left'}
                                dir={dir}
                                maxLength={200}
                            />
                            <span className="text-rose-500 field-error text-sm error-description">&nbsp;</span>
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin ml-2" />
                                    {isArabic ? 'جاري الحفظ...' : 'Saving...'}
                                </>
                            ) : (
                                isArabic ? 'حفظ الخدمة' : 'Save Service'
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ServiceInsert;