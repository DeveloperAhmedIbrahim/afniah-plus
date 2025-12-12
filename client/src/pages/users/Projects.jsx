import React, { useEffect, useState } from "react";
import ProjectsHero from "@/components/projects/Hero";
import Layout from "./Layout";
import WhatWeDone from "@/components/projects/WhatWeDone";
import { useLocalization } from "@/contexts/LocalizationContext";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";

const Projects = () => {
    const [hero, setHero] = useState([]);
    const [projects, setProjects] = useState([]);
    const [portfolio, setPortfolio] = useState([]);
    const { isRTL } = useLocalization();

    useEffect(() => {
        fetchHero();
        fetchProjects();
        fetchPortfolio();
    }, [isRTL]);

    const fetchHero = async () => {
        try {
            const response = await axiosInstance.get("/project/hero");
            setHero(response.data.hero || []);
        } catch (error) {
            toast.error("Failed to load project hero");
            console.log(error);
        }
    };

    const fetchPortfolio = async () => {
        try {
            const response = await axiosInstance.get("/project/portfolio");
            setPortfolio(response.data.portfolio || []);
        } catch (error) {
            toast.error("Failed to load project portfolio");
            console.log(error);
        }
    };
    
    const fetchProjects = async () => {
        try {
            const response = await axiosInstance.get("/project/list");
            setProjects(response.data.projects || []);
        } catch (error) {
            toast.error("Failed to load projects");
            console.log(error);
        }
    };    

    return (
        <div className="min-h-screen">
            <Layout active="projects">
                {/* Hero Section */}
                <section className="w-full">
                    <ProjectsHero hero={hero} />
                </section>

                {/* What We Offer Section */}
                <section className="w-full">
                    <WhatWeDone portfolio={portfolio} projects={projects}  />
                </section>
            </Layout>
        </div>
    );
};

export default Projects;
