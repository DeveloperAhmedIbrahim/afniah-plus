import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import HeroSection from '../../components/home/Hero'
import AboutSection from '../../components/home/About'
import ProjectSection from '../../components/home/Project'
import LocationSection from '../../components/home/Location'
import { useLocalization } from '@/contexts/LocalizationContext'
import { useVisibility } from '@/contexts/VisibliltyContext'
import { toast } from 'sonner'
import axiosInstance from '@/lib/axios'
import Loading from '@/components/common/Loading'

const Home = () => {
  const [hero, setHero] = useState([]);
  const [heroGallery, setHeroGallery] = useState([]);
  const [about, setAbout] = useState([]);
  const [aboutBullets, setAboutBullets] = useState([]);
  const [project, setProject] = useState([]);
  const [projects, setProjects] = useState([]);
  const [location, setLocation] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { isRTL } = useLocalization();
  const { visibility } = useVisibility();


  useEffect(() => {
    fetchHero();
    fetchHeroGallery();
    fetchAbout();
    fetchAboutBullets();
    fetchProject();
    fetchProjects();
    fetchLocation();
  }, [isRTL, visibility]);

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
      setIsLoaded(false);
      const response = await axiosInstance.get("/home/hero/gallery");
      setHeroGallery(response.data.gallery || []);
      setIsLoaded(true);
    } catch (error) {
      toast.error("Failed to load home hero gallery");
      console.log(error);
    }
  };

  const fetchAbout = async () => {
    try {
      setIsLoaded(false);
      const response = await axiosInstance.get("/home/about");
      setAbout(response.data.about || []);
      setIsLoaded(true);
    } catch (error) {
      toast.error("Failed to load home about");
      console.log(error);
    }
  };

  const fetchAboutBullets = async () => {
    try {
      setIsLoaded(false);
      const response = await axiosInstance.get("/home/about/bullets");
      setAboutBullets(response.data.bullets || []);
      setIsLoaded(true);
    } catch (error) {
      toast.error("Failed to load home about bullets");
      console.log(error);
    }
  };
  
  const fetchProject = async () => {
    try {
      setIsLoaded(false);
      const response = await axiosInstance.get("/home/project");
      setProject(response.data.project || []);
      setIsLoaded(true);
    } catch (error) {
      toast.error("Failed to load home project");
      console.log(error);
    }
  };

  const fetchProjects = async () => {
    try {
      setIsLoaded(false);
      const response = await axiosInstance.get("/project/list");
      setProjects(response.data.projects || []);
      setIsLoaded(true);
    } catch (error) {
      toast.error("Failed to load home projects");
      console.log(error);
    }
  };  
  
  const fetchLocation = async () => {
    try {
      setIsLoaded(false);
      const response = await axiosInstance.get("/home/location");
      setLocation(response.data.location || []);
      setIsLoaded(true);
    } catch (error) {
      toast.error("Failed to load home location");
      console.log(error);
    }
  };  

  return (
    <div className="min-h-screen">
      <Loading isLoaded={isLoaded} />
      <Layout active="home">
        {/* Hero Section */}
        <section className="w-full">          
          <HeroSection hero={hero} gallery={heroGallery} isLoaded={isLoaded} />
        </section>

        {/* About Section */}
        {(visibility.home_about === 1) && (
          <section className="w-full" id='aboutSection'>
            <AboutSection about={about} bullets={aboutBullets} />
          </section>
        )}

        {(visibility.home_projects === 1) && (
          <section className="w-full" id='projectSection'>
            <ProjectSection project={project} projects={projects} />
          </section>
        )}

        {(visibility.home_location === 1) && (
          <section className="w-full">
            <LocationSection location={location} />
          </section>
        )}
      </Layout>
    </div>
  )
}

export default Home