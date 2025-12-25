import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import {
    Card,
    CardContent,
} from "@/components/admin/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/admin/ui/tabs";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/admin/ui/button";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Label } from "@/components/admin/ui/label";
import { Input } from "@/components/admin/ui/input";
import { Textarea } from "@/components/admin/ui/textarea";
import JoditEditor from 'jodit-react';
import axiosInstance from '@/lib/axios';
import { toast } from 'sonner';
import { ASSETS_URL, clearFormErrors } from '@/lib/utils';
import { handleFormSubmission } from '@/lib/axios';

const ServiceInnerSection01 = () => {
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const lang = searchParams.get('lang') || 'en';
    const isArabic = lang === 'ar';
    const dir = isArabic ? 'rtl' : 'ltr';

    const descriptionEditorRef = useRef(null);

    const [formData, setFormData] = useState({
        title: '',
        statsTitle: '',
        statsCount: '',
        statsIcon: '',
        description: '',
    });

    const [serviceTitle, setServiceTitle] = useState('');
    const [currentImage, setCurrentImage] = useState(null);

    // Editor ko language change pe re-mount karne ke liye key
    const editorKey = `jodit-editor-${lang}`;

    const editorConfig = useMemo(() => ({
        readonly: false,
        placeholder: isArabic ? 'ابدأ الكتابة...' : 'Start typing...',
        direction: dir,
        language: isArabic ? 'ar' : 'en',
        height: 300,
        toolbarAdaptive: true,
        toolbarSticky: true,
        showCharsCounter: true,
        showWordsCounter: true,
        showXPathInStatusbar: true,
        buttons: 'bold,italic,underline,|,align,|,link,image,|,undo,redo',
        uploader: { insertImageAsBase64URI: true },
        toolbarButtonSize: 'middle',
    }), [isArabic, dir]);

    useEffect(() => {
        const fetchData = async () => {
            setFetchLoading(true);
            clearFormErrors();

            try {
                const serviceRes = await axiosInstance.get(`/admin/service/update/${id}?lang=${lang}`);
                setServiceTitle(serviceRes.data.service?.title || 'Service');

                const sectionRes = await axiosInstance.get(`/admin/service/${id}/section-01?lang=${lang}`);
                const data = sectionRes.data.section01 || {};

                setFormData({
                    title: data.title || '',
                    statsTitle: data.stats_title || '',
                    statsCount: data.stats_count || '',
                    statsIcon: data.stats_icon || '',
                    description: data.description || '',
                });

                setCurrentImage(data.image || null);
            } catch (error) {
                console.error('Fetch Error:', error);
                toast.error('Failed to load Section 01 data');
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

    const handleDescriptionChange = useCallback((newContent) => {
        setFormData(prev => ({ ...prev, description: newContent }));
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Editor se latest value le lo (safety ke liye)
            const latestDescription = descriptionEditorRef.current?.value || formData.description;

            const submitForm = new FormData(e.target);
            submitForm.set('description', latestDescription);

            await handleFormSubmission(e, `/admin/service/${id}/section-01`, 'POST', submitForm);

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
                    Loading Section 01 data...
                </span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl text-gray-700 flex items-center gap-2">
                Update <span className="text-green-primary font-semibold">{serviceTitle}</span> - Section 01
                <span className="text-gray-500 text-xl">({lang.toUpperCase()})</span>
            </h1>

            <div className="flex justify-center">
                <Tabs value={lang} className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger
                            value="en"
                            onClick={() => navigate(`/admin/service/${id}/section-01?lang=en`)}
                        >
                            English
                        </TabsTrigger>
                        <TabsTrigger
                            value="ar"
                            onClick={() => navigate(`/admin/service/${id}/section-01?lang=ar`)}
                        >
                            العربية
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <Card>
                <CardContent dir={dir} className="pt-6">
                    <form className="space-y-8" onSubmit={onSubmit}>
                        <input type="hidden" name="lang" value={lang} />
                        <input type="hidden" name="description" value={formData.description} />

                        {/* Row 1 */}
                        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${isArabic ? 'text-right' : 'text-left'}`}>
                            <div>
                                <Label htmlFor="title">{isArabic ? 'العنوان الرئيسي' : 'Main Title'}</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder={isArabic ? 'اكتب العنوان الرئيسي...' : 'Main title...'}
                                    dir={dir}
                                    className={isArabic ? 'text-right' : ''}
                                />
                                <span className="text-rose-500 text-sm field-error error-title"> </span>
                            </div>

                            <div>
                                <Label htmlFor="statsTitle">{isArabic ? 'عنوان الإحصائيات' : 'Stats Title'}</Label>
                                <Input
                                    id="statsTitle"
                                    name="statsTitle"
                                    value={formData.statsTitle}
                                    onChange={handleInputChange}
                                    placeholder={isArabic ? 'اكتب عنوان الإحصائيات...' : 'Stats title...'}
                                    dir={dir}
                                    className={isArabic ? 'text-right' : ''}
                                />
                                <span className="text-rose-500 text-sm field-error error-statsTitle"> </span>
                            </div>

                            <div>
                                <Label htmlFor="statsCount">{isArabic ? 'عدد الإحصائيات' : 'Stats Count'}</Label>
                                <Input
                                    id="statsCount"
                                    name="statsCount"
                                    value={formData.statsCount}
                                    onChange={handleInputChange}
                                    placeholder={isArabic ? 'مثال: 15+' : 'Example: 15+'}
                                    dir={dir}
                                    className={isArabic ? 'text-right' : ''}
                                />
                                <span className="text-rose-500 text-sm field-error error-statsCount"> </span>
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${isArabic ? 'text-right' : 'text-left'}`}>
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

                            <div>
                                <Label htmlFor="statsIcon">{isArabic ? 'أيقونة الإحصائيات (SVG)' : 'Stats Icon (SVG)'}</Label>
                                <Textarea
                                    id="statsIcon"
                                    name="statsIcon"
                                    value={formData.statsIcon}
                                    onChange={handleInputChange}
                                    placeholder={isArabic ? 'ضع كود SVG هنا...' : 'Paste SVG code here...'}
                                    rows={6}
                                    className={`font-mono ${isArabic ? 'text-right' : 'text-left'}`}
                                    dir={dir}
                                />
                                {formData.statsIcon?.trim().startsWith('<svg') && (
                                    <div className="mt-3 p-3 border rounded bg-gray-50 inline-block">
                                        <div dangerouslySetInnerHTML={{ __html: formData.statsIcon }} />
                                    </div>
                                )}
                                <span className="text-rose-500 text-sm field-error error-statsIcon"> </span>
                            </div>
                        </div>

                        {/* Description - Yeh important change hai */}
                        <div className={`grid grid-cols-1 md:grid-cols-1 gap-6 ${isArabic ? 'text-right' : 'text-left'}`}>
                            <Label>{isArabic ? 'الوصف' : 'Description'}</Label>
                            <div dir={dir}>
                                <JoditEditor
                                    key={editorKey}                         // ← Yeh line description ko har language change pe set karegi
                                    ref={descriptionEditorRef}
                                    value={formData.description}
                                    config={editorConfig}
                                    onChange={handleDescriptionChange}      // onChange add kiya for better sync
                                    onBlur={handleDescriptionChange}
                                />
                            </div>
                            <span className="text-rose-500 text-sm field-error error-description"> </span>
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

            {/* RTL fix */}
            <style jsx global>{`
                .jodit-wysiwyg[dir="rtl"] ~ .jodit-toolbar,
                .jodit-container[dir="rtl"] .jodit-toolbar {
                    direction: ltr !important;
                    text-align: left !important;
                }
                .jodit-wysiwyg[dir="rtl"] {
                    text-align: right;
                }
            `}</style>
        </div>
    );
};

export default ServiceInnerSection01;