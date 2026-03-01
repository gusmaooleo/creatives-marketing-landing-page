"use client";

import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";

export const AICore = () => (
  <div className="w-full h-full min-h-[300px] flex items-center justify-center relative bg-foreground/[0.02] dark:bg-foreground/[0.03] border border-border/10 rounded-3xl overflow-hidden backdrop-blur-sm">
    {/* Pulsing Aura */}
    <motion.div
      className="absolute inset-0 opacity-20 dark:opacity-30"
      animate={{ backgroundSize: ["100% 100%", "140% 140%", "100% 100%"] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      style={{
        backgroundImage:
          "radial-gradient(circle at center, #f59e0b 0%, transparent 50%)",
        backgroundPosition: "center",
      }}
    />

    {/* Center Brain Node */}
    <motion.div
      className="relative z-10 w-24 h-24 rounded-full bg-amber-500 border-4 border-amber-500/20 flex items-center justify-center"
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      animate={{
        boxShadow: [
          "0 0 30px rgba(245, 158, 11, 0.4)",
          "0 0 70px rgba(245, 158, 11, 0.8)",
          "0 0 30px rgba(245, 158, 11, 0.4)",
        ],
      }}
      transition={{
        scale: { duration: 0.7, type: "spring", bounce: 0.4 },
        opacity: { duration: 0.5 },
        boxShadow: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <BrainCircuit className="w-12 h-12 text-zinc-900 stroke-[1.5px]" />
    </motion.div>

    {/* Neural Paths */}
    <div className="absolute inset-0 pointer-events-none">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 w-[1.5px] bg-gradient-to-t from-primary/60 dark:from-primary/40 to-transparent origin-bottom"
          style={{
            height: "150px",
            rotate: deg,
            marginTop: "-150px", // Align bottom to center
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          transition={{
            duration: 1,
            delay: 0.3 + i * 0.05,
            ease: "circOut",
          }}
          viewport={{ once: true, margin: "-50px" }}
        />
      ))}
    </div>
  </div>
);
