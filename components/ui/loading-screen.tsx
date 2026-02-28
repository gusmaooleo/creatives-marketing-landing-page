"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface LoadingScreenProps {
  isLoading: boolean;
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-10"
          >
            <Image
              src="/creatives-marketing-outlined.svg"
              alt="Creatives Marketing"
              width={80}
              height={72}
              priority
              className="dark:invert"
            />
          </motion.div>

          {/* Progress bar container */}
          <motion.div
            className="w-48 h-[3px] rounded-full bg-foreground/10 overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Animated shimmer bar */}
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary/40 via-primary to-primary/40"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ width: "60%" }}
            />
          </motion.div>

          {/* Subtle text */}
          <motion.p
            className="mt-6 text-xs tracking-widest uppercase text-foreground/30 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Carregando experiência...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
