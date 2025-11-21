import React from "react";
import Layout from "./Layout";
import ServicesInnerHero from "@/components/services/Inner-Hero";
import ServicesInnerOverview from "@/components/services/Inner-Overview";
import ServicesInnerApproach from "@/components/services/Inner-Approach";
import ServicesInnerProcess from "@/components/services/Inner-Process";

const ServicesInner = () => {
  return (
    <div className="min-h-screen">
      <Layout active="services">
        {/* Hero Section */}
        <section className="w-full">
          <ServicesInnerHero id="1" />
        </section>

        {/* Section 1: Overview */}
        <section className="w-full">
          <ServicesInnerOverview id="1" />
        </section>

        {/* Section 2: Our Approach */}
        <section className="w-full">
          <ServicesInnerApproach id="1" />
        </section>        

        {/* Section 3: Process */}
        <section className="w-full">
          <ServicesInnerProcess id="1" />
        </section>        
      </Layout>
    </div>
  );
};

export default ServicesInner;
