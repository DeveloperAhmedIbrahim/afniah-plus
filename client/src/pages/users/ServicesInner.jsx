import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import ServicesInnerHero from "@/components/services/Inner-Hero";
import ServicesInnerOverview from "@/components/services/Inner-Overview";
import ServicesInnerApproach from "@/components/services/Inner-Approach";
import ServicesInnerProcess from "@/components/services/Inner-Process";
import { useParams } from "react-router-dom";
import { useLocalization } from "@/contexts/LocalizationContext";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import Loading from "@/components/common/Loading";

const ServicesInner = () => {
  const { id } = useParams();
  const [service, setService] = useState([]);
  const [section01, setSection01] = useState([]);
  const [section02, setSection02] = useState([]);
  const [section03, setSection03] = useState([]);
  const [section01Bullets, setSection01Bullets] = useState([]);
  const [section02Bullets, setSection02Bullets] = useState([]);
  const [section03Bullets, setSection03Bullets] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { isRTL } = useLocalization();

  useEffect(() => {
    fetchService();
    fetchSection01()
    fetchSection02()
    fetchSection03()
    fetchSection01Bullets()
    fetchSection02Bullets()
    fetchSection03Bullets()
  }, [isRTL]);

  const fetchService = async () => {
    try {
      const response = await axiosInstance.get(`/service/single/${id}`);
      setService(response.data.service || []);
      setIsLoaded(true);
    } catch (error) {
      toast.error("Failed to load service.");
      console.log(error);
    }
  };

  const fetchSection01 = async () => {
    try {
      setIsLoaded(false);
      const response = await axiosInstance.get(`/service/single/${id}/section-01`);
      setSection01(response.data.section01 || []);
      setIsLoaded(true);
    } catch (error) {
      toast.error("Failed to load service section 01.");
      console.log(error);
    }
  };

  const fetchSection02 = async () => {
    try {
      setIsLoaded(false);
      const response = await axiosInstance.get(`/service/single/${id}/section-02`);
      setSection02(response.data.section02 || []);
      setIsLoaded(true);
    } catch (error) {
      toast.error("Failed to load service section 02.");
      console.log(error);
    }
  };

  const fetchSection03 = async () => {
    try {
      setIsLoaded(false);
      const response = await axiosInstance.get(`/service/single/${id}/section-03`);
      setSection03(response.data.section03 || []);
      setIsLoaded(true);
    } catch (error) {
      toast.error("Failed to load service section 03.");
      console.log(error);
    }
  };

  const fetchSection01Bullets = async () => {
    try {
      setIsLoaded(false);
      const response = await axiosInstance.get(`/service/single/${id}/section-01/bullets`);
      setSection01Bullets(response.data.section01Bullets || []);
      setIsLoaded(true);
    } catch (error) {
      toast.error("Failed to load service section 01 bullets.");
      console.log(error);
    }
  };

  const fetchSection02Bullets = async () => {
    try {
      setIsLoaded(false);
      const response = await axiosInstance.get(`/service/single/${id}/section-02/bullets`);
      setSection02Bullets(response.data.section02Bullets || []);
      setIsLoaded(true);
    } catch (error) {
      toast.error("Failed to load service section 02 bullets.");
      console.log(error);
    }
  };

  const fetchSection03Bullets = async () => {
    try {
      setIsLoaded(false);
      const response = await axiosInstance.get(`/service/single/${id}/section-03/bullets`);
      setSection03Bullets(response.data.section03Bullets || []);
      setIsLoaded(true);
    } catch (error) {
      toast.error("Failed to load service section 03 bullets.");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen">
      <Loading isLoaded={isLoaded} />
      <Layout active="services">
        {/* Hero Section */}
        <section className="w-full">
          <ServicesInnerHero service={service} />
        </section>

        {/* Section 1: Overview */}
        <section className="w-full">
          <ServicesInnerOverview section01={section01} section01Bullets={section01Bullets} />
        </section>

        {/* Section 2: Our Approach */}
        <section className="w-full">
          <ServicesInnerApproach section02={section02} section02Bullets={section02Bullets}/>
        </section>

        {/* Section 3: Process */}
        <section className="w-full">
          <ServicesInnerProcess section03={section03} section03Bullets={section03Bullets}/>
        </section>
      </Layout>
    </div>
  );
};

export default ServicesInner;
