import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/admin/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/admin/ui/tabs";
import { ChevronLeftIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/admin/ui/button";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { Label } from "@/components/admin/ui/label";
import { Input } from "@/components/admin/ui/input";
import JoditEditor from 'jodit-react';
import { handleFormSubmission } from '@/lib/axios';
import axiosInstance from '@/lib/axios';
import { toast } from 'sonner';
import { ASSETS_URL, clearFormErrors } from '@/lib/utils';
import { Switch } from "@/components/admin/ui/switch";


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
    const [showOnHome, setShowOnHome] = useState(false);


    const editorConfig = useMemo(() => ({
        readonly: false,
        placeholder: isArabic ? 'ابدأ الكتابة...' : 'Start typing...',
        direction: dir,
        language: isArabic ? 'ar' : 'en',
        height: 400,
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

    const handleCaseStudyChange = useCallback((newContent) => {
        setCaseStudy(newContent);
    }, []);

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
                setShowOnHome(Boolean(data?.show_on_home));
                
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
                <span className="mx-2">Loading project data</span>
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
                        <input type="hidden" name="showOnHome" value={showOnHome ? 1 : 0} />

                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

                            {/* Category */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="category">{isArabic ? 'الفئة' : 'Category'}</Label>
                                <Input
                                    id="category"
                                    name="category"
                                    defaultValue={project?.category || ''}
                                    key={`title-${lang}-${project?.category}`}
                                    placeholder={isArabic ? 'الفئة' : 'Category'}
                                    className={isArabic ? 'text-right' : 'text-left'}
                                    dir={dir}
                                />
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

                            {/* Featured Image */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="featuredImage">{isArabic ? 'صورة الغلاف' : 'Featured Image'}</Label>
                                <Input id="featuredImage" name="featuredImage" type="file" />
                                {project?.featured_image && (
                                    <div className="mt-2">
                                        <img 
                                            src={ASSETS_URL+'/'+project.featured_image} 
                                            alt="Current" 
                                            className="w-32 h-32 object-cover rounded border"
                                        />
                                        <p className="text-sm text-gray-500 mt-1">Current Image</p>
                                    </div>
                                )}
                                <span className="text-rose-500 field-error text-sm error-featuredImage">&nbsp;</span>
                            </div>

                            {/* Banner Image */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="bannerImage">{isArabic ? 'صورة البانر' : 'Banner Image'}</Label>
                                <Input id="bannerImage" name="bannerImage" type="file" />
                                {project?.banner_image && (
                                    <div className="mt-2">
                                        <img 
                                            src={ASSETS_URL+'/'+project.banner_image} 
                                            alt="Current" 
                                            className="w-32 h-32 object-cover rounded border"
                                        />
                                        <p className="text-sm text-gray-500 mt-1">Current Image</p>
                                    </div>
                                )}
                                <span className="text-rose-500 field-error text-sm error-bannerImage">&nbsp;</span>
                            </div>

                            {/* Case Study Image */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="caseStudyImage">{isArabic ? 'صورة دراسة الحالة' : 'Case Study Image'}</Label>
                                <Input id="caseStudyImage" name="caseStudyImage" type="file" />
                                {project?.case_study_image && (
                                    <div className="mt-2">
                                        <img 
                                            src={ASSETS_URL+'/'+project.case_study_image} 
                                            alt="Current" 
                                            className="w-32 h-32 object-cover rounded border"
                                        />
                                        <p className="text-sm text-gray-500 mt-1">Current Image</p>
                                    </div>
                                )}
                                <span className="text-rose-500 field-error text-sm error-caseStudyImage">&nbsp;</span>
                            </div>                                                                                    
                        </div>

                        {/* Show on Home */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label>
                                    <div className='mb-2'>{isArabic ? 'إظهار في الصفحة الرئيسية' : 'Show on Home'}</div>
                                    <Switch
                                        checked={showOnHome}
                                        onCheckedChange={setShowOnHome}
                                        className="data-[state=checked]:bg-green-primary"
                                    />

                                </Label>
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