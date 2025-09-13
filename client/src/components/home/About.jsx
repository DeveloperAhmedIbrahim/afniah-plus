"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const About = () => {
  // Ref aur inView hook
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* Top Bar Features */}
      <section className="py-12 bg-brown-300">
        <motion.div
          ref={ref}
          className="font-primary flex flex-col md:flex-row justify-between px-20 gap-20 md:mt-0 mt-3"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
            hidden: {},
          }}
        >
          {[
            { img: "/assets/icons/02.webp", text: "Expert local guides" },
            { img: "/assets/icons/03.webp", text: "Iconic historical sites" },
            { img: "/assets/icons/01.png", text: "Authentic experiences" },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center gap-3"
            >
              <img src={item.img} alt="Icon" width={40} />
              <div className="text-2xl">{item.text}</div>
            </motion.div>
          ))}

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-3"
          >
            <button className="bg-brown-900 hover:bg-brown-800 text-xl text-white font-primary px-6 py-3 rounded-full transition-all duration-300 shadow-lg">
              Why Choose Us
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Main About Section */}
      <section>
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-8 lg:p-16">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Side - Main Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ staggerChildren: 0.3 }}
              className="space-y-8"
            >
              {/* Logo/Icon */}
              <motion.div variants={fadeUp}>
                <img src="/assets/icons/04.webp" width={100} alt="Icon" />
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                variants={fadeUp}
                className="text-4xl lg:text-5xl font-primary text-brown-900 leading-tight"
              >
                Why Travel With Soleya Egypt
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={fadeUp}
                className="text-lg text-gray-600 leading-relaxed max-w-lg"
              >
                Ullamco laboris nisi ut aliquip ex ea commodo consequat minim
                veniam. Voluptate reprehenderit in dolore cillum fugiat nulla
                pariatur esse velit. Sint occaecat cupidatat excepteur sunt
                culpa officia deserunt anim mollit.
              </motion.p>

              {/* CTA Button */}
              <motion.button
                variants={fadeUp}
                className="bg-brown-900 hover:bg-brown-800 font-primary text-white px-8 py-4 rounded-full text-lg font-medium transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Meet Our Travel Philosophy
              </motion.button>
            </motion.div>

            {/* Right Side - Features */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ staggerChildren: 0.3 }}
              className="space-y-12"
            >
              {/* Feature 1 */}
              <motion.div
                variants={fadeUp}
                className="flex items-start space-x-6 bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg">
                    <img
                      src="/assets/others/01.jpg"
                      alt="Market scene"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-serif text-gray-900 mb-3">
                    Authentic Experiences
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Explore Egypt with locally rooted itineraries and real
                    cultural.
                  </p>
                </div>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                variants={fadeUp}
                className="flex items-start space-x-6 bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg">
                    <img
                      src="/assets/others/02.jpg"
                      alt="Temple with guides"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-serif text-gray-900 mb-3">
                    Expert Local Guides
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Be guided by passionate locals who bring ancient history to
                    life.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
