"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export const PieChart = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const circumference = 251.327; // 2 * PI * 40

  return (
    <div
      ref={ref}
      className="w-full h-full min-h-[250px] flex items-center justify-center p-8 bg-foreground/[0.02] dark:bg-foreground/[0.03] border border-border/10 rounded-3xl backdrop-blur-sm relative overflow-hidden group"
    >
      {/* SVG Container */}
      <svg
        width="200"
        height="200"
        viewBox="0 0 100 100"
        className="drop-shadow-2xl relative z-10 scale-110"
      >
        <defs>
          <linearGradient id="pieGrad1" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="hsl(38, 85%, 72%)" />
            <stop offset="100%" stopColor="hsl(32, 90%, 58%)" />
          </linearGradient>
          <linearGradient id="pieGrad2" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="hsl(32, 90%, 58%)" />
            <stop offset="100%" stopColor="hsl(26, 95%, 52%)" />
          </linearGradient>
          <linearGradient id="pieGrad3" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="hsl(26, 95%, 52%)" />
            <stop offset="100%" stopColor="hsl(20, 100%, 46%)" />
          </linearGradient>
        </defs>

        {/* Background track */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke="var(--foreground)"
          strokeOpacity={0.05}
          strokeWidth="12"
        />

        {/* Segment 1: 45% */}
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke="url(#pieGrad1)"
          strokeWidth="12"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={
            isInView
              ? { strokeDashoffset: circumference - circumference * 0.45 }
              : { strokeDashoffset: circumference }
          }
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          transform="rotate(-90 50 50)"
          style={{ opacity: 0.95 }}
        />

        {/* Segment 2: 35% */}
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke="url(#pieGrad2)"
          strokeWidth="12"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={
            isInView
              ? { strokeDashoffset: circumference - circumference * 0.35 }
              : { strokeDashoffset: circumference }
          }
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 }}
          transform="rotate(72 50 50)"
          style={{ opacity: 0.85 }}
        />

        {/* Segment 3: 20% */}
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke="url(#pieGrad3)"
          strokeWidth="12"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={
            isInView
              ? { strokeDashoffset: circumference - circumference * 0.2 }
              : { strokeDashoffset: circumference }
          }
          transition={{ duration: 1.5, ease: "easeOut", delay: 1.0 }}
          transform="rotate(198 50 50)"
          style={{ opacity: 0.75 }}
        />

        {/* Glowing trendline equivalent (thin primary ring overlapping) */}
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity={0.5}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={
            isInView
              ? { strokeDashoffset: 0 }
              : { strokeDashoffset: circumference }
          }
          transition={{ duration: 2.0, delay: 0.6, ease: "easeOut" }}
          transform="rotate(-90 50 50)"
        />
      </svg>

      {/* Center Label */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={
          isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
        }
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <span className="text-[10px] font-bold tracking-widest uppercase text-foreground/40 mt-1">
          Escala
        </span>
        <span className="text-3xl font-serif font-bold text-primary leading-none mt-1">
          3x
        </span>
      </motion.div>

      {/* ROI Badge matching AboutUs */}
      <motion.div
        className="absolute top-4 right-4 z-30"
        initial={{ opacity: 0, y: 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <span className="inline-flex items-center rounded-full bg-primary text-primary-foreground text-[11px] font-bold px-2.5 py-1 shadow-lg shadow-primary/20">
          +142% ROI
        </span>
      </motion.div>
    </div>
  );
};
