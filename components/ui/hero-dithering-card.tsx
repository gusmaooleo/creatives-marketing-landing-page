"use client";

import { useState, Suspense, lazy, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { AnimatedHeadline } from "./animated-headline";
import { MagneticButton } from "./magnetic-button";

const Dithering = lazy(() =>
  // @ts-ignore
  import("@paper-design/shaders-react").then((mod) => ({
    default: mod.Dithering,
  })),
);

const fadeUpVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay },
  }),
};

export function HeroContent() {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden rounded-[32px] md:rounded-[48px] border border-border/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0.5, y: 0.5 });
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Dithering Background — fills the entire container */}
      <Suspense fallback={<div className="absolute inset-0 bg-muted/20" />}>
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-30 mix-blend-multiply dark:mix-blend-screen">
          <Dithering
            // @ts-ignore
            colorBack="#00000000"
            colorFront="#EC4E02"
            shape="warp"
            type="4x4"
            speed={isHovered ? 0.6 : 0.2}
            className="size-full"
            minPixelRatio={1}
          />
        </div>
      </Suspense>

      {/* Grid: Text Left + 3D Right */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-0 h-full lg:-mb-20">
        {/* Left side: Text content — spans 5 columns */}
        <div className="col-span-1 md:col-span-6 flex flex-col justify-center px-4 md:px-8 py-12 md:py-16">
          {/* Badge */}
          <motion.div
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm w-fit"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0.1}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Marketing para Criativos
          </motion.div>

          {/* Animated Headline */}
          <div className="mb-8">
            <AnimatedHeadline />
          </div>

          {/* Description */}
          <motion.p
            className="text-foreground/60 font-light text-base md:text-lg lg:text-xl max-w-lg mb-10 leading-relaxed"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={1.0}
          >
            Estratégias de tráfego pago e branding para empresas que não aceitam
            o comum.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={1.2}
            className="-ml-[50px]"
          >
            <MagneticButton>Quero escalar meu negócio</MagneticButton>
          </motion.div>
        </div>

        {/* Right side: 3D Spline animation — spans 6 columns */}
        <div className="hidden md:block col-span-1 md:col-span-6 relative min-h-[500px] lg:min-h-[1000px]">
          {/* Pulsing orange glow behind 3D phone */}
          <div
            id="hero-3d-slot"
            className="absolute inset-0 z-10 will-change-transform transition-transform duration-200 ease-out"
            style={{
              transform: `translate(${(mousePos.x - 0.5) * 10}px, ${(mousePos.y - 0.5) * 10}px)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
