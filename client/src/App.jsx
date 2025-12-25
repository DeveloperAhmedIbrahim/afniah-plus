import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

// Public Pages
import Home from "./pages/users/Home";
import About from "./pages/users/About";
import Contact from "./pages/users/Contact";
import React, { useRef, useEffect, use } from "react";
import LoadingBar from "react-top-loading-bar";
import { LocalizationProvider, useLocalization } from "./contexts/LocalizationContext";
import { Toaster, toast } from "sonner";
import { CheckCircle2, Info, LucideHome, Sparkles, Sun, XCircle } from "lucide-react";
import Services from "./pages/users/Services";
import ServicesInner from "./pages/users/ServicesInner";
import Projects from "./pages/users/Projects";
import ProjectsInner from "./pages/users/ProjectsInner";

// Admin Pages
import AdminLogin from './pages/admin/Login';
import AdminLayout from './pages/admin/Layout';
import Dashboard from './pages/admin/Dashboard';
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProjectList from "./pages/admin/projects/List";
import ProjectInsert from "./pages/admin/projects/Insert";
import ProjectUpdate from "./pages/admin/projects/Update";
import ProjectGallery from "./pages/admin/projects/Gallery";
import ProjectHero from "./pages/admin/projects/Hero";
import ProjectPortfolio from "./pages/admin/projects/Portfolio";
import HomeHero from "./pages/admin/home/Hero";
import HomeHeroGallery from "./pages/admin/home/HeroGallery";
import HomeAbout from "./pages/admin/home/About";
import HomeAboutBullets from "./pages/admin/home/AboutBullets";
import HomeProject from "./pages/admin/home/Project";
import HomeLocation from "./pages/admin/home/Location";
import AboutHero from "./pages/admin/about/Hero";
import AboutWhoWeAre from "./pages/admin/about/WhoWeAre";
import AboutVision from "./pages/admin/about/Vision";
import AboutTeam from "./pages/admin/about/Team";
import AboutTeamGallery from "./pages/admin/about/TeamGallery";
import ContactHero from "./pages/admin/contact/Hero";
import ContactForm from "./pages/admin/contact/Form";
import ServiceHero from "./pages/admin/services/Hero";
import ServiceWhatWeOffer from "./pages/admin/services/WhatWeOffer";
import ServiceList from "./pages/admin/services/List";
import ServiceInsert from "./pages/admin/services/Insert";
import ServiceUpdate from "./pages/admin/services/Update";
import ServiceInnerSection01 from "./pages/admin/services/Inner-Section-01";
import ServiceInnerSection02 from "./pages/admin/services/Inner-Section-02";
import ServiceInnerSection03 from "./pages/admin/services/Inner-Section-03";
import ServiceInnerSection01Bullets from "./pages/admin/services/Inner-Section-01-Bullets";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

const LayoutWrapper = () => {
  const ref = useRef(null);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (ref.current) {
      ref.current.continuousStart();
      setTimeout(() => {
        ref.current.complete();
      }, 600);
    }
  }, [location]);

  return (
    <>
      <LoadingBar color="#A95E30" ref={ref} height={3} />
      <Toaster
        richColors
        visibleToasts={1}
        closeButton
        position="top-center"
        toastOptions={{
          style: {
            fontFamily: '"Changa", sans-serif',
          },
        }}
        icons={{
          success: <CheckCircle2 className="w-6 h-6 text-emerald-600" />,
          warning: <Sparkles className="w-6 h-6 text-amber-500" />,
          error: <XCircle className="w-6 h-6 text-rose-500" />,
          info: <Info className="w-6 h-6 text-sky-500" />,
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/*" element={<ServicesInner />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:id" element={<ProjectsInner />} />
      </Routes>
    </>
  );
}

const AdminLayoutWrapper = () => {
  if(window.location.pathname.includes("admin")){
    const { changeLanguage } = useLocalization();
    useEffect(() => {
      changeLanguage("en"); // Default to English
    }, []);
  }
  return (
    <AuthProvider>
      <Routes>
        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="home/hero" element={<HomeHero />} />
          <Route path="home/hero/gallery" element={<HomeHeroGallery />} />
          <Route path="home/about" element={<HomeAbout />} />
          <Route path="home/about/bullets" element={<HomeAboutBullets />} />
          <Route path="home/about/bullets/:id" element={<HomeAboutBullets />} />
          <Route path="home/project" element={<HomeProject />} />
          <Route path="home/location" element={<HomeLocation />} />

          <Route path="about/hero" element={<AboutHero />} />
          <Route path="about/who-we-are" element={<AboutWhoWeAre />} />
          <Route path="about/vision" element={<AboutVision />} />
          <Route path="about/team" element={<AboutTeam />} />
          <Route path="about/team/gallery" element={<AboutTeamGallery />} />
          <Route path="about/team/gallery/:id" element={<AboutTeamGallery />} />

          <Route path="project/list" element={<ProjectList />} />
          <Route path="project/insert" element={<ProjectInsert />} />
          <Route path="project/update/:id" element={<ProjectUpdate />} />
          <Route path="project/:projectId/gallery" element={<ProjectGallery />} />
          <Route path="project/hero" element={<ProjectHero />} />
          <Route path="project/portfolio" element={<ProjectPortfolio />} />

          <Route path="service/hero" element={<ServiceHero />} />
          <Route path="service/what-we-offer" element={<ServiceWhatWeOffer />} />
          <Route path="service/list" element={<ServiceList />} />
          <Route path="service/insert" element={<ServiceInsert />} />
          <Route path="service/update/:id" element={<ServiceUpdate />} />
          <Route path="service/:id/section-01" element={<ServiceInnerSection01 />} />
          <Route path="service/:id/section-01/bullets" element={<ServiceInnerSection01Bullets />} />
          <Route path="service/:id/section-01/bullets/:bulletId" element={<ServiceInnerSection01Bullets />} />
          <Route path="service/:id/section-02" element={<ServiceInnerSection02 />} />
          <Route path="service/:id/section-03" element={<ServiceInnerSection03 />} />

          <Route path="contact/hero" element={<ContactHero />} />
          <Route path="contact/form" element={<ContactForm />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

function App() {
  return (
    <>
    <LocalizationProvider>
      <Router>
        <LayoutWrapper />
        <AdminLayoutWrapper />        
      </Router>
    </LocalizationProvider>
    </>
  );
}

export default App;
