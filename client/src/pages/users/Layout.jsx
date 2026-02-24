import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { useLocalization } from "@/contexts/LocalizationContext";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Copyright, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

// ============ REUSABLE DROPDOWN COMPONENT ============
const NavDropdown = ({
  label,
  items,
  isActive,
  isMobile = false,
  onItemClick,
  link = null
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null); // To store timeout ID

  // Hover Open
  const handleMouseEnter = () => {
    const id = setTimeout(() => {
      setIsOpen(true);
    }, 300); 
    setTimeoutId(id);
  };

  // Hover Leave - cancel timeout & close dropdown
  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsOpen(false);
  };

  if (isMobile) {
    // Mobile: Click to toggle
    const toggleDropdown = () => {
      setIsOpen(prev => !prev);
    };

    return (
      <div className="w-full">
        <button
          onClick={toggleDropdown}
          className={`theme-nav-link-mobile flex items-center justify-center w-full ${isActive ? "active-mobile" : ""}`}
        >
          <span>{label}</span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="bg-gray-50 py-2">
            {items.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="block px-8 py-2 text-gray-700 hover:bg-green-primary hover:text-white transition-colors"
                onClick={onItemClick}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Desktop: Hover with 1s delay
  return (
    <div
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`theme-nav-link flex items-center ${isActive ? "active" : ""}`}
      // Remove onClick from desktop
      >
        {link ? (
          <Link to={link}>{label}</Link>
        ) : (
          <span>{label}</span>
        )}
        <svg
          className={`w-4 h-4 ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Desktop Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 animate-fadeIn">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="block px-4 py-2 text-gray-700 hover:bg-green-primary hover:text-white transition-colors"
              onClick={() => setIsOpen(false)} // Close on item click
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

// ============ MAIN LAYOUT COMPONENT ============
const Layout = ({ children, active }) => {
  const { isRTL } = useLocalization();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [social, setSocial] = useState([]);

  useEffect(() => {
    fetchSocialDetails();
  }, [isRTL]);

  const fetchSocialDetails = async () => {
    try {
      const response = await axiosInstance.get("/home/social");
      setSocial(response.data.social || []);
    } catch (error) {
      toast.error("Failed to load social details");
      console.log(error);
    }
  };  

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 z-100 w-[100%]" style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}>
        {/* Navigation */}
        <nav className="z-50 px-4 sm:px-8 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo - Responsive */}
            <Link to='/' className="flex items-center space-x-3">
              <div className="w-[120px] sm:w-[100px] md:w-[150px] flex items-center justify-center py-2">
                <img src="/assets/logo/logo.png" alt="Logo" className="w-full h-auto" />
              </div>
            </Link>

            {/* Desktop Navigation Menu */}
            <div className="hidden md:flex items-center">
              <Link
                to="/"
                className={`theme-nav-link ${active === "home" ? "active" : ""}`}
              >
                {isRTL ? "الرئيسية" : "Home"} 
              </Link>
              <Link
                to="/about"
                className={`theme-nav-link ${active === "about" ? "active" : ""}`}
              >
                {isRTL ? "نبذة عامة" : "About Us"}
              </Link>
              <Link
                to="/projects"
                className={`theme-nav-link ${active === "projects" ? "active" : ""}`}
              >
                {isRTL ? "مشاريعنا" : "Projects"}
              </Link>
              <Link
                to="/services"
                className={`theme-nav-link ${active === "services" ? "active" : ""}`}
              >
                {isRTL ? "خدماتنا" : "Services"}
              </Link>                            

              {/* Projects Dropdown - Desktop */}
              {/* <NavDropdown
                link='/projects'
                label={isRTL ? "المشاريع" : "Projects"}
                items={destinationItems}
                isActive={active === "projects"}
              /> */}

              {/* Services Dropdown - Desktop */}
              {/* <NavDropdown
                link='/services'
                label={isRTL ? "‫الخدمات‬" : "Services"}
                items={serviceItems}
                isActive={active === "services"}
              /> */}

              {/* Pages Dropdown - Desktop (Example - aap isko uncomment kar sakte ho) */}
              {/* <NavDropdown
                label="Pages"
                items={pagesItems}
                isActive={active === "pages"}
              /> */}

              <Link to="/contact" className={`hover:bg-golden-primary ${active === 'contact' ? `bg-golden-primary` : `bg-green-primary`} text-xl text-white me-5 font-primary px-6 py-2 rounded-full transition-all duration-300 shadow-lg theme-nav-link-btn`}>
                {isRTL ? "تواصل معنا" : "Contact Us"}
              </Link>
              <LanguageSwitcher />
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`md:hidden w-full absolute flex-col items-center bg-white md:static top-20 left-0 right-0 shadow-lg transition-all duration-300 ${isMobileMenuOpen ? 'flex' : 'hidden'}`}>
              <Link
                to="/"
                className={`theme-nav-link-mobile ${active === "home" ? "active-mobile" : ""}`}
                onClick={closeMobileMenu}
              >
                {isRTL ? "الرئيسية" : "Home"} 
              </Link>
              <Link
                to="/about"
                className={`theme-nav-link-mobile ${active === "about" ? "active-mobile" : ""}`}
                onClick={closeMobileMenu}
              >
                {isRTL ? "نبذة عامة" : "About Us"}
              </Link>

              <Link
                to="/projects"
                className={`theme-nav-link-mobile ${active === "projects" ? "active-mobile" : ""}`}
                onClick={closeMobileMenu}
              >
                {isRTL ? "مشاريعنا" : "Projects"}
              </Link>

              <Link
                to="/services"
                className={`theme-nav-link-mobile ${active === "services" ? "active-mobile" : ""}`}
                onClick={closeMobileMenu}
              >
                {isRTL ? "خدماتنا" : "Services"}
              </Link>                            

              {/* Projects Dropdown - Mobile */}
              {/* <NavDropdown
                label={isRTL ? "المشاريع" : "Projects"}
                items={destinationItems}
                isActive={active === "projects"}
                isMobile={true}
                onItemClick={closeMobileMenu}
              /> */}

              {/* Projects Services - Mobile */}
              {/* <NavDropdown
                label={isRTL ? "‫الخدمات‬" : "Services"}
                items={destinationItems}
                isActive={active === "services"}
                isMobile={true}
                onItemClick={closeMobileMenu}
              /> */}

              {/* Pages Dropdown - Mobile (Example - aap isko uncomment kar sakte ho) */}
              {/* <NavDropdown
                label="Pages"
                items={pagesItems}
                isActive={active === "pages"}
                isMobile={true}
                onItemClick={closeMobileMenu}
              /> */}

              <Link
                to="/contact"
                className={`theme-nav-link-mobile ${active === "contact" ? "active-mobile" : ""}`}
                onClick={closeMobileMenu}
              >
                {isRTL ? "تواصل معنا" : "Contact Us"}
              </Link>
              {/* Mobile Language Switcher & Contact Button */}
              {/* <div className="w-full px-4 py-4 space-y-3">
                <div className="flex justify-center">
                  <LanguageSwitcher />
                </div>
                <button className="w-full bg-green-primary  hover:bg-golden-primary text-white font-primary px-6 py-3 rounded-full transition-all duration-300 shadow-lg">
                  {isRTL ? "اتصل بنا" : "Contact Us"}
                </button>
              </div> */}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={toggleMobileMenu}
                className=" text-brown-900 focus:outline-none z-50"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
              <LanguageSwitcher />
            </div>

          </div>
        </nav>
      </header>
      <main>{children}</main>

      {/* Footer */}
      <footer className="relative text-white">
        <div className="footer-wave-top">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path style={{ fill: "#fafaf9", transform: "rotateY(0deg)", "transformOrigin": "center" }} d="M737.9,94.7L0,0v100h1000V0L737.9,94.7z"></path>
          </svg>
        </div>
        <div
          style={{ direction: "ltr", left: 0, lineHeight: 0, overflow: "hidden", position: "absolute", width: "100%", top: "-1px", transform: "rotate(180deg)" }}
        >
          <svg
            style={{ display: "block", left: "50%", position: "relative", zIndex: -1, width: "calc(100% + 1.3px)", height: "20px", transform: "translateX(-50%) rotateY(180deg)" }}
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path fill="white" className="elementor-shape-fill" d="M737.9,94.7L0,0v100h1000V0L737.9,94.7z"></path>
          </svg>
        </div>

        <div className="relative bg-center bg-cover" style={{ backgroundImage: `url('/assets/others/07.png')`, backgroundPosition: "top", backgroundSize: "cover", backgroundAttachment: "fixed", height: "100%" }}>
          <div className="absolute inset-0 bg-green-primary/85"></div>
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zM10 10c11.046 0 20 8.954 20 20s-8.954 20-20 20-20-8.954-20-20 8.954-20 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              <div className="lg:col-span-1 md:col-span-2">
                <div className="mb-6">
                  <img src="/assets/logo/logo-white.png" alt="Afniah Plus Logo" className="w-32 md:w-40 h-auto" />
                </div>
                <p className="text-sm text-white leading-relaxed font-light max-w-xs">
                  {social?.tagline}
                </p>
              </div>

              <div>
                <h4 className="text-lg font-primary text-white mb-6">{isRTL ? "الصفحات" : "Pages"}</h4>
                <ul className="space-y-3">
                  <li><a href="/" className="text-sm text-white font-primary font-light  hover:underline transition-colors duration-200">{isRTL ? "الرئيسية" : "Home"} </a></li>
                  <li><a href="/about" className="text-sm text-white font-primary font-light  hover:underline transition-colors duration-200">{isRTL ? "نبذة عامة" : "About Us"}</a></li>
                  <li><a href="/projects" className="text-sm text-white font-primary font-light  hover:underline transition-colors duration-200">{isRTL ? "مشاريعنا" : "Projects"}</a></li>
                  <li><a href="/services" className="text-sm text-white font-primary font-light  hover:underline transition-colors duration-200">{isRTL ? "خدماتنا" : "Services"}</a></li>
                  <li><a href="/contact" className="text-sm text-white font-primary font-light  hover:underline transition-colors duration-200">{isRTL ? "تواصل معنا" : "Contact Us"}</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-primary text-white mb-6">{isRTL ? "الموقع" : "Location"}</h4>
                <div className="space-y-3">
                  <p className="text-sm text-white font-primary transition-colors font-light duration-200">{social?.address}</p>
                  <p className="text-sm">
                    <a href="mailto:info@afnps.com" className="text-sm text-white font-primary  font-light hover:underline transition-colors duration-200">info@afnps.com</a>
                  </p>
                  <p className="text-sm">
                    <a href="tel:+966138893060" className="text-sm text-white font-primary font-light  hover:underline transition-colors duration-200">{social?.contact}</a>
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-primary text-white mb-6">{isRTL ? "تابعنا" : "Follow Us"}</h4>
                <ul className="space-y-3">
                  <li>
                    <a href={`${social.facebook}`} target="_blank" className="text-sm text-white font-primary font-light  hover:underline transition-colors duration-200 flex gap-2 items-center text-left">
                      <Facebook className="w-4" />
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href={`${social.twitter}`} target="_blank" className="text-sm text-white font-primary font-light  hover:underline transition-colors duration-200 flex gap-2 items-center text-left">
                    <svg
                      className="w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 256"
                      width={30}
                      height={30}
                      fillRule="nonzero"
                    >
                      <g
                        fill="#ffffff"
                        fillRule="nonzero"
                        stroke="none"
                        strokeWidth={1}
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        strokeMiterlimit={10}
                        strokeDasharray="none"
                        strokeDashoffset={0}
                        style={{ mixBlendMode: "normal" }}
                      >
                        <g transform="scale(8.53333 8.53333)">
                          <path d="M26.37,26l-8.795,-12.822l0.015,0.012l7.93,-9.19h-2.65l-6.46,7.48l-5.13,-7.48h-6.95l8.211,11.971l-0.001,-0.001l-8.66,10.03h2.65l7.182,-8.322l5.708,8.322zM10.23,6l12.34,18h-2.1l-12.35,-18z" />
                        </g>
                      </g>
                    </svg>
                    Twitter
                    </a>
                  </li>
                  <li>
                    <a href={`${social.instagram}`} target="_blank" className="text-sm text-white font-primary font-light  hover:underline transition-colors duration-200 flex gap-2 items-center text-left">
                      <Instagram className="w-4" />
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href={`${social.linkedin}`} target="_blank" className="text-sm text-white font-primary font-light  hover:underline transition-colors duration-200 flex gap-2 items-center text-left">
                      <Linkedin className="w-4" />
                      Linkedin
                    </a>
                  </li>                                                      
                </ul>
              </div>
            </div>

            <div className="border-t border-white/20 mt-12 mb-8"></div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-white/80 flex justify-center items-center gap-2"><Copyright /><span>{new Date().getFullYear()} {social?.copyright_credits}</span></div>
              <div className="flex items-center gap-6">
                <a href="#" className="text-sm text-white/80 hover:text-white transition-colors duration-200">{isRTL ? "سياسة الخصوصية" : "Privacy Policy"}</a>
                <a href="#" className="text-sm text-white/80 hover:text-white transition-colors duration-200">{isRTL ? "الشروط والأحكام" : "Terms & Conditions"}</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;