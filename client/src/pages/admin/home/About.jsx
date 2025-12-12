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
import { Textarea } from '@/components/admin/ui/textarea';
import { clearFormErrors } from '@/lib/utils';

const HomeAbout = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams(); 
    const lang = searchParams.get('lang') || 'en';
    const isArabic = lang === 'ar';
    const dir = isArabic ? 'rtl' : 'ltr';

    const [about, setAbout] = useState(null);
    const [fetchLoading, setFetchLoading] = useState(true);

    useEffect(() => {
        const fetchHomeAbout = async () => {
            setFetchLoading(true);
            clearFormErrors();
            try {
                const response = await axiosInstance.get(`/admin/home/about?lang=${lang}`);
                const data = response.data.about;
                setAbout(data);
            } catch (error) {
                console.error('Fetch Error:', error);
                toast.error(isArabic ? 'فشل تحميل بيانات قسم حول الواجهة' : 'Failed to load home about data');
            } finally {
                setFetchLoading(false);
            }
        };
        fetchHomeAbout();
    }, [lang]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await handleFormSubmission(e, `/admin/home/about`, 'POST');
        } finally {                
            setLoading(false);
        }
    };

    if (fetchLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                <span className="ml-2">{isArabic ? 'جاري تحميل البيانات...' : 'Loading home data...'}</span>
            </div>
        );
    }

    if (!about) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500">
                    {isArabic ? 'لم يتم العثور على بيانات قسم حول الواجهة' : 'Home about data not found'}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl text-gray-600 flex items-center gap-2">
                Home <ChevronRightIcon className="w-5 h-5" /> 
                About <ChevronRightIcon className="w-5 h-5" /> 
                Update ({lang.toUpperCase()})                
            </h1>


            <div className="flex justify-center">
                <Tabs value={lang} className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="en" onClick={() => navigate(`/admin/home/about?lang=en`)}>
                            English
                        </TabsTrigger>
                        <TabsTrigger value="ar" onClick={() => navigate(`/admin/home/about?lang=ar`)}>
                            العربية
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-end">
                        <Button 
                            variant="secondary" 
                            size="icon" 
                            onClick={() => navigate(`/admin/home/about/bullets?lang=en`)}
                        >
                            <FolderKanban className="w-4 h-4" />
                        </Button>
                    </CardTitle>
                </CardHeader>

                <CardContent dir={dir}>
                    <form className="space-y-8" onSubmit={onSubmit}>
                        <input type="hidden" name="lang" value={lang} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Title */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="title">{isArabic ? 'العنوان' : 'Title'}</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    defaultValue={about?.title || ''}
                                    key={`title-${lang}-${about?.title}`}
                                    placeholder={isArabic ? 'عنوان قسم حول الواجهة' : 'Home About Title'}
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
                                    defaultValue={about?.description || ''}
                                    key={`description-${lang}-${about?.description}`}
                                    placeholder={isArabic ? 'وصف قسم حول الواجهة' : 'Home About Description'}
                                    className={isArabic ? 'text-right' : 'text-left h-25'}
                                    dir={dir}
                                />
                                <span className="text-rose-500 field-error text-sm error-description">&nbsp;</span>
                            </div>

                            {/* Button Text */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="btnText">{isArabic ? 'نص الزر' : 'Button Text'}</Label>
                                <Input
                                    id="btnText"
                                    name="btnText"
                                    defaultValue={about?.btn_text || ''}
                                    key={`btnText-${lang}-${about?.btn_text}`}
                                    placeholder={isArabic ? 'نص زر قسم الواجهة' : 'Home About Button Text'}
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
                                    defaultValue={about?.btn_link || ''}
                                    key={`btnLink-${lang}-${about?.btn_link}`}
                                    placeholder={isArabic ? 'رابط زر قسم الواجهة' : 'Home About Button Link'}
                                    className={isArabic ? 'text-right' : 'text-left'}
                                    dir={dir}
                                />
                                <span className="text-rose-500 field-error text-sm error-btnLink">&nbsp;</span>
                            </div>

                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin ml-2" />
                                    {isArabic ? 'جاري التحديث...' : 'Updating...'}
                                </>
                            ) : (
                                isArabic ? 'تحديث قسم حول الواجهة' : 'Update Home About'
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

export default HomeAbout;
