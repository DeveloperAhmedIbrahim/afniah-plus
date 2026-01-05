// src/pages/admin/projects/List.jsx
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/admin/ui/card';
import { ChevronRightIcon, PlusCircle, Edit, Trash2, FolderKanban } from 'lucide-react';
import axiosInstance from '@/lib/axios.js';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/admin/ui/table"
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
} from "@/components/admin/ui/alert-dialog"
import { ASSETS_URL } from '@/lib/utils';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axiosInstance.get('/admin/project/list');
            setProjects(response.data.projects || []);
        } catch (error) {
            toast.error('Failed to load projects');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axiosInstance.delete(`/admin/project/delete/${deleteId}`);
            if (response.data.status === true) {
                toast.success('Project deleted successfully');
                fetchProjects();
            } else {
                toast.error('Failed to delete project');
            }
        } catch (error) {
            toast.error('Error deleting project');
            console.error(error);
        } finally {
            setOpen(false);
            setDeleteId(null);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl text-gray-600">Projects - <span className='text-green-primary'> List </span> - Projects Page </h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-right">
                        <Button className="cursor-pointer" variant="secondary" size="sm" onClick={() => navigate("/admin/project/insert?lang=en")}>
                            <PlusCircle /> New Project
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
                                    <TableHead>Name</TableHead>
                                    <TableHead>Image</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {projects.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center">No projects found</TableCell>
                                    </TableRow>
                                ) : (
                                    projects.map((project) => (
                                        <TableRow key={project.id}>
                                            <TableCell className="font-medium">{project.id}</TableCell>
                                            <TableCell>{project.title || 'N/A'}</TableCell>
                                            <TableCell>
                                                {project.featured_image ? (
                                                    <img 
                                                        src={ASSETS_URL+'/'+project.featured_image} 
                                                        alt={project.title || 'Project Image'} 
                                                        className="w-20 h-20 object-cover rounded" 
                                                    />
                                                ) : 'No Image'}
                                            </TableCell>
                                            <TableCell>{project.category || 'N/A'}</TableCell>
                                            <TableCell>{project.location || 'N/A'}</TableCell>
                                            <TableCell className="text-right">
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    onClick={() => navigate(`/admin/project/update/${project.id}?lang=en`)}
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    onClick={() => {
                                                        setDeleteId(project.id);
                                                        setOpen(true);
                                                    }}
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-500" />
                                                </Button>
                                                <Button 
                                                    title="Project Gallery"
                                                    variant="ghost" 
                                                    size="icon" 
                                                    onClick={() => navigate(`/admin/project/${project.id}/gallery?lang=en`)}
                                                >
                                                    <FolderKanban className="w-4 h-4" />
                                                </Button>                                                
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

export default ProjectList;