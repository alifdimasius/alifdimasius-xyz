"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    // Force scroll to top on component mount
    window.scrollTo(0, 0);

    // Optional: prevent scrolling during initial animations
    document.body.style.overflow = "hidden";

    // Re-enable scrolling after animations complete (adjust timing as needed)
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
      y: 100, // Reduced from 300 to minimize layout shifts
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
    { label: "create" },
    { label: "bio" },
    { label: "contact" },
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

  // Define the page route for each navigation item
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
                  {navItems.slice(0, 4).map((item, index) => (
                    <motion.div
                      key={item.label}
                      onClick={() => handleNavClick(item.label)}
                      className={`relative cursor-pointer ${
                        currentNav === item.label
                          ? "text-black"
                          : "text-gray-500"
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + index * 0.05, duration: 0.3 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onHoverStart={() => setHoveredNav(item.label)}
                      onHoverEnd={() => setHoveredNav(null)}
                    >
                      {/* We hide the actual link but it's there for SEO */}
                      <Link
                        href={routes[item.label as keyof typeof routes]}
                        style={{ display: "none" }}
                        aria-hidden="true"
                        tabIndex={-1}
                      >
                        {item.label}
                      </Link>
                      <p>{item.label}</p>
                      {(hoveredNav === item.label ||
                        (hoveredNav === null && currentNav === item.label)) && (
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
              {/* <Image src={LogoUrl} alt="Logo" width={20} height={20} /> */}
              <Logo height={40} className="opacity-50" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Start of Project Cards Section */}
      <AnimatePresence mode="wait" custom={pageDirection}>
        {!isNavigating && (
          <motion.div
            className="grid grid-cols-4 gap-2 w-full text-xs text-gray-500 uppercase mt-2  h-[30rem]"
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.3, // Delay slightly after main container animation starts
                type: "spring",
                stiffness: 300,
                damping: 30,
                when: "beforeChildren",
                staggerChildren: 0.1,
              },
            }}
            exit={{
              opacity: 0,
              y: -100,
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
              className="bg-white h-full rounded-2xl p-2 hover:bg-black hover:text-white transition-colors duration-500 group relative flex justify-center items-center"
              variants={{
                hidden: { y: 50, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { type: "spring", stiffness: 400, damping: 20 },
                },
                exit: {
                  y: -20,
                  opacity: 0,
                  transition: { duration: 0.2 },
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
              />
            </motion.div>

            <motion.div
              className="flex flex-col gap-2 h-full"
              variants={{
                hidden: { y: 50, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { type: "spring", stiffness: 400, damping: 20 },
                },
                exit: {
                  y: -20,
                  opacity: 0,
                  transition: { duration: 0.2 },
                },
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                className="bg-white flex-1 rounded-2xl p-2 hover:bg-black hover:text-white transition-colors duration-500 group relative flex justify-center items-center"
                variants={{
                  hidden: { y: 50, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { type: "spring", stiffness: 400, damping: 20 },
                  },
                  exit: {
                    y: -20,
                    opacity: 0,
                    transition: { duration: 0.2 },
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
                />
              </motion.div>
              <motion.div
                className="bg-white flex-1 rounded-2xl p-2 hover:bg-black hover:text-white transition-colors duration-500 group relative flex justify-center items-center"
                variants={{
                  hidden: { y: 50, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { type: "spring", stiffness: 400, damping: 20 },
                  },
                  exit: {
                    y: -20,
                    opacity: 0,
                    transition: { duration: 0.2 },
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
                  transition: { type: "spring", stiffness: 400, damping: 20 },
                },
                exit: {
                  y: -20,
                  opacity: 0,
                  transition: { duration: 0.2 },
                },
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                className="bg-white flex-1 rounded-2xl p-2 hover:bg-black hover:text-white transition-colors duration-500 group relative flex justify-center items-center"
                variants={{
                  hidden: { y: 50, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { type: "spring", stiffness: 400, damping: 20 },
                  },
                  exit: {
                    y: -20,
                    opacity: 0,
                    transition: { duration: 0.2 },
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
                />
              </motion.div>
              <motion.div
                className="bg-white flex-1 rounded-2xl p-2 hover:bg-black hover:text-white transition-colors duration-500 group relative flex justify-center items-center"
                variants={{
                  hidden: { y: 50, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { type: "spring", stiffness: 400, damping: 20 },
                  },
                  exit: {
                    y: -20,
                    opacity: 0,
                    transition: { duration: 0.2 },
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
                  transition: { type: "spring", stiffness: 400, damping: 20 },
                },
                exit: {
                  y: -20,
                  opacity: 0,
                  transition: { duration: 0.2 },
                },
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                className="bg-white flex-1 rounded-2xl p-2 hover:bg-black hover:text-white transition-colors duration-500 group relative flex justify-center items-center"
                variants={{
                  hidden: { y: 50, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { type: "spring", stiffness: 400, damping: 20 },
                  },
                  exit: {
                    y: -20,
                    opacity: 0,
                    transition: { duration: 0.2 },
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
                />
              </motion.div>
              <motion.div
                className="bg-white flex-1 rounded-2xl p-2 hover:bg-black hover:text-white transition-colors duration-500 group relative flex justify-center items-center"
                variants={{
                  hidden: { y: 50, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { type: "spring", stiffness: 400, damping: 20 },
                  },
                  exit: {
                    y: -20,
                    opacity: 0,
                    transition: { duration: 0.2 },
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
                />
              </motion.div>
              <motion.div
                className="bg-white flex-1 rounded-2xl p-2 hover:bg-black hover:text-white transition-colors duration-500 group relative flex justify-center items-center"
                variants={{
                  hidden: { y: 50, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { type: "spring", stiffness: 400, damping: 20 },
                  },
                  exit: {
                    y: -20,
                    opacity: 0,
                    transition: { duration: 0.2 },
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
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* End of Project Cards Section */}

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
                {/* Footer Navigation with separate hover state */}
                <div className="flex items-center gap-5">
                  {navItems.slice(0, 4).map((item, index) => (
                    <motion.div
                      key={`footer-${item.label}`}
                      onClick={() => handleNavClick(item.label)}
                      className={`relative cursor-pointer ${
                        currentNav === item.label
                          ? "text-black"
                          : "text-gray-500"
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + index * 0.05, duration: 0.3 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onHoverStart={() => setHoveredFooterNav(item.label)}
                      onHoverEnd={() => setHoveredFooterNav(null)}
                    >
                      {/* We hide the actual link but it's there for SEO */}
                      <Link
                        href={routes[item.label as keyof typeof routes]}
                        style={{ display: "none" }}
                        aria-hidden="true"
                        tabIndex={-1}
                      >
                        {item.label}
                      </Link>
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
                          layoutId="footerNavIndicator" // Different layoutId for footer
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                    </motion.div>
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
