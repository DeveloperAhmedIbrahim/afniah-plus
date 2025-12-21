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

const AboutTeamGallery = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const lang = searchParams.get('lang') || 'en';
    const isArabic = lang === 'ar';
    const dir = isArabic ? 'rtl' : 'ltr';    

    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formLoading, setFormLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    // Fetch members list - sirf jab language change ho
    useEffect(() => {
        fetchMembers();
    }, [lang, submitting]);

    // Handle edit when ID or language changes
    useEffect(() => {
        if (id) {
            handleEdit(id);
        } else {
            setEditingItem(null);
        }
    }, [id, lang]);

    const fetchMembers = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get(`/admin/about/team/gallery/list?lang=${lang}`);
            setMembers(res.data.gallery || []);
        } catch (err) {
            toast.error("Failed to load members");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        
        const url = editingItem
            ? `/admin/about/team/gallery/update/${editingItem.id}`
            : `/admin/about/team/gallery/insert`;
        
        try {
            const response = await handleFormSubmission(e, url);
            
            if (!editingItem && response?.member) {
                navigate(`/admin/about/team/gallery/${response.member.id}?lang=ar`);
                toast.success("Member added! You can now add Arabic translation.");
            } else if (editingItem) {
                await fetchMembers();
                // Data ko refresh karo same page par
                // await handleEdit(editingItem.id);
            }
            
        } catch (err) {
            toast.error("Failed to save member");
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = async (itemId) => {
        setFormLoading(true);
        try {
            const response = await axiosInstance.get(`/admin/about/team/gallery/update/${itemId}?lang=${lang}`);
            setEditingItem(response.data.gallery);
        } catch (err) {
            toast.error("Failed to fetch data.");
        } finally {
            setFormLoading(false);
        }
    };

    const handleCancel = () => {
        setEditingItem(null);
        navigate(`/admin/about/team/gallery?lang=${lang}`);
    };

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/admin/about/team/gallery/delete/${deleteId}`);
            toast.success("Member deleted successfully");
            
            if (editingItem && editingItem.id === deleteId) {
                setEditingItem(null);
                navigate(`/admin/about/team/gallery?lang=${lang}`);
            }
            
            await fetchMembers();
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
                    About Team Gallery
                </h1>
                <Button variant="outline" onClick={() => navigate("/admin/about/team?lang=en")}>
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back to About Team
                </Button>
            </div>

            {/* Language Tabs */}
            <div className="flex justify-center">
                <Tabs value={lang} className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger 
                            value="en" 
                            onClick={() => id ? navigate(`/admin/about/team/gallery/${id}?lang=en`) : navigate(`/admin/about/team/gallery?lang=en`)}
                        >
                            English
                        </TabsTrigger>
                        <TabsTrigger 
                            value="ar" 
                            onClick={() => id ? navigate(`/admin/about/team/gallery/${id}?lang=ar`) : navigate(`/admin/about/team/gallery?lang=ar`)}
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
                        {editingItem ? "Edit" : "Add New"} Member
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
                            key={`member-form-${id}-${lang}-${editingItem?.title}`}
                            className="space-y-4" 
                            onSubmit={handleSubmit} 
                            encType="multipart/form-data"
                        > 
                            <input type="hidden" name="lang" value={lang} />

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Name */}
                                <div className={isArabic ? 'text-right' : 'text-left'}>
                                    <Label htmlFor="name">{isArabic ? 'الاسم' : 'Name'}</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        defaultValue={editingItem?.name || ''}
                                        placeholder={isArabic ? 'اسم النقطة' : 'Member Name'}
                                        className={isArabic ? 'text-right' : 'text-left'}
                                        dir={dir}
                                    />
                                    <span className="text-rose-500 field-error text-sm error-name">&nbsp;</span>
                                </div>

                                {/* Designation */}
                                <div className={isArabic ? 'text-right' : 'text-left'}>
                                    <Label htmlFor="designation">{isArabic ? 'المسمى الوظيفي' : 'Designation'}</Label>
                                    <Input
                                        id="designation"
                                        name="designation"
                                        defaultValue={editingItem?.designation || ''}
                                        placeholder={isArabic ? 'اسم المسمى الوظيفي' : 'Member Designation'}
                                        className={isArabic ? 'text-right' : 'text-left'}
                                        dir={dir}
                                    />
                                    <span className="text-rose-500 field-error text-sm error-designation">&nbsp;</span>
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
                                            ? (isArabic ? 'تحديث النقطة' : 'Update Member')
                                            : (isArabic ? 'إضافة نقطة' : 'Add Member')
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

            {/* Members List */}
            <Card>
                <CardHeader>
                    <CardTitle>
                        Members List 
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="w-6 h-6 animate-spin" />
                        </div>
                    ) : members.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">
                            No members added yet
                        </p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Designation</TableHead>
                                    <TableHead>Image</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {members.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">{item.id}</TableCell>
                                        <TableCell>{item.name || 'N/A'}</TableCell>
                                        <TableCell>
                                            <div className="max-w-xs truncate">
                                                {item.designation || 'N/A'}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {item.image ? (
                                                <img
                                                    src={`${ASSETS_URL}/${item.image}`}
                                                    alt={item.name}
                                                    className="w-20 object-cover rounded"
                                                />
                                            ) : (
                                                'No Image'
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button 
                                                size="icon" 
                                                variant="ghost" 
                                                onClick={() => navigate(`/admin/about/team/gallery/${item.id}?lang=en`)}
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
                            This action cannot be undone. This will permanently delete the member and remove its data from our servers.
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

export default AboutTeamGallery;