import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import ProjectsInnerHero from "@/components/projects/Inner-Hero";
import ProjectsInnerOverview from "@/components/projects/Inner-Overview";
import ProjectsInnerCaseStudy from "@/components/projects/Inner-CaseStudy";
import ProjectsInnerGallery from "@/components/projects/Inner-Gallery";
import { useLocalization } from "@/contexts/LocalizationContext";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";

const ProjectsInner = () => {
  const [project, setProject] = useState([]);
  const [gallery, setGallery] = useState([]);
  const { isRTL } = useLocalization();
  const { id } = useParams();
  useEffect(() => {
    fetchProject();
    fetchGallery();    
  }, [isRTL]);

  const fetchProject = async () => {
    try {
      const response = await axiosInstance.get("/project/single/" + id);
      setProject(response.data.project || []);
      console.log("Project data:", response.data.project);
    } catch (error) {
      toast.error("Failed to load project");
      console.error(error);
    }
  }; 

  const fetchGallery = async () => {
    try {
      const response = await axiosInstance.get(`project/${id}/gallery`);
      setGallery(response.data.gallery || []);
    } catch (error) {
      toast.error("Failed to load gallery");
      console.error(error);
    }
  };   
  
  return (
    <div className="min-h-screen">
      <Layout active="projects">
        {/* Hero Section */}
        <section className="w-full">
          <ProjectsInnerHero project={project} />
        </section>

        {/* Section 1: Overview */}
        <section className="w-full">
          <ProjectsInnerOverview project={project} />
        </section>

        {/* Section 2: Case Study */}
        <section className="w-full">
          <ProjectsInnerCaseStudy project={project} />
        </section>        

        {/* Section 3: Gallery */}
        <section className="w-full">
          <ProjectsInnerGallery gallery={gallery} />
        </section>        
      </Layout>
    </div>
  );
};

export default ProjectsInner;
