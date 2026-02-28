"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Section {
  id: string;
  label: string;
  number: number;
}

const sections: Section[] = [
  { id: "hero", label: "", number: 0 },
  { id: "sobre-nos", label: "sobre nós", number: 1 },
  { id: "parceiros", label: "parceiros", number: 2 },
  { id: "servicos", label: "", number: 3 },
  { id: "contate-nos", label: "", number: 4 },
];

export function ScrollTracker() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const trackRef = useRef<HTMLDivElement>(null);

  // Map scroll progress to the track fill height
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && scrollY >= el.offsetTop) {
          setActiveIndex(i);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed right-6 lg:right-10 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-0 h-[60vh]">
      {/* Track container */}
      <div className="relative flex items-stretch h-full">
        {/* Section labels */}
        <div className="flex flex-col justify-between h-full mr-4">
          {sections.slice(1).map((section, i) => (
            <motion.button
              key={section.id}
              onClick={() => {
                const el = document.getElementById(section.id);
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`flex items-baseline gap-2 text-right transition-all duration-500 cursor-pointer ${
                activeIndex === i + 1
                  ? "opacity-100"
                  : "opacity-40 hover:opacity-70"
              }`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: activeIndex === i + 1 ? 1 : 0.4, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
            >
              <span
                className={`text-sm font-serif italic transition-colors duration-300 ${
                  activeIndex === i + 1 ? "text-primary" : "text-foreground/50"
                }`}
              >
                {section.number}
              </span>
              {section.label && (
                <span
                  className={`text-sm font-serif italic transition-colors duration-300 ${
                    activeIndex === i + 1
                      ? "text-foreground"
                      : "text-foreground/40"
                  }`}
                >
                  {section.label}
                </span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Vertical track line */}
        <div
          ref={trackRef}
          className="relative w-[2px] h-full bg-foreground/10 rounded-full overflow-hidden"
        >
          {/* Progress fill */}
          <motion.div
            className="absolute top-0 left-0 w-full bg-primary rounded-full"
            style={{ height: fillHeight }}
          />
        </div>
      </div>

      {/* User indicator */}
      <motion.div
        className="absolute right-0 w-4 h-4 rounded-full bg-primary/90 flex items-center justify-center text-xs font-bold text-primary-foreground shadow-lg shadow-primary/20"
        style={{
          top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 15 }}
      ></motion.div>
    </div>
  );
}
