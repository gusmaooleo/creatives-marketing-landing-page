"use client";

import { motion } from "framer-motion";

export const MiniLandingPage = () => (
  <div className="w-full h-full min-h-[300px] flex flex-col gap-4 p-6 bg-foreground/[0.02] dark:bg-foreground/[0.03] border border-border/10 rounded-3xl relative overflow-hidden backdrop-blur-sm">
    {/* Header Skeleton */}
    <div className="w-full h-6 flex items-center justify-between opacity-80">
      <div className="w-8 h-8 rounded-full bg-blue-500/20 dark:bg-blue-500/10" />
      <div className="flex gap-2">
        <div className="w-10 h-2 rounded bg-foreground/10 hidden sm:block" />
        <div className="w-10 h-2 rounded bg-foreground/10 hidden sm:block" />
        <div className="w-10 h-2 rounded bg-foreground/10" />
      </div>
    </div>
    {/* Hero Skeleton */}
    <div className="w-full h-32 md:h-48 mt-2 rounded-2xl bg-blue-500/5 dark:bg-blue-500/5 flex flex-col items-center justify-center gap-3 border border-blue-500/10">
      <motion.div
        className="w-3/4 h-4 rounded bg-blue-500/40 dark:bg-blue-500/30"
        initial={{ width: "0%" }}
        whileInView={{ width: "75%" }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true, margin: "-50px" }}
      />
      <motion.div
        className="w-1/2 h-2 rounded bg-blue-500/30 dark:bg-blue-500/20"
        initial={{ width: "0%" }}
        whileInView={{ width: "50%" }}
        transition={{ duration: 1, delay: 0.4 }}
        viewport={{ once: true, margin: "-50px" }}
      />
      <motion.div
        className="w-24 h-8 mt-2 rounded-full bg-blue-500/60 dark:bg-blue-500/50"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.6 }}
        viewport={{ once: true, margin: "-50px" }}
      />
    </div>
    {/* Content Skeleton */}
    <div className="w-full flex-1 mt-2 flex gap-4 opacity-80">
      <div className="w-1/3 h-full rounded-xl bg-foreground/5 dark:bg-foreground/5" />
      <div className="w-1/3 h-full rounded-xl bg-foreground/5 dark:bg-foreground/5" />
      <div className="w-1/3 h-full rounded-xl bg-foreground/5 dark:bg-foreground/5" />
    </div>
    {/* Animated Cursor */}
    <motion.div
      className="absolute w-6 h-6 text-foreground dark:text-white drop-shadow-md z-10"
      initial={{ x: 50, y: 250, opacity: 0 }}
      whileInView={{ x: "42%", y: "45%", opacity: 1 }}
      animate={{
        x: ["42%", "50%", "45%"],
        y: ["45%", "60%", "48%"],
      }}
      transition={{
        x: { duration: 1.5, ease: "circOut", delay: 0.5 },
        y: { duration: 1.5, ease: "circOut", delay: 0.5 },
        opacity: { duration: 0.5, delay: 0.5 },
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="#3b82f6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
      </svg>
    </motion.div>
  </div>
);
