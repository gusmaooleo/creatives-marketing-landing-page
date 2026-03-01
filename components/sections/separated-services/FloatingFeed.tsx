"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export const FloatingFeed = () => (
  <div className="w-full h-full min-h-[300px] flex items-center justify-center relative bg-foreground/[0.02] dark:bg-foreground/[0.03] border border-border/10 rounded-3xl overflow-hidden backdrop-blur-sm">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none z-0" />

    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="absolute w-40 sm:w-52 aspect-[3/4] bg-background/80 dark:bg-foreground/[0.05] border border-border/10 rounded-2xl p-3 sm:p-5 shadow-2xl backdrop-blur-md flex flex-col gap-3"
        initial={{
          y: 100,
          opacity: 0,
          rotate: i === 0 ? -12 : i === 2 ? 12 : 0,
          x: i === 0 ? "-35%" : i === 2 ? "35%" : "0%",
        }}
        whileInView={{
          y: i === 1 ? -15 : 15,
          opacity: i === 1 ? 1 : 0.6,
        }}
        animate={{
          y: [i === 1 ? -15 : 15, i === 1 ? -25 : 5, i === 1 ? -15 : 15],
        }}
        transition={{
          y: { duration: 0.8, delay: i * 0.15, ease: "easeOut" },
          opacity: { duration: 0.8, delay: i * 0.15 },
          rotate: { duration: 0.8, delay: i * 0.15 },
          x: { duration: 0.8, delay: i * 0.15 },
          default: {
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.5,
            ease: "easeInOut",
          }, // Bouncing effect
        }}
        viewport={{ once: true, margin: "-50px" }}
        style={{ zIndex: i === 1 ? 10 : 5 }}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-purple-500/40 dark:bg-purple-500/20 flex-shrink-0" />
          <div className="flex flex-col gap-1 w-full">
            <div className="w-16 sm:w-20 h-2 rounded bg-foreground/20 dark:bg-foreground/20" />
            <div className="w-10 sm:w-12 h-1.5 rounded bg-foreground/10 dark:bg-foreground/10" />
          </div>
        </div>
        <div className="w-full flex-1 rounded-xl bg-foreground/5 dark:bg-foreground/5 mt-1 border border-foreground/5 flex items-center justify-center">
          {i === 1 && <Sparkles className="w-6 h-6 text-purple-500" />}
        </div>
        <div className="w-3/4 h-2 rounded bg-foreground/10 dark:bg-foreground/10" />
      </motion.div>
    ))}
  </div>
);
