import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/admin/ui/card";
import { ChevronLeft, Edit, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/admin/ui/button";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Label } from "@/components/admin/ui/label";
import { Input } from "@/components/admin/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/admin/ui/table";
import axiosInstance, { handleFormSubmission } from '@/lib/axios.js';
import { toast } from 'sonner';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/admin/ui/alert-dialog"
import { ASSETS_URL } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from '@/components/admin/ui/tabs';

const ProjectGallery = () => {
    const { projectId, itemId } = useParams();  // itemId ko yahan destructure kar liya
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const lang = searchParams.get('lang') || 'en';
    const isArabic = lang === 'ar';
    const dir = isArabic ? 'rtl' : 'ltr';

    const [galleryItems, setGalleryItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formLoading, setFormLoading] = useState(false);  // Form ke liye alag loading state
    const [submitting, setSubmitting] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    // Fetch gallery list
    useEffect(() => {
        fetchGallery();
    }, [projectId, submitting, lang]);

    // Handle edit mode when itemId or language changes
    useEffect(() => {
        if (itemId) {
            handleEdit(itemId);
        } else {
            setEditingItem(null);
        }
    }, [itemId, lang]);

    const fetchGallery = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get(`/admin/project/${projectId}/gallery?lang=${lang}`);
            setGalleryItems(res.data.gallery || []);
        } catch (err) {
            toast.error("Failed to load gallery");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        
        const url = editingItem
            ? `/admin/project/${projectId}/gallery/update/${editingItem.id}`
            : `/admin/project/${projectId}/gallery/insert`;
        
        try {
            const response = await handleFormSubmission(e, url);
            
            if (!editingItem && response?.gallery) {
                // After adding new item → go to edit its Arabic version
                navigate(`/admin/project/${projectId}/gallery/${response.gallery.id}?lang=ar`);
            } else if (editingItem) {
                await fetchGallery();
            }
        } catch (err) {
            toast.error('Failed to save gallery item');
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = async (itemId) => {
        setFormLoading(true);  // List loading nahi, sirf form loading
        try {
            const response = await axiosInstance.get(`/admin/project/${projectId}/gallery/update/${itemId}?lang=${lang}`);
            setEditingItem(response.data.gallery);
        } catch (err) {
            toast.error('Failed to fetch gallery data');
        } finally {
            setFormLoading(false);
        }
    };

    const handleCancel = () => {
        setEditingItem(null);
        navigate(`/admin/project/${projectId}/gallery?lang=${lang}`);
    };

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/admin/project/${projectId}/gallery/delete/${deleteId}`);
            toast.success("Deleted");
            
            // Agar currently editing item delete ho raha hai to cancel kar do
            if (editingItem && editingItem.id === deleteId) {
                setEditingItem(null);
                navigate(`/admin/project/${projectId}/gallery?lang=${lang}`);
            }
            
            await fetchGallery();
        } catch (err) {
            toast.error("Deletion failed.");
        } finally {
            setOpen(false);
            setDeleteId(null);
        }
    };

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className={`text-2xl text-gray-600 flex items-center gap-2`}>
                    Projects - <span className='text-green-primary'>Gallery</span> - Projects Page
                    <span className="text-gray-500 text-xl">({lang.toUpperCase()})</span>
                </h1>
                <Button variant="outline" onClick={() => navigate(`/admin/project/list?lang=${lang}`)}>
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back to Projects
                </Button>
            </div>

            {/* Language Tabs */}
            <div className="flex justify-center" dir={dir}>
                <Tabs value={lang} className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger
                            value="en"
                            onClick={() => navigate(itemId ? `/admin/project/${projectId}/gallery/${itemId}?lang=en` : `/admin/project/${projectId}/gallery?lang=en`)}
                        >
                            English
                        </TabsTrigger>
                        <TabsTrigger
                            value="ar"
                            onClick={() => navigate(itemId ? `/admin/project/${projectId}/gallery/${itemId}?lang=ar` : `/admin/project/${projectId}/gallery?lang=ar`)}
                        >
                            العربية
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {/* Add / Edit Form */}
            <Card>
                <CardHeader>
                    <CardTitle className={isArabic ? 'text-right' : 'text-left'}>
                        {editingItem
                            ? (isArabic ? 'تعديل' : 'Edit')
                            : (isArabic ? 'إضافة جديد' : 'Add New')
                        } {isArabic ? 'صورة المعرض' : 'Gallery Image'}
                        {editingItem && (
                            <span className="text-sm font-normal text-gray-500 ml-2">
                                (ID: {editingItem.id})
                            </span>
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent dir={dir}>
                    {formLoading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="w-6 h-6 animate-spin" />
                            <span className="mx-2">Loading form data...</span>
                        </div>
                    ) : (
                        <form
                            key={`gallery-form-${itemId}-${lang}-${editingItem?.id || 'new'}`}
                            onSubmit={handleSubmit}
                            className="space-y-4"
                            encType="multipart/form-data"
                        >
                            <input type="hidden" name="project_id" value={projectId} />
                            <input type="hidden" name="lang" value={lang} />
                            
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div className={isArabic ? 'text-right' : 'text-left'}>
                                    <Label htmlFor="gallery-title">{isArabic ? 'عنوان الصورة' : 'Image Title'}</Label>
                                    <Input
                                        id="gallery-title"
                                        name="title"
                                        placeholder={isArabic ? 'أدخل العنوان (اختياري)' : 'Enter title (optional)'}
                                        defaultValue={editingItem?.title || ''}
                                        className={isArabic ? 'text-right' : 'text-left'}
                                        dir={dir}
                                    />
                                    <span className="text-rose-500 field-error text-sm error-title">&nbsp;</span>
                                </div>

                                <div className={isArabic ? 'text-right' : 'text-left'}>
                                    <Label htmlFor="gallery-image">{isArabic ? 'الصورة' : 'Image'}</Label>
                                    <Input
                                        id="gallery-image"
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        className={isArabic ? 'text-right' : 'text-left'}
                                        dir={dir}
                                    />
                                    <span className="text-rose-500 field-error text-sm error-image">&nbsp;</span>
                                    {editingItem?.image && (
                                        <div className="mt-4">
                                            <img
                                                src={`${ASSETS_URL}/${editingItem.image}`}
                                                alt={editingItem.title || 'Gallery image'}
                                                className="w-32 h-32 object-cover rounded border shadow-sm"
                                            />
                                            <p className="text-sm text-gray-500 mt-2">
                                                {isArabic ? 'الصورة الحالية:' : 'Current image:'}
                                                <span className="font-medium ml-1 break-all">
                                                    {editingItem.image}
                                                </span>
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button type="submit" disabled={submitting}>
                                    {submitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                            {isArabic ? 'جاري الحفظ...' : 'Saving...'}
                                        </>
                                    ) : (
                                        editingItem
                                            ? (isArabic ? 'تحديث' : 'Update')
                                            : (isArabic ? 'إضافة صورة' : 'Add Image')
                                    )}
                                </Button>
                                {editingItem && (
                                    <Button type="button" variant="outline" onClick={handleCancel}>
                                        {isArabic ? 'إلغاء' : 'Cancel'}
                                    </Button>
                                )}
                            </div>
                        </form>
                    )}
                </CardContent>
            </Card>

            {/* Gallery List */}
            <Card>
                <CardHeader>
                    <CardTitle className={isArabic ? 'text-right' : 'text-left'}>
                        {isArabic ? 'صور المعرض' : 'Gallery Images'}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : galleryItems.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">
                            {isArabic ? 'لم يتم إضافة صور بعد' : 'No images added yet'}
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-16">ID</TableHead>
                                        <TableHead>Title</TableHead>
                                        <TableHead className="w-32">Image</TableHead>
                                        <TableHead className="text-right w-32">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {galleryItems.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-medium">{item.id}</TableCell>
                                            <TableCell>{item.title || "—"}</TableCell>
                                            <TableCell>
                                                {item.image ? (
                                                    <img
                                                        src={`${ASSETS_URL}/${item.image}`}
                                                        alt={item.title || 'Gallery image'}
                                                        className="w-16 h-16 object-cover rounded border"
                                                    />
                                                ) : (
                                                    <span className="text-gray-400 text-sm">—</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right space-x-1">
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={() => navigate(`/admin/project/${projectId}/gallery/${item.id}?lang=${lang}`)}
                                                    title={isArabic ? 'تعديل' : 'Edit'}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => {
                                                        setDeleteId(item.id);
                                                        setOpen(true);
                                                    }}
                                                    title={isArabic ? 'حذف' : 'Delete'}
                                                >
                                                    <Trash2 className="h-4 w-4 text-red-600" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Delete Confirmation */}
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {isArabic ? 'هل أنت متأكد تماماً؟' : 'Are you absolutely sure?'}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {isArabic
                                ? 'لا يمكن التراجع عن هذا الإجراء. سيؤدي هذا إلى حذف الصورة نهائياً.'
                                : 'This action cannot be undone. This will permanently delete the image.'}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>{isArabic ? 'إلغاء' : 'Cancel'}</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {isArabic ? 'حذف' : 'Delete'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default ProjectGallery;