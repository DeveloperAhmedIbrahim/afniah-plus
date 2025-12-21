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
import { Textarea } from '@/components/admin/ui/textarea';

const AboutTeam = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams(); 
    const lang = searchParams.get('lang') || 'en';
    const isArabic = lang === 'ar';
    const dir = isArabic ? 'rtl' : 'ltr';

    const [team, setTeam] = useState(null);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('');


    // Fetch about team data - ab language change per bhi refresh hoga
    useEffect(() => {
        const fetchAboutTeam = async () => {
            setFetchLoading(true);
            clearFormErrors();
            try {
                const response = await axiosInstance.get(`/admin/about/team?lang=${lang}`);
                const data = response.data.team;
                setTeam(data);
            } catch (error) {
                console.error('Fetch Error:', error);
                toast.error('Failed to load about team data');
            } finally {
                setFetchLoading(false);
            }
        };

        fetchAboutTeam();
    }, [lang]); // Language change per bhi re-fetch karega

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await handleFormSubmission(e, `/admin/about/team`, 'POST');
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

    if (!team) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500">About team data not found</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Title */}
            <h1 className={`text-2xl text-gray-600 flex items-center gap-2`}>
                About {isArabic ? <ChevronLeftIcon className="w-5 h-5" /> : <ChevronRightIcon className="w-5 h-5" />} 
                Team {isArabic ? <ChevronLeftIcon className="w-5 h-5" /> : <ChevronRightIcon className="w-5 h-5" />} 
                Update ({lang.toUpperCase()})
            </h1>

            {/* Language Tabs */}
            <div className='flex justify-center'>
                <Tabs value={lang} className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger 
                            value="en" 
                            onClick={() => navigate(`/admin/about/team?lang=en`)}
                        >
                            English
                        </TabsTrigger>
                        <TabsTrigger 
                            value="ar" 
                            onClick={() => navigate(`/admin/about/team?lang=ar`)}
                        >
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
                            onClick={() => navigate(`/admin/about/team/gallery?lang=en`)}
                        >
                            <FolderKanban className="w-4 h-4" />
                        </Button>
                    </CardTitle>
                </CardHeader>

                <CardContent dir={dir}>
                    <form className="space-y-8" onSubmit={onSubmit}>
                        <input type="hidden" name="lang" value={lang} />

                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                            {/* Title */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="title">{isArabic ? 'العنوان' : 'Title'}</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    defaultValue={team?.title || ''}
                                    key={`title-${lang}-${team?.title}`}
                                    placeholder={isArabic ? 'عنوان المشروع' : 'About Team Title'}
                                    className={isArabic ? 'text-right' : 'text-left'}
                                    dir={dir}
                                />
                                <span className="text-rose-500 field-error text-sm error-title">&nbsp;</span>
                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-1'>
                            {/* Description */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="description">{isArabic ? 'الوصف' : 'Description'}</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    defaultValue={team?.description || ''}
                                    key={`description-${lang}-${team?.description}`}
                                    placeholder={isArabic ? 'وصف قسم حول الواجهة' : 'Home About Description'}
                                    className={isArabic ? 'text-right h-30' : 'text-left h-30'}
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

export default AboutTeam;