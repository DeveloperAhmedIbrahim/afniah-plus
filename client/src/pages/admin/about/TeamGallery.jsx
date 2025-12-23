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
import { Tabs, TabsList, TabsTrigger } from '@/components/admin/ui/tabs';

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

  // Fetch members when language or submit changes
  useEffect(() => {
    fetchMembers();
  }, [lang, submitting]);

  // Handle edit mode
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
      toast.error('Failed to load team members');
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
      } else if (editingItem) {
        await fetchMembers();
      }
    } catch (err) {
      toast.error('Failed to save member');
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
      toast.error('Failed to fetch member data');
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
      toast.success('Member deleted successfully');

      if (editingItem && editingItem.id === deleteId) {
        setEditingItem(null);
        navigate(`/admin/about/team/gallery?lang=${lang}`);
      }

      await fetchMembers();
    } catch (err) {
      toast.error('Deletion failed');
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
          Update Team Section - <span className='text-green-primary'>Gallery</span> - About Page
          <span className="text-gray-500 text-xl">({lang.toUpperCase()})</span>
        </h1>
        <Button
          variant="outline"
          onClick={() => navigate(`/admin/about/team?lang=${lang}`)}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Team Section
        </Button>
      </div>

      {/* Language Tabs */}
      <div className="flex justify-center" dir={dir}>
        <Tabs value={lang} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="en"
              onClick={() => navigate(id ? `/admin/about/team/gallery/${id}?lang=en` : `/admin/about/team/gallery?lang=en`)}
            >
              English
            </TabsTrigger>
            <TabsTrigger
              value="ar"
              onClick={() => navigate(id ? `/admin/about/team/gallery/${id}?lang=ar` : `/admin/about/team/gallery?lang=ar`)}
            >
              العربية
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle className={isArabic ? 'text-right' : 'text-left'}>
            {editingItem
              ? (isArabic ? 'تعديل عضو الفريق' : 'Edit Team Member')
              : (isArabic ? 'إضافة عضو جديد' : 'Add New Team Member')}
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
              <span className="ml-2">{isArabic ? 'جاري تحميل البيانات...' : 'Loading form data...'}</span>
            </div>
          ) : (
            <form
              key={`member-form-${id}-${lang}-${editingItem?.id || 'new'}`}
              className="space-y-6"
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
                    placeholder={isArabic ? 'اكتب اسم العضو...' : 'Member full name...'}
                    className={isArabic ? 'text-right' : 'text-left'}
                    dir={dir}
                  />
                  <span className="text-rose-500 field-error text-sm error-name">&nbsp;</span>
                </div>

                {/* Designation / Position */}
                <div className={isArabic ? 'text-right' : 'text-left'}>
                  <Label htmlFor="designation">{isArabic ? 'المسمى الوظيفي' : 'Position / Designation'}</Label>
                  <Input
                    id="designation"
                    name="designation"
                    defaultValue={editingItem?.designation || ''}
                    placeholder={
                      isArabic ? 'مثال: المدير التنفيذي' : 'Example: Chief Executive Officer'
                    }
                    className={isArabic ? 'text-right' : 'text-left'}
                    dir={dir}
                  />
                  <span className="text-rose-500 field-error text-sm error-designation">&nbsp;</span>
                </div>

                {/* Image */}
                <div className={isArabic ? 'text-right' : 'text-left'}>
                  <Label htmlFor="image">{isArabic ? 'الصورة' : 'Profile Image'}</Label>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    className={isArabic ? 'text-right' : 'text-left'}
                    dir={dir}
                  />
                  <span className="text-rose-500 field-error text-sm error-image">&nbsp;</span>

                  {editingItem?.image && (
                    <div className="mt-4">
                      <img
                        src={`${ASSETS_URL}/${editingItem.image}`}
                        alt="Current member"
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
                      ? (isArabic ? 'تحديث العضو' : 'Update Member')
                      : (isArabic ? 'إضافة عضو' : 'Add Member')
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

      {/* Members List */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members List</CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : members.length === 0 ? (
            <p className="text-center text-gray-500 py-12">
              No team members added yet
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead className="w-32">Image</TableHead>
                    <TableHead className="text-right w-32">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name || '—'}</TableCell>
                      <TableCell>{item.designation || '—'}</TableCell>
                      <TableCell>
                        {item.image ? (
                          <img
                            src={`${ASSETS_URL}/${item.image}`}
                            alt={item.name || 'Team member'}
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
                          onClick={() => navigate(`/admin/about/team/gallery/${item.id}?lang=${lang}`)}
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

      {/* Delete Confirmation */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the team member.
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

export default AboutTeamGallery;