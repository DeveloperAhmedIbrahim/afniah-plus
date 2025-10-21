import React from 'react'
import Layout from './Layout'
import HeroSection from '../../components/home/Hero'
import AboutSection from '../../components/home/About'
import ProjectSection from '../../components/home/Project'
import LocationSection from '../../components/home/Location'

const Home = () => {
  return (
    <div className="min-h-screen">
      <Layout active="home">
        {/* Hero Section - Full Width */}
        <section className="w-full">
          <HeroSection />
        </section>

        {/* About Section - Consistent Padding */}
        <section className="w-full" id='aboutSection'>
          <AboutSection />
        </section>

        {/* Destination Section - Consistent Padding */}
        <section className="w-full" id='projectSection'>
          <ProjectSection />
        </section>

        {/* Location Section - Consistent Padding */}
        <section className="w-full">
          <LocationSection />
        </section>
      </Layout>
    </div>
  )
}

export default Home