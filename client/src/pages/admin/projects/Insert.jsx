import React, { useState, useRef, useMemo, useCallback } from 'react';
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/admin/ui/select";
import JoditEditor from 'jodit-react';

const ProjectInsert = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const lang = searchParams.get('lang') || 'en';
    const isArabic = lang === 'ar';
    const dir = isArabic ? 'rtl' : 'ltr';

    const editorRef = useRef(null);
    const [content, setContent] = useState('<p>Initial content</p>');

    const editorConfig = useMemo(() => ({
        readonly: false,
        placeholder: isArabic ? 'ابدأ الكتابة...' : 'Start typing...',
        direction: dir,
        language: isArabic ? 'ar' : 'en',
        height: 400,
        toolbarAdaptive: false,
        toolbarSticky: false,
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: false,
        buttons: 'bold,italic,underline,|,align,ul,ol,|,link,image,|,undo,redo',
        buttonsMD: 'bold,italic,underline,|,align,ul,ol,|,link,image,|,undo,redo',
        buttonsSM: 'bold,italic,underline,|,align,|,link,image',
        buttonsXS: 'bold,italic,underline,|,link,image',
        uploader: { insertImageAsBase64URI: true },
        // اہم: RTL میں بھی ٹولبار LTR رہے
        toolbarButtonSize: 'middle',
    }), [isArabic, dir]);

    const handleEditorChange = useCallback((newContent) => {
        setContent(newContent);
    }, []);

    return (
        <div className="space-y-6">
            {/* Page Title */}
            <h1 className={`text-2xl text-gray-600 flex items-center gap-2`}>
                Project {isArabic ? <ChevronLeftIcon className="w-5 h-5" /> : <ChevronRightIcon className="w-5 h-5" />} 
                Insert ({lang})
            </h1>

            {/* Language Tabs */}
            <div className='flex justify-center'>
                <Tabs defaultValue={lang} className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="en" onClick={() => navigate("/admin/project/insert?lang=en")}>
                            English
                        </TabsTrigger>
                        <TabsTrigger value="ar" onClick={() => navigate("/admin/project/insert?lang=ar")}>
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
                            onClick={() => navigate("/admin/project/list")}
                            className="flex items-center gap-2"
                        >
                            <ChevronLeftIcon className="w-4 h-4" /> Back to List
                        </Button>
                    </CardTitle>
                </CardHeader>

                <CardContent dir={dir}>
                    <form className="space-y-8">
                        {/* Grid - بالکل وہی ترتیب، کوئی order یا reverse نہیں */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Title */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="title">{isArabic ? 'العنوان' : 'Title'}</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder={isArabic ? 'عنوان المشروع' : 'Project Title'}
                                    className={isArabic ? 'text-right' : 'text-left'}
                                    dir={dir}
                                />
                                <span className="text-rose-500 text-sm">&nbsp;</span>
                            </div>

                            {/* Image */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="image">{isArabic ? 'الصورة' : 'Image'}</Label>
                                <Input id="image" name="image" type="file" />
                                <span className="text-rose-500 text-sm">&nbsp;</span>
                            </div>

                            {/* Category */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="category">{isArabic ? 'الفئة' : 'Category'}</Label>
                                <Select>
                                    <SelectTrigger dir={dir}>
                                        <SelectValue placeholder={isArabic ? 'اختر الفئة' : 'Select a Category'} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="Residential Complexes">مجمعات سكنية</SelectItem>
                                            <SelectItem value="Urban Planning">تخطيط عمراني</SelectItem>
                                            <SelectItem value="Hospitality & Resorts">الضيافة والمنتجعات</SelectItem>
                                            <SelectItem value="Mosque">مساجد</SelectItem>
                                            <SelectItem value="Meuseums">متاحف</SelectItem>
                                            <SelectItem value="Heathcare">الرعاية الصحية</SelectItem>
                                            <SelectItem value="Education">تعليم</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Location */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="location">{isArabic ? 'الموقع' : 'Location'}</Label>
                                <Input
                                    id="location"
                                    name="location"
                                    placeholder={isArabic ? 'الرياض' : 'Riyadh'}
                                    className={isArabic ? 'text-right' : 'text-left'}
                                    dir={dir}
                                />
                            </div>
                        </div>

                        {/* Description Editor */}
                        <div className={isArabic ? 'text-right' : 'text-left'}>
                            <Label>{isArabic ? 'الوصف' : 'Description'}</Label>
                            <div dir={dir}>
                                <JoditEditor
                                    ref={editorRef}
                                    value={content}
                                    config={editorConfig}
                                    onChange={handleEditorChange}
                                />
                            </div>
                        </div>

                        {/* Case Study Editor */}
                        <div className={isArabic ? 'text-right' : 'text-left'}>
                            <Label>{isArabic ? 'دراسة الحالة' : 'Case Study'}</Label>
                            <div dir={dir}>
                                <JoditEditor
                                    ref={editorRef}
                                    value={content}
                                    config={editorConfig}
                                    onChange={handleEditorChange}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin ml-2" />
                                    {isArabic ? 'جاري الحفظ...' : 'Saving...'}
                                </>
                            ) : (
                                isArabic ? 'حفظ المشروع' : 'Save Project'
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* CSS Fix: Jodit Toolbar کو ہمیشہ LTR رکھیں */}
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

export default ProjectInsert;