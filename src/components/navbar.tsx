"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { LanguageSelector } from "./language-selector";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const navItems = [
  { key: "home", path: "/" },
  { key: "about", path: "/about" },
  { key: "projects", path: "/projects" },
  { key: "resume", path: "/resume" },
  { key: "contact", path: "/contact" },
];

export default function Navbar() {
  const [activeItem, setActiveItem] = useState("/");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const t = useTranslations('Navbar');  // Translate strings for the Navbar

  useEffect(() => {
    setActiveItem(pathname);
    setIsOpen(false);
  }, [pathname]);

  const NavItems = ({ mobile = false, onItemClick = () => {} }) => (
    <ul
      className={`flex ${mobile ? "flex-col space-y-6" : "space-x-2"} items-center`}
    >
      {navItems.map((item) => (
        <motion.li
          key={item.key}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            asChild
            variant="ghost"
            className={`relative ${mobile ? "text-2xl" : ""}`}
            onClick={() => onItemClick()}
          >
            <Link href={item.path}>
              {t(item.key)} {/* Translated name */}
              {activeItem === item.path && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  layoutId="underline"
                />
              )}
            </Link>
          </Button>
        </motion.li>
      ))}
    </ul>
  );

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <motion.nav
          className="mt-4 bg-background/80 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-border"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {isMobile ? (
            <div className="flex justify-between items-center w-full">
              <LanguageSelector />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(true)}
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
              <ThemeToggle />
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <LanguageSelector />
              <NavItems />
              <ThemeToggle />
            </div>
          )}
        </motion.nav>
      </div>

      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </Button>
            <NavItems mobile onItemClick={() => setIsOpen(false)} />
            <div className="mt-8 flex items-center space-x-4">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
