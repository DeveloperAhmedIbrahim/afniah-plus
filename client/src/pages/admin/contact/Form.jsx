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
import { clearFormErrors } from '@/lib/utils';

const ContactForm = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const lang = searchParams.get('lang') || 'en';
    const isArabic = lang === 'ar';
    const dir = isArabic ? 'rtl' : 'ltr';

    const [form, setForm] = useState(null);
    const [fetchLoading, setFetchLoading] = useState(true);

    // Fetch contact form data
    useEffect(() => {
        const fetchContactForm = async () => {
            setFetchLoading(true);
            clearFormErrors();
            try {
                const response = await axiosInstance.get(`/admin/contact/form?lang=${lang}`);
                setForm(response.data.form);
            } catch (error) {
                console.error('Fetch Error:', error);
                toast.error('Failed to load contact form data');
            } finally {
                setFetchLoading(false);
            }
        };

        fetchContactForm();
    }, [lang]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await handleFormSubmission(e, `/admin/contact/form`, 'POST');
        } catch (error) {
            toast.error('Failed to update contact form');
        } finally {
            setLoading(false);
        }
    };

    if (fetchLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                <span className="ml-3 text-gray-600">
                    Loading contact form data...
                </span>
            </div>
        );
    }

    if (!form) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-600 text-lg font-medium">
                    Contact form data not found
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Title */}
            <h1 className={`text-2xl text-gray-700 flex items-center gap-2`}>
                <span className='text-green-primary'>Update Contact Form</span> - Contact Page
                <span className="text-gray-500 text-xl">({lang.toUpperCase()})</span>
            </h1>

            {/* Language Tabs */}
            <div className="flex justify-center">
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
                <CardHeader className="pb-2">
                    {/* Optional: small note or description can be added here */}
                </CardHeader>

                <CardContent>
                    <form className="space-y-8" onSubmit={onSubmit}>
                        <input type="hidden" name="lang" value={lang} />

                        {/* Main Form Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" dir={dir}>
                            {/* Main Title */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="title">{isArabic ? 'العنوان الرئيسي' : 'Main Title'}</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    defaultValue={form?.title || ''}
                                    placeholder={
                                        isArabic ? 'اكتب العنوان الرئيسي لنموذج التواصل...' : 'Main title for contact form...'
                                    }
                                    className={isArabic ? 'text-right' : 'text-left'}
                                    dir={dir}
                                />
                                <span className="text-rose-500 field-error text-sm error-title">&nbsp;</span>
                            </div>

                            {/* Subtitle */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="subtitle">{isArabic ? 'العنوان الفرعي' : 'Subtitle'}</Label>
                                <Input
                                    id="subtitle"
                                    name="subtitle"
                                    defaultValue={form?.subtitle || ''}
                                    placeholder={
                                        isArabic
                                            ? 'اكتب وصفاً فرعياً مختصراً جذاباً...'
                                            : 'Short attractive subtitle...'
                                    }
                                    className={isArabic ? 'text-right' : 'text-left'}
                                    dir={dir}
                                />
                                <span className="text-rose-500 field-error text-sm error-subtitle">&nbsp;</span>
                            </div>
                        </div>

                        {/* SMTP Settings Section */}
                        <div className="mt-10">
                            <h2 className="text-xl font-semibold text-gray-700 mb-6">
                                SMTP Email Settings
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                {/* Mailer */}
                                <div className='text-left'>
                                    <Label htmlFor="mailer">Mailer</Label>
                                    <Input
                                        id="mailer"
                                        name="mailer"
                                        defaultValue={form?.smtp_mailer || ''}
                                        placeholder='Example: smtp'
                                        className='text-left'
                                    />
                                    <span className="text-rose-500 field-error text-sm error-mailer">&nbsp;</span>
                                </div>

                                {/* Host */}
                                <div className='text-left'>
                                    <Label htmlFor="host">Host</Label>
                                    <Input
                                        id="host"
                                        name="host"
                                        defaultValue={form?.smtp_host || ''}
                                        placeholder='Example: smtp.gmail.com'
                                        className='text-left'
                                    />
                                    <span className="text-rose-500 field-error text-sm error-host">&nbsp;</span>
                                </div>

                                {/* Port */}
                                <div className='text-left'>
                                    <Label htmlFor="port">Port</Label>
                                    <Input
                                        id="port"
                                        name="port"
                                        defaultValue={form?.smtp_port || ''}
                                        placeholder='Example: 587'
                                        className='text-left'
                                    />
                                    <span className="text-rose-500 field-error text-sm error-port">&nbsp;</span>
                                </div>

                                {/* Encryption */}
                                <div className='text-left'>
                                    <Label htmlFor="encryption">Encryption</Label>
                                    <Input
                                        id="encryption"
                                        name="encryption"
                                        defaultValue={form?.smtp_encryption || ''}
                                        placeholder='Example: tls'
                                        className='text-left'
                                    />
                                    <span className="text-rose-500 field-error text-sm error-encryption">&nbsp;</span>
                                </div>

                                {/* Username */}
                                <div className='text-left'>
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        name="username"
                                        defaultValue={form?.smtp_username || ''}
                                        placeholder='Example: your.email@gmail.com'
                                        className='text-left'
                                    />
                                    <span className="text-rose-500 field-error text-sm error-username">&nbsp;</span>
                                </div>

                                {/* Password */}
                                <div className='text-left'>
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        defaultValue={form?.smtp_password || ''}
                                        placeholder='Enter password'
                                        className='text-left'
                                    />
                                    <span className="text-rose-500 field-error text-sm error-password">&nbsp;</span>
                                </div>

                                {/* From Name */}
                                <div className='text-left'>
                                    <Label htmlFor="fromName">From Name</Label>
                                    <Input
                                        id="fromName"
                                        name="fromName"
                                        defaultValue={form?.smtp_from_name || ''}
                                        placeholder='Example: Company Name'
                                        className='text-left'
                                    />
                                    <span className="text-rose-500 field-error text-sm error-fromName">&nbsp;</span>
                                </div>

                                {/* From Address */}
                                <div className='text-left'>
                                    <Label htmlFor="fromAddress">From Email Address</Label>
                                    <Input
                                        id="fromAddress"
                                        name="fromAddress"
                                        defaultValue={form?.smtp_from_address || ''}
                                        placeholder='Example: info@company.com'
                                        className='text-left'
                                    />
                                    <span className="text-rose-500 field-error text-sm error-fromAddress">&nbsp;</span>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button type="submit" className="w-full mt-8" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin ml-2" />
                                        {isArabic ? 'جاري الحفظ...' : 'Saving...'}
                                    </>
                                ) : (
                                    isArabic ? 'حفظ التغييرات' : 'Save Changes'
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* RTL Toolbar fix (if needed in future) */}
            <style jsx global>{`
          .jodit-wysiwyg[dir="rtl"] ~ .jodit-toolbar,
          .jodit-container[dir="rtl"] .jodit-toolbar {
            direction: ltr !important;
            text-align: left !important;
          }
        `}</style>
        </div>
    );
};

export default ContactForm;