"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function BioView() {
  const [currentNav, setCurrentNav] = useState("bio");
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [pageDirection, setPageDirection] = useState(0); // 1 for down, -1 for up
  const [isNavigating, setIsNavigating] = useState(false);
  const [clickedLink, setClickedLink] = useState("");

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
  const navItems = [{ label: "create" }, { label: "bio" }];

  const handleNavClick = (navItem: string) => {
    // Skip if already navigating or clicking the current nav
    if (isNavigating || navItem === currentNav) return;

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

    // The actual navigation will be handled by the Link component
    // We're just triggering the animation here
  };

  // Define the page route for each navigation item
  const routes = {
    create: "/",
    bio: "/bio",
  };

  return (
    <div className="w-full">
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
                {currentNav === "create" && (
                  <>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    >
                      stuff i've made so far
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                    >
                      that i can share and talk about
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                    >
                      some for work
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                    >
                      others for myself
                    </motion.p>
                  </>
                )}
                {currentNav === "bio" && (
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
                )}
              </motion.div>
            </AnimatePresence>

            {/* Watermark */}
            <motion.div
              className="absolute opacity-5 h-1 w-1 bottom-10 right-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.05 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Image src="/logo.svg" alt="Logo" width={20} height={20} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
