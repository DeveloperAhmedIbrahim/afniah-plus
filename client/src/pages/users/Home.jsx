import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import HeroSection from '../../components/home/Hero'
import AboutSection from '../../components/home/About'
import ProjectSection from '../../components/home/Project'
import LocationSection from '../../components/home/Location'
import { useLocalization } from '@/contexts/LocalizationContext'
import { toast } from 'sonner'
import axiosInstance from '@/lib/axios'

const Home = () => {
  const [hero, setHero] = useState([]);
  const [heroGallery, setHeroGallery] = useState([]);
  const [about, setAbout] = useState([]);
  const [aboutBullets, setAboutBullets] = useState([]);
  const [project, setProject] = useState([]);
  const [projects, setProjects] = useState([]);
  const [location, setLocation] = useState([]);
  const { isRTL } = useLocalization();
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    fetchHero();
    fetchHeroGallery();
    fetchAbout();
    fetchAboutBullets();
    fetchProject();
    fetchProjects();
    fetchLocation();
  }, [isRTL]);

  const fetchHero = async () => {
    try {
      const response = await axiosInstance.get("/home/hero");
      setHero(response.data.hero || []);
      setIsLoaded(true);
    } catch (error) {
      toast.error("Failed to load home hero");
      console.log(error);
    }
  };

  const fetchHeroGallery = async () => {
    try {
      const response = await axiosInstance.get("/home/hero/gallery");
      setHeroGallery(response.data.gallery || []);
    } catch (error) {
      toast.error("Failed to load home hero gallery");
      console.log(error);
    }
  };

  const fetchAbout = async () => {
    try {
      const response = await axiosInstance.get("/home/about");
      setAbout(response.data.about || []);
    } catch (error) {
      toast.error("Failed to load home about");
      console.log(error);
    }
  };

  const fetchAboutBullets = async () => {
    try {
      const response = await axiosInstance.get("/home/about/bullets");
      setAboutBullets(response.data.bullets || []);
    } catch (error) {
      toast.error("Failed to load home about bullets");
      console.log(error);
    }
  };
  
  const fetchProject = async () => {
    try {
      const response = await axiosInstance.get("/home/project");
      setProject(response.data.project || []);
    } catch (error) {
      toast.error("Failed to load home project");
      console.log(error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.get("/project/list");
      setProjects(response.data.projects || []);
    } catch (error) {
      toast.error("Failed to load home projects");
      console.log(error);
    }
  };  
  
  const fetchLocation = async () => {
    try {
      const response = await axiosInstance.get("/home/location");
      setLocation(response.data.location || []);
    } catch (error) {
      toast.error("Failed to load home location");
      console.log(error);
    }
  };  

  return (
    <div className="min-h-screen">
      <Layout active="home">
        {/* Hero Section - Full Width */}
        <section className="w-full">
          <HeroSection hero={hero} gallery={heroGallery} isLoaded={isLoaded} />
        </section>

        {/* About Section - Consistent Padding */}
        <section className="w-full" id='aboutSection'>
          <AboutSection about={about} bullets={aboutBullets} />
        </section>

        {/* Destination Section - Consistent Padding */}
        <section className="w-full" id='projectSection'>
          <ProjectSection project={project} projects={projects} />
        </section>

        {/* Location Section - Consistent Padding */}
        <section className="w-full">
          <LocationSection location={location} />
        </section>
      </Layout>
    </div>
  )
}

export default Home