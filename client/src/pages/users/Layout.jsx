import { useLocalization } from "@/contexts/LocalizationContext";
import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children, active }) => {
  const { t, isRTL } = useLocalization();
  return (
    <>
      <header>
        {/* Navigation */}
        <nav className="z-50 px-20 sm:px-8 bg-white backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-[100px] h-[-291px] bg-white flex items-center justify-center">
                <img src="/assets/logo/logo.webp" alt="Logo" />
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
                {t('nav.home')}
              </Link>
              <Link
                to="/about"
                className={
                  "theme-nav-link " + (active === "about" ? "active" : "")
                }
              >
                {t('nav.about')}
              </Link>
              <div className="relative group">
                <Link
                  to="/destination"
                  className={
                    "theme-nav-link flex items-center " +
                    (active === "destination" ? "active" : "")
                  }
                >
                  {t('nav.destination')}
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
              <Link
                to="/contact"
                className={
                  "theme-nav-link " + (active === "contact" ? "active" : "")
                }
              >
                {t('nav.contact')}
              </Link>
              <button className="bg-brown-900 hover:bg-brown-800 text-xl text-white mx-5 font-primary px-6 py-3 rounded-full transition-all duration-300   shadow-lg">
                {t('nav.planning')}
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
              <Link to="/contact" className="theme-nav-link-mobile">
                Contact
              </Link>
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
        {/* Top slanted SVG to mimic the angled edge */}
        <div className="absolute inset-x-0 -top-1 pointer-events-none">
          <svg
            viewBox="0 0 100 10"
            preserveAspectRatio="none"
            className="w-full h-8"
            aria-hidden="true"
          >
            <polygon fill="#6b3b22" points="0,10 100,0 100,10" />
          </svg>
        </div>

        {/* Background image + overlay */}
        <div
          className="relative bg-center bg-cover"
          style={{
            backgroundImage: `url('/assets/others/03.jpg')`,
          }}
        >
          {/* Overlay color (brown) */}
          <div className="absolute inset-0 bg-[#6b3b22]/90"></div>

          {/* Content */}
          <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Logo + description (left) */}
              <div className="lg:col-span-4">
                <div className="flex items-start gap-4">
                  <img src='/assets/logo/logo.webp' alt="Soleya Logo" className="w-36 md:w-44" />
                </div>

                <p className="mt-6 text-sm text-white/90 max-w-sm leading-relaxed">
                  Soleya Egypt is more than a tour company — we are
                  storytellers, stewards, and your local connection.
                </p>
              </div>

              {/* Inner Pages */}
              <div className="lg:col-span-2">
                <h4 className="text-lg font-serif mb-4">Inner Pages</h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a href="/about-us" className="hover:underline">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="/destinations" className="hover:underline">
                      Destinations
                    </a>
                  </li>
                  <li>
                    <a href="/blog" className="hover:underline">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="hover:underline">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              {/* Location */}
              <div className="lg:col-span-3">
                <h4 className="text-lg font-serif mb-4">Location</h4>
                <p className="text-sm text-white/90">
                  Soleya Egypt HQ - Cairo, Egypt
                </p>
                <p className="mt-3 text-sm">
                  <a href="mailto:info@example.com" className="hover:underline">
                    info@example.com
                  </a>
                </p>
              </div>

              {/* Follow Us */}
              <div className="lg:col-span-3">
                <h4 className="text-lg font-serif mb-4">Follow Us</h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a href="#" className="hover:underline">
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Youtube
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Divider line */}
            <div className="border-t border-white/20 mt-12"></div>

            {/* Bottom row: copyright + small links */}
            <div className="mt-6 flex flex-col md:flex-row items-center justify-between text-sm text-white/90 gap-4">
              <div>
                ©{new Date().getFullYear()} Soleya Egypt Elementor Template Kit
              </div>
              <div className="flex items-center gap-6">
                <a href="/faq" className="hover:underline">
                  Faq
                </a>
                <a href="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </a>
                <a href="/terms" className="hover:underline">
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
