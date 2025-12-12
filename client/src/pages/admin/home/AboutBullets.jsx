import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/admin/ui/card";
import { ChevronLeft, Loader2 } from "lucide-react";
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
} from "@/components/admin/ui/alert-dialog";
import { ASSETS_URL } from '@/lib/utils';
import { Textarea } from '@/components/admin/ui/textarea';
import { Tabs, TabsList, TabsTrigger } from '@/components/admin/ui/tabs';
import { Edit, Trash2 } from 'lucide-react';

const HomeAboutBullets = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const lang = searchParams.get('lang') || 'en';
    const isArabic = lang === 'ar';
    const dir = isArabic ? 'rtl' : 'ltr';    

    const [bullets, setBullets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formLoading, setFormLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    // Fetch bullets list - sirf jab language change ho
    useEffect(() => {
        fetchBullets();
    }, [lang, submitting]);

    // Handle edit when ID or language changes
    useEffect(() => {
        if (id) {
            handleEdit(id);
        } else {
            setEditingItem(null);
        }
    }, [id, lang]);

    const fetchBullets = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get(`/admin/home/about/bullet/list?lang=${lang}`);
            setBullets(res.data.bullets || []);
        } catch (err) {
            toast.error("Failed to load bullets");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        
        const url = editingItem
            ? `/admin/home/about/bullet/update/${editingItem.id}`
            : `/admin/home/about/bullet/insert`;
        
        try {
            const response = await handleFormSubmission(e, url);
            
            if (!editingItem && response?.bullet) {
                navigate(`/admin/home/about/bullets/${response.bullet.id}?lang=ar`);
                toast.success("Bullet added! You can now add Arabic translation.");
            } else if (editingItem) {
                await fetchBullets();
                // Data ko refresh karo same page par
                // await handleEdit(editingItem.id);
            }
            
        } catch (err) {
            toast.error("Failed to save bullet");
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = async (itemId) => {
        setFormLoading(true);
        try {
            const response = await axiosInstance.get(`/admin/home/about/bullet/update/${itemId}?lang=${lang}`);
            setEditingItem(response.data.bullet);
        } catch (err) {
            toast.error("Failed to fetch data.");
        } finally {
            setFormLoading(false);
        }
    };

    const handleCancel = () => {
        setEditingItem(null);
        navigate(`/admin/home/about/bullets?lang=${lang}`);
    };

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/admin/home/about/bullet/delete/${deleteId}`);
            toast.success("Bullet deleted successfully");
            
            if (editingItem && editingItem.id === deleteId) {
                setEditingItem(null);
                navigate(`/admin/home/about/bullets?lang=${lang}`);
            }
            
            await fetchBullets();
            setOpen(false);
            setDeleteId(null);
        } catch (err) {
            toast.error("Deletion failed.");
        }
    };

    // Debug: editingItem change hone par console mein dekho
    useEffect(() => {
        console.log("EditingItem State Updated:", editingItem);
    }, [editingItem]);

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-700">
                    Home About Bullets
                </h1>
                <Button variant="outline" onClick={() => navigate("/admin/home/about?lang=en")}>
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back to Home About
                </Button>
            </div>

            {/* Language Tabs */}
            <div className="flex justify-center">
                <Tabs value={lang} className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger 
                            value="en" 
                            onClick={() => id ? navigate(`/admin/home/about/bullets/${id}?lang=en`) : navigate(`/admin/home/about/bullets?lang=en`)}
                        >
                            English
                        </TabsTrigger>
                        <TabsTrigger 
                            value="ar" 
                            onClick={() => id ? navigate(`/admin/home/about/bullets/${id}?lang=ar`) : navigate(`/admin/home/about/bullets?lang=ar`)}
                        >
                            العربية
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {/* Form Card */}
            <Card>
                <CardHeader>
                    <CardTitle>
                        {editingItem ? "Edit" : "Add New"} Bullet
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
                            <span className="ml-2">Loading form data...</span>
                        </div>
                    ) : (
                        <form 
                            key={`bullet-form-${id}-${lang}-${editingItem?.title}`}
                            className="space-y-4" 
                            onSubmit={handleSubmit} 
                            encType="multipart/form-data"
                        > 
                            <input type="hidden" name="lang" value={lang} />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Title */}
                                <div className={isArabic ? 'text-right' : 'text-left'}>
                                    <Label htmlFor="title">{isArabic ? 'العنوان' : 'Title'}</Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        defaultValue={editingItem?.title || ''}
                                        placeholder={isArabic ? 'عنوان النقطة' : 'Bullet Title'}
                                        className={isArabic ? 'text-right' : 'text-left'}
                                        dir={dir}
                                    />
                                    <span className="text-rose-500 field-error text-sm error-title">&nbsp;</span>
                                </div>

                                {/* Image */}
                                <div className={isArabic ? 'text-right' : 'text-left'}>
                                    <Label htmlFor="image">{isArabic ? 'الصورة' : 'Image'}</Label>
                                    <Input
                                        id="image"
                                        name="image"
                                        type="file"
                                        className={isArabic ? 'text-right' : 'text-left'}
                                        dir={dir}
                                    />
                                    <span className="text-rose-500 field-error text-sm error-image">&nbsp;</span>
                                    {editingItem?.image && (
                                        <div className="mt-2">
                                            <img 
                                                src={`${ASSETS_URL}/${editingItem.image}`} 
                                                alt="Current" 
                                                className="w-20 h-20 object-cover rounded border"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Current image</p>
                                        </div>
                                    )}                                
                                </div>                            
                            </div>

                            {/* Description */}
                            <div className={isArabic ? 'text-right' : 'text-left'}>
                                <Label htmlFor="description">{isArabic ? 'الوصف' : 'Description'}</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    defaultValue={editingItem?.description || ''}
                                    placeholder={isArabic ? 'وصف النقطة' : 'Bullet Description'}
                                    className={isArabic ? 'text-right h-16' : 'text-left h-16'}
                                    dir={dir}
                                />
                                <span className="text-rose-500 field-error text-sm error-description">&nbsp;</span>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-2">
                                <Button type="submit" disabled={submitting}>
                                    {submitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                            {isArabic ? 'جاري الحفظ...' : 'Saving...'}
                                        </>
                                    ) : (
                                        editingItem 
                                            ? (isArabic ? 'تحديث النقطة' : 'Update Bullet')
                                            : (isArabic ? 'إضافة نقطة' : 'Add Bullet')
                                    )}
                                </Button>
                                
                                {editingItem && (
                                    <Button 
                                        type="button" 
                                        variant="outline" 
                                        onClick={handleCancel}
                                    >
                                        {isArabic ? 'إلغاء' : 'Cancel'}
                                    </Button>
                                )}
                            </div>
                        </form>
                    )}
                </CardContent>
            </Card>

            {/* Bullets List */}
            <Card>
                <CardHeader>
                    <CardTitle>
                        Bullets List 
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="w-6 h-6 animate-spin" />
                        </div>
                    ) : bullets.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">
                            No bullets added yet
                        </p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Image</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {bullets.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">{item.id}</TableCell>
                                        <TableCell>{item.title || 'N/A'}</TableCell>
                                        <TableCell>
                                            <div className="max-w-xs truncate">
                                                {item.description || 'N/A'}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {item.image ? (
                                                <img
                                                    src={`${ASSETS_URL}/${item.image}`}
                                                    alt={item.title}
                                                    className="w-10 object-cover rounded"
                                                />
                                            ) : (
                                                'No Image'
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button 
                                                size="icon" 
                                                variant="ghost" 
                                                onClick={() => navigate(`/admin/home/about/bullets/${item.id}?lang=en`)}
                                                title="Edit"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                onClick={() => {
                                                    setDeleteId(item.id);
                                                    setOpen(true);
                                                }}
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4 text-red-500" />
                                            </Button>                                           
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the bullet and remove its data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>            
        </div>
    );
};

export default HomeAboutBullets;