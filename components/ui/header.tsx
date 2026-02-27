"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatedThemeToggle } from "./animated-theme-toggle";
import { LanguageSelectorDropdown } from "./language-selector-dropdown";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 sm:h-20 items-center mx-auto px-4 md:px-8 justify-between">
          <div className="hidden md:flex text-md font-serif font-semibold leading-tight text-foreground/80 tracking-wide uppercase">
            <div className="flex flex-col">
              Creatives
              <span>
                Marketing <span className="text-primary">.</span>
              </span>
            </div>
          </div>

          <div className="flex md:w-1/3 md:justify-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <Logo className="w-10 h-10 transition-transform duration-300 group-hover:scale-105 dark:text-foreground text-foreground" />
            </Link>
          </div>

          <div className="hidden md:flex w-1/3 justify-end items-center space-x-8 text-sm font-medium tracking-wide uppercase text-foreground/75">
            <nav className="flex flex-col items-left font-serif space-x-6">
              <Link
                href="/#sobre-nos"
                className="hover:text-foreground transition-colors"
              >
                Sobre Nós
              </Link>
              <Link
                href="/#parceiros"
                className="hover:text-foreground transition-colors"
              >
                Parceiros
              </Link>
              <Link
                href="/#servicos"
                className="hover:text-foreground transition-colors"
              >
                Serviços
              </Link>
            </nav>

            {/* Divider */}
            <div className="w-[1px] h-6 bg-border/60"></div>

            <nav className="flex items-center space-x-4">
              <Link
                href="/#contate-nos"
                className="hover:text-foreground transition-colors"
              >
                Contate-nos
              </Link>
            </nav>

            <div className="flex items-center gap-2 pl-4">
              <LanguageSelectorDropdown />
              <AnimatedThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-base font-medium tracking-widest uppercase hover:text-foreground/80 transition-colors"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
    </>
  );
}
