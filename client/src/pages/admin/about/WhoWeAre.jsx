import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
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
    const [selectedCategory, setSelectedCategory] = useState('');


    // Fetch about whoWeAre data - ab language change per bhi refresh hoga
    useEffect(() => {
        const fetchAboutWhoWeAre = async () => {
            setFetchLoading(true);
            clearFormErrors();
            try {
                const response = await axiosInstance.get(`/admin/about/who-we-are?lang=${lang}`);
                const data = response.data.whoWeAre;
                setWhoWeAre(data);
            } catch (error) {
                console.error('Fetch Error:', error);
                toast.error('Failed to load about whoWeAre data');
            } finally {
                setFetchLoading(false);
            }
        };

        fetchAboutWhoWeAre();
    }, [lang]); // Language change per bhi re-fetch karega

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await handleFormSubmission(e, `/admin/about/who-we-are`, 'POST');
        } finally {                
            setLoading(false);
        }
    };

    if (fetchLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                <span className="ml-2">Loading about data...</span>
            </div>
        );
    }

    if (!whoWeAre) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500">About whoWeAre data not found</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Title */}
            <h1 className={`text-2xl text-gray-600 flex items-center gap-2`}>
                About {isArabic ? <ChevronLeftIcon className="w-5 h-5" /> : <ChevronRightIcon className="w-5 h-5" />} 
                WhoWeAre {isArabic ? <ChevronLeftIcon className="w-5 h-5" /> : <ChevronRightIcon className="w-5 h-5" />} 
                Update ({lang.toUpperCase()})
            </h1>

            {/* Language Tabs */}
            <div className='flex justify-center'>
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
                <CardHeader>
                </CardHeader>

                <CardContent dir={dir}>
                    <form className="space-y-8" onSubmit={onSubmit}>
                        <input type="hidden" name="lang" value={lang} />

                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Title */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="title">{isArabic ? 'العنوان' : 'Title'}</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    defaultValue={whoWeAre?.title || ''}
                                    key={`title-${lang}-${whoWeAre?.title}`}
                                    placeholder={isArabic ? 'عنوان المشروع' : 'About WhoWeAre Title'}
                                    className={isArabic ? 'text-right' : 'text-left'}
                                    dir={dir}
                                />
                                <span className="text-rose-500 field-error text-sm error-title">&nbsp;</span>
                            </div>

                            {/* Image */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="image">{isArabic ? 'الصورة' : 'Background Image'}</Label>
                                <Input id="image" name="image" type="file" />
                                {whoWeAre?.image && (
                                    <div className="mt-2">
                                        <img 
                                            src={ASSETS_URL+'/'+whoWeAre.image} 
                                            alt="Current" 
                                            className="w-32 h-32 object-cover rounded border"
                                        />
                                        <p className="text-sm text-gray-500 mt-1">Current Image</p>
                                    </div>
                                )}
                                <span className="text-rose-500 field-error text-sm error-image">&nbsp;</span>
                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-1'>
                            {/* Description */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="description">{isArabic ? 'الوصف' : 'Description'}</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    defaultValue={whoWeAre?.description || ''}
                                    key={`description-${lang}-${whoWeAre?.description}`}
                                    placeholder={isArabic ? 'وصف قسم حول الواجهة' : 'Home About Description'}
                                    className={isArabic ? 'text-right h-50' : 'text-left h-50'}
                                    dir={dir}
                                />
                                <span className="text-rose-500 field-error text-sm error-description">&nbsp;</span>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin ml-2" />
                                    {isArabic ? 'جاري التحديث...' : 'Updating...'}
                                </>
                            ) : (
                                isArabic ? 'تحديث المشروع' : 'Update About'
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

export default AboutWhoWeAre;