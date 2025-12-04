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
    AlertDialogTrigger,
} from "@/components/admin/ui/alert-dialog"

const ProjectGallery = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();

    const [galleryItems, setGalleryItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        fetchGallery();
    }, [projectId, submitting]);

    const fetchGallery = async () => {
        try {
            const res = await axiosInstance.get(`/admin/project/${projectId}/gallery`);
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
        setLoading(true);
        const url = editingItem
            ? `/admin/project/${projectId}/gallery/update/${editingItem.id}`
            : `/admin/project/${projectId}/gallery/insert`;
        try {
            await handleFormSubmission(e, url); 
            if(url === `/admin/project/${projectId}/gallery/update/${editingItem.id}`) {
                setEditingItem(null);
            }
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        document.getElementById("gallery-title").value = item.title || "";
    };

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/admin/project/${projectId}/gallery/delete/${deleteId}`);
            toast.success("Deleted");
            fetchGallery();
        } catch (err) {
            toast.error("Delete nahi hua");
        }
    };

    return (
        <div className="space-y-6 p-6">

            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-700">
                    Project Gallery (ID: {projectId})
                </h1>
                <Button variant="outline" onClick={() => navigate("/admin/project/list")}>
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back to Projects
                </Button>
            </div>

            {/* Add / Edit Form */}
            <Card>
                <CardHeader>
                    <CardTitle>{editingItem ? "Edit" : "Add New"} Gallery Image</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="hidden" name="project_id" value={projectId} />

                        <div>
                            <Label htmlFor="gallery-title">Image Title</Label>
                            <Input id="gallery-title" name="title" placeholder="Enter title (optional)" />
                            <span className="text-rose-500 field-error text-sm error-title">&nbsp;</span>                            
                        </div>

                        <div>
                            <Label htmlFor="gallery-image">Image</Label>
                            <Input id="gallery-image" name="image" type="file" accept="image/*" />
                            <span className="text-rose-500 field-error text-sm error-image">&nbsp;</span>                            
                            {editingItem && (
                                <p className="text-sm text-gray-500 mt-1">
                                    Current: <span className="font-medium">{editingItem.image}</span>
                                </p>
                            )}
                        </div>

                        <div className="flex gap-3">
                            <Button type="submit" disabled={submitting}>
                                {submitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                        Saving...
                                    </>
                                ) : (
                                    editingItem ? "Update" : "Add Image"
                                )}
                            </Button>
                            {editingItem && (
                                <Button type="button" variant="secondary" onClick={() => {
                                    setEditingItem(null);
                                    document.getElementById("gallery-title").value = "";
                                }}>
                                    Cancel
                                </Button>
                            )}
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Gallery List */}
            <Card>
                <CardHeader>
                    <CardTitle>Gallery Images</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <p>Loading gallery...</p>
                    ) : galleryItems.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">No images added yet</p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Image</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {galleryItems.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.title || "-"}</TableCell>
                                        <TableCell>
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-24 h-16 object-cover rounded"
                                            />
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button size="icon" variant="ghost" onClick={() => handleEdit(item)}>
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                onClick={() => {
                                                    setDeleteId(item.id);
                                                    setOpen(true);
                                                }}
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
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the project and remove its data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>            
        </div>
    );
};

export default ProjectGallery;