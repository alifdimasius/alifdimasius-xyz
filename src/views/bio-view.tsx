"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Logo from "@/assets/logo.svg";
import { NavigationLinks } from "@/components/navigation";
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
  const [pageLoaded, setPageLoaded] = useState(false);
  const [animationsReady, setAnimationsReady] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesLoadedCount = useRef(0);
  const totalImages = 3; // Mountain, VibrantSolemn, Lights

  // Track image loading completion
  const handleImageLoaded = () => {
    imagesLoadedCount.current += 1;
    if (imagesLoadedCount.current >= totalImages) {
      setImagesLoaded(true);
    }
  };

  useEffect(() => {
    // Force scroll to top on component mount
    window.scrollTo(0, 0);

    // Prevent scrolling during initial animations
    document.body.style.overflow = "hidden";

    // Set a longer delay for animations as per user feedback (700ms)
    const timer1 = setTimeout(() => {
      setPageLoaded(true);
    }, 100); // First detect DOM ready

    // Then wait longer before allowing animations to start
    const timer2 = setTimeout(() => {
      setAnimationsReady(true);
    }, 700); // Critical delay for Chrome compatibility

    // Re-enable scrolling after animations complete
    const timer3 = setTimeout(() => {
      document.body.style.overflow = "";
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      document.body.style.overflow = "";
    };
  }, []);

  // Animation variants with improved cross-browser consistency
  const containerVariants = {
    hidden: (direction: number) => ({
      opacity: 0,
      y: 50, // Reduced for smoother entry
      transition: {
        type: "spring",
        duration: 0.5,
      },
    }),
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.12, // Reduced stagger time
        type: "spring",
        stiffness: 100, // Lower for consistency
        damping: 20,
        duration: 0.7,
      },
    },
    exit: (direction: number) => ({
      y: -50, // Reduced for smoother exit
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.5,
      },
    }),
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 }, // Reduced from 30
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.5,
      },
    },
  };

  // Navigation transition variants - simplified
  const pageVariants = {
    initial: (direction: any) => ({
      y: direction > 0 ? 50 : -50, // Reduced from 300
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    }),
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.7,
      },
    },
    exit: (direction: any) => ({
      y: direction > 0 ? -50 : 50,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.5,
      },
    }),
  };

  const handleNavClick = (navItem: string) => {
    // Skip if already navigating or clicking the current nav
    if (isNavigating || navItem === currentNav) return;

    // Special handling for mailto links
    if (navItem === "contact") {
      window.location.href = "mailto:alifdimasius@gmail.com";
      return;
    }

    // Navigation items for direction calculation
    const navItems = [
      { label: "create", path: "/" },
      { label: "bio", path: "/bio" },
      { label: "contact", path: "mailto:alifdimasius@gmail.com" },
    ];

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
    contact: "mailto:alifdimasius@gmail.com",
  };

  // Animation ready state - only animate when everything is properly loaded
  // Updated to include the longer delay from animationsReady
  const animationReady = pageLoaded && animationsReady && !isNavigating;

  return (
    <div className="w-full relative">
      {/* Optional loading indicator that shows while animationsReady is false */}
      {/*
      <AnimatePresence>
        {pageLoaded && !animationsReady && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-50 flex items-center justify-center"
          >

          </motion.div>
        )}
      </AnimatePresence>
      */}

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
        {animationReady && (
          <motion.div
            key="main-container"
            className="bg-white p-5 rounded-2xl font-semibold text-lg flex flex-col justify-between h-60 lg:h-80 w-full relative overflow-hidden"
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
                  className="texl-xl lg:text-3xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  Alif Dimasius
                </motion.p>
              </div>
              <div>
                {/* Navigation */}
                <NavigationLinks
                  currentNav={currentNav}
                  hoveredNav={hoveredNav}
                  setHoveredNav={setHoveredNav}
                  handleNavClick={handleNavClick}
                  layoutId="navIndicator"
                />
              </div>
            </motion.div>

            {/* Bottom Part (this is used for bio) */}
            <AnimatePresence mode="wait" custom={pageDirection}>
              <motion.div
                key={currentNav}
                className="text-sm lg:text-xl"
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
        {animationReady && (
          <motion.div
            className="grid grid-cols-3 gap-2 mt-2"
            initial={{ opacity: 0, y: 30 }} // Reduced from 50
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.2, // Slight delay for sequence
                type: "spring",
                stiffness: 100,
                damping: 20,
                when: "beforeChildren",
                staggerChildren: 0.08,
              },
            }}
            exit={{
              opacity: 0,
              y: -30, // Reduced from -50
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
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
                hidden: { y: 20, opacity: 0 }, // Reduced from 30
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    duration: 0.5,
                  },
                },
                exit: { y: -10, opacity: 0, transition: { duration: 0.2 } }, // Reduced from -20
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
                onLoad={handleImageLoaded}
                priority
              />
            </motion.div>
            <motion.div
              className="overflow-hidden rounded-2xl"
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    delay: 0.05, // Reduced from 0.1
                    duration: 0.5,
                  },
                },
                exit: { y: -10, opacity: 0, transition: { duration: 0.2 } },
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
                onLoad={handleImageLoaded}
                priority
              />
            </motion.div>
            <motion.div
              className="overflow-hidden rounded-2xl"
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    delay: 0.1, // Reduced from 0.2
                    duration: 0.5,
                  },
                },
                exit: { y: -10, opacity: 0, transition: { duration: 0.2 } },
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
                onLoad={handleImageLoaded}
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact / Footer Section */}
      <AnimatePresence mode="wait" custom={pageDirection}>
        {animationReady && (
          <motion.div
            key="footer-container"
            className="bg-white p-5 rounded-2xl font-semibold flex flex-col justify-between h-60 lg:h-80 mt-2 w-full relative overflow-hidden"
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
              <div className="hidden lg:block text-sm lg:text-2xl">
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
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  Who are you? And what do you want?
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  - Uncle Iroh from Avatar: The Last Airbender
                </motion.p>
              </div>
              <div className="block lg:hidden text-sm lg:text-2xl"></div>
              <div>
                {/* Footer Navigation */}
                <NavigationLinks
                  currentNav={currentNav}
                  hoveredNav={hoveredFooterNav}
                  setHoveredNav={setHoveredFooterNav}
                  handleNavClick={handleNavClick}
                  layoutId="footerNavIndicator"
                />
              </div>
            </motion.div>

            <motion.div>
              <div className="block lg:hidden text-sm lg:text-2xl">
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
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  Who are you? And what do you want?
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  - Uncle Iroh from Avatar: The Last Airbender
                </motion.p>
              </div>
            </motion.div>

            {/* Bottom Part */}
            <motion.div
              key="footer-content"
              className="text-sm lg:text-xl"
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
                i'm based in Bali and open to collaborations and projects.
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
