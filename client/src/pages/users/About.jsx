import React, { useEffect, useState } from 'react';
import AboutHero from '../../components/about/Hero.jsx';
import WhoWeAre from '../../components/about/WhoWeAre.jsx';
import Vision from '../../components/about/Vision.jsx';
import Team from '../../components/about/Team.jsx';
import Voices from '../../components/about/Voices.jsx';
import Layout from './Layout.jsx';
import { useLocalization } from '@/contexts/LocalizationContext.jsx';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axios.js';

const About = () => {
  const [hero, setHero] = useState([]);
  const [whoWeAre, setWhoWeAre] = useState([]);
  const [vision, setVision] = useState([]);
  const [team, setTeam] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const { isRTL } = useLocalization();
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    fetchHero();
    fetchWhoWeAre();
    fetchVision();
    fetchTeam();
    fetchTeamMembers();
  }, [isRTL]);

  const fetchHero = async () => {
    try {
      const response = await axiosInstance.get("/about/hero");
      setHero(response.data.hero || []);
      setIsLoaded(true);
    } catch (error) {
      toast.error("Failed to load about hero");
      console.log(error);
    }
  };

  const fetchWhoWeAre = async () => {
    try {
      const response = await axiosInstance.get("/about/who-we-are");
      setWhoWeAre(response.data.whoWeAre || []);
    } catch (error) {
      toast.error("Failed to load about who we are");
      console.log(error);
    }
  };

  const fetchVision = async () => {
    try {
      const response = await axiosInstance.get("/about/vision");
      setVision(response.data.vision || []);
    } catch (error) {
      toast.error("Failed to load about vision");
      console.log(error);
    }
  };

  const fetchTeam = async () => {
    try {
      const response = await axiosInstance.get("/about/team");
      setTeam(response.data.team || []);
    } catch (error) {
      toast.error("Failed to load about team");
      console.log(error);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const response = await axiosInstance.get("/about/team/members");
      setTeamMembers(response.data.teamMembers || []);
    } catch (error) {
      toast.error("Failed to load about team members");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen">
      <Layout active="about">
        {/* Hero Section */}
        <section className="w-full">
          <AboutHero hero={hero} />
        </section>

        {/* Who We Are Section */}
        <section className="w-full">
          <WhoWeAre whoWeAre={whoWeAre} />
        </section>

        {/* Our Purpose Section */}
        <section className="w-full">
          <Vision vision={vision} />
        </section>

        {/* Meet The Team Section */}
        <section className="w-full">
          <Team team={team} teamMembers={teamMembers} />
        </section>

        {/* Voices & Views Section */}
        {/* <section className="w-full">
          <Voices />
        </section> */}
      </Layout>
    </div>
  );
};

export default About;