import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { useLocalization } from "@/contexts/LocalizationContext";
import React, { useState } from "react";
import { Link } from "react-router-dom";

// ============ REUSABLE DROPDOWN COMPONENT ============
const NavDropdown = ({ 
  label, 
  items, 
  isActive, 
  isMobile = false,
  onItemClick 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  if (isMobile) {
    // Mobile Dropdown
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        
        {/* Mobile Submenu */}
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

  // Desktop Dropdown
  return (
    <div 
      className="relative group"
      // onMouseEnter={() => setIsOpen(true)}
      // onMouseLeave={() => setIsOpen(false)}
    >
      <button
        onClick={toggleDropdown}
        className={`theme-nav-link flex items-center ${isActive ? "active" : ""}`}
      >
        {label}
        <svg
          className={`w-4 h-4 ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
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
  const { t, isRTL } = useLocalization();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Destination dropdown items
  const destinationItems = [
    { label: "Cairo", link: "/destination/cairo" },
    { label: "Luxor", link: "/destination/luxor" },
    { label: "Aswan", link: "/destination/aswan" },
    { label: "Alexandria", link: "/destination/alexandria" },
  ];

  const serviceItems = [
    { label: t('service.photography'), link: "/service/photography" },
    { label: t('service.documentation'), link: "/service/documentation" },
    { label: t('service.graphic'), link: "/service/graphic-designing" },
    { label: t('service.illustration'), link: "/service/illustration" },
    { label: t('service.calligraphy'), link: "/service/calligraphy" },
    { label: t('service.content'), link: "/service/content-development" },
    { label: t('service.publishing'), link: "/service/publishing" },
    { label: t('service.printing-press'), link: "/service/press-inspection" },
    { label: t('service.rendering'), link: "/service/3d-redering" },
  ];  

  // Pages dropdown items (example - aap isko bhi use kar sakte ho)
  const pagesItems = [
    { label: "Gallery", link: "/gallery" },
    { label: "Tours", link: "/tours" },
    { label: "FAQ", link: "/faq" },
    { label: "Testimonials", link: "/testimonials" },
  ];

  return (
    <>
      <header className="absolute z-100 w-[100%]" style={{backgroundColor: "rgba(255, 255, 255, 0.7)"}}>
        {/* Navigation */}
        <nav className="z-50 px-4 sm:px-8 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo - Responsive */}
            <div className="flex items-center space-x-3">
              <div className="w-[120px] sm:w-[100px] md:w-[150px] flex items-center justify-center py-2">
                <img src="/assets/logo/logo.png" alt="Logo" className="w-full h-auto" />
              </div>
            </div>

            {/* Desktop Navigation Menu */}
            <div className="hidden md:flex items-center">
              <Link
                to="/"
                className={`theme-nav-link ${active === "home" ? "active" : ""}`}
              >
                {t("nav.home")}
              </Link>
              <Link
                to="/about"
                className={`theme-nav-link ${active === "about" ? "active" : ""}`}
              >
                {t("nav.about")}
              </Link>
              
              {/* Projects Dropdown - Desktop */}
              <NavDropdown
                label={t("nav.projects")}
                items={destinationItems}
                isActive={active === "projects"}
              />

              {/* Services Dropdown - Desktop */}
              <NavDropdown
                label={t("nav.services")}
                items={serviceItems}
                isActive={active === "services"}
              />

              {/* Pages Dropdown - Desktop (Example - aap isko uncomment kar sakte ho) */}
              {/* <NavDropdown
                label="Pages"
                items={pagesItems}
                isActive={active === "pages"}
              /> */}

              <button className="bg-green-primary hover:bg-golden-primary text-xl text-white me-5 font-primary px-6 py-2 rounded-full transition-all duration-300 shadow-lg theme-nav-link-btn">
                {t("nav.contact")}
              </button>
              <LanguageSwitcher />              
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`md:hidden w-full absolute flex-col items-center bg-white md:static top-20 left-0 right-0 shadow-lg transition-all duration-300 ${isMobileMenuOpen ? 'flex' : 'hidden'}`}>
              <Link 
                to="/" 
                className={`theme-nav-link-mobile ${active === "home" ? "active-mobile" : ""}`}
                onClick={closeMobileMenu}
              >
                {t("nav.home")}
              </Link>
              <Link 
                to="/about" 
                className={`theme-nav-link-mobile ${active === "about" ? "active-mobile" : ""}`}
                onClick={closeMobileMenu}
              >
                {t("nav.about")}
              </Link>
              
              {/* Projects Dropdown - Mobile */}
              <NavDropdown
                label={t("nav.projects")}
                items={destinationItems}
                isActive={active === "projects"}
                isMobile={true}
                onItemClick={closeMobileMenu}
              />

              {/* Projects Services - Mobile */}
              <NavDropdown
                label={t("nav.services")}
                items={destinationItems}
                isActive={active === "services"}
                isMobile={true}
                onItemClick={closeMobileMenu}
              />              

              {/* Pages Dropdown - Mobile (Example - aap isko uncomment kar sakte ho) */}
              {/* <NavDropdown
                label="Pages"
                items={pagesItems}
                isActive={active === "pages"}
                isMobile={true}
                onItemClick={closeMobileMenu}
              /> */}

              <Link 
                to="/about" 
                className={`theme-nav-link-mobile ${active === "about" ? "active-mobile" : ""}`}
                onClick={closeMobileMenu}
              >
                {t("nav.contact")}
              </Link>
              {/* Mobile Language Switcher & Contact Button */}
              {/* <div className="w-full px-4 py-4 space-y-3">
                <div className="flex justify-center">
                  <LanguageSwitcher />
                </div>
                <button className="w-full bg-green-primary  hover:bg-golden-primary text-white font-primary px-6 py-3 rounded-full transition-all duration-300 shadow-lg">
                  {t("nav.contact")}
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
            <path style={{fill: "#fafaf9", transform: "rotateY(0deg)", "transformOrigin": "center"}} d="M737.9,94.7L0,0v100h1000V0L737.9,94.7z"></path>
          </svg>
        </div>
        <div 
          style={{direction: "ltr", left: 0, lineHeight: 0, overflow: "hidden", position: "absolute", width: "100%", top: "-1px", transform: "rotate(180deg)"}}
        >
          <svg 
            style={{display: "block", left: "50%", position: "relative", zIndex: -1, width: "calc(100% + 1.3px)", height: "20px", transform: "translateX(-50%) rotateY(180deg)"}}
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path fill="white" className="elementor-shape-fill" d="M737.9,94.7L0,0v100h1000V0L737.9,94.7z"></path>
          </svg>
        </div>

        <div className="relative bg-center bg-cover" style={{backgroundImage: `url('/assets/hero/1.png')`, backgroundPosition: "top", backgroundSize: "cover",  backgroundAttachment: "fixed", height: "100%"}}>
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
                  {t('footer.tag')}
                </p>
              </div>

              <div>
                <h4 className="text-lg font-primary text-white mb-6">{t('common.pages')}</h4>
                <ul className="space-y-3">
                  <li><a href="/" className="text-sm text-white font-primary font-light  hover:underline transition-colors duration-200">{t('nav.home')}</a></li>
                  <li><a href="/" className="text-sm text-white font-primary font-light  hover:underline transition-colors duration-200">{t('nav.about')}</a></li>
                  <li><a href="/" className="text-sm text-white font-primary font-light  hover:underline transition-colors duration-200">{t('nav.projects')}</a></li>
                  <li><a href="/" className="text-sm text-white font-primary font-light  hover:underline transition-colors duration-200">{t('nav.services')}</a></li>
                  <li><a href="/" className="text-sm text-white font-primary font-light  hover:underline transition-colors duration-200">{t('nav.contact')}</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-primary text-white mb-6">{t('common.location')}</h4>
                <div className="space-y-3">
                  <p className="text-sm text-white font-primary transition-colors font-light duration-200">{t('footer.address')}</p>
                  <p className="text-sm">
                    <a href="mailto:info@afnps.com" className="text-sm text-white font-primary  font-light hover:underline transition-colors duration-200">info@afnps.com</a>
                  </p>
                  <p className="text-sm">
                    <a href="tel:+966138893060" className="text-sm text-white font-primary font-light  hover:underline transition-colors duration-200">+966 13 889 3060</a>
                  </p>                  
                </div>
              </div>

              <div>
                <h4 className="text-lg font-primary text-white mb-6">{t('common.followUs')}</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-sm text-white font-primary font-light  hover:underline transition-colors duration-200">Facebook</a></li>
                  <li><a href="#" className="text-sm text-white font-primary font-light  hover:underline transition-colors duration-200">Twitter</a></li>
                  <li><a href="#" className="text-sm text-white font-primary font-light  hover:underline transition-colors duration-200">Instagram</a></li>
                  <li><a href="#" className="text-sm text-white font-primary font-light  hover:underline transition-colors duration-200">Youtube</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/20 mt-12 mb-8"></div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-white/80">©{new Date().getFullYear()} Afniah Plus</div>
              <div className="flex items-center gap-6">
                <a href="#" className="text-sm text-white/80 hover:text-white transition-colors duration-200">{t('nav.privacyPolocy')}</a>
                <a href="#" className="text-sm text-white/80 hover:text-white transition-colors duration-200">{t('nav.termsAndConditions')}</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;