import React, { useEffect, useState } from "react";
import ProjectsHero from "@/components/projects/Hero";
import Layout from "./Layout";
import WhatWeDone from "@/components/projects/WhatWeDone";
import { useLocalization } from "@/contexts/LocalizationContext";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";
import Loading from "@/components/common/Loading";
import { fa } from "zod/v4/locales";

const Projects = () => {
    const [hero, setHero] = useState([]);
    const [projects, setProjects] = useState([]);
    const [portfolio, setPortfolio] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
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
            setIsLoaded(true);
        } catch (error) {
            toast.error("Failed to load project hero");
            console.log(error);
        }
    };

    const fetchPortfolio = async () => {
        try {
            setIsLoaded(false);
            const response = await axiosInstance.get("/project/portfolio");
            setPortfolio(response.data.portfolio || []);
            setIsLoaded(true);
        } catch (error) {
            toast.error("Failed to load project portfolio");
            console.log(error);
        }
    };
    
    const fetchProjects = async () => {
        try {
            setIsLoaded(false);
            const response = await axiosInstance.get("/project/list");
            setProjects(response.data.projects || []);
            setIsLoaded(true);
        } catch (error) {
            toast.error("Failed to load projects");
            console.log(error);
        }
    };    

    return (
        <div className="min-h-screen">
            <Loading isLoaded={isLoaded} />
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
