import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
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

const ContactForm = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams(); 
    const lang = searchParams.get('lang') || 'en';
    const isArabic = lang === 'ar';
    const dir = isArabic ? 'rtl' : 'ltr';

    const [form, setForm] = useState(null);
    const [fetchLoading, setFetchLoading] = useState(true);


    // Fetch contact form data - ab language change per bhi refresh hoga
    useEffect(() => {
        const fetchContactForm = async () => {
            setFetchLoading(true);
            clearFormErrors();
            try {
                const response = await axiosInstance.get(`/admin/contact/form?lang=${lang}`);
                const data = response.data.form;
                setForm(data);
            } catch (error) {
                console.error('Fetch Error:', error);
                toast.error('Failed to load contact form data');
            } finally {
                setFetchLoading(false);
            }
        };

        fetchContactForm();
    }, [lang]); // Language change per bhi re-fetch karega

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await handleFormSubmission(e, `/admin/contact/form`, 'POST');
        } finally {                
            setLoading(false);
        }
    };

    if (fetchLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                <span className="ml-2">Loading contact data...</span>
            </div>
        );
    }

    if (!form) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500">Contact form data not found</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Title */}
            <h1 className={`text-2xl text-gray-600 flex items-center gap-2`}>
                Contact {isArabic ? <ChevronLeftIcon className="w-5 h-5" /> : <ChevronRightIcon className="w-5 h-5" />} 
                Form {isArabic ? <ChevronLeftIcon className="w-5 h-5" /> : <ChevronRightIcon className="w-5 h-5" />} 
                Update ({lang.toUpperCase()})
            </h1>

            {/* Language Tabs */}
            <div className='flex justify-center'>
                <Tabs value={lang} className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger 
                            value="en" 
                            onClick={() => navigate(`/admin/contact/form?lang=en`)}
                        >
                            English
                        </TabsTrigger>
                        <TabsTrigger 
                            value="ar" 
                            onClick={() => navigate(`/admin/contact/form?lang=ar`)}
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
                                    defaultValue={form?.title || ''}
                                    key={`title-${lang}-${form?.title}`}
                                    placeholder={isArabic ? 'عنوان المشروع' : 'Contact Form Title'}
                                    className={isArabic ? 'text-right' : 'text-left'}
                                    dir={dir}
                                />
                                <span className="text-rose-500 field-error text-sm error-title">&nbsp;</span>
                            </div>

                            {/* Title */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="subtitle">{isArabic ? 'عنوان فرعي لبطل المشروع' : 'Subtitle'}</Label>
                                <Input
                                    id="subtitle"
                                    name="subtitle"
                                    defaultValue={form?.subtitle || ''}
                                    key={`title-${lang}-${form?.subtitle}`}
                                    placeholder={isArabic ? 'عنوان فرعي لبطل المشروع' : 'Contact Form Subtitle'}
                                    className={isArabic ? 'text-right' : 'text-left'}
                                    dir={dir}
                                />
                                <span className="text-rose-500 field-error text-sm error-title">&nbsp;</span>
                            </div>
                        </div>
                        <h2>SMTP Settings</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {/* Title */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="mailer">{isArabic ? 'العنوان' : 'Mailer'}</Label>
                                <Input
                                    id="mailer"
                                    name="mailer"
                                    defaultValue={form?.smtp_mailer || ''}
                                    key={`mailer-${lang}-${form?.smtp_mailer}`}
                                    placeholder={isArabic ? 'عنوان المشروع' : 'Contact Form Title'}
                                    className={isArabic ? 'text-right' : 'text-left'}
                                    dir={dir}
                                />
                                <span className="text-rose-500 field-error text-sm error-mailer">&nbsp;</span>
                            </div>

                            {/* Host */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="host">{isArabic ? 'عنوان فرعي لبطل المشروع' : 'Host'}</Label>
                                <Input
                                    id="host"
                                    name="host"
                                    defaultValue={form?.smtp_host || ''}
                                    key={`host-${lang}-${form?.smtp_host}`}
                                    placeholder={isArabic ? 'عنوان فرعي لبطل المشروع' : 'Contact Form Host'}
                                    className={isArabic ? 'text-right' : 'text-left'}
                                    dir={dir}
                                />
                                <span className="text-rose-500 field-error text-sm error-host">&nbsp;</span>
                            </div>

                            {/* Port */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="port">{isArabic ? 'عنوان فرعي لبطل المشروع' : 'Port'}</Label>
                                <Input
                                    id="port"
                                    name="port"
                                    defaultValue={form?.smtp_port || ''}
                                    key={`port-${lang}-${form?.smtp_port}`}
                                    placeholder={isArabic ? 'عنوان فرعي لبطل المشروع' : 'Contact Form Port'}
                                    className={isArabic ? 'text-right' : 'text-left'}
                                    dir={dir}
                                />
                                <span className="text-rose-500 field-error text-sm error-port">&nbsp;</span>
                            </div>

                            {/* Encryption */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="encryption">{isArabic ? 'تشفير' : 'Encryption'}</Label>
                                <Input
                                    id="encryption"
                                    name="encryption"
                                    defaultValue={form?.smtp_encryption || ''}
                                    key={`encryption-${lang}-${form?.smtp_encryption}`}
                                    placeholder={isArabic ? 'تشفير' : 'Contact Form Encryption'}
                                    className={isArabic ? 'text-right' : 'text-left'}
                                    dir={dir}
                                />
                                <span className="text-rose-500 field-error text-sm error-encryption">&nbsp;</span>
                            </div>

                            {/* Username */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="username">{isArabic ? 'اسم المستخدم' : 'Username'}</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    defaultValue={form?.smtp_username || ''}
                                    key={`username-${lang}-${form?.smtp_username}`}
                                    placeholder={isArabic ? 'اسم المستخدم' : 'Contact Form Username'}
                                    className={isArabic ? 'text-right' : 'text-left'}
                                    dir={dir}
                                />
                                <span className="text-rose-500 field-error text-sm error-username">&nbsp;</span>
                            </div>

                            {/* Password */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="password">{isArabic ? 'كلمة المرور' : 'Password'}</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    defaultValue={form?.smtp_password || ''}
                                    key={`password-${lang}-${form?.smtp_password}`}
                                    placeholder={isArabic ? 'كلمة المرور' : 'Contact Form Password'}
                                    className={isArabic ? 'text-right' : 'text-left'}
                                    dir={dir}
                                />
                                <span className="text-rose-500 field-error text-sm error-password">&nbsp;</span>
                            </div>

                            {/* From Name */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="fromName">{isArabic ? 'اسم المرسل' : 'From Name'}</Label>
                                <Input
                                    id="fromName"
                                    name="fromName"
                                    defaultValue={form?.smtp_from_name || ''}
                                    key={`fromName-${lang}-${form?.smtp_from_name}`}
                                    placeholder={isArabic ? 'اسم المرسل' : 'Contact Form From Name'}
                                    className={isArabic ? 'text-right' : 'text-left'}
                                    dir={dir}
                                />
                                <span className="text-rose-500 field-error text-sm error-fromName">&nbsp;</span>
                            </div>

                            {/* From Address */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="fromAddress">{isArabic ? 'عنوان المرسل' : 'From Address'}</Label>
                                <Input
                                    id="fromAddress"
                                    name="fromAddress"
                                    defaultValue={form?.smtp_from_address || ''}
                                    key={`fromAddress-${lang}-${form?.smtp_from_address}`}
                                    placeholder={isArabic ? 'عنوان المرسل' : 'Contact Form From Address'}
                                    className={isArabic ? 'text-right' : 'text-left'}
                                    dir={dir}
                                />
                                <span className="text-rose-500 field-error text-sm error-fromAddress">&nbsp;</span>
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
                                isArabic ? 'تحديث المشروع' : 'Update Contact Form'
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

export default ContactForm;