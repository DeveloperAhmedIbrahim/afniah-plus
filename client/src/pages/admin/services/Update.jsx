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
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { Label } from "@/components/admin/ui/label";
import { Input } from "@/components/admin/ui/input";
import { Textarea } from "@/components/admin/ui/textarea";
import { handleFormSubmission } from '@/lib/axios';
import axiosInstance from '@/lib/axios';
import { toast } from 'sonner';
import { ASSETS_URL, clearFormErrors } from '@/lib/utils';

const ServiceUpdate = () => {
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const lang = searchParams.get('lang') || 'en';
    const isArabic = lang === 'ar';
    const dir = isArabic ? 'rtl' : 'ltr';

    const [service, setService] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        icon: '',
        description: '',
    });

    useEffect(() => {
        const fetchService = async () => {
            setFetchLoading(true);
            clearFormErrors();

            try {
                const response = await axiosInstance.get(`/admin/service/update/${id}?lang=${lang}`);
                const data = response.data.service;

                setService(data);
                setFormData({
                    title: data.title || '',
                    icon: data.icon || '',
                    description: data.description || '',
                });
            } catch (error) {
                console.error('Fetch Error:', error);
                toast.error('Failed to load service data');
            } finally {
                setFetchLoading(false);
            }
        };

        fetchService();
    }, [id, lang]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await handleFormSubmission(e, `/admin/service/update/${id}`, 'POST');
        } catch (error) {
            // errors already handled by handleFormSubmission
        } finally {
            setLoading(false);
        }
    };

    if (fetchLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                <span className="ml-2">Loading service data...</span>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500">Service not found</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl text-gray-700 flex items-center gap-2">
                Services - <span className='text-green-primary'>Update</span> - Services Page
                <span className="text-gray-500 text-xl">({lang.toUpperCase()})</span>
            </h1>

            <div className='flex justify-center'>
                <Tabs value={lang} className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger
                            value="en"
                            onClick={() => navigate(`/admin/service/update/${id}?lang=en`)}
                        >
                            English
                        </TabsTrigger>
                        <TabsTrigger
                            value="ar"
                            onClick={() => navigate(`/admin/service/update/${id}?lang=ar`)}
                        >
                            العربية
                        </TabsTrigger>
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Title */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="title">{isArabic ? 'العنوان' : 'Title'}</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder={isArabic ? 'عنوان الخدمة' : 'Service Title'}
                                    className={isArabic ? 'text-right' : 'text-left'}
                                    dir={dir}
                                />
                                <span className="text-rose-500 field-error text-sm error-title">&nbsp;</span>
                            </div>

                            {/* Icon (SVG code) */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="icon">{isArabic ? 'الأيقونة (SVG)' : 'Icon (SVG code)'}</Label>
                                <Textarea
                                    id="icon"
                                    name="icon"
                                    value={formData.icon}
                                    onChange={handleInputChange}
                                    placeholder={isArabic
                                        ? 'ضع كود SVG هنا'
                                        : 'Paste SVG code here'}
                                    rows={6}
                                    className={isArabic ? 'text-right font-mono' : 'text-left font-mono'}
                                    dir={dir}
                                />
                                {formData.icon && formData.icon.trim().startsWith('<svg') && (
                                    <div className="mt-2 p-2 border rounded bg-gray-50" dangerouslySetInnerHTML={{ __html: formData.icon }} />
                                )}
                                <span className="text-rose-500 field-error text-sm error-icon">&nbsp;</span>
                            </div>

                            {/* Featured Image */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="featured_image">{isArabic ? 'الصورة المميزة' : 'Featured Image'}</Label>
                                <Input id="featured_image" name="featured_image" type="file" accept="image/*" />
                                {service?.featured_image && (
                                    <div className="mt-2">
                                        <img
                                            src={`${ASSETS_URL}/${service.featured_image}`}
                                            alt="Featured"
                                            className="w-32 h-32 object-cover rounded border"
                                        />
                                        <p className="text-sm text-gray-500 mt-1">Current Featured Image</p>
                                    </div>
                                )}
                                <span className="text-rose-500 field-error text-sm error-featured_image">&nbsp;</span>
                            </div>

                            {/* Banner Image */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="banner_image">{isArabic ? 'صورة البانر' : 'Banner Image'}</Label>
                                <Input id="banner_image" name="banner_image" type="file" accept="image/*" />
                                {service?.banner_image && (
                                    <div className="mt-2">
                                        <img
                                            src={`${ASSETS_URL}/${service.banner_image}`}
                                            alt="Banner"
                                            className="w-48 h-32 object-cover rounded border"
                                        />
                                        <p className="text-sm text-gray-500 mt-1">Current Banner Image</p>
                                    </div>
                                )}
                                <span className="text-rose-500 field-error text-sm error-banner_image">&nbsp;</span>
                            </div>
                        </div>

                        {/* Short Description */}
                        <div className={isArabic ? 'text-right' : 'text-left'}>
                            <Label htmlFor="description">{isArabic ? 'الوصف المختصر' : 'Short Description'}</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder={isArabic
                                    ? 'اكتب وصفًا مختصرًا للخدمة (100-150 حرف)'
                                    : 'Write a short description of the service (100-150 chars)'}
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
                                    {isArabic ? 'جاري التحديث...' : 'Updating...'}
                                </>
                            ) : (
                                isArabic ? 'تحديث الخدمة' : 'Update Service'
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ServiceUpdate;