import React from 'react'
import Layout from './Layout'
import HeroSection from '../../components/home/Hero'
import AboutSection from '../../components/home/About'
import DestinationSection from '../../components/home/Destination'
import LocationSection from '../../components/home/Location'

const Home = () => {
  return (
    <div>
        <Layout active="home">
          <HeroSection />
          <AboutSection />
          <DestinationSection />
          <LocationSection />
        </Layout>
    </div>
  )
}

export default Home
