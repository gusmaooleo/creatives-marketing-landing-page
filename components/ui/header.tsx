"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedThemeToggle } from "./animated-theme-toggle";
import { LanguageSelectorDropdown } from "./language-selector-dropdown";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const containerVariants: any = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemLeftVariants: any = {
    hidden: { opacity: 0, x: -30, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const itemRightVariants: any = {
    hidden: { opacity: 0, x: 30, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const centerLogoVariants: any = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15,
        delay: 0.3,
      },
    },
  };

  return (
    <>
      <motion.header
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container relative flex h-16 sm:h-20 items-center mx-auto px-4 md:px-8 justify-between">
          <motion.div
            variants={itemLeftVariants}
            className="hidden md:flex flex-1 items-center space-x-6"
          >
            <div className="text-md font-serif font-semibold leading-tight text-foreground/80 tracking-wide uppercase shrink-0">
              <div className="flex flex-col relative overflow-hidden">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: 0.2,
                  }}
                >
                  Creatives
                </motion.span>
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: 0.3,
                  }}
                >
                  Marketing <span className="text-primary">.</span>
                </motion.span>
              </div>
            </div>

            <div className="w-[1px] h-10 bg-border/70"></div>

            <nav className="flex flex-col items-start font-serif space-y-1 leading-none text-xs font-medium tracking-widest uppercase text-foreground/80">
              <Link
                href="/#sobre-nos"
                className="hover:text-foreground transition-colors group relative overflow-hidden"
              >
                <span className="relative z-10">Sobre Nós</span>
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-foreground origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ease-out"></span>
              </Link>
              <Link
                href="/#parceiros"
                className="hover:text-foreground transition-colors group relative overflow-hidden"
              >
                <span className="relative z-10">Parceiros</span>
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-foreground origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ease-out"></span>
              </Link>
              <Link
                href="/#servicos"
                className="hover:text-foreground transition-colors group relative overflow-hidden"
              >
                <span className="relative z-10">Serviços</span>
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-foreground origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ease-out"></span>
              </Link>
            </nav>
          </motion.div>

          <motion.div
            variants={centerLogoVariants}
            className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Link href="/" className="flex items-center space-x-2 group">
              <Logo className="w-12 h-12 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 dark:text-foreground text-foreground" />
            </Link>
          </motion.div>

          <motion.div
            variants={itemLeftVariants}
            className="flex md:hidden flex-1"
          >
            <Link href="/" className="flex items-center space-x-2 group">
              <Logo className="w-10 h-10 transition-transform duration-300 group-hover:scale-105 dark:text-foreground text-foreground" />
            </Link>
          </motion.div>

          <motion.div
            variants={itemRightVariants}
            className="hidden md:flex flex-1 justify-end items-center space-x-8 text-xs font-medium tracking-widest uppercase text-foreground/80"
          >
            <nav className="flex items-center font-serif text-xs">
              <Link
                href="/#contate-nos"
                className="hover:text-foreground transition-colors group relative p-1"
              >
                <span className="relative z-10">Contate-nos</span>
                <span className="absolute left-0 bottom-1 w-full h-[1px] bg-foreground origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ease-out"></span>
              </Link>
            </nav>

            <div className="w-[1px] h-6 bg-border/40"></div>

            <div className="flex items-center gap-3">
              <LanguageSelectorDropdown />
              <AnimatedThemeToggle />
            </div>
          </motion.div>

          <motion.div
            variants={itemRightVariants}
            className="flex md:hidden justify-end"
          >
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-base font-medium tracking-widest uppercase hover:text-foreground/80 transition-colors"
            >
              Menu
            </button>
          </motion.div>
        </div>
      </motion.header>

      <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
    </>
  );
}
