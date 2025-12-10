import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
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
import { ASSETS_URL, clearFormErrors } from '@/lib/utils';

const HomeHero = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams(); 
    const lang = searchParams.get('lang') || 'en';
    const isArabic = lang === 'ar';
    const dir = isArabic ? 'rtl' : 'ltr';

    const [hero, setHero] = useState(null);
    const [fetchLoading, setFetchLoading] = useState(true);

    useEffect(() => {
        const fetchHomeHero = async () => {
            setFetchLoading(true);
            clearFormErrors();
            try {
                const response = await axiosInstance.get(`/admin/home/hero?lang=${lang}`);
                const data = response.data.hero;
                setHero(data);
            } catch (error) {
                console.error('Fetch Error:', error);
                toast.error('Failed to load home hero data');
            } finally {
                setFetchLoading(false);
            }
        };
        fetchHomeHero();
    }, [lang]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await handleFormSubmission(e, `/admin/home/hero`, 'POST');
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

    if (!hero) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500">Home hero data not found</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">

            <h1 className={`text-2xl text-gray-600 flex items-center gap-2`}>
                Home {isArabic ? <ChevronLeftIcon className="w-5 h-5" /> : <ChevronRightIcon className="w-5 h-5" />} 
                Hero {isArabic ? <ChevronLeftIcon className="w-5 h-5" /> : <ChevronRightIcon className="w-5 h-5" />} 
                Update ({lang.toUpperCase()})
            </h1>

            <div className='flex justify-center'>
                <Tabs value={lang} className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger 
                            value="en" 
                            onClick={() => navigate(`/admin/home/hero?lang=en`)}
                        >
                            English
                        </TabsTrigger>
                        <TabsTrigger 
                            value="ar" 
                            onClick={() => navigate(`/admin/home/hero?lang=ar`)}
                        >
                            العربية
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className='flex justify-between'>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => navigate("/admin/home/list")}
                            className="flex items-center gap-2"
                        >
                            <ChevronLeftIcon className="w-4 h-4" /> Back to List
                        </Button>
                        <Button 
                            variant="secondary" 
                            size="icon" 
                            onClick={() => navigate(`/admin/home/hero/gallery`)}
                        >
                            <FolderKanban className="w-4 h-4" />
                        </Button>
                    </CardTitle>
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
                                    defaultValue={hero?.title || ''}
                                    key={`title-${lang}-${hero?.title}`}
                                    placeholder={isArabic ? 'عنوان الواجهة الرئيسية' : 'Home Hero Title'}
                                    className={isArabic ? 'text-right' : 'text-left'}
                                    dir={dir}
                                />
                                <span className="text-rose-500 field-error text-sm error-title">&nbsp;</span>
                            </div>

                            {/* Sub Title */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="subtitle">{isArabic ? 'العنوان الفرعي' : 'Subtitle'}</Label>
                                <Input
                                    id="subtitle"
                                    name="subtitle"
                                    defaultValue={hero?.subtitle || ''}
                                    key={`subtitle-${lang}-${hero?.subtitle}`}
                                    placeholder={isArabic ? 'العنوان الفرعي للواجهة' : 'Home Hero Subtitle'}
                                    className={isArabic ? 'text-right' : 'text-left'}
                                    dir={dir}
                                />
                                <span className="text-rose-500 field-error text-sm error-subtitle">&nbsp;</span>
                            </div>

                            {/* Button Text */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="btnText">{isArabic ? 'نص الزر' : 'Button Text'}</Label>
                                <Input
                                    id="btnText"
                                    name="btnText"
                                    defaultValue={hero?.btn_text || ''}
                                    key={`btnText-${lang}-${hero?.btn_text}`}
                                    placeholder={isArabic ? 'نص زر الواجهة' : 'Home Hero Button Text'}
                                    className={isArabic ? 'text-right' : 'text-left'}
                                    dir={dir}
                                />
                                <span className="text-rose-500 field-error text-sm error-btnText">&nbsp;</span>
                            </div>
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin ml-2" />
                                    {isArabic ? 'جاري التحديث...' : 'Updating...'}
                                </>
                            ) : (
                                isArabic ? 'تحديث الواجهة الرئيسية' : 'Update Home Hero'
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

export default HomeHero;
