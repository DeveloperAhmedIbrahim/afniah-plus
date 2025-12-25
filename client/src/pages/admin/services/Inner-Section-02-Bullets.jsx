import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/admin/ui/card";
import { Loader2, Edit, Trash2 } from "lucide-react";
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

const ServiceInnerSection02Bullets = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { bulletId } = useParams();
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
  const [serviceTitle, setServiceTitle] = useState('');

  // Fetch list when language or submit changes
  useEffect(() => {
    fetchBullets();
  }, [lang, submitting]);

  // Handle edit mode when id or language changes
  useEffect(() => {
    if (bulletId) {
      handleEdit(bulletId);
    } else {
      setEditingItem(null);
    }
  }, [bulletId, lang]);

  const fetchBullets = async () => {
    setLoading(true);
    try {
        const serviceRes = await axiosInstance.get(`/admin/service/update/${id}?lang=${lang}`);
        setServiceTitle(serviceRes.data.service?.title || 'Service');
        const res = await axiosInstance.get(`/admin/service/${id}/section-02/bullet/list?lang=${lang}`);
        setBullets(res.data.bullets || []);
    } catch (err) {
      toast.error('Failed to load bullets');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const url = editingItem
      ? `/admin/service/${id}/section-02/bullet/update/${editingItem.id}`
      : `/admin/service/${id}/section-02/bullet/insert`;

    try {
      const response = await handleFormSubmission(e, url);

      if (!editingItem && response?.bullet) {
        // After adding new item → go to edit its Arabic version
        navigate(`/admin/service/${id}/section-02/bullets/${response.bullet.id}?lang=ar`);
      } else if (editingItem) {
        await fetchBullets();
      }
    } catch (err) {
      toast.error('Failed to save bullet');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async (itemId) => {
    setFormLoading(true);
    try {
      const response = await axiosInstance.get(`/admin/service/${id}/section-02/bullet/update/${itemId}?lang=${lang}`);
      setEditingItem(response.data.bullet);
    } catch (err) {
      toast.error(isArabic ? 'فشل جلب البيانات' : 'Failed to fetch bullet data');
    } finally {
      setFormLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    navigate(`/admin/service/${id}/section-02/bullets?lang=${lang}`);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/admin/service/${id}/section-02/bullet/delete/${deleteId}`);
      toast.success(isArabic ? 'تم حذف النقطة بنجاح' : 'Bullet deleted successfully');

      if (editingItem && editingItem.id === deleteId) {
        setEditingItem(null);
        navigate(`/admin/service/${id}/section-02/bullets?lang=${lang}`);
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
            <h1 className="text-2xl text-gray-700 flex items-center gap-2">
                Update <span className="text-green-primary font-semibold">{serviceTitle}</span> - Section 02 - Bullets
                <span className="text-gray-500 text-xl">({lang.toUpperCase()})</span>
            </h1>
        </div>

        <div className="flex justify-center">
            <Tabs className="w-[800px]">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger
                        value="update"
                        onClick={() => navigate(`/admin/service/update/${id}?lang=en`)}
                        className={window.location.pathname.includes(`/admin/service/update/${id}`) ? "bg-green-primary text-white" : ""}
                    >
                        {serviceTitle}
                    </TabsTrigger>
                    <TabsTrigger
                        value="section-01"
                        onClick={() => navigate(`/admin/service/${id}/section-01?lang=en`)}
                        className={window.location.pathname.includes(`/admin/service/${id}/section-01`) ? "bg-green-primary text-white" : ""}
                    >
                        Section 01
                    </TabsTrigger>
                    <TabsTrigger
                        value="section-02"
                        onClick={() => navigate(`/admin/service/${id}/section-02?lang=en`)}
                        className={window.location.pathname.includes(`/admin/service/${id}/section-02`) ? "bg-green-primary text-white" : ""}
                    >
                        Section 02
                    </TabsTrigger>  
                    <TabsTrigger
                        value="section-03"
                        onClick={() => navigate(`/admin/service/${id}/section-03?lang=en`)}
                        className={window.location.pathname.includes(`/admin/service/${id}/section-03`) ? "bg-green-primary text-white" : ""}
                    >
                        Section 03
                    </TabsTrigger>                                                
                </TabsList>
            </Tabs>
        </div>      

      {/* Language Switch */}
      <div className="flex justify-center">
        <Tabs value={lang} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="en"
              onClick={() => navigate(id ? `/admin/service/${id}/section-02/bullets/${bulletId}?lang=en` : `/admin/service/${id}/section-02/bullets?lang=en`)}
            >
              English
            </TabsTrigger>
            <TabsTrigger
              value="ar"
              onClick={() => navigate(id ? `/admin/service/${id}/section-02/bullets/${bulletId}?lang=ar` : `/admin/service/${id}/section-02/bullets?lang=ar`)}
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
              <span className="mx-2">loading form data</span>
            </div>
          ) : (
            <form
              key={`bullet-form-${id}-${lang}-${editingItem?.id || 'new'}`}
              className="space-y-6"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <input type="hidden" name="lang" value={lang} />

              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                {/* Title */}
                <div className={isArabic ? 'text-right' : 'text-left'}>
                  <Label htmlFor="title">{isArabic ? 'العنوان' : 'Title'}</Label>
                  <Input
                    id="title"
                    name="title"
                    defaultValue={editingItem?.title || ''}
                    placeholder={isArabic ? 'اكتب نص النقطة...' : 'Bullet title...'}
                    className={isArabic ? 'text-right' : 'text-left'}
                    dir={dir}
                  />
                  <span className="text-rose-500 field-error text-sm error-title">&nbsp;</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Description */}
                <div className={isArabic ? 'text-right' : 'text-left'}>
                    <Label htmlFor="description">{isArabic ? 'الوصف' : 'Description'}</Label>
                    <Textarea
                        id="description"
                        name="description"
                        defaultValue={editingItem?.description}
                        placeholder={isArabic
                            ? 'اكتب وصفًا مختصرًا للخدمة'
                            : 'Write a short description of this bullet'}
                        rows={6}
                        className={isArabic ? 'text-right' : 'text-left'}
                        dir={dir}
                        maxLength={200}
                    />
                    <span className="text-rose-500 field-error text-sm error-description">&nbsp;</span>
                </div>
                {/* Icon (SVG code) */}
                <div className={isArabic ? 'text-right' : 'text-left'}>
                    <Label htmlFor="icon">{isArabic ? 'الأيقونة (SVG)' : 'Icon (SVG code)'}</Label>
                    <Textarea
                        id="icon"
                        name="icon"
                        defaultValue={editingItem?.icon}
                        placeholder={isArabic
                            ? 'ضع كود SVG هنا'
                            : 'Paste SVG code here'}
                        rows={6}
                        className={isArabic ? 'text-right font-mono' : 'text-left font-mono'}
                        dir={dir}
                    />
                    {editingItem?.icon && editingItem?.icon.trim().startsWith('<svg') && (
                        <div className="mt-2 p-2 border rounded bg-gray-50" dangerouslySetInnerHTML={{ __html: editingItem?.icon }} />
                    )}
                    <span className="text-rose-500 field-error text-sm error-icon">&nbsp;</span>
                </div>                
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
                    <TableHead>Icon</TableHead>
                    <TableHead className="text-right w-32">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bullets.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.title || '—'}</TableCell>
                      <TableCell>{item.description || '—'}</TableCell>
                      <TableCell><span dangerouslySetInnerHTML={{__html: item.icon}}></span></TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => navigate(`/admin/service/${id}/section-02/bullets/${item.id}?lang=${lang}`)}
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

export default ServiceInnerSection02Bullets;