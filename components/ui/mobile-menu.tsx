import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import Link from "next/link";
import { AnimatedThemeToggle } from "./animated-theme-toggle";
import { LanguageSelectorDropdown } from "./language-selector-dropdown";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const navLinks = [
  { text: "SOBRE NÓS", href: "/#sobre-nos" },
  { text: "PARCEIROS", href: "/#parceiros" },
  { text: "SERVIÇOS", href: "/#servicos" },
  { text: "CONTATE-NOS", href: "/#contate-nos" },
];

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (isOpen && containerRef.current) {
      // Setup GSAP animation for links when menu opens
      gsap.fromTo(
        linksRef.current,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.2,
        },
      );
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col bg-background text-foreground overflow-hidden"
          ref={containerRef}
        >
          <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between shrink-0">
            <span className="font-serif text-xl font-bold tracking-tight px-2">
              Menu.
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium tracking-widest uppercase hover:opacity-70 transition-opacity px-4 py-2"
            >
              Close
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center px-6 md:px-12 py-10">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, i) => (
                <div key={link.href} className="overflow-hidden">
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    ref={(el) => {
                      linksRef.current[i] = el;
                    }}
                    className="block font-serif text-5xl sm:text-7xl hover:italic transition-all duration-300"
                  >
                    {link.text}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="px-6 md:px-12 pb-12 w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8">
            <div className="flex flex-col text-sm text-foreground/80 font-mono">
              <span className="opacity-50 mb-2 uppercase text-xs tracking-wider">
                Contact
              </span>
              <a
                href="mailto:creativesmarketingsa@gmail.com"
                className="hover:underline"
              >
                creativesmarketingsa@gmail.com
              </a>
              <a href="tel:+5511999999999" className="hover:underline mt-1">
                +55 (71) 99999-9999
              </a>
            </div>

            <div className="flex items-center gap-6">
              <LanguageSelectorDropdown />
              <AnimatedThemeToggle />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
