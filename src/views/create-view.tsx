"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.svg";
import LogoAppa from "@/assets/logo_appa.webp";
import LogoKlop from "@/assets/logo_klop.webp";
import LogoPhotodump from "@/assets/logo_photodump.webp";
import LogoFinans from "@/assets/logo_finans.webp";
import LogoDrowzee from "@/assets/logo_drowzee.webp";
import LogoPanglima from "@/assets/logo_panglima.webp";
import LogoKeythicc from "@/assets/logo_keythicc.webp";
import LogoSibook from "@/assets/logo_sibook.webp";

export function CreateView() {
  const [currentNav, setCurrentNav] = useState("create");
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [pageDirection, setPageDirection] = useState(0); // 1 for down, -1 for up
  const [isNavigating, setIsNavigating] = useState(false);
  const [clickedLink, setClickedLink] = useState("");
  const [hoveredFooterNav, setHoveredFooterNav] = useState<string | null>(null);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [animationsReady, setAnimationsReady] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesLoadedCount = useRef(0);
  const totalImages = 8; // Total number of logos we're loading

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

  // Animation variants with more reliable timing
  const containerVariants = {
    hidden: (direction: number) => ({
      opacity: 0,
      y: 50, // Reduced from 100 for smoother entry
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
        staggerChildren: 0.12, // Reduced from 0.2 for more consistent timing
        type: "spring",
        stiffness: 100, // Reduced for more consistent behavior
        damping: 20, // Adjusted for cross-browser consistency
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
        stiffness: 100, // Lower value for consistency
        damping: 15,
        duration: 0.5,
      },
    },
  };

  // Navigation transition variants - simplified for consistency
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
      y: direction > 0 ? -50 : 50, // Reduced
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.5,
      },
    }),
  };

  // Navigation items that will be passed to CircularBurger
  const navItems = [
    { label: "create", path: "/" },
    { label: "bio", path: "/bio" },
    { label: "contact", path: "mailto:alifdimasius@gmail.com" },
  ];

  const handleNavClick = (navItem: string) => {
    // Skip if already navigating or clicking the current nav
    if (isNavigating || navItem === currentNav) return;

    // Special handling for mailto links
    if (navItem === "contact") {
      window.location.href = "mailto:alifdimasius@gmail.com";
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

  // Define the page route for each navigation item
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
      {/* Rest of the content - only visible when animationReady is true */}
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
                        whileHover={{ scale: 1.1 }}
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
                    stuff i've made so far that i want to talk about
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    some for work but all are ultimately to develop myself
                    further
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    all in different stages of my learning process
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                  >
                    webs and apps
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

      {/* Start of Project Cards Section */}
      <AnimatePresence mode="wait" custom={pageDirection}>
        {animationReady && (
          <motion.div
            className="grid grid-cols-4 gap-2 w-full text-xs text-gray-500 uppercase mt-2 h-[30rem]"
            initial={{ opacity: 0, y: 50 }} // Reduced from 100
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.2, // Slight delay for sequence
                type: "spring",
                stiffness: 100,
                damping: 20,
                when: "beforeChildren",
                staggerChildren: 0.08, // Reduced for consistency
              },
            }}
            exit={{
              opacity: 0,
              y: -50, // Reduced
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
              className="bg-white h-full rounded-2xl p-2 hover:bg-black hover:text-white transition-colors duration-500 group relative flex justify-center items-center"
              variants={{
                hidden: { y: 30, opacity: 0 },
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
                exit: {
                  y: -20,
                  opacity: 0,
                  transition: { duration: 0.3 },
                },
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <p className="absolute top-2 left-2">appa academy</p>
              <Image
                src={LogoAppa.src}
                alt="Logo"
                width={150}
                height={150}
                className="transition-all duration-500 group-hover:filter group-hover:brightness-0 group-hover:invert"
                onLoad={handleImageLoaded}
              />
            </motion.div>

            <motion.div
              className="flex flex-col gap-2 h-full"
              variants={{
                hidden: { y: 50, opacity: 0 },
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
                exit: {
                  y: -20,
                  opacity: 0,
                  transition: { duration: 0.3 },
                },
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                className="bg-white flex-1 rounded-2xl p-2 hover:bg-black hover:text-white transition-colors duration-500 group relative flex justify-center items-center"
                variants={{
                  hidden: { y: 30, opacity: 0 },
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
                  exit: {
                    y: -20,
                    opacity: 0,
                    transition: { duration: 0.3 },
                  },
                }}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <p className="absolute top-2 left-2">klop</p>
                <Image
                  src={LogoKlop.src}
                  alt="Logo"
                  width={150}
                  height={150}
                  className="transition-all duration-500 group-hover:filter group-hover:brightness-0 group-hover:invert"
                  onLoad={handleImageLoaded}
                />
              </motion.div>
              <motion.div
                className="bg-white flex-1 rounded-2xl p-2 hover:bg-black hover:text-white transition-colors duration-500 group relative flex justify-center items-center"
                variants={{
                  hidden: { y: 30, opacity: 0 },
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
                  exit: {
                    y: -20,
                    opacity: 0,
                    transition: { duration: 0.3 },
                  },
                }}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <p className="absolute top-2 left-2">photodump station</p>
                <Image
                  src={LogoPhotodump.src}
                  alt="Logo"
                  width={115}
                  height={115}
                  className="transition-all duration-500 group-hover:filter group-hover:brightness-0 group-hover:invert"
                  onLoad={handleImageLoaded}
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="flex flex-col gap-2 h-full"
              variants={{
                hidden: { y: 50, opacity: 0 },
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
                exit: {
                  y: -20,
                  opacity: 0,
                  transition: { duration: 0.3 },
                },
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                className="bg-white flex-1 rounded-2xl p-2 hover:bg-black hover:text-white transition-colors duration-500 group relative flex justify-center items-center"
                variants={{
                  hidden: { y: 30, opacity: 0 },
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
                  exit: {
                    y: -20,
                    opacity: 0,
                    transition: { duration: 0.3 },
                  },
                }}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <p className="absolute top-2 left-2">drowzee</p>
                <Image
                  src={LogoDrowzee.src}
                  alt="Logo"
                  width={90}
                  height={90}
                  className="transition-all duration-500 group-hover:filter group-hover:brightness-0 group-hover:invert"
                  onLoad={handleImageLoaded}
                />
              </motion.div>
              <motion.div
                className="bg-white flex-1 rounded-2xl p-2 hover:bg-black hover:text-white transition-colors duration-500 group relative flex justify-center items-center"
                variants={{
                  hidden: { y: 30, opacity: 0 },
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
                  exit: {
                    y: -20,
                    opacity: 0,
                    transition: { duration: 0.3 },
                  },
                }}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <p className="absolute top-2 left-2">finans</p>
                <Image
                  src={LogoFinans.src}
                  alt="Logo"
                  width={100}
                  height={100}
                  className="transition-all duration-500 group-hover:filter group-hover:brightness-0 group-hover:invert"
                  onLoad={handleImageLoaded}
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="flex flex-col gap-2 h-full"
              variants={{
                hidden: { y: 50, opacity: 0 },
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
                exit: {
                  y: -20,
                  opacity: 0,
                  transition: { duration: 0.3 },
                },
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                className="bg-white flex-1 rounded-2xl p-2 hover:bg-black hover:text-white transition-colors duration-500 group relative flex justify-center items-center"
                variants={{
                  hidden: { y: 30, opacity: 0 },
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
                  exit: {
                    y: -20,
                    opacity: 0,
                    transition: { duration: 0.3 },
                  },
                }}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <p className="absolute top-2 left-2">panglima ekspres</p>
                <Image
                  src={LogoPanglima.src}
                  alt="Logo"
                  width={50}
                  height={50}
                  className="transition-all duration-500 group-hover:filter group-hover:brightness-0 group-hover:invert"
                  onLoad={handleImageLoaded}
                />
              </motion.div>
              <motion.div
                className="bg-white flex-1 rounded-2xl p-2 hover:bg-black hover:text-white transition-colors duration-500 group relative flex justify-center items-center"
                variants={{
                  hidden: { y: 30, opacity: 0 },
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
                  exit: {
                    y: -20,
                    opacity: 0,
                    transition: { duration: 0.3 },
                  },
                }}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <p className="absolute top-2 left-2">keythicc</p>
                <Image
                  src={LogoKeythicc.src}
                  alt="Logo"
                  width={100}
                  height={100}
                  className="transition-all duration-500 group-hover:filter group-hover:brightness-0 group-hover:invert"
                  onLoad={handleImageLoaded}
                />
              </motion.div>
              <motion.div
                className="bg-white flex-1 rounded-2xl p-2 hover:bg-black hover:text-white transition-colors duration-500 group relative flex justify-center items-center"
                variants={{
                  hidden: { y: 30, opacity: 0 },
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
                  exit: {
                    y: -20,
                    opacity: 0,
                    transition: { duration: 0.3 },
                  },
                }}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <p className="absolute top-2 left-2">si-book</p>
                <Image
                  src={LogoSibook.src}
                  alt="Logo"
                  width={100}
                  height={100}
                  className="transition-all duration-500 group-hover:filter group-hover:brightness-0 group-hover:invert"
                  onLoad={handleImageLoaded}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* End of Project Cards Section */}

      {/* Contact / Footer Section */}
      <AnimatePresence mode="wait" custom={pageDirection}>
        {animationReady && (
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
                  Preoccupied with a single leaf, you won't see the tree
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  Preoccupied with a single tree, you'll miss the entire forest
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  - Takehiko Inoue on Vagabond
                </motion.p>
              </div>
              <div>
                {/* Footer Navigation */}
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
                        whileHover={{ scale: 1.1 }}
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
