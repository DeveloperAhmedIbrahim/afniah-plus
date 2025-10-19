import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { useLocalization } from "@/contexts/LocalizationContext";
import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children, active }) => {
  const { t, isRTL } = useLocalization();
  return (
    <>
      <header className="absolute z-100 w-[100%]">
        {/* Navigation */}
        <nav className="z-50 px-20 sm:px-8 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-[100px] h-[-291px] bg-white flex items-center justify-center">
                <img src="/assets/logo/logo-white.png" alt="Logo" />
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="hidden md:flex items-center">
              <Link
                to="/"
                className={
                  "theme-nav-link " + (active === "home" ? "active" : "")
                }
              >
                {t("nav.home")}
              </Link>
              <Link
                to="/about"
                className={
                  "theme-nav-link " + (active === "about" ? "active" : "")
                }
              >
                {t("nav.about")}
              </Link>
              <div className="relative group">
                <Link
                  to="/destination"
                  className={
                    "theme-nav-link flex items-center " +
                    (active === "destination" ? "active" : "")
                  }
                >
                  {t("nav.destination")}
                  <svg
                    className="w-4 h-4 ml-1"
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
                </Link>
              </div>
              <LanguageSwitcher />              
              <button className="bg-brown-900 hover:bg-brown-800 text-xl text-white mx-5 font-primary px-6 py-3 rounded-full transition-all duration-300   shadow-lg">
                {t("nav.contact")}
              </button>
            </div>

            {/* Navigation Menu */}
            <div className="md:hidden w-[100%] absolute flex-col md:flex-row items-center bg-white md:static top-20 left-0 right-0">
              <Link to="/" className="theme-nav-link-mobile active">
                Home
              </Link>
              <Link to="/about" className="theme-nav-link-mobile">
                About Us
              </Link>
              <div className="theme-nav-link-mobile relative group">
                <Link to="/destination" className="flex items-center">
                  Destinations
                  <svg
                    className="w-4 h-4 ml-1"
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
                </Link>
              </div>
              <div className="theme-nav-link-mobile relative group">
                <a href="#" className="flex items-center">
                  Pages
                  <svg
                    className="w-4 h-4 ml-1"
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
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-brown-900 focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </nav>
      </header>
      <main>{children}</main>
      {/* Footer Integrated */}
      <footer className="relative text-white">
        {/* Curved SVG Top Edge - Subtle wave like original */}
        <div 
          className=""
          style={{direction: "ltr", left: 0, "line-height": 0, overflow: "hidden", position: "absolute", width: "100%", top: "-1px", transform: "rotate(180deg)"}}
        >
            <svg 
              style={{display: "block", left: "50%", position: "relative", "z-index": -1, width: "calc(100% + 1.3px)", height: "20px", transform: "translateX(-50%) rotateY(180deg)"}}
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
              <path fill="white" class="elementor-shape-fill" d="M737.9,94.7L0,0v100h1000V0L737.9,94.7z"></path>
            </svg>
        </div>

        {/* Main Footer Background */}
        <div
          className="relative bg-center bg-cover"
          style={{
            backgroundImage: `url('/assets/others/03.jpg')`,
          }}
        >
          {/* Brown Overlay - Less opacity to show pattern */}
          <div className="absolute inset-0 bg-[#6b3b22]/85"></div>

          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zM10 10c11.046 0 20 8.954 20 20s-8.954 20-20 20-20-8.954-20-20 8.954-20 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          {/* Footer Content */}
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {/* Logo + Description */}
              <div className="lg:col-span-1 md:col-span-2">
                <div className="mb-6">
                  <img
                    src="/assets/logo/logo-white.png"
                    alt="Soleya Egypt Logo"
                    className="w-32 md:w-40 h-auto"
                  />
                </div>
                <p className="text-sm text-white/90 leading-relaxed max-w-xs">
                  Soleya Egypt is more than a tour company — we are
                  storytellers, stewards, and your local connection.
                </p>
              </div>

              {/* Inner Pages */}
              <div>
                <h4 className="text-lg font-serif text-[#D4AF37] mb-6">
                  Inner Pages
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="/about-us"
                      className="text-sm text-white/90 hover:text-[#D4AF37] transition-colors duration-200"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="/destinations"
                      className="text-sm text-white/90 hover:text-[#D4AF37] transition-colors duration-200"
                    >
                      Destinations
                    </a>
                  </li>
                  <li>
                    <a
                      href="/blog"
                      className="text-sm text-white/90 hover:text-[#D4AF37] transition-colors duration-200"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact"
                      className="text-sm text-white/90 hover:text-[#D4AF37] transition-colors duration-200"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              {/* Location */}
              <div>
                <h4 className="text-lg font-serif text-[#D4AF37] mb-6">
                  Location
                </h4>
                <div className="space-y-3">
                  <p className="text-sm text-white/90">
                    Soleya Egypt HQ - Cairo, Egypt
                  </p>
                  <p className="text-sm">
                    <a
                      href="mailto:info@example.com"
                      className="text-white/90 hover:text-[#D4AF37] transition-colors duration-200"
                    >
                      info@example.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Follow Us */}
              <div>
                <h4 className="text-lg font-serif text-[#D4AF37] mb-6">
                  Follow Us
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="text-sm text-white/90 hover:text-[#D4AF37] transition-colors duration-200"
                    >
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-white/90 hover:text-[#D4AF37] transition-colors duration-200"
                    >
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-white/90 hover:text-[#D4AF37] transition-colors duration-200"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-white/90 hover:text-[#D4AF37] transition-colors duration-200"
                    >
                      Youtube
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/20 mt-12 mb-8"></div>

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-white/80">
                ©{new Date().getFullYear()} Soleya Egypt Elementor Template Kit
              </div>

              <div className="flex items-center gap-6">
                <a
                  href="/faq"
                  className="text-sm text-white/80 hover:text-white transition-colors duration-200"
                >
                  Faq
                </a>
                <a
                  href="/privacy-policy"
                  className="text-sm text-white/80 hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms"
                  className="text-sm text-white/80 hover:text-white transition-colors duration-200"
                >
                  Terms & Conditions
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;
