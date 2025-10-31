import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLocalization } from "@/contexts/LocalizationContext";
import { Facebook, Twitter, Youtube, Instagram, Send } from "lucide-react";

const ContactForm = () => {
  const { t } = useLocalization();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Integrate with your backend/API (e.g., EmailJS, Formspree, etc.)
    console.log("Form submitted:", formData);
    alert("Message sent! (Demo - integrate real submission)");
    // Reset form
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
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

  const socialIcons = [
    { Icon: Facebook, label: "Facebook", href: "#" },
    { Icon: Twitter, label: "Twitter", href: "#" },
    { Icon: Youtube, label: "YouTube", href: "#" },
    { Icon: Instagram, label: "Instagram", href: "#" },
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-16 md:py-24 min-h-screen bg-gradient-to-br from-amber-50/10 via-orange-50/10 to-red-50/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side: Title, Description, Social Icons */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={leftVariants}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-primary text-green-primary leading-tight">
              {t("contact.form.title")}
            </h2>

            <p className="text-gray-600 font-light leading-relaxed max-w-md text-lg">
              {t("contact.form.desc") ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."}
            </p>

            <div className="flex space-x-4">
              {socialIcons.map(({ Icon, label, href }, idx) => (
                <motion.a
                  key={idx}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-green-primary rounded-full flex items-center justify-center text-white shadow-md hover:bg-golden-primary transition-colors duration-300"
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={rightVariants}
            className="bg-[#fdf8f3] rounded-xl p-8 md:p-10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-md font-light text-golden-green mb-1">
                    {t("contact.form.name")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-xs border border-gray-300 focus:border-golden-primary focus:ring-0 focus:ring-green-primary/20 transition-all duration-200 outline-none font-light"
                    placeholder={t("contact.form.name")}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-md font-light text-golden-green mb-1">
                    {t("contact.form.email")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-xs border border-gray-300 focus:border-golden-primary focus:ring-0 focus:ring-green-primary/20 transition-all duration-200 outline-none font-light"
                    placeholder={t("contact.form.email")}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-md font-light text-golden-green mb-1">
                    {t("contact.form.phone")}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xs border border-gray-300 focus:border-golden-primary focus:ring-0 focus:ring-green-primary/20 transition-all duration-200 outline-none font-light"
                    placeholder={t("contact.form.phone")}
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-md font-light text-golden-green mb-1">
                    {t("contact.form.subject")}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-xs border border-gray-300 focus:border-golden-primary focus:ring-0 focus:ring-green-primary/20 transition-all duration-200 outline-none font-light"
                    placeholder={t("contact.form.subject")}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-md font-light text-golden-green mb-1">
                  {t("contact.form.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 rounded-xs border border-gray-300 focus:border-golden-primary focus:ring-0 focus:ring-green-primary/20 transition-all duration-200 outline-none font-light resize-none"
                  placeholder={t("contact.form.message")}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary w-[50%] flex gap-2 items-center justify-center"
                >
                    <span>{t("contact.form.send")}</span>
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