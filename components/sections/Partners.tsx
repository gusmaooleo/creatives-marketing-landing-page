"use client";

import { motion } from "framer-motion";
import { Palette, Zap, Layers, Globe, Sparkles, Triangle } from "lucide-react";

const partners = [
  { name: "Vertix Studio", icon: Triangle },
  { name: "NovaBrand", icon: Sparkles },
  { name: "Onda Digital", icon: Globe },
  { name: "Pulsar Media", icon: Zap },
  { name: "Criare Co.", icon: Palette },
  { name: "FluxLab", icon: Layers },
];

const containerVariants: any = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Partners() {
  return (
    <section id="parceiros" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <motion.p
          className="text-center text-sm font-medium tracking-widest uppercase text-muted-foreground/60 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Parceiros que confiam em nós
        </motion.p>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.name}
              variants={itemVariants}
              className="group flex flex-col items-center gap-3 cursor-default"
            >
              <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-foreground/[0.03] dark:bg-foreground/[0.05] border border-border/20 transition-all duration-500 group-hover:border-primary/30 group-hover:bg-primary/[0.06] group-hover:shadow-lg group-hover:shadow-primary/5 group-hover:scale-105">
                <partner.icon
                  className="w-7 h-7 text-foreground/30 transition-colors duration-500 group-hover:text-primary"
                  strokeWidth={1.5}
                />
              </div>
              <span className="text-xs tracking-wider uppercase text-foreground/30 transition-colors duration-500 group-hover:text-foreground/70 font-medium">
                {partner.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
