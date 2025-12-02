"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Logo from "@/assets/logo.svg";
import { NavigationLinks } from "@/components/navigation";
import LogoAppa from "@/assets/logo_appa.webp";
import LogoKlop from "@/assets/logo_klop.webp";
import LogoPhotodump from "@/assets/logo_photodump.webp";
import LogoFinans from "@/assets/logo_finans.webp";
import LogoDrowzee from "@/assets/logo_drowzee.webp";
import LogoPanglima from "@/assets/logo_panglima.webp";
import LogoKeythicc from "@/assets/logo_keythicc.webp";
import LogoSibook from "@/assets/logo_sibook.webp";
import LogoSaturated from "@/assets/logo_saturated.webp";
import LogoPetjam from "@/assets/logo_petjam.webp";
import LogoTalesOfTula from "@/assets/logo_tula.png";
import LogoEdibly from "@/assets/logo_edibly.webp";

type ProjectConfig = {
  /** Unique identifier used for navigation + routes lookup */
  key: string;
  /** Label shown in UI */
  label: string;
  /** Href for the project detail page */
  href: string;
  /** Imported logo asset */
  logo: { src: string };
  /** Desktop grid column index (0–3) */
  desktopColumn: 0 | 1 | 2 | 3;
  /** Order within the column (top to bottom) */
  desktopOrder: number;
  /** Whether this project should appear in the mobile grid */
  showOnMobile: boolean;
  /** Order in the mobile grid (left‑to‑right, top‑to‑bottom) */
  mobileOrder?: number;
  /** Desktop logo dimensions */
  desktopSize: { width: number; height: number };
  /** Mobile logo dimensions */
  mobileSize: { width: number; height: number };
  type: "web" | "mobile" | "game";
};

