import React, { useEffect, useState } from "react";
import ServicesHero from "@/components/services/Hero";
import Layout from "./Layout";
import WhatWeOffer from "@/components/services/WhatWeOffer";
import CTASection from "@/components/services/CTASection";
import { useLocalization } from "@/contexts/LocalizationContext";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import Loading from "@/components/common/Loading";

const Services = () => {
    const [hero, setHero] = useState([]);
    const [whatWeOffer, setWhatWeOffer] = useState([]);
    const [services, setServices] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const { isRTL } = useLocalization();
    

    useEffect(() => {
        fetchHero();
        fetchWhatWeOffer();
        fetchServices();
    }, [isRTL]);

    const fetchHero = async () => {
        try {
            const response = await axiosInstance.get("/service/hero");
            setHero(response.data.hero || []);
            setIsLoaded(true);
        } catch (error) {
            toast.error("Failed to load service hero");
            console.log(error);
        }
    };

    const fetchWhatWeOffer = async () => {
        try {
            setIsLoaded(false);
            const response = await axiosInstance.get("/service/what-we-offer");
            setWhatWeOffer(response.data.whatWeOffer || []);
            setIsLoaded(true);
        } catch (error) {
            toast.error("Failed to load what we offer");
            console.log(error);
        }
    };
    
    const fetchServices = async () => {
        try {
            setIsLoaded(false);
            const response = await axiosInstance.get("/service/list");
            setServices(response.data.services || []);
            setIsLoaded(true);
        } catch (error) {
            toast.error("Failed to load services");
            console.log(error);
        }
    };    
    return (
        <div className="min-h-screen">
            <Loading isLoaded={isLoaded} />
            <Layout active="services">
                {/* Hero Section */}
                <section className="w-full">
                    <ServicesHero hero={hero} />
                </section>

                {/* What We Offer Section */}
                <section className="w-full">
                    <WhatWeOffer whatWeOffer={whatWeOffer} services={services} />
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
