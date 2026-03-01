"use client";

import { motion, type Variants } from "framer-motion";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  PricingWrapper,
  Heading,
  Paragraph,
} from "@/components/ui/animated-pricing-cards";

gsap.registerPlugin(ScrollTrigger);

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full w-full">
      <Loader2 className="w-8 h-8 animate-spin text-primary/40" />
    </div>
  ),
});

import { MiniLandingPage } from "./separated-services/MiniLandingPage";
import { PieChart } from "./separated-services/PieChart";
import { FloatingFeed } from "./separated-services/FloatingFeed";
import { AICore } from "./separated-services/AICore";
import { ServiceRow } from "./separated-services/ServiceRow";

const textVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const splineVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: "easeOut", delay: 0.2 },
  },
};

export default function SeparatedServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(1);
  const activeSlideRef = useRef(1);

  // GSAP animations for Desktop Bento Grid reveal
  useEffect(() => {
    // Only run GSAP up-reveal on desktop so we don't interfere with mobile horizontal scroll
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      rowsRef.current.forEach((row) => {
        if (!row) return;

        gsap.fromTo(
          row,
          {
            opacity: 0,
            y: 80,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              end: "top 50%",
              scrub: 1,
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMobileScroll = useCallback(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const index = Math.round(scrollEl.scrollLeft / scrollEl.clientWidth) + 1;
    if (index !== activeSlideRef.current) {
      activeSlideRef.current = index;
      setActiveSlide(index);
    }
  }, []);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener("scroll", handleMobileScroll, {
        passive: true,
      });
      handleMobileScroll();
      return () => scrollEl.removeEventListener("scroll", handleMobileScroll);
    }
  }, [handleMobileScroll]);

  return (
    <section
      id="planos"
      ref={containerRef}
      className="relative overflow-hidden pt-24 pb-32 md:pt-36 md:pb-48 bg-background"
    >
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

      <div className="relative z-10 container mx-auto px-4 md:px-8 flex flex-col gap-32 md:gap-40">
        {/* ROW 0: The original Intro / Spline Hero */}
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
          </motion.div>

          {/* Right — Spline 3D (cols 7-12) */}
          <motion.div
            className="md:col-span-6 relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={splineVariants}
          >
            <div className="relative rounded-3xl overflow-hidden border border-border/10 bg-foreground/[0.02] dark:bg-foreground/[0.03] backdrop-blur-sm aspect-[3/4] md:aspect-[4/3] w-full flex items-center justify-center">
              {/* Glow accent */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

              {/* Spline scene */}
              <Spline
                scene="https://prod.spline.design/F6xlnapQiviQYsKd/scene.splinecode"
                className="w-full h-full -mb-32 translate-y-8 md:translate-y-12 scale-[1.3] min-[400px]:scale-[1.6] sm:scale-[2] md:scale-[1.1] md:ml-15 absolute inset-0"
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

        {/* ════════════════════════════════════════════════════════
         * BENTO GRID & MOBILE CAROUSEL
         * ════════════════════════════════════════════════════════ */}
        <div className="relative">
          {/* Background Orb to make card blur visible on mobile */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[60%] bg-primary/[0.08] dark:bg-primary/[0.05] rounded-full blur-[100px] pointer-events-none -z-10" />

          {/* Mobile Pagination Counter */}
          <div className="md:hidden absolute -top-16 right-0 border border-border/10 rounded-full px-4 py-1.5 backdrop-blur-sm bg-background/50 flex flex-col items-center">
            <span className="font-serif italic text-primary font-bold text-lg leading-none">
              {activeSlide.toString().padStart(2, "0")}
            </span>
            <span className="text-[10px] text-foreground/40 uppercase tracking-widest leading-none">
              de 04
            </span>
          </div>

          <div
            ref={scrollRef}
            className="flex md:grid md:grid-cols-12 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none hide-scrollbar pt-4 pb-8 md:py-0 -mx-4 px-4 md:mx-0 md:px-0"
          >
            {/* ROW 1: Landing Pages (8-col) + Paid Traffic (4-col) */}

            {/* Landing Pages */}
            <ServiceRow className="w-[85vw] md:w-auto shrink-0 snap-center snap-always md:col-span-8 flex">
              {(isActive) => (
                <div
                  ref={(el) => {
                    rowsRef.current[0] = el;
                  }}
                  className="w-full h-full"
                >
                  <PricingWrapper
                    contactHref="/orcamento"
                    type="waves"
                    isActive={isActive}
                    buttonText="Orçamento"
                  >
                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full h-full">
                      <div className="flex flex-col gap-4 lg:gap-6 lg:w-1/2 justify-center">
                        <span className="text-sm font-bold tracking-widest uppercase text-primary mb-1 lg:mb-2 block">
                          01. Presença Digital
                        </span>
                        <Heading>
                          Performance que converte. Design que retém.
                        </Heading>
                        <Paragraph>
                          Landing pages e sites institucionais otimizados para
                          velocidade, conversão e acessibilidade. Seu negócio
                          com a melhor vitrine.
                        </Paragraph>
                      </div>
                      <div className="lg:w-1/2 w-full h[180px] lg:h-auto lg:min-h-[250px] relative mt-2 lg:mt-0">
                        <div className="absolute inset-0 scale-[1.1] transform-gpu">
                          <MiniLandingPage />
                        </div>
                      </div>
                    </div>
                  </PricingWrapper>
                </div>
              )}
            </ServiceRow>

            {/* Paid Traffic */}
            <ServiceRow className="w-[85vw] md:w-auto shrink-0 snap-center snap-always md:col-span-4 flex">
              {(isActive) => (
                <div
                  ref={(el) => {
                    rowsRef.current[1] = el;
                  }}
                  className="w-full h-full"
                >
                  <PricingWrapper
                    contactHref="/contato"
                    type="crosses"
                    isActive={isActive}
                    buttonText=""
                  >
                    <div className="flex flex-col gap-4 lg:gap-6 h-full justify-between">
                      <div className="flex flex-col gap-4 lg:gap-6">
                        <span className="text-sm font-bold tracking-widest uppercase text-primary mb-1 lg:mb-2 block">
                          02. Escala
                        </span>
                        <Heading>Tráfego pago com foco em ROI real.</Heading>
                        <Paragraph>
                          Investimos onde o retorno é mensurável, escalando
                          vendas com dados.
                        </Paragraph>
                      </div>
                      <div className="w-full h-40 md:h-48 relative mt-4 md:mt-6 rounded-[1.5rem] overflow-hidden flex items-center justify-center">
                        <PieChart />
                      </div>
                    </div>
                  </PricingWrapper>
                </div>
              )}
            </ServiceRow>

            {/* ROW 2: Social Media (12-col Feature Section) */}
            <ServiceRow className="w-[85vw] md:w-auto shrink-0 snap-center snap-always md:col-span-12 flex">
              {(isActive) => (
                <div
                  ref={(el) => {
                    rowsRef.current[2] = el;
                  }}
                  className="w-full h-full"
                >
                  <PricingWrapper
                    contactHref="/contato"
                    type="waves"
                    isActive={isActive}
                    buttonText="Falar com especialista"
                  >
                    <div className="flex flex-col md:flex-row gap-6 md:gap-12 w-full h-full items-center">
                      <div className="md:w-[45%] w-full h-48 md:h-full md:min-h-[300px] relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden -ml-2 md:-ml-8 -mt-2 md:-mt-8 mb-2 md:-mb-8 -mr-2 md:mr-0 order-2 md:order-1">
                        <div className="absolute inset-0 w-full h-full scale-[1.05]">
                          <FloatingFeed />
                        </div>
                      </div>
                      <div className="flex flex-col gap-4 md:gap-6 md:w-[55%] justify-center order-1 md:order-2">
                        <span className="text-sm font-bold tracking-widest uppercase text-primary mb-1 md:mb-2 block">
                          03. Comunidade
                        </span>
                        <Heading>
                          Estratégias de conteúdo focadas em criar autoridade.
                        </Heading>
                        <Paragraph>
                          Planejamento, roteiro e edição. Muito além de posts
                          bonitos: criamos narrativas que conectam sua marca a
                          quem importa.
                        </Paragraph>
                      </div>
                    </div>
                  </PricingWrapper>
                </div>
              )}
            </ServiceRow>

            {/* ROW 3: AI Integrations (12-col Feature Section) */}
            <ServiceRow className="w-[85vw] md:w-auto shrink-0 snap-center snap-always md:col-span-12 flex">
              {(isActive) => (
                <div
                  ref={(el) => {
                    rowsRef.current[3] = el;
                  }}
                  className="w-full h-full"
                >
                  <PricingWrapper
                    contactHref="/contato"
                    type="crosses"
                    isActive={isActive}
                    buttonText="Implementar automação"
                  >
                    <div className="flex flex-col md:flex-row gap-6 md:gap-12 w-full h-full items-center">
                      <div className="flex flex-col gap-4 md:gap-6 md:w-[50%] justify-center">
                        <span className="text-sm font-bold tracking-widest uppercase text-primary mb-1 md:mb-2 block">
                          04. Futuro
                        </span>
                        <Heading>
                          Automação e IA no núcleo do seu negócio.
                        </Heading>
                        <Paragraph>
                          Atendimento automático 24/7 via WhatsApp, CRM
                          integrado e bots inteligentes. Reduza custos
                          operacionais enquanto vende mais.
                        </Paragraph>
                      </div>
                      <div className="md:w-[50%] w-full h-48 md:h-[400px] md:min-h-[300px] relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden -mx-2 md:mx-0 -mt-2 md:mt-0 mb-2 md:mb-0 flex items-center justify-center">
                        <div className="relative w-full h-full flex items-center justify-center scale-75 md:scale-100">
                          <AICore />
                        </div>
                      </div>
                    </div>
                  </PricingWrapper>
                </div>
              )}
            </ServiceRow>
          </div>
        </div>
      </div>
      {/* Hide scrollbar for Chrome, Safari and Opera */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </section>
  );
}
