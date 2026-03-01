"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Section {
  id: string;
  label: string;
  number: string;
}

const sections: Section[] = [
  { id: "hero", label: "", number: "" },
  { id: "sobre-nos", label: "sobre nós", number: "01" },
  { id: "parceiros", label: "parceiros", number: "02" },
  { id: "services", label: "serviços", number: "03" },
  { id: "planos", label: "planos", number: "04" },
  { id: "contato", label: "contato", number: "05" },
];

export function ScrollTracker() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();

  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY + window.innerHeight / 3;

    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i].id);
      if (el && scrollY >= el.offsetTop) {
        setActiveIndex(i);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const navigableSections = sections.slice(1);

  return (
    <div className="fixed right-6 lg:right-10 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-0 h-[60vh]">
      {/* Track container */}
      <div className="relative flex items-stretch h-full">
        {/* Section labels */}
        <div className="flex flex-col justify-between h-full mr-4">
          {navigableSections.map((section, i) => {
            const realIndex = i + 1;
            const isActive = activeIndex === realIndex;
            const isHovered = hoveredIndex === realIndex;

            return (
              <motion.button
                key={section.id}
                onClick={() => {
                  const el = document.getElementById(section.id);
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                onMouseEnter={() => setHoveredIndex(realIndex)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="flex items-baseline gap-2 text-right transition-all duration-500 cursor-pointer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
              >
                {/* Number */}
                <span
                  className={`text-sm font-serif transition-all duration-300 ${
                    isActive
                      ? "text-primary font-bold"
                      : "text-foreground/30 font-normal"
                  }`}
                >
                  {section.number}
                </span>

                {/* Label — revealed on hover or when active */}
                <span
                  className={`text-sm font-serif italic transition-all duration-300 whitespace-nowrap overflow-hidden ${
                    isActive || isHovered
                      ? "opacity-100 max-w-[120px]"
                      : "opacity-0 max-w-0"
                  } ${isActive ? "text-foreground" : "text-foreground/50"}`}
                >
                  {section.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Vertical track line */}
        <div className="relative w-[2px] h-full bg-foreground/10 rounded-full overflow-hidden">
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
