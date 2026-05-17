import React, { useEffect, useState } from 'react';
import ContactHero from '../../components/contact/Hero.jsx';
import ContactInfo from '../../components/contact/ContactInfo.jsx';
import ContactForm from '../../components/contact/ContactForm.jsx';
import { useLocalization } from '@/contexts/LocalizationContext.jsx';
import Layout from './Layout.jsx';
import { toast } from 'sonner';
import Loading from '@/components/common/Loading.jsx';
import axiosInstance from '@/lib/axios.js';

const Contact = () => {
  const [hero, setHero] = useState([]);
  const [form, setForm] = useState([]);
  const [social, setSocial] = useState([]);
  const { isRTL } = useLocalization();
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    fetchHero();
    fetchForm();
    fetchSocialDetails();    
  }, [isRTL]);

  const fetchHero = async () => {
    try {
      const response = await axiosInstance.get("/contact/hero");
      setHero(response.data.hero || []);
      setIsLoaded(true);
    } catch (error) {
      toast.error("Failed to load contact hero");
      console.log(error);
    }
  };

  const fetchForm = async () => {
    try {
      setIsLoaded(false);
      const response = await axiosInstance.get("/contact/form");
      setForm(response.data.form || []);
      setIsLoaded(true);
    } catch (error) {
      toast.error("Failed to load contact form");
      console.log(error);
    }
  };

  const fetchSocialDetails = async () => {
    try {
      const response = await axiosInstance.get("/home/social");
      setSocial(response.data.social || []);
    } catch (error) {
      toast.error("Failed to load social details");
      console.log(error);
    }
  };  

  return (
    <div className="min-h-screen">
      <Loading isLoaded={isLoaded} />
      <Layout active="contact">
        {/* Hero Section */}
        <section className="w-full">
          <ContactHero hero={hero} isLoaded={isLoaded} />
        </section>

        {/* Contact Info Cards Section */}
        <section className="w-full">
          <ContactInfo social={social} />
        </section>

        {/* Contact Info Cards Section */}
        <section className="w-full">
          <ContactForm form={form} social={social} />
        </section>        

      </Layout>
    </div>
  );
};

export default Contact;