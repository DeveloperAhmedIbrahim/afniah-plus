import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/admin/ui/select";
import JoditEditor from 'jodit-react';
import { handleFormSubmission } from '@/lib/axios';
import axiosInstance from '@/lib/axios';
import { toast } from 'sonner';
import { ASSETS_URL, clearFormErrors } from '@/lib/utils';

const ProjectUpdate = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const lang = searchParams.get('lang') || 'en';
    const isArabic = lang === 'ar';
    const dir = isArabic ? 'rtl' : 'ltr';

    const descriptionEditorRef = useRef(null);
    const caseStudyEditorRef = useRef(null);
    const [description, setDescription] = useState('');
    const [caseStudy, setCaseStudy] = useState('');
    const [project, setProject] = useState(null);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('');

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

    const handleCaseStudyChange = useCallback((newContent) => {
        setCaseStudy(newContent);
    }, []);

    const categories = [
        { value: 'Residential Complexes', labelEn: 'Residential Complexes', labelAr: 'مجمعات سكنية' },
        { value: 'Urban Planning', labelEn: 'Urban Planning', labelAr: 'تخطيط عمراني' },
        { value: 'Hospitality & Resorts', labelEn: 'Hospitality & Resorts', labelAr: 'الضيافة والمنتجعات' },
        { value: 'Mosque', labelEn: 'Mosque', labelAr: 'مساجد' },
        { value: 'Museums', labelEn: 'Museums', labelAr: 'متاحف' },
        { value: 'Healthcare', labelEn: 'Healthcare', labelAr: 'الرعاية الصحية' },
        { value: 'Education', labelEn: 'Education', labelAr: 'تعليم' },
    ];

    // Fetch project data - ab language change per bhi refresh hoga
    useEffect(() => {
        const fetchProject = async () => {
            setFetchLoading(true);
            clearFormErrors();
            
            try {
                const response = await axiosInstance.get(`/admin/project/update/${id}?lang=${lang}`);
                const data = response.data.project;
                
                setProject(data);
                setDescription(data.description || '');
                setCaseStudy(data.case_study || '');
                setSelectedCategory(data.category || '');
                
            } catch (error) {
                console.error('Fetch Error:', error);
                toast.error('Failed to load project data');
            } finally {
                setFetchLoading(false);
            }
        };

        fetchProject();
    }, [id, lang]); // Language change per bhi re-fetch karega

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await handleFormSubmission(e, `/admin/project/update/${id}`, 'POST');
        } catch (error) {
            // console.error('Submit Error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (fetchLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                <span className="ml-2">Loading project data...</span>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500">Project not found</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Title */}
            <h1 className={`text-2xl text-gray-700 flex items-center gap-2`}>
                Projects - <span className='text-green-primary'>Update</span> - Projects Page
                <span className="text-gray-500 text-xl">({lang.toUpperCase()})</span>
            </h1>

            {/* Language Tabs */}
            <div className='flex justify-center'>
                <Tabs value={lang} className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger 
                            value="en" 
                            onClick={() => navigate(`/admin/project/update/${id}?lang=en`)}
                        >
                            English
                        </TabsTrigger>
                        <TabsTrigger 
                            value="ar" 
                            onClick={() => navigate(`/admin/project/update/${id}?lang=ar`)}
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
                            onClick={() => navigate("/admin/project/list")}
                            className="flex items-center gap-2"
                        >
                            <ChevronLeftIcon className="w-4 h-4" /> Back to List
                        </Button>
                    </CardTitle>
                </CardHeader>

                <CardContent dir={dir}>
                    <form className="space-y-8" onSubmit={onSubmit}>
                        <input type="hidden" name="lang" value={lang} />
                        <input type="hidden" name="description" value={description} />
                        <input type="hidden" name="caseStudy" value={caseStudy} />

                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Title */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="title">{isArabic ? 'العنوان' : 'Title'}</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    defaultValue={project?.title || ''}
                                    key={`title-${lang}-${project?.title}`}
                                    placeholder={isArabic ? 'عنوان المشروع' : 'Project Title'}
                                    className={isArabic ? 'text-right' : 'text-left'}
                                    dir={dir}
                                />
                                <span className="text-rose-500 field-error text-sm error-title">&nbsp;</span>
                            </div>

                            {/* Image */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="image">{isArabic ? 'الصورة' : 'Image'}</Label>
                                <Input id="image" name="image" type="file" />
                                {project?.image && (
                                    <div className="mt-2">
                                        <img 
                                            src={ASSETS_URL+'/'+project.image} 
                                            alt="Current" 
                                            className="w-32 h-32 object-cover rounded border"
                                        />
                                        <p className="text-sm text-gray-500 mt-1">Current Image</p>
                                    </div>
                                )}
                                <span className="text-rose-500 field-error text-sm error-image">&nbsp;</span>
                            </div>

                            {/* Category */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="category">{isArabic ? 'الفئة' : 'Category'}</Label>
                                <Select 
                                    name="category" 
                                    value={selectedCategory}
                                    onValueChange={setSelectedCategory}
                                    key={`category-${lang}-${selectedCategory}`}
                                >
                                    <SelectTrigger dir={dir}>
                                        <SelectValue placeholder={isArabic ? 'اختر الفئة' : 'Select a Category'} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {categories.map((cat) => (
                                                <SelectItem key={cat.value} value={cat.value}>
                                                    {isArabic ? cat.labelAr : cat.labelEn}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <span className="text-rose-500 field-error text-sm error-category">&nbsp;</span>
                            </div>

                            {/* Location */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="location">{isArabic ? 'الموقع' : 'Location'}</Label>
                                <Input
                                    id="location"
                                    name="location"
                                    defaultValue={project?.location || ''}
                                    key={`location-${lang}-${project?.location}`}
                                    placeholder={isArabic ? 'الرياض' : 'Riyadh'}
                                    className={isArabic ? 'text-right' : 'text-left'}
                                    dir={dir}
                                />
                                <span className="text-rose-500 field-error text-sm error-location">&nbsp;</span>
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

                        {/* Case Study Editor */}
                        <div className={isArabic ? 'text-right' : 'text-left'}>
                            <Label>{isArabic ? 'دراسة الحالة' : 'Case Study'}</Label>
                            <div dir={dir} key={`case-editor-${lang}`}>
                                <JoditEditor
                                    ref={caseStudyEditorRef}
                                    value={caseStudy}
                                    config={editorConfig}
                                    onBlur={handleCaseStudyChange}
                                />
                            </div>
                            <span className="text-rose-500 field-error text-sm error-caseStudy">&nbsp;</span>
                        </div>

                        {/* Submit Button */}
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin ml-2" />
                                    {isArabic ? 'جاري التحديث...' : 'Updating...'}
                                </>
                            ) : (
                                isArabic ? 'تحديث المشروع' : 'Update Project'
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

export default ProjectUpdate;