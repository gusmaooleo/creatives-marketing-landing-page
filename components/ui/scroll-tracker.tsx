"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Section {
  id: string;
  label: string;
  number: string;
}

const sections: Section[] = [
  { id: "hero", label: "", number: "" },
  { id: "sobre-nos", label: "sobre nós", number: "01" },
  { id: "services", label: "serviços", number: "02" },
  { id: "planos", label: "planos", number: "03" },
  { id: "contato", label: "contato", number: "04" },
];

export function ScrollTracker() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const { scrollYProgress } = useScroll();
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const indicatorTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const updateActiveSection = useCallback(() => {
    const threshold = window.innerHeight / 3;
    const atBottom =
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 100;
    let nextIndex = 0;

    if (atBottom) {
      nextIndex = sections.length - 1;
    } else {
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= threshold) {
          nextIndex = i;
          break;
        }
      }
    }

    if (nextIndex !== activeIndexRef.current) {
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      updateActiveSection();
    });
  }, [updateActiveSection]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
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

            return (
              <motion.button
                key={section.id}
                onClick={() => {
                  if (section.id === "contato") {
                    window.scrollTo({
                      top: document.documentElement.scrollHeight,
                      behavior: "smooth",
                    });
                  } else {
                    const el = document.getElementById(section.id);
                    el?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="flex items-baseline gap-2 text-right transition-all duration-500 cursor-pointer group"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
              >
                <span
                  className={`text-sm font-serif transition-all duration-300 ${
                    isActive
                      ? "text-primary font-bold"
                      : "text-foreground/20 font-normal group-hover:text-foreground/40"
                  }`}
                >
                  {section.number}
                </span>

                <span
                  className={`text-sm font-serif italic transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? "text-foreground"
                      : "text-foreground/15 group-hover:text-foreground/40"
                  }`}
                >
                  {section.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        <div className="relative w-[2px] h-full bg-foreground/10 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-primary rounded-full"
            style={{ height: fillHeight }}
          />
        </div>
      </div>

      <motion.div
        className="absolute right-0 w-4 h-4 rounded-full bg-primary/90 flex items-center justify-center text-xs font-bold text-primary-foreground shadow-lg shadow-primary/20"
        style={{ top: indicatorTop }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          delay: 1.2,
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}
      ></motion.div>
    </div>
  );
}
