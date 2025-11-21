import React from "react";
import ProjectsHero from "@/components/projects/Hero";
import Layout from "./Layout";
import CTASection from "@/components/services/CTASection";
import WhatWeDone from "@/components/projects/WhatWeDone";

const Projects = () => {
    return (
        <div className="min-h-screen">
            <Layout active="projects">
                {/* Hero Section */}
                <section className="w-full">
                    <ProjectsHero />
                </section>

                {/* What We Offer Section */}
                <section className="w-full">
                    <WhatWeDone />
                </section>
            </Layout>
        </div>
    );
};

export default Projects;
