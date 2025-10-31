import React from 'react';
import AboutHero from '../../components/about/Hero.jsx';
import WhoWeAre from '../../components/about/WhoWeAre.jsx';
import Vision from '../../components/about/Vision.jsx';
import Team from '../../components/about/Team.jsx';
import Voices from '../../components/about/Voices.jsx';
import Layout from './Layout.jsx';

const About = () => {
  return (
    <div className="min-h-screen">
      <Layout active="about">
        {/* Hero Section */}
        <section className="w-full">
          <AboutHero />
        </section>

        {/* Who We Are Section */}
        <section className="w-full">
          <WhoWeAre />
        </section>

        {/* Our Purpose Section */}
        <section className="w-full">
          <Vision />
        </section>

        {/* Meet The Team Section */}
        <section className="w-full">
          <Team />
        </section>

        {/* Voices & Views Section */}
        <section className="w-full">
          <Voices />
        </section>
      </Layout>
    </div>
  );
};

export default About;