import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLocalization } from "@/contexts/LocalizationContext";
import { Facebook, Instagram, Linkedin, Send, Twitter } from "lucide-react";
import { handleFormSubmission } from "@/lib/axios";

const ContactForm = ({ form, social }) => {
  const { isRTL } = useLocalization();
  const sectionRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await handleFormSubmission(e, '/contact');
    setLoading(false);
  };

  // Animation variants
  const leftVariants = {
    hidden: { opacity: 0, x: -80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
    },
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-16 md:py-24 min-h-screen bg-gradient-to-br from-amber-50/10 via-orange-50/10 to-red-50/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={leftVariants}
            className="space-y-8"
          >
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-primary text-green-primary leading-tight`}>
              {form?.title}
            </h2>

            <p className="text-gray-600 font-light leading-relaxed max-w-md text-lg">
              {form?.subtitle}
            </p>

            <div className="flex space-x-4">
              <motion.a
                target="_blank"
                href={social.facebook}
                aria-label="Facebook"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 bg-green-primary rounded-full flex items-center justify-center text-white shadow-md hover:bg-golden-primary transition-colors duration-300"
              >
                <Facebook className="w-6 h-6" />
              </motion.a>
              <motion.a
                target="_blank"
                href={social.twitter}
                aria-label="Twitter"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 bg-green-primary rounded-full flex items-center justify-center text-white shadow-md hover:bg-golden-primary transition-colors duration-300"
              >
                <Twitter className="w-6 h-6" />
              </motion.a>
              <motion.a
                target="_blank"
                href={social.instagram}
                aria-label="Instagram"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 bg-green-primary rounded-full flex items-center justify-center text-white shadow-md hover:bg-golden-primary transition-colors duration-300"
              >
                <Instagram className="w-6 h-6" />
              </motion.a>
              <motion.a
                target="_blank"
                href={social.linkedin}
                aria-label="Facebook"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 bg-green-primary rounded-full flex items-center justify-center text-white shadow-md hover:bg-golden-primary transition-colors duration-300"
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>                                          
            </div>
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={rightVariants}
            className="bg-[#fdf8f3] rounded-xl p-8 md:p-10"
          >
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-md font-light text-golden-green mb-1">
                    {isRTL ? "الاسم" : "Name"}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 rounded-xs border border-gray-300 focus:border-golden-primary focus:ring-0 focus:ring-green-primary/20 transition-all duration-200 outline-none font-light"
                    placeholder={isRTL ? "الاسم" : "Name"}
                  />
                  <span class="text-rose-500 field-error error-name">&nbsp;</span>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-md font-light text-golden-green mb-1">
                    {isRTL ? "البريد الإلكتروني" : "Email Address"}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 rounded-xs border border-gray-300 focus:border-golden-primary focus:ring-0 focus:ring-green-primary/20 transition-all duration-200 outline-none font-light"
                    placeholder={isRTL ? "البريد الإلكتروني" : "Email Address"}
                  />
                  <span class="text-rose-500 field-error error-email">&nbsp;</span>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-md font-light text-golden-green mb-1">
                    {isRTL ? "رقم الهاتف" : "Contact Number"}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-2 rounded-xs border border-gray-300 focus:border-golden-primary focus:ring-0 focus:ring-green-primary/20 transition-all duration-200 outline-none font-light"
                    placeholder={isRTL ? "رقم الهاتف" : "Contact Number"}
                  />
                  <span class="text-rose-500 field-error error-phone">&nbsp;</span>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-md font-light text-golden-green mb-1">
                    {isRTL ? "الموضوع" : "Subject"}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-2 rounded-xs border border-gray-300 focus:border-golden-primary focus:ring-0 focus:ring-green-primary/20 transition-all duration-200 outline-none font-light"
                    placeholder={isRTL ? "الموضوع" : "Subject"}
                  />
                  <span class="text-rose-500 field-error error-subject">&nbsp;</span>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-md font-light text-golden-green mb-1">
                  {isRTL ? "الموضوع" : "Subject"}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-2 rounded-xs border border-gray-300 focus:border-golden-primary focus:ring-0 focus:ring-green-primary/20 transition-all duration-200 outline-none font-light resize-none"
                  placeholder={isRTL ? "الموضوع" : "Subject"}
                />
                <span class="text-rose-500 field-error error-message">&nbsp;</span>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.05 }}
                  whileTap={{ scale: loading ? 1 : 0.95 }}
                  className="btn-primary w-[50%] flex gap-2 items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{loading ? 'Sending...' : (isRTL ? "إرسال الرسالة" : "Send Message")}</span>
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;