"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full w-full">
      <Loader2 className="w-8 h-8 animate-spin text-primary/40" />
    </div>
  ),
});

const textVariants: any = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const splineVariants: any = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: "easeOut", delay: 0.2 },
  },
};

export default function SeparatedServices() {
  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      {/* Grid background with vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 100%)",
          opacity: 0.25,
        }}
      />

      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">
          {/* Left — Text (cols 1-6) */}
          <motion.div
            className="md:col-span-6 flex flex-col gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            <motion.span
              className="text-sm font-medium tracking-widest uppercase text-primary"
              variants={textVariants}
            >
              Além do Design
            </motion.span>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-foreground leading-[1.15]"
              variants={textVariants}
            >
              De sites de alta qualidade como este até{" "}
              <span className="italic text-primary">automações</span> de
              publicações com IA e tráfego pago.
            </motion.h2>

            <motion.p
              className="text-lg text-foreground/60 font-light max-w-md"
              variants={textVariants}
            >
              Combinamos criatividade humana com inteligência artificial para
              escalar sua presença digital de forma consistente.
            </motion.p>

            <motion.div variants={textVariants}>
              <Button
                size="lg"
                className="group rounded-full px-8 text-base font-medium gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-300"
                asChild
              >
                <a href="#contato">
                  Faça um orçamento
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right — Spline 3D (cols 7-12) */}
          <motion.div
            className="md:col-span-6 relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={splineVariants}
          >
            <div className="relative rounded-3xl overflow-hidden border border-border/10 bg-foreground/[0.02] dark:bg-foreground/[0.03] backdrop-blur-sm aspect-square md:aspect-[4/3]">
              {/* Glow accent */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

              {/* Spline scene — replace URL with your actual Spline scene */}
              <Spline
                scene="https://prod.spline.design/F6xlnapQiviQYsKd/scene.splinecode"
                className="w-full h-full -mb-32 translate-y-8 md:translate-y-12 scale-[1.1] ml-15"
              />
            </div>

            {/* Caption */}
            <motion.p
              className="mt-4 text-center text-sm italic text-foreground/40 font-serif"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Inteligência artificial, resultados reais.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
