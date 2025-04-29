import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [isLogoFlipped, setIsLogoFlipped] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const footerRef = useRef(null);

  // Particle background initialization
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: "-100vh" },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  // Email validation
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setEmail("");
      setEmailError(false);
      alert("Subscribed successfully!");
    } else {
      setEmailError(true);
      setTimeout(() => setEmailError(false), 1000);
    }
  };

  // Scroll to top with fallback
  const scrollToTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
      // Fallback for constrained environments
      document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
      document.body.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Scroll to top failed:", error);
      // Manual scroll fallback
      window.scrollTo(0, 0);
    }
  };

  // Parallax effect
  const handleMouseMove = (e) => {
    if (footerRef.current) {
      const rect = footerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setParallax({ x: x * 10, y: y * 10 });
    }
  };

  // College activities
  const activities = [
    { name: "National Moot Court", desc: "Compete in prestigious legal simulations." },
    { name: "PowerPoint Competition", desc: "Showcase innovative legal presentations." },
    { name: "Debate Competition", desc: "Sharpen your argumentative skills." },
    { name: "Research Club", desc: "Engage in cutting-edge legal research." },
    { name: "Legal Aid Programme", desc: "Provide free legal assistance to the community." },
    { name: "National Conference", desc: "Engage with legal scholars nationwide." },
    { name: "Social Gathering", desc: "Foster community and camaraderie." },
    { name: "Anti-Ragging", desc: "Promote a safe and inclusive campus." },
    { name: "Samvidhan Sandesh Rally", desc: "Spread constitutional awareness." },
  ];

  return (
    <motion.div
      ref={footerRef}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onMouseMove={handleMouseMove}
      style={{
        transform: `perspective(1000px) rotateX(${parallax.y}deg) rotateY(${parallax.x}deg)`,
        transformStyle: "preserve-3d",
      }}
      className="relative flex flex-col items-center justify-center py-12 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950 text-center px-4 overflow-hidden border-t-4 border-gradient-to-r from-indigo-600 to-purple-600 animate-gradient"
    >
      {/* Particle Background */}
      <Particles
        id="footer-particles"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          particles: {
            number: { value: 70, density: { enable: true, value_area: 800 } },
            color: { value: ["#ffffff", "#a78bfa", "#f472b6", "#4ade80"] },
            shape: {
              type: ["circle", "image"],
              image: [
                { src: "https://cdn-icons-png.flaticon.com/32/10268/10268904.png", width: 32, height: 32 },
                { src: "https://cdn-icons-png.flaticon.com/32/3143/3143466.png", width: 32, height: 32 },
              ],
            },
            opacity: { value: 0.5, random: true },
            size: { value: 4, random: true },
            move: {
              enable: true,
              speed: 2.5,
              direction: "none",
              random: true,
              out_mode: "out",
            },
          },
          interactivity: {
            events: {
              onhover: { enable: true, mode: "bubble" },
              onclick: { enable: true, mode: "push" },
            },
            modes: {
              bubble: { distance: 120, size: 6, duration: 2, opacity: 0.8 },
              push: { quantity: 5 },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />

      {/* 3D Cartoon Logo */}
      <motion.div
        variants={childVariants}
        className="relative w-28 h-28 mb-6 cursor-pointer z-10"
        onClick={() => {
          setIsModalOpen(true);
          setIsLogoFlipped(!isLogoFlipped);
        }}
        whileHover={{ scale: 1.15, boxShadow: "0px 0px 25px rgba(79, 70, 229, 0.6)" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <motion.div
          animate={{ rotateY: isLogoFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
          className="w-full h-full"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/10268/10268904.png"
            alt="Manikchand Pahade Law College Logo"
            className="absolute w-full h-full drop-shadow-2xl backface-hidden"
            style={{ backfaceVisibility: "hidden" }}
            title="Click to learn more"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/3143/3143466.png"
            alt="Manikchand Pahade Law College Alternate Logo"
            className="absolute w-full h-full drop-shadow-2xl"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            title="Click to learn more"
          />
        </motion.div>
      </motion.div>

      {/* Footer Title */}
      <motion.h1
        variants={childVariants}
        className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700 dark:from-indigo-300 dark:to-purple-300 mb-4 z-10"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        Manikchand Pahade Law College
      </motion.h1>

      {/* Contact Details */}
      <motion.div
        variants={childVariants}
        className="text-md md:text-lg text-gray-800 dark:text-gray-200 mb-6 max-w-lg z-10"
        style={{ fontFamily: "'Open Sans', sans-serif" }}
      >
        <p>NAAC Re-accredited B+</p>
        <p>Nirala Bazar, Samarth Nagar, Aurangabad 431001</p>
        <div className="flex flex-col md:flex-row md:space-x-4 justify-center">
          <motion.a
            href="tel:+912402336621"
            whileHover={{ scale: 1.1, color: "#4f46e5", rotateX: 10 }}
            className="hover:underline"
            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
          >
            Office: (0240) 2336621
          </motion.a>
          <motion.a
            href="tel:+912402341146"
            whileHover={{ scale: 1.1, color: "#4f46e5", rotateX: 10 }}
            className="hover:underline"
            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
          >
            Principal: (0240) 2341146
          </motion.a>
          <motion.a
            href="mailto:mplawcollege@gmail.com"
            whileHover={{ scale: 1.1, color: "#4f46e5", rotateX: 10 }}
            className="hover:underline"
            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
          >
            mplawcollege@gmail.com
          </motion.a>
        </div>
      </motion.div>

      {/* College Activities */}
      <motion.div
        variants={childVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 max-w-4xl z-10"
      >
        {activities.map((activity) => (
          <motion.div
            key={activity.name}
            className="relative bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5, boxShadow: "0px 0px 20px rgba(79, 70, 229, 0.4)" }}
            transition={{ duration: 0.3 }}
            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
          >
            <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">{activity.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{activity.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Social Links */}
      <motion.div
        variants={childVariants}
        className="flex space-x-6 mb-6 z-10"
      >
        {[
          { name: "Twitter", icon: "https://cdn-icons-png.flaticon.com/512/733/733579.png", url: "https://twitter.com" },
          { name: "LinkedIn", icon: "https://cdn-icons-png.flaticon.com/512/174/174857.png", url: "https://linkedin.com" },
          { name: "Facebook", icon: "https://cdn-icons-png.flaticon.com/512/733/733547.png", url: "https://facebook.com" },
        ].map((social) => (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.3,
              boxShadow: "0px 0px 15px rgba(79, 70, 229, 0.5)",
              rotateX: 10,
            }}
            whileTap={{ scale: 0.9 }}
            className="relative text-gray-800 dark:text-gray-200 group"
            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
            title={social.name}
          >
            <img
              src={social.icon}
              alt={`${social.name} Icon`}
              className="w-8 h-8 hover:opacity-80 transition-opacity"
            />
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-xs py-1 px-2 rounded"
            >
              {social.name}
            </motion.span>
          </motion.a>
        ))}
      </motion.div>

      {/* Newsletter Signup */}
      <motion.form
        variants={childVariants}
        onSubmit={handleEmailSubmit}
        className="mb-6 w-full max-w-sm z-10"
      >
        <motion.div
          animate={emailError ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Subscribe to our newsletter"
            className="flex-grow px-4 py-2 text-gray-800 dark:text-gray-200 bg-transparent outline-none"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          />
          <motion.button
            type="submit"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 10px rgba(79, 70, 229, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-r-full"
          >
            Subscribe
          </motion.button>
        </motion.div>
      </motion.form>

      {/* Back to Top Button */}
      <motion.div
        variants={childVariants}
        className="relative mb-6 z-10"
      >
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(79, 70, 229, 0.5)", rotateY: 360 }}
          whileTap={{ scale: 0.95 }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-full"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          Back to Top
        </motion.button>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-xs py-1 px-2 rounded"
        >
          Scroll to Top
        </motion.span>
      </motion.div>

      {/* Copyright */}
      <motion.p
        variants={childVariants}
        className="text-sm text-gray-600 dark:text-gray-400 z-10"
        style={{ fontFamily: "'Open Sans', sans-serif" }}
      >
        © {new Date().getFullYear()} M.P. Law College Aurangabad. Hosted by: Sun Infosystem
      </motion.p>

      {/* Modal */}
      {isModalOpen && (
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-4">
              Manikchand Pahade Law College
            </h2>
            <p className="text-gray-800 dark:text-gray-200 mb-2">
              <strong>NAAC:</strong> Re-accredited B+
            </p>
            <p className="text-gray-800 dark:text-gray-200 mb-2">
              <strong>Address:</strong> Nirala Bazar, Samarth Nagar, Aurangabad 431001
            </p>
            <p className="text-gray-800 dark:text-gray-200 mb-2">
              <strong>Phone:</strong> Office: (0240) 2336621, Principal: (0240) 2341146
            </p>
            <p className="text-gray-800 dark:text-gray-200 mb-2">
              <strong>Email:</strong>{" "}
              <a href="mailto:mplawcollege@gmail.com" className="underline">
                mplawcollege@gmail.com
              </a>
            </p>
            <p className="text-gray-800 dark:text-gray-200 mb-2">
              <strong>Established:</strong> 1956
            </p>
            <p className="text-gray-800 dark:text-gray-200 mb-4">
              <strong>Placement Cell:</strong> Proudly placed students with Infosys, Videocon, Mahindra, and LIC.
            </p>
            <p className="text-gray-800 dark:text-gray-200 mb-4">
              The oldest law college in Marathwada, founded by Marathwada Legal & General Education Society, dedicated to fostering legal excellence and integrity.
            </p>
            <motion.button
              onClick={() => setIsModalOpen(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 text-white px-4 py-2 rounded-full"
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Footer;