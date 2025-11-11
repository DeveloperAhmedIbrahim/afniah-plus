import React from "react";
import ServicesHero from "@/components/services/Hero";
import Layout from "./Layout";
import WhatWeOffer from "@/components/services/WhatWeOffer";
import CTASection from "@/components/services/CTASection";

const Services = () => {
    return (
        <div className="min-h-screen">
            <Layout active="services">
                {/* Hero Section */}
                <section className="w-full">
                    <ServicesHero />
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

export default Services;
