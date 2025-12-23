import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/admin/ui/card";
import { ChevronLeft, Loader2, Edit, Trash2 } from "lucide-react";
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

  // Fetch list when language or submit changes
  useEffect(() => {
    fetchBullets();
  }, [lang, submitting]);

  // Handle edit mode when id or language changes
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
      toast.error(isArabic ? 'فشل تحميل النقاط' : 'Failed to load bullets');
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
        // After adding new item → go to edit its Arabic version
        navigate(`/admin/home/about/bullets/${response.bullet.id}?lang=ar`);
        toast.success(isArabic ? 'تمت الإضافة! يمكنك الآن إضافة الترجمة العربية.' : 'Bullet added! Now you can add Arabic translation.');
      } else if (editingItem) {
        await fetchBullets();
        toast.success(isArabic ? 'تم التحديث بنجاح' : 'Bullet updated successfully');
      }
    } catch (err) {
      toast.error(isArabic ? 'فشل الحفظ' : 'Failed to save bullet');
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
      toast.error(isArabic ? 'فشل جلب البيانات' : 'Failed to fetch bullet data');
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
      toast.success(isArabic ? 'تم حذف النقطة بنجاح' : 'Bullet deleted successfully');

      if (editingItem && editingItem.id === deleteId) {
        setEditingItem(null);
        navigate(`/admin/home/about/bullets?lang=${lang}`);
      }

      await fetchBullets();
    } catch (err) {
      toast.error(isArabic ? 'فشل الحذف' : 'Failed to delete bullet');
    } finally {
      setOpen(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-gray-700">
          Update About Section - <span className='text-green-primary'>Bullets</span> - Home Page
          <span className="text-gray-500 text-xl">({lang.toUpperCase()})</span>         
        </h1>
        <Button
          variant="outline"
          onClick={() => navigate(`/admin/home/about?lang=${lang}`)}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to About Section
        </Button>
      </div>

      {/* Language Switch */}
      <div className="flex justify-center">
        <Tabs value={lang} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="en"
              onClick={() => navigate(id ? `/admin/home/about/bullets/${id}?lang=en` : `/admin/home/about/bullets?lang=en`)}
            >
              English
            </TabsTrigger>
            <TabsTrigger
              value="ar"
              onClick={() => navigate(id ? `/admin/home/about/bullets/${id}?lang=ar` : `/admin/home/about/bullets?lang=ar`)}
            >
              العربية
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex ${isArabic ? 'justify-end' : 'justify-start'}`}>
            {editingItem
              ? (isArabic ? 'تعديل النقطة' : 'Edit Bullet')
              : (isArabic ? 'إضافة نقطة جديدة' : 'Add New Bullet')}
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
              key={`bullet-form-${id}-${lang}-${editingItem?.id || 'new'}`}
              className="space-y-6"
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
                    placeholder={isArabic ? 'اكتب عنوان النقطة...' : 'Bullet title...'}
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
                    <div className="mt-3">
                      <img
                        src={`${ASSETS_URL}/${editingItem.image}`}
                        alt="Current bullet image"
                        className="w-24 h-24 object-cover rounded border shadow-sm"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {isArabic ? 'الصورة الحالية' : 'Current image'}
                      </p>
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
                  placeholder={isArabic ? 'اكتب وصف النقطة هنا...' : 'Bullet description...'}
                  className={`${isArabic ? 'text-right' : 'text-left'} min-h-[100px]`}
                  dir={dir}
                />
                <span className="text-rose-500 field-error text-sm error-description">&nbsp;</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
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
          <CardTitle>Bullets List</CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : bullets.length === 0 ? (
            <p className="text-center text-gray-500 py-12">
              No bullets added yet
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-32">Image</TableHead>
                    <TableHead className="text-right w-32">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bullets.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.title || '—'}</TableCell>
                      <TableCell>
                        <div className="max-w-md line-clamp-2">
                          {item.description || '—'}
                        </div>
                      </TableCell>
                      <TableCell>
                        {item.image ? (
                          <img
                            src={`${ASSETS_URL}/${item.image}`}
                            alt={item.title || 'Bullet image'}
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
                          onClick={() => navigate(`/admin/home/about/bullets/${item.id}?lang=${lang}`)}
                          title='Edit'
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
                          title='Delete'
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
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the bullet.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default HomeAboutBullets;