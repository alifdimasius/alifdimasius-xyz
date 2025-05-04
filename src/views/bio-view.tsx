"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logo.svg";
import Mountain from "@/assets/mountain.webp";
import VibrantSolemn from "@/assets/vibrant_solemn.webp";
import Lights from "@/assets/lights.webp";

export function BioView() {
  const [currentNav, setCurrentNav] = useState("bio");
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [hoveredFooterNav, setHoveredFooterNav] = useState<string | null>(null);
  const [pageDirection, setPageDirection] = useState(0); // 1 for down, -1 for up
  const [isNavigating, setIsNavigating] = useState(false);
  const [clickedLink, setClickedLink] = useState("");

  useEffect(() => {
    // Force scroll to top on component mount
    window.scrollTo(0, 0);

    // Optional: prevent scrolling during initial animations
    document.body.style.overflow = "hidden";

    // Re-enable scrolling after animations complete
    const timer = setTimeout(() => {
      document.body.style.overflow = "";
    }, 1500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: (direction: number) => ({
      opacity: 0,
      y: 300, // Start from bottom for initial load
    }),
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: (direction: number) => ({
      y: -100, // Always exit upward
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    }),
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20,
      },
    },
  };

  // Navigation transition variants
  const pageVariants = {
    initial: (direction: any) => ({
      y: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: (direction: any) => ({
      y: direction > 0 ? -300 : 300,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    }),
  };

  // Navigation items that will be passed to CircularBurger
  const navItems = [
    { label: "create", path: "/" },
    { label: "bio", path: "/bio" },
    { label: "contact", path: "mailto:anemail@email.com" },
  ];

  const handleNavClick = (navItem: string) => {
    // Skip if already navigating or clicking the current nav
    if (isNavigating || navItem === currentNav) return;

    // Special handling for mailto links
    if (navItem === "contact") {
      window.location.href = "mailto:anemail@email.com";
      return;
    }

    // Determine direction based on the current and next nav items
    const currentIndex = navItems.findIndex(
      (item) => item.label === currentNav
    );
    const nextIndex = navItems.findIndex((item) => item.label === navItem);

    // Set direction: positive for moving down the list, negative for moving up
    const direction = nextIndex > currentIndex ? 1 : -1;
    setPageDirection(direction);
    setCurrentNav(navItem);

    // Set navigating state to trigger exit animation
    setIsNavigating(true);

    // Store the clicked link for later use
    setClickedLink(navItem);
  };

  // Define the page route for each navigation item (kept for compatibility)
  const routes = {
    create: "/",
    bio: "/bio",
    contact: "mailto:anemail@email.com",
  };

  return (
    <div className="w-full relative">
      <AnimatePresence
        mode="wait"
        custom={pageDirection}
        onExitComplete={() => {
          // This ensures navigation only happens after exit animation is complete
          if (clickedLink && routes[clickedLink as keyof typeof routes]) {
            window.location.href = routes[clickedLink as keyof typeof routes];
          }
        }}
      >
        {!isNavigating && (
          <motion.div
            key="main-container"
            className="bg-white p-5 rounded-2xl font-semibold text-lg flex flex-col justify-between h-80 w-full relative overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={pageDirection}
          >
            {/* Top Part */}
            <motion.div
              className="flex justify-between"
              variants={itemVariants}
            >
              <div>
                <motion.p
                  className="text-3xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  Alif Dimasius
                </motion.p>
              </div>
              <div>
                {/* Navigation */}
                <div className="flex items-center gap-5">
                  {navItems.map((item, index) => (
                    <Link
                      key={item.label}
                      href={item.path}
                      onClick={(e) => {
                        // Prevent default Next.js navigation
                        e.preventDefault();
                        handleNavClick(item.label);
                      }}
                      className={`relative cursor-pointer group flex items-center ${
                        currentNav === item.label
                          ? "text-black"
                          : "text-gray-500"
                      }`}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.15 + index * 0.05,
                          duration: 0.3,
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onHoverStart={() => setHoveredNav(item.label)}
                        onHoverEnd={() => setHoveredNav(null)}
                        className="flex items-center"
                      >
                        <p>{item.label}</p>
                        {(hoveredNav === item.label ||
                          (hoveredNav === null &&
                            currentNav === item.label)) && (
                          <motion.div
                            className={`absolute bottom-0 left-0 w-full h-0.5 ${
                              hoveredNav === item.label
                                ? "bg-gray-500"
                                : "bg-black"
                            }`}
                            layoutId="navIndicator"
                            initial={false}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 30,
                            }}
                          />
                        )}
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Bottom Part (this is used for bio) */}
            <AnimatePresence mode="wait" custom={pageDirection}>
              <motion.div
                key={currentNav}
                className="text-xl"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={pageDirection}
              >
                <>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    aspiring designer and developer
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    currently a learner in Apple Developer Academy @ BINUS -
                    Bali
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    also a software engineer for APPA Technologies
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                  >
                    also does freelance web and apps
                  </motion.p>
                </>
              </motion.div>
            </AnimatePresence>

            {/* Watermark */}
            <motion.div
              className="absolute opacity-1 bottom-5 right-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.05 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Logo height={40} className="opacity-50" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait" custom={pageDirection}>
        {!isNavigating && (
          <motion.div
            className="grid grid-cols-3 gap-2 mt-2"
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.3,
                type: "spring",
                stiffness: 300,
                damping: 30,
                when: "beforeChildren",
                staggerChildren: 0.1,
              },
            }}
            exit={{
              opacity: 0,
              y: -50,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                when: "afterChildren",
                staggerChildren: 0.05,
                staggerDirection: -1,
              },
            }}
            custom={pageDirection}
          >
            <motion.div
              className="overflow-hidden rounded-2xl"
              variants={{
                hidden: { y: 30, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { type: "spring", stiffness: 400, damping: 20 },
                },
                exit: { y: -20, opacity: 0, transition: { duration: 0.2 } },
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              <Image
                src={Lights.src}
                alt="Lights"
                height={1600}
                width={900}
                className="rounded-2xl w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
            <motion.div
              className="overflow-hidden rounded-2xl"
              variants={{
                hidden: { y: 30, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 20,
                    delay: 0.1,
                  },
                },
                exit: { y: -20, opacity: 0, transition: { duration: 0.2 } },
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              <Image
                src={VibrantSolemn.src}
                alt="Vibrant Solemn"
                height={1600}
                width={900}
                className="rounded-2xl w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
            <motion.div
              className="overflow-hidden rounded-2xl"
              variants={{
                hidden: { y: 30, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 20,
                    delay: 0.2,
                  },
                },
                exit: { y: -20, opacity: 0, transition: { duration: 0.2 } },
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              <Image
                src={Mountain.src}
                alt="Mountain"
                height={1600}
                width={900}
                className="rounded-2xl w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact / Footer Section */}
      <AnimatePresence mode="wait" custom={pageDirection}>
        {!isNavigating && (
          <motion.div
            key="footer-container"
            className="bg-white p-5 rounded-2xl font-semibold text-lg flex flex-col justify-between h-80 mt-2 w-full relative overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={pageDirection}
          >
            <motion.div
              className="flex justify-between"
              variants={itemVariants}
            >
              <div className="text-2xl">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  It's time for you to look inward, and start asking yourself
                  the big questions.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  Who are you? And what do you want?
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  - Uncle Iroh from Avatar: The Last Airbender
                </motion.p>
              </div>
              <div>
                {/* Footer Navigation with separate hover state */}
                <div className="flex items-center gap-5">
                  {navItems.map((item, index) => (
                    <Link
                      key={`footer-${item.label}`}
                      href={item.path}
                      onClick={(e) => {
                        // Prevent default Next.js navigation
                        e.preventDefault();
                        handleNavClick(item.label);
                      }}
                      className={`relative cursor-pointer group flex items-center ${
                        currentNav === item.label
                          ? "text-black"
                          : "text-gray-500"
                      }`}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.15 + index * 0.05,
                          duration: 0.3,
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onHoverStart={() => setHoveredFooterNav(item.label)}
                        onHoverEnd={() => setHoveredFooterNav(null)}
                        className="flex items-center"
                      >
                        <p>{item.label}</p>
                        {(hoveredFooterNav === item.label ||
                          (hoveredFooterNav === null &&
                            currentNav === item.label)) && (
                          <motion.div
                            className={`absolute bottom-0 left-0 w-full h-0.5 ${
                              hoveredFooterNav === item.label
                                ? "bg-gray-500"
                                : "bg-black"
                            }`}
                            layoutId="footerNavIndicator"
                            initial={false}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 30,
                            }}
                          />
                        )}
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Bottom Part */}
            <motion.div
              key="footer-content"
              className="text-xl"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={pageDirection}
            >
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                i'm based in Bali 🌴 and open to collaborations and projects.
              </motion.p>
            </motion.div>

            {/* Watermark */}
            <motion.div
              className="absolute opacity-1 bottom-5 right-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.05 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Logo height={40} className="opacity-50" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
