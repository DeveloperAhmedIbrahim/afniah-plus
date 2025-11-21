import React from "react";
import Layout from "./Layout";
import ProjectsInnerHero from "@/components/projects/Inner-Hero";
import ProjectsInnerOverview from "@/components/projects/Inner-Overview";
import ProjectsInnerCaseStudy from "@/components/projects/Inner-CaseStudy";
import ProjectsInnerGallery from "@/components/projects/Inner-Gallery";

const ProjectsInner = () => {
  return (
    <div className="min-h-screen">
      <Layout active="projects">
        {/* Hero Section */}
        <section className="w-full">
          <ProjectsInnerHero id="1" />
        </section>

        {/* Section 1: Overview */}
        <section className="w-full">
          <ProjectsInnerOverview id="1" />
        </section>

        {/* Section 2: Case Study */}
        <section className="w-full">
          <ProjectsInnerCaseStudy id="1" />
        </section>        

        {/* Section 3: Gallery */}
        <section className="w-full">
          <ProjectsInnerGallery id="1" />
        </section>        
      </Layout>
    </div>
  );
};

export default ProjectsInner;
