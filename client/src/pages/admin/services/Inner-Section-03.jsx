import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/admin/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/admin/ui/tabs";
import { FolderKanban, Loader2 } from "lucide-react";
import { Button } from "@/components/admin/ui/button";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Label } from "@/components/admin/ui/label";
import { Input } from "@/components/admin/ui/input";
import axiosInstance from '@/lib/axios';
import { toast } from 'sonner';
import { ASSETS_URL, clearFormErrors } from '@/lib/utils';
import { handleFormSubmission } from '@/lib/axios';

const ServiceInnerSection03 = () => {
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const lang = searchParams.get('lang') || 'en';
    const isArabic = lang === 'ar';
    const dir = isArabic ? 'rtl' : 'ltr';

    const [formData, setFormData] = useState({
        title: '',
    });

    const [serviceTitle, setServiceTitle] = useState('');
    const [currentImage, setCurrentImage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setFetchLoading(true);
            clearFormErrors();

            try {
                const serviceRes = await axiosInstance.get(`/admin/service/update/${id}?lang=${lang}`);
                setServiceTitle(serviceRes.data.service?.title || 'Service');

                const sectionRes = await axiosInstance.get(`/admin/service/${id}/section-03?lang=${lang}`);
                const data = sectionRes.data.section03 || {};

                setFormData({
                    title: data.title || '',
                });

                setCurrentImage(data.image || null);
            } catch (error) {
                console.error('Fetch Error:', error);
                toast.error('Failed to load Section 03 data');
            } finally {
                setFetchLoading(false);
            }
        };

        fetchData();
    }, [id, lang]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const submitForm = new FormData(e.target);
            await handleFormSubmission(e, `/admin/service/${id}/section-03`, 'POST', submitForm);
        } catch (error) {
            toast.error('Failed to save changes');
        } finally {
            setLoading(false);
        }
    };

    if (fetchLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                <span className="ml-3 text-gray-600">
                    Loading Section 03 data
                </span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl text-gray-700 flex items-center gap-2">
                Update <span className="text-green-primary font-semibold">{serviceTitle}</span> - Section 03
                <span className="text-gray-500 text-xl">({lang.toUpperCase()})</span>
            </h1>

            <div className="flex justify-center">
                <Tabs className="w-[800px]">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger
                            value="update"
                            onClick={() => navigate(`/admin/service/update/${id}?lang=en`)}
                            className={window.location.pathname.includes(`/admin/service/update/${id}`) ? "bg-green-primary text-white" : ""}
                        >
                            {serviceTitle}
                        </TabsTrigger>
                        <TabsTrigger
                            value="section-01"
                            onClick={() => navigate(`/admin/service/${id}/section-01?lang=en`)}
                            className={window.location.pathname.includes(`/admin/service/${id}/section-01`) ? "bg-green-primary text-white" : ""}
                        >
                            Section 01
                        </TabsTrigger>
                        <TabsTrigger
                            value="section-02"
                            onClick={() => navigate(`/admin/service/${id}/section-02?lang=en`)}
                            className={window.location.pathname.includes(`/admin/service/${id}/section-02`) ? "bg-green-primary text-white" : ""}
                        >
                            Section 02
                        </TabsTrigger>  
                        <TabsTrigger
                            value="section-03"
                            onClick={() => navigate(`/admin/service/${id}/section-03?lang=en`)}
                            className={window.location.pathname.includes(`/admin/service/${id}/section-03`) ? "bg-green-primary text-white" : ""}
                        >
                            Section 03
                        </TabsTrigger>                                                
                    </TabsList>
                </Tabs>
            </div>            

            <div className="flex justify-center">
                <Tabs value={lang} className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger
                            value="en"
                            onClick={() => navigate(`/admin/service/${id}/section-03?lang=en`)}
                        >
                            English
                        </TabsTrigger>
                        <TabsTrigger
                            value="ar"
                            onClick={() => navigate(`/admin/service/${id}/section-03?lang=ar`)}
                        >
                            العربية
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className={`flex ${isArabic ? 'justify-start' : 'justify-end'}`}>
                        <FolderKanban
                            className="w-10 h-10 p-0 border-5 rounded-md bg-gray-100 border-gray-100 cursor-pointer text-green-primary"
                            onClick={() => navigate(`/admin/service/${id}/section-03/bullets?lang=${lang}`)}
                            title={isArabic ? 'النقاط البارزة' : 'Bullets'}
                        >
                        </FolderKanban>
                    </CardTitle>
                </CardHeader>                
                <CardContent dir={dir} className="pt-6">
                    <form className="space-y-8" onSubmit={onSubmit}>
                        <input type="hidden" name="lang" value={lang} />

                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${isArabic ? 'text-right' : 'text-left'}`}>
                            <div>
                                <Label htmlFor="title">{isArabic ? 'العنوان' : 'Title'}</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder={isArabic ? 'اكتب العنوان...' : 'Enter title...'}
                                    dir={dir}
                                    className={isArabic ? 'text-right' : ''}
                                />
                                <span className="text-rose-500 text-sm field-error error-title"> </span>
                            </div>

                            <div>
                                <Label htmlFor="image">{isArabic ? 'الصورة' : 'Image'}</Label>
                                <Input id="image" name="image" type="file" accept="image/*" />
                                {currentImage && (
                                    <div className="mt-4">
                                        <img
                                            src={`${ASSETS_URL}/${currentImage}`}
                                            alt="Current"
                                            className="w-56 h-40 object-cover rounded border shadow-sm"
                                        />
                                        <p className="text-xs text-gray-500 mt-2 break-all">
                                            {currentImage}
                                        </p>
                                    </div>
                                )}
                                <span className="text-rose-500 text-sm field-error error-image"> </span>
                            </div>
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                    {isArabic ? 'جاري الحفظ...' : 'Saving...'}
                                </>
                            ) : (
                                isArabic ? 'حفظ التغييرات' : 'Save Changes'
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ServiceInnerSection03;