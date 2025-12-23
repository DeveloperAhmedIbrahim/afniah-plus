import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/admin/ui/card";
import { ChevronLeft, PlusCircle, Edit, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/admin/ui/button";
import { useNavigate, useParams } from "react-router-dom";
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

const HomeHeroGallery = () => {
  const navigate = useNavigate();
  const { projectId } = useParams(); // Note: not used in current code, but kept for future

  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Get current language from URL (fallback to 'en')
  const searchParams = new URLSearchParams(window.location.search);
  const lang = searchParams.get('lang') || 'en';
  const isArabic = lang === 'ar';
  const dir = isArabic ? 'rtl' : 'ltr';

  useEffect(() => {
    fetchGallery();
  }, [submitting]);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/admin/home/hero/gallery/list?lang=${lang}`);
      setGalleryItems(res.data.gallery || []);
    } catch (err) {
      toast.error(isArabic ? 'فشل تحميل معرض الصور' : 'Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setLoading(true);

    const url = editingItem
      ? `/admin/home/hero/gallery/update/${editingItem.id}`
      : `/admin/home/hero/gallery/insert`;

    try {
      await handleFormSubmission(e, url);
      toast.success(isArabic ? 'تم الحفظ بنجاح' : 'Image saved successfully');
      
      if (editingItem) {
        setEditingItem(null);
      }
      fetchGallery();
    } catch (err) {
      toast.error(isArabic ? 'فشل الحفظ' : 'Failed to save image');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/admin/home/hero/gallery/delete/${deleteId}`);
      toast.success(isArabic ? 'تم الحذف بنجاح' : 'Image deleted successfully');
      fetchGallery();
    } catch (err) {
      toast.error(isArabic ? 'فشل الحذف' : 'Deletion failed');
    } finally {
      setOpen(false);
      setDeleteId(null);
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  return (
    <div className="space-y-6 p-6" dir={dir}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-700">
          {isArabic ? 'معرض صور الهيرو الرئيسي' : 'Home Hero Gallery'}
        </h1>
        <Button
          variant="outline"
          onClick={() => navigate(`/admin/home/hero?lang=${lang}`)}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          {isArabic ? 'العودة إلى قسم الهيرو' : 'Back to Hero Section'}
        </Button>
      </div>

      {/* Add / Edit Form */}
      <Card>
        <CardHeader>
          <CardTitle>
            {editingItem
              ? (isArabic ? 'تعديل الصورة' : 'Edit Gallery Image')
              : (isArabic ? 'إضافة صورة جديدة' : 'Add New Gallery Image')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="gallery-image">
                {isArabic ? 'الصورة' : 'Image'}
                {editingItem && (
                  <span className="text-xs text-gray-500 mr-2">
                    ({isArabic ? 'الحالية موجودة' : 'Current exists'})
                  </span>
                )}
              </Label>
              <Input
                id="gallery-image"
                name="image"
                type="file"
                accept="image/*"
                className={isArabic ? 'text-right' : 'text-left'}
              />
              <span className="text-rose-500 field-error text-sm error-image">&nbsp;</span>

              {editingItem?.image && (
                <div className="mt-4">
                  <img
                    src={`${ASSETS_URL}/${editingItem.image}`}
                    alt="Current gallery image"
                    className="w-40 h-32 object-cover rounded border shadow-sm"
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

            <div className="flex flex-wrap gap-3">
              <Button type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    {isArabic ? 'جاري الحفظ...' : 'Saving...'}
                  </>
                ) : (
                  editingItem
                    ? (isArabic ? 'تحديث الصورة' : 'Update Image')
                    : (isArabic ? 'إضافة الصورة' : 'Add Image')
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
        </CardContent>
      </Card>

      {/* Gallery List */}
      <Card>
        <CardHeader>
          <CardTitle>{isArabic ? 'الصور الموجودة' : 'Gallery Images'}</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : galleryItems.length === 0 ? (
            <p className="text-center text-gray-500 py-12">
              {isArabic ? 'لم يتم إضافة أي صور بعد' : 'No images added yet'}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">ID</TableHead>
                    <TableHead className="w-48">{isArabic ? 'الصورة' : 'Image'}</TableHead>
                    <TableHead className="text-right w-32">
                      {isArabic ? 'الإجراءات' : 'Actions'}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {galleryItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>
                        {item.image ? (
                          <img
                            src={`${ASSETS_URL}/${item.image}`}
                            alt={`Gallery image ${item.id}`}
                            className="w-32 h-20 object-cover rounded border shadow-sm"
                          />
                        ) : (
                          <span className="text-gray-400">No image</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleEdit(item)}
                          title={isArabic ? 'تعديل' : 'Edit'}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isArabic ? 'هل أنت متأكد تماماً؟' : 'Are you absolutely sure?'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isArabic
                ? 'هذا الإجراء لا يمكن التراجع عنه. سيتم حذف الصورة نهائياً.'
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

export default HomeHeroGallery;