const PROJECTS: ProjectConfig[] = [
  {
    key: "appa academy",
    label: "appa academy",
    href: "/projects/appa-academy",
    logo: LogoAppa,
    desktopColumn: 0,
    desktopOrder: 0,
    showOnMobile: true,
    mobileOrder: 0,
    desktopSize: { width: 150, height: 150 },
    mobileSize: { width: 60, height: 60 },
    type: "web",
  },
  {
    key: "saturated",
    label: "saturated",
    href: "/projects/saturated",
    logo: LogoSaturated,
    desktopColumn: 0,
    desktopOrder: 1,
    showOnMobile: true,
    mobileOrder: 1,
    desktopSize: { width: 150, height: 150 },
    mobileSize: { width: 60, height: 60 },
    type: "game",
  },
  {
    key: "tales of tula",
    label: "tales of tula",
    href: "/projects/tales-of-tula",
    logo: LogoTalesOfTula,
    desktopColumn: 0,
    desktopOrder: 2,
    showOnMobile: true,
    desktopSize: { width: 150, height: 150 },
    mobileSize: { width: 60, height: 60 },
    type: "game",
  },
  {
    key: "edibly",
    label: "edibly",
    href: "/projects/edibly",
    logo: LogoEdibly,
    desktopColumn: 1,
    desktopOrder: 0,
    showOnMobile: true,
    desktopSize: { width: 150, height: 150 },
    mobileSize: { width: 60, height: 60 },
    type: "mobile",
  },
  {
    key: "klop",
    label: "klop",
    href: "/projects/klop",
    logo: LogoKlop,
    desktopColumn: 1,
    desktopOrder: 1,
    showOnMobile: true,
    mobileOrder: 1,
    desktopSize: { width: 150, height: 150 },
    mobileSize: { width: 80, height: 80 },
    type: "web",
  },
  {
    key: "petjam",
    label: "petjam",
    href: "/projects/petjam",
    logo: LogoPetjam,
    desktopColumn: 1,
    desktopOrder: 2,
    showOnMobile: true,
    mobileOrder: 3,
    desktopSize: { width: 150, height: 150 },
    mobileSize: { width: 80, height: 80 },
    type: "mobile",
  },

  {
    key: "drowzee",
    label: "drowzee",
    href: "/projects/drowzee",
    logo: LogoDrowzee,
    desktopColumn: 2,
    desktopOrder: 0,
    showOnMobile: true,
    mobileOrder: 3,
    desktopSize: { width: 90, height: 90 },
    mobileSize: { width: 60, height: 60 },
    type: "mobile",
  },
  {
    key: "finans",
    label: "finans",
    href: "/projects/finans",
    logo: LogoFinans,
    desktopColumn: 2,
    desktopOrder: 1,
    showOnMobile: true,
    mobileOrder: 4,
    desktopSize: { width: 100, height: 100 },
    mobileSize: { width: 70, height: 70 },
    type: "mobile",
  },
  {
    key: "photodump station",
    label: "photodump station",
    href: "/projects/photodump-station",
    logo: LogoPhotodump,
    desktopColumn: 3,
    desktopOrder: 0,
    showOnMobile: true,
    mobileOrder: 3,
    desktopSize: { width: 115, height: 115 },
    mobileSize: { width: 70, height: 70 },
    type: "web",
  },
  {
    key: "panglima",
    label: "panglima",
    href: "/projects/panglima",
    logo: LogoPanglima,
    desktopColumn: 3,
    desktopOrder: 1,
    showOnMobile: true,
    mobileOrder: 5,
    desktopSize: { width: 50, height: 50 },
    mobileSize: { width: 40, height: 40 },
    type: "web",
  },
  {
    key: "keythicc",
    label: "keythicc",
    href: "/projects/keythicc",
    logo: LogoKeythicc,
    desktopColumn: 3,
    desktopOrder: 2,
    showOnMobile: true,
    mobileOrder: 6,
    desktopSize: { width: 100, height: 100 },
    mobileSize: { width: 70, height: 70 },
    type: "web",
  },
  {
    key: "si-book",
    label: "si-book",
    href: "/projects/si-book",
    logo: LogoSibook,
    desktopColumn: 3,
    desktopOrder: 3,
    showOnMobile: true,
    mobileOrder: 7,
    desktopSize: { width: 100, height: 100 },
    mobileSize: { width: 70, height: 70 },
    type: "web",
  },
];

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
  const totalImages = PROJECTS.length; // Total number of logos we're loading

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
      { label: "appa academy", path: "/projects/appa-academy" },
      { label: "klop", path: "/projects/klop" },
      { label: "photodump station", path: "/projects/photodump-station" },
      { label: "finans", path: "/projects/finans" },
      { label: "drowzee", path: "/projects/drowzee" },
      { label: "panglima", path: "/projects/panglima" },
      { label: "keythicc", path: "/projects/keythicc" },
      { label: "si-book", path: "/projects/si-book" },
      { label: "petjam", path: "/projects/petjam" },
      { label: "saturated", path: "/projects/saturated" },
      { label: "tales of tula", path: "/projects/tales-of-tula" },
      { label: "edibly", path: "/projects/edibly" },
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

  // Define the page route for each navigation item
  const routes = {
    create: "/",
    bio: "/bio",
    contact: "mailto:alifdimasius@gmail.com",
    "appa academy": "/projects/appa-academy",
    klop: "/projects/klop",
    "photodump station": "/projects/photodump-station",
    finans: "/projects/finans",
    drowzee: "/projects/drowzee",
    panglima: "/projects/panglima",
    keythicc: "/projects/keythicc",
    "si-book": "/projects/si-book",
    petjam: "/projects/petjam",
    saturated: "/projects/saturated",
    "tales of tula": "/projects/tales-of-tula",
    edibly: "/projects/edibly",
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
                    websites, apps, and games
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
          <>
            {/* Desktop Layout - 4 columns (column 0 has fixed desktop height via grid container) */}
            <motion.div
              className="hidden lg:grid lg:grid-cols-4 gap-2 w-full text-xs text-gray-500 uppercase mt-2 lg:h-[60rem]"
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.2,
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  when: "beforeChildren",
                  staggerChildren: 0.08,
                },
              }}
              exit={{
                opacity: 0,
                y: -50,
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
              {[0, 1, 2, 3].map((columnIndex) => {
                const columnProjects = PROJECTS.filter(
                  (project) => project.desktopColumn === columnIndex
                ).sort((a, b) => a.desktopOrder - b.desktopOrder);

                if (columnProjects.length === 0) return null;

                // Column 0 keeps a "hero" tile by making its first card taller when multiple items exist.
                const isHeroColumn = columnIndex === 0;

                return (
                  <motion.div
                    key={columnIndex}
                    className="flex flex-col gap-2"
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
                    {columnProjects.map((project, index) => (
                      <motion.a
                        key={project.key}
                        href={project.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(project.key);
                        }}
                        className={`bg-white rounded-2xl p-2 hover:bg-black hover:text-white transition-colors duration-500 group relative flex justify-center items-center cursor-pointer ${
                          isHeroColumn && index === 0 ? "flex-[2]" : "flex-1"
                        }`}
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
                        <p className="absolute top-2 left-2">
                          {project.label === "panglima"
                            ? "panglima ekspres"
                            : project.label}
                        </p>
                        <Image
                          src={project.logo.src}
                          alt="Logo"
                          width={project.desktopSize.width}
                          height={project.desktopSize.height}
                          className="transition-all duration-500 group-hover:filter group-hover:brightness-0 group-hover:invert rounded-2xl"
                          onLoad={handleImageLoaded}
                        />
                      </motion.a>
                    ))}
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Mobile Layout - 2x4 Grid */}
            <motion.div
              className="grid lg:hidden grid-cols-2 gap-2 w-full text-xs text-gray-500 uppercase mt-2"
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.2,
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  when: "beforeChildren",
                  staggerChildren: 0.08,
                },
              }}
              exit={{
                opacity: 0,
                y: -50,
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
              {PROJECTS.filter((project) => project.showOnMobile)
                .sort((a, b) => (a.mobileOrder ?? 0) - (b.mobileOrder ?? 0))
                .map((project) => (
                  <motion.div
                    key={project.key}
                    onClick={() => handleNavClick(project.key)}
                    className="bg-white h-32 rounded-2xl p-2 hover:bg-black hover:text-white transition-colors duration-500 group relative flex justify-center items-center cursor-pointer"
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
                    <p className="absolute top-2 left-2">
                      {project.label === "panglima"
                        ? "panglima ekspres"
                        : project.label}
                    </p>
                    <Image
                      src={project.logo.src}
                      alt="Logo"
                      width={project.mobileSize.width}
                      height={project.mobileSize.height}
                      className="transition-all duration-500 group-hover:filter group-hover:brightness-0 group-hover:invert rounded-2xl"
                      onLoad={handleImageLoaded}
                    />
                  </motion.div>
                ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* End of Project Cards Section */}

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
