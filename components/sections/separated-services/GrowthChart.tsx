"use client";

import { motion } from "framer-motion";

export const GrowthChart = () => (
  <div className="w-full h-full min-h-[300px] flex items-end justify-between gap-1 sm:gap-2 p-8 bg-foreground/[0.02] dark:bg-foreground/[0.03] border border-border/10 rounded-3xl backdrop-blur-sm relative overflow-hidden">
    {/* Grid lines */}
    <div className="absolute inset-0 pointer-events-none p-8 flex flex-col justify-between opacity-5">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="w-full h-[1px] bg-foreground" />
      ))}
    </div>

    {[15, 25, 20, 40, 35, 65, 55, 100].map((height, i) => (
      <motion.div
        key={i}
        className="flex-1 rounded-t-md relative group bg-emerald-500/30 dark:bg-emerald-500/20"
        initial={{ height: 0 }}
        whileInView={{ height: `${height}%` }}
        transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
        viewport={{ once: true, margin: "-50px" }}
        style={{
          background: i === 7 ? "#10b981" : undefined,
        }}
      >
        {/* Tooltip hint on hover */}
        {i === 7 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: -24 }}
            transition={{ delay: 1.2 }}
            viewport={{ once: true }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] font-bold py-1 px-2 rounded-sm whitespace-nowrap"
          >
            ROI Max
          </motion.div>
        )}
      </motion.div>
    ))}
  </div>
);
