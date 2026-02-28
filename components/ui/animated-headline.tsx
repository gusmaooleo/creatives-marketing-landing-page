"use client";

import { motion } from "framer-motion";

const lineVariants: any = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const wordVariants: any = {
  hidden: {
    y: "100%",
    opacity: 0,
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const specialWordVariants: any = {
  hidden: {
    y: "120%",
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    y: "0%",
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: "easeOut",
    },
  },
};

export function AnimatedHeadline() {
  return (
    <motion.h2
      className="font-sans text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight text-foreground leading-[1.1]"
      initial="hidden"
      animate="visible"
      variants={lineVariants}
    >
      {/* Line 1: "Transformamos cliques em lucro," */}
      <span className="block overflow-hidden">
        <motion.span className="inline-block" variants={wordVariants}>
          Transformamos&nbsp;
        </motion.span>
        <motion.span className="inline-block" variants={wordVariants}>
          cliques&nbsp;
        </motion.span>
        <motion.span className="inline-block" variants={wordVariants}>
          em&nbsp;
        </motion.span>
        <motion.span
          className="inline-block text-foreground/80 font-serif italic"
          variants={specialWordVariants}
        >
          lucro
        </motion.span>
        <motion.span className="inline-block" variants={wordVariants}>
          ,
        </motion.span>
      </span>

      {/* Line 2: "design em autoridade." */}
      <span className="block overflow-hidden mt-1">
        <motion.span className="inline-block" variants={wordVariants}>
          design&nbsp;
        </motion.span>
        <motion.span className="inline-block" variants={wordVariants}>
          em&nbsp;
        </motion.span>
        <motion.span
          className="inline-block text-foreground/80 font-bold"
          variants={specialWordVariants}
        >
          autoridade
        </motion.span>
        <motion.span className="inline-block font-bold" variants={wordVariants}>
          .
        </motion.span>
      </span>
    </motion.h2>
  );
}
