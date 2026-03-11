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
    const scopeEditorRef = useRef(null);
    const impactEditorRef = useRef(null);

    const [description, setDescription] = useState('');
    const [caseStudy, setCaseStudy] = useState('');
    const [scopeOfProject, setScopeOfProject] = useState('');
    const [projectImpact, setProjectImpact] = useState('');
    const [project, setProject] = useState(null);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [showOnHome, setShowOnHome] = useState(false);
    const [showScopeImage, setShowScopeImage] = useState(false);
    const [showImpactImage, setShowImpactImage] = useState(false);

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

    const handleScopeChange = useCallback((newContent) => {
        setScopeOfProject(newContent);
    }, []);

    const handleImpactChange = useCallback((newContent) => {
        setProjectImpact(newContent);
    }, []);

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
                setScopeOfProject(data.scope || '');
                setProjectImpact(data.impact || '');
                setShowOnHome(Boolean(data?.show_on_home));
                setShowScopeImage(Boolean(data?.scope_image));
                setShowImpactImage(Boolean(data?.impact_image));

            } catch (error) {
                console.error('Fetch Error:', error);
                toast.error('Failed to load project data');
            } finally {
                setFetchLoading(false);
            }
        };

        fetchProject();
    }, [id, lang]);

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
                        <input type="hidden" name="scopeOfProject" value={scopeOfProject} />
                        <input type="hidden" name="projectImpact" value={projectImpact} />
                        <input type="hidden" name="showOnHome" value={showOnHome ? 1 : 0} />
                        <input type="hidden" name="showScopeImage" value={showScopeImage ? 1 : 0} />
                        <input type="hidden" name="showImpactImage" value={showImpactImage ? 1 : 0} />

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

                        {/* ── Scope of Project ── */}
                        <hr className="border-gray-200" />

                        <div className="space-y-4">
                            {/* Section Header + Image Toggle */}
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-700">
                                    {isArabic ? 'نطاق المشروع' : 'Scope of Project'}
                                </h2>
                                <Label className="flex items-center gap-2 cursor-pointer">
                                    <span className="text-sm text-gray-600">
                                        {isArabic ? 'إضافة صورة' : 'Add Image'}
                                    </span>
                                    <Switch
                                        checked={showScopeImage}
                                        onCheckedChange={setShowScopeImage}
                                        className="data-[state=checked]:bg-green-primary"
                                    />
                                </Label>
                            </div>

                            {/* Scope Description Editor */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label>{isArabic ? 'الوصف' : 'Description'}</Label>
                                <div dir={dir} key={`scope-editor-${lang}`}>
                                    <JoditEditor
                                        ref={scopeEditorRef}
                                        value={scopeOfProject}
                                        config={editorConfig}
                                        onBlur={handleScopeChange}
                                    />
                                </div>
                                <span className="text-rose-500 field-error text-sm error-scopeOfProject">&nbsp;</span>
                            </div>

                            {/* Scope Image (optional) */}
                            {showScopeImage && (
                                <div className={isArabic ? 'text-right' : 'text-left'}>
                                    <Label htmlFor="scopeImage">
                                        {isArabic ? 'صورة نطاق المشروع' : 'Scope of Project Image'}
                                    </Label>
                                    <Input id="scopeImage" name="scopeImage" type="file" />
                                    {project?.scope_image && (
                                        <div className="mt-2">
                                            <img
                                                src={ASSETS_URL+'/'+project.scope_image}
                                                alt="Current"
                                                className="w-32 h-32 object-cover rounded border"
                                            />
                                            <p className="text-sm text-gray-500 mt-1">Current Image</p>
                                        </div>
                                    )}
                                    <span className="text-rose-500 field-error text-sm error-scopeImage">&nbsp;</span>
                                </div>
                            )}
                        </div>

                        {/* ── Project Impact ── */}
                        <hr className="border-gray-200" />

                        <div className="space-y-4">
                            {/* Section Header + Image Toggle */}
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-700">
                                    {isArabic ? 'أثر المشروع' : 'Project Impact'}
                                </h2>
                                <Label className="flex items-center gap-2 cursor-pointer">
                                    <span className="text-sm text-gray-600">
                                        {isArabic ? 'إضافة صورة' : 'Add Image'}
                                    </span>
                                    <Switch
                                        checked={showImpactImage}
                                        onCheckedChange={setShowImpactImage}
                                        className="data-[state=checked]:bg-green-primary"
                                    />
                                </Label>
                            </div>

                            {/* Impact Description Editor */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label>{isArabic ? 'الوصف' : 'Description'}</Label>
                                <div dir={dir} key={`impact-editor-${lang}`}>
                                    <JoditEditor
                                        ref={impactEditorRef}
                                        value={projectImpact}
                                        config={editorConfig}
                                        onBlur={handleImpactChange}
                                    />
                                </div>
                                <span className="text-rose-500 field-error text-sm error-projectImpact">&nbsp;</span>
                            </div>

                            {/* Impact Image (optional) */}
                            {showImpactImage && (
                                <div className={isArabic ? 'text-right' : 'text-left'}>
                                    <Label htmlFor="impactImage">
                                        {isArabic ? 'صورة أثر المشروع' : 'Project Impact Image'}
                                    </Label>
                                    <Input id="impactImage" name="impactImage" type="file" />
                                    {project?.impact_image && (
                                        <div className="mt-2">
                                            <img
                                                src={ASSETS_URL+'/'+project.impact_image}
                                                alt="Current"
                                                className="w-32 h-32 object-cover rounded border"
                                            />
                                            <p className="text-sm text-gray-500 mt-1">Current Image</p>
                                        </div>
                                    )}
                                    <span className="text-rose-500 field-error text-sm error-impactImage">&nbsp;</span>
                                </div>
                            )}
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