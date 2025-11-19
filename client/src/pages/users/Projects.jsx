import React from "react";
import ProjectsHero from "@/components/projects/Hero";
import Layout from "./Layout";
import WhatWeOffer from "@/components/services/WhatWeOffer";
import CTASection from "@/components/services/CTASection";

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
                    <WhatWeOffer />
                </section>

                {/* CTA Section */}
                <section className="w-full">
                    <CTASection />
                </section>
            </Layout>
        </div>
    );
};

export default Projects;
