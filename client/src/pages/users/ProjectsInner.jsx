import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import ProjectsInnerHero from "@/components/projects/Inner-Hero";
import ProjectsInnerOverview from "@/components/projects/Inner-Overview";
import ProjectsInnerCaseStudy from "@/components/projects/Inner-CaseStudy";
import ProjectsInnerGallery from "@/components/projects/Inner-Gallery";
import { useLocalization } from "@/contexts/LocalizationContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";

const ProjectsInner = () => {
  const [loading, setLoading] = useState([]);
  const [project, setProject] = useState([]);
  const [gallery, setGallery] = useState([]);
  const { t, isRTL } = useLocalization();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    fetchProject();
    fetchGallery();    
  }, [isRTL]);

  const fetchProject = async () => {
    try {
      const response = await axiosInstance.get("/project/single/" + id);
      setProject(response.data.project || []);
    } catch (error) {
      toast.error("Failed to load project");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }; 

  const fetchGallery = async () => {
    try {
      const response = await axiosInstance.get(`project/${id}/gallery`);
      setGallery(response.data.gallery || []);
    } catch (error) {
      toast.error("Failed to load gallery");
      console.error(error);
    } finally {
      setLoading(false);
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
