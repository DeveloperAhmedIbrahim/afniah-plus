import React from "react";
import { motion } from "framer-motion";
import {
  FileText
} from "lucide-react";
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

        {/* CTA */}
        {/* <section className="relative py-16 lg:py-20 bg-gradient-to-r from-green-600 to-emerald-600 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <FileText className="w-16 h-16 text-white mx-auto mb-6" />
              <h2 className="text-3xl lg:text-4xl text-white font-primary mb-6">
                Preserve Your Legacy Today
              </h2>
              <p className="text-white/90 font-primary text-lg mb-8 max-w-2xl mx-auto">
                Transform your valuable records into accessible, preserved
                archives for future generations
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-green-600 px-8 py-4 rounded-full font-primary font-semibold text-lg shadow-xl"
              >
                Start Documentation Project
              </motion.button>
            </motion.div>
          </div>
        </section> */}
      </Layout>
    </div>
  );
};

export default ServicesInner;
