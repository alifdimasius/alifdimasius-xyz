"use client";

import { type ReactNode, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import Logo from "@/assets/logo.svg";
import { ArrowUpRight, ChevronLeft } from "lucide-react";

type ImageSource = StaticImageData | string;

type HeroLogoConfig = {
  src: ImageSource;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
};

type BackLinkConfig = {
  label: string;
  href: string;
  displayText?: string;
};

type ProjectContentTemplateProps = {
  projectName: string;
  heroLogo: HeroLogoConfig;
  descriptionBlocks: string[];
  imagesSection?: ReactNode;
  backLink?: BackLinkConfig;
  projectLink?: { ctaLabel: string; href: string };
};

const DEFAULT_BACK_LINK: BackLinkConfig = {
  label: "create",
  href: "/",
  displayText: "Create",
};

const NAV_ITEMS = [
  { label: "create", path: "/" },
  { label: "bio", path: "/bio" },
  { label: "contact", path: "mailto:alifdimasius@gmail.com" },
];

const containerVariants = {
  hidden: (direction: number) => ({
    opacity: 0,
    y: 50,
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
      staggerChildren: 0.12,
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 0.7,
    },
  },
  exit: (direction: number) => ({
    y: -50,
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
  hidden: { y: 20, opacity: 0 },
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

const pageVariants = {
  initial: (direction: number) => ({
    y: direction > 0 ? 50 : -50,
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
  exit: (direction: number) => ({
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

export function ProjectContentTemplate({
  projectName,
  heroLogo,
  descriptionBlocks,
  imagesSection,
  projectLink,
  backLink = DEFAULT_BACK_LINK,
}: ProjectContentTemplateProps) {
  const [currentNav, setCurrentNav] = useState(projectName.toLowerCase());
  const [pageDirection, setPageDirection] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [clickedLink, setClickedLink] = useState("");
  const [pageLoaded, setPageLoaded] = useState(false);
  const [animationsReady, setAnimationsReady] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    const timer1 = setTimeout(() => {
      setPageLoaded(true);
    }, 100);

    const timer2 = setTimeout(() => {
      setAnimationsReady(true);
    }, 700);

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

  const routes = NAV_ITEMS.reduce<Record<string, string>>((acc, item) => {
    acc[item.label] = item.path;
    return acc;
  }, {});

  const handleNavClick = (navItem: string) => {
    if (isNavigating || navItem === currentNav) return;

    if (navItem === "contact") {
      window.location.href = "mailto:alifdimasius@gmail.com";
      return;
    }

    const currentIndex = NAV_ITEMS.findIndex(
      (item) => item.label === currentNav
    );
    const nextIndex = NAV_ITEMS.findIndex((item) => item.label === navItem);
    const direction = nextIndex > currentIndex ? 1 : -1;

    setPageDirection(direction);
    setCurrentNav(navItem);
    setIsNavigating(true);
    setClickedLink(navItem);
  };

  const animationReady = pageLoaded && animationsReady && !isNavigating;

  const heroWidth = heroLogo.width ?? 200;
  const heroHeight = heroLogo.height ?? 200;

  const backLinkLabel = backLink.label.toLowerCase();
  const backLinkText = backLink.displayText ?? backLink.label;

  return (
    <div className="w-full relative">
      <AnimatePresence
        mode="wait"
        custom={pageDirection}
        onExitComplete={() => {
          if (clickedLink && routes[clickedLink as keyof typeof routes]) {
            window.location.href = routes[clickedLink as keyof typeof routes];
          }
        }}
      >
        {animationReady && (
          <motion.div
            key="main-container"
            className="bg-white p-5 rounded-2xl font-semibold text-lg flex flex-col h-60 lg:h-80 w-full relative overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={pageDirection}
          >
            <motion.div className="flex" variants={itemVariants}>
              <div>
                <motion.div
                  className="texl-xl lg:text-3xl flex items-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <Link
                    href={backLink.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(backLinkLabel);
                    }}
                    className="text-gray-500 hover:text-black transition-colors duration-300 flex items-center"
                  >
                    <ChevronLeft className="w-4 h-4 lg:w-8 lg:h-8" />
                    {backLinkText}
                  </Link>{" "}
                  / {projectName}
                </motion.div>
              </div>
            </motion.div>

            <AnimatePresence mode="wait" custom={pageDirection}>
              <motion.div
                className="flex justify-center items-center h-full"
                key={projectName}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={pageDirection}
              >
                <div className="flex justify-center items-center h-32 w-32 lg:h-80 lg:w-80">
                  <Image
                    src={heroLogo.src}
                    alt={heroLogo.alt}
                    width={heroWidth}
                    height={heroHeight}
                    className={`rounded-2xl ${heroLogo.className ?? ""}`}
                  />
                </div>
              </motion.div>
            </AnimatePresence>

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
        {animationReady && descriptionBlocks.length > 0 && (
          <motion.div
            className="bg-white rounded-2xl mt-2 w-full p-10 lg:p-20 flex flex-col justify-center items-center gap-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.2,
                type: "spring",
                stiffness: 100,
                damping: 20,
              },
            }}
            exit={{
              opacity: 0,
              y: -30,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
              },
            }}
            custom={pageDirection}
          >
            {descriptionBlocks.map((block, index) => (
              <motion.p
                key={block}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05, duration: 0.3 }}
                className="font-semibold text-base md:text-xl lg:text-3xl text-center"
              >
                {block}
              </motion.p>
            ))}
            {projectLink && (
              <motion.a
                href={projectLink.href}
                className="flex items-center uppercase transition-all gap-2 font-semibold text-base md:text-xl lg:text-3xl relative group active:translate-y-1 duration-300"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span>{projectLink.ctaLabel}</span>
                <ArrowUpRight className="w-4 h-4 lg:w-8 lg:h-8 group-hover:translate-x-1 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 h-1 bg-black rounded-full w-0 group-hover:w-full transition-all duration-300" />
              </motion.a>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {imagesSection && (
        <AnimatePresence mode="wait" custom={pageDirection}>
          {animationReady && (
            <motion.div
              key="footer-container"
              className="bg-white p-5 rounded-2xl font-semibold flex flex-col justify-between mt-2 w-full relative overflow-hidden"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={pageDirection}
            >
              <motion.div className="flex justify-center items-center">
                {imagesSection}
              </motion.div>
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
      )}
    </div>
  );
}
