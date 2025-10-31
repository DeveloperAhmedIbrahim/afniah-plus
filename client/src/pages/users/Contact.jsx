import React from 'react';
import ContactHero from '../../components/contact/Hero.jsx';
import ContactInfo from '../../components/contact/ContactInfo.jsx';
import ContactForm from '../../components/contact/ContactForm.jsx';
import Layout from './Layout.jsx';

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Layout active="contact">
        {/* Hero Section */}
        <section className="w-full">
          <ContactHero />
        </section>

        {/* Contact Info Cards Section */}
        <section className="w-full">
          <ContactInfo />
        </section>

        {/* Contact Info Cards Section */}
        <section className="w-full">
          <ContactForm />
        </section>        

      </Layout>
    </div>
  );
};

export default Contact;