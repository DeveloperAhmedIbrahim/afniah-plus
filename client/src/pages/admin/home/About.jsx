import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/admin/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/admin/ui/tabs";
import { FolderKanban, Loader2 } from "lucide-react";
import { Button } from "@/components/admin/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Label } from "@/components/admin/ui/label";
import { Input } from "@/components/admin/ui/input";
import { handleFormSubmission } from '@/lib/axios';
import axiosInstance from '@/lib/axios';
import { toast } from 'sonner';
import JoditEditor from 'jodit-react';
import { clearFormErrors } from '@/lib/utils';

const HomeAbout = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const lang = searchParams.get('lang') || 'en';
    const isArabic = lang === 'ar';
    const dir = isArabic ? 'rtl' : 'ltr';

    const descriptionEditorRef = useRef(null);
    const [description, setDescription] = useState('');
    const [about, setAbout] = useState(null);
    const [fetchLoading, setFetchLoading] = useState(true);

    const editorConfig = useMemo(() => ({
        readonly: false,
        placeholder: isArabic ? 'ابدأ الكتابة...' : 'Start typing...',
        direction: dir,
        language: isArabic ? 'ar' : 'en',
        height: 200,
        toolbarAdaptive: true,
        toolbarSticky: true,
        showCharsCounter: true,
        showWordsCounter: true,
        showXPathInStatusbar: true,
        buttons:   'bold,italic,underline,|,align,|,link,image,|,undo,redo',
        buttonsMD: 'bold,italic,underline,|,align,|,link,image,|,undo,redo',
        buttonsSM: 'bold,italic,underline,|,align,|,link,image,|,undo,redo',
        buttonsXS: 'bold,italic,underline,|,align,|,link,image,|,undo,redo',
        uploader: { insertImageAsBase64URI: true },
        toolbarButtonSize: 'middle',
    }), [isArabic, dir]);

    const handleDescriptionChange = useCallback((newContent) => {
        setDescription(newContent);
    }, []);

    useEffect(() => {
        const fetchHomeAbout = async () => {
            setFetchLoading(true);
            clearFormErrors();
            try {
                const response = await axiosInstance.get(`/admin/home/about?lang=${lang}`);
                const data = response.data.about;
                setAbout(data);
                setDescription(data.description || '');
            } catch (error) {
                console.error('Fetch Error:', error);
                toast.error("Failed to load home about data");
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
                <span className="mx-2">
                    Loading data
                </span>
            </div>
        );
    }

    if (!about) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500">
                    Home about section data not found
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className={`text-2xl text-gray-600 flex items-center gap-2`}>
                <span className='text-green-primary'>Update About Section</span> - Home Page
                <span className="text-gray-500 text-xl">({lang.toUpperCase()})</span>         
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
                    <CardTitle className={`flex ${isArabic ? 'justify-start' : 'justify-end'}`}>
                        <Button
                            variant="secondary"
                            size="icon"
                            onClick={() => navigate(`/admin/home/about/bullets?lang=${lang}`)}
                            title={isArabic ? 'النقاط البارزة' : 'Bullets'}
                        >
                            <FolderKanban className="w-4 h-4" />
                        </Button>
                    </CardTitle>
                </CardHeader>

                <CardContent dir={dir}>
                    <form className="space-y-8" onSubmit={onSubmit}>
                        <input type="hidden" name="lang" value={lang} />
                        <input type="hidden" name="description" value={description} />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="title">{isArabic ? 'العنوان الرئيسي' : 'Main Title'}</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    defaultValue={about?.title || ''}
                                    key={`title-${lang}-${about?.title}`}
                                    placeholder={isArabic ? 'اكتب العنوان الرئيسي...' : 'Type main title here...'}
                                    className={isArabic ? 'text-right' : 'text-left'}
                                    dir={dir}
                                />
                                <span className="text-rose-500 field-error text-sm error-title">&nbsp;</span>
                            </div>

                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="btnText">{isArabic ? 'نص الزر' : 'Button Text'}</Label>
                                <Input
                                    id="btnText"
                                    name="btnText"
                                    defaultValue={about?.btn_text || ''}
                                    key={`btnText-${lang}-${about?.btn_text}`}
                                    placeholder={isArabic ? 'اكتب نص الزر...' : 'Enter button text...'}
                                    className={isArabic ? 'text-right' : 'text-left'}
                                    dir={dir}
                                />
                                <span className="text-rose-500 field-error text-sm error-btnText">&nbsp;</span>
                            </div>

                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="btnLink">{isArabic ? 'رابط الزر' : 'Button Link'}</Label>
                                <Input
                                    id="btnLink"
                                    name="btnLink"
                                    defaultValue={about?.btn_link || ''}
                                    key={`btnLink-${lang}-${about?.btn_link}`}
                                    placeholder={isArabic ? 'أدخل رابط الزر (URL)' : 'Enter button link (URL)'}
                                    className={isArabic ? 'text-right' : 'text-left'}
                                    dir={dir}
                                />
                                <span className="text-rose-500 field-error text-sm error-btnLink">&nbsp;</span>
                            </div>
                        </div>

                        {/* Description Editor */}
                        <div className={isArabic ? 'text-right' : 'text-left'}>
                            <Label>{isArabic ? 'الوصف' : 'Description'}</Label>
                            <div dir={dir} key={`desc-editor-${lang}`}>
                                <JoditEditor
                                    ref={descriptionEditorRef}
                                    value={description}
                                    config={editorConfig}
                                    onBlur={handleDescriptionChange}
                                />
                            </div>
                            <span className="text-rose-500 field-error text-sm error-description">&nbsp;</span>
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin ml-2" />
                                    {isArabic ? 'جاري الحفظ...' : 'Saving...'}
                                </>
                            ) : (
                                isArabic ? 'حفظ التغييرات' : 'Save Changes'
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