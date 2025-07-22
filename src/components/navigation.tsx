import { motion } from "framer-motion";
import Link from "next/link";

interface NavigationLinksProps {
  currentNav: string;
  hoveredNav: string | null;
  setHoveredNav: (value: string | null) => void;
  handleNavClick: (navItem: string) => void;
  layoutId?: string; // Optional to allow different layoutIds for multiple instances
}

export function NavigationLinks({
  currentNav,
  hoveredNav,
  setHoveredNav,
  handleNavClick,
  layoutId = "navIndicator",
}: NavigationLinksProps) {
  // Navigation items
  const navItems = [
    { label: "create", path: "/" },
    { label: "bio", path: "/bio" },
    { label: "contact", path: "mailto:alifdimasius@gmail.com" },
  ];

  return (
    <div className="flex items-center gap-2 lg:gap-5 text-sm lg:text-base">
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
            currentNav === item.label ? "text-black" : "text-gray-500"
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
              (hoveredNav === null && currentNav === item.label)) && (
              <motion.div
                className={`absolute bottom-0 left-0 w-full h-0.5 ${
                  hoveredNav === item.label ? "bg-gray-500" : "bg-black"
                }`}
                layoutId={layoutId}
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
  );
}
