import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/admin/ui/card';
import { FolderKanban, FileText, Users, TrendingUp, ChevronLeftIcon, ChevronRightIcon, PlusCircle } from 'lucide-react';
import axios from '@/lib/axios.js';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/admin/ui/table"
import { Button } from '@/components/admin/ui/button';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const projects = [
    {
        id: "1",
        name: "Project 01",
        image: "No Image",
        category: "School",
        location: "Ryadh",
    }
];

const ProjectList = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl text-gray-600 flex justify-start items-center">Project <ChevronRightIcon /> List</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-right">
                        <Button className="cursor-pointer" variant="secondary" size="sm" onClick={() => {navigate("/admin/project/insert?lang=en")}}>
                            <PlusCircle /> New Project
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
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
                            {projects.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell className="font-medium">{project.id}</TableCell>
                                    <TableCell>{project.name}</TableCell>
                                    <TableCell>{project.image}</TableCell>
                                    <TableCell>{project.category}</TableCell>
                                    <TableCell>{project.location}</TableCell>
                                    <TableCell className="text-right"></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </CardContent>
            </Card>
        </div>

    );
};

export default ProjectList;