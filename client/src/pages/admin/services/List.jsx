import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/admin/ui/card';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import axiosInstance from '@/lib/axios.js';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/admin/ui/table";
import { Button } from '@/components/admin/ui/button';
import { useNavigate } from 'react-router-dom';
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
} from "@/components/admin/ui/alert-dialog";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/admin/ui/dropdown-menu";

import { MoreHorizontal, Link } from "lucide-react";  
import { ASSETS_URL } from '@/lib/utils';

const ServiceList = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await axiosInstance.get('/admin/service/list');
            setServices(response.data.services || []);
        } catch (error) {
            toast.error('Failed to load services');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axiosInstance.delete(`/admin/service/delete/${deleteId}`);
            if (response.data.status === true) {
                toast.success('Service deleted successfully');
                fetchServices();
            } else {
                toast.error('Failed to delete service');
            }
        } catch (error) {
            toast.error('Error deleting service');
            console.error(error);
        } finally {
            setOpen(false);
            setDeleteId(null);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl text-gray-600">Services - <span className='text-green-primary'>List</span> - Services Page</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-right">
                        <Button className="cursor-pointer" variant="secondary" size="sm" onClick={() => navigate("/admin/service/insert?lang=en")}>
                            <PlusCircle /> New Service
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">ID</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Featured Image</TableHead>
                                    <TableHead>Banner Image</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {services.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center">No services found</TableCell>
                                    </TableRow>
                                ) : (
                                    services.map((service) => (
                                        <TableRow key={service.id}>
                                            <TableCell className="font-medium">{service.id}</TableCell>
                                            <TableCell>{service.title || 'N/A'}</TableCell>
                                            <TableCell>
                                                {service.featured_image ? (
                                                    <img 
                                                        src={`${ASSETS_URL}/${service.featured_image}`} 
                                                        alt="Featured" 
                                                        className="w-16 h-16 object-cover rounded" 
                                                    />
                                                ) : 'No Image'}
                                            </TableCell>
                                            <TableCell>
                                                {service.banner_image ? (
                                                    <img 
                                                        src={`${ASSETS_URL}/${service.banner_image}`} 
                                                        alt="Banner" 
                                                        className="w-24 h-16 object-cover rounded" 
                                                    />
                                                ) : 'No Banner'}
                                            </TableCell>
                                            <TableCell className="text-right flex items-center justify-end gap-1">
                                                {/* Edit Button */}
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    onClick={() => navigate(`/admin/service/update/${service.id}?lang=en`)}
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>

                                                {/* Delete Button */}
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    onClick={() => {
                                                        setDeleteId(service.id);
                                                        setOpen(true);
                                                    }}
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-500" />
                                                </Button>

                                                {/* 3 Dots Dropdown */}
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" title="More options">
                                                            <MoreHorizontal className="w-4 h-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-48">
                                                        <DropdownMenuLabel>Sections</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />

                                                        <DropdownMenuItem onClick={() => navigate(`/admin/service/${service.id}/section-01`)}>
                                                            <Link className="w-4 h-4 mr-2" /> Section 01
                                                        </DropdownMenuItem>

                                                        <DropdownMenuItem onClick={() => navigate(`/admin/service/${service.id}/section-02`)}>
                                                            <Link className="w-4 h-4 mr-2" /> Section 02
                                                        </DropdownMenuItem>

                                                        <DropdownMenuItem onClick={() => navigate(`/admin/service/${service.id}/section-03`)}>
                                                            <Link className="w-4 h-4 mr-2" /> Section 03
                                                        </DropdownMenuItem>

                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the service.
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

export default ServiceList;