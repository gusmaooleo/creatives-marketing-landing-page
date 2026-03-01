"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2, Sparkles, BrainCircuit } from "lucide-react";
import { useEffect, useRef } from "react";
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
import { GrowthChart } from "./separated-services/GrowthChart";
import { FloatingFeed } from "./separated-services/FloatingFeed";
import { AICore } from "./separated-services/AICore";
import { ServiceRow } from "./separated-services/ServiceRow";

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

/* ════════════════════════════════════════════════════════
 * MAIN COMPONENT
 * ════════════════════════════════════════════════════════ */

export default function SeparatedServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // GSAP ScrollTrigger for the rows to slide up nicely as you scroll
    const ctx = gsap.context(() => {
      rowsRef.current.forEach((row, index) => {
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
              start: "top 85%", // Triggers when the top of the row hits 85% of viewport
              end: "top 50%",
              scrub: 1, // Smooth scrub effect attached to scroll
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden py-24 md:py-36 bg-background"
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

      <div className="relative z-10 container mx-auto px-4 md:px-8 flex flex-col gap-24 md:gap-32">
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
            <div className="relative rounded-3xl overflow-hidden border border-border/10 bg-foreground/[0.02] dark:bg-foreground/[0.03] backdrop-blur-sm aspect-square md:aspect-[4/3]">
              {/* Glow accent */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

              {/* Spline scene */}
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

        {/* ════════════════════════════════════════════════════════
         * ROW 1: Landing Pages (Visual Left, Card Right)
         * ════════════════════════════════════════════════════════ */}
        <ServiceRow className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {(isActive) => (
            <>
              <div
                ref={(el) => {
                  rowsRef.current[0] = el;
                }}
                className="lg:col-span-6 order-2 lg:order-1 h-full min-h-[350px]"
              >
                <MiniLandingPage />
              </div>
              <div className="lg:col-span-6 order-1 lg:order-2">
                <PricingWrapper
                  contactHref="#contato"
                  type="waves"
                  isActive={isActive}
                >
                  <span className="text-sm font-bold tracking-widest uppercase text-primary mb-2 block">
                    01. Presença Digital
                  </span>
                  <Heading>Performance que converte. Design que retém.</Heading>
                  <Paragraph>
                    Landing pages e sites institucionais otimizados para
                    velocidade, conversão e acessibilidade. Seu negócio com a
                    melhor vitrine.
                  </Paragraph>
                </PricingWrapper>
              </div>
            </>
          )}
        </ServiceRow>

        {/* ════════════════════════════════════════════════════════
         * ROW 2: Paid Traffic (Card Left, Visual Right)
         * ════════════════════════════════════════════════════════ */}
        <ServiceRow className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {(isActive) => (
            <>
              <div
                ref={(el) => {
                  rowsRef.current[1] = el;
                }}
                className="lg:col-span-6 order-1"
              >
                <PricingWrapper
                  contactHref="#contato"
                  type="crosses"
                  isActive={isActive}
                >
                  <span className="text-sm font-bold tracking-widest uppercase text-primary mb-2 block">
                    02. Escala
                  </span>
                  <Heading>Tráfego pago com foco em ROI real.</Heading>
                  <Paragraph>
                    Gestão inteligente de campanhas no Google Ads e Meta Ads.
                    Investimos onde o retorno é mensurável, escalando suas
                    vendas com dados.
                  </Paragraph>
                </PricingWrapper>
              </div>
              <div className="lg:col-span-6 order-2 h-full min-h-[350px]">
                <GrowthChart />
              </div>
            </>
          )}
        </ServiceRow>

        {/* ════════════════════════════════════════════════════════
         * ROW 3: Social Media (Visual Left, Card Right)
         * ════════════════════════════════════════════════════════ */}
        <ServiceRow className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {(isActive) => (
            <>
              <div
                ref={(el) => {
                  rowsRef.current[2] = el;
                }}
                className="lg:col-span-6 order-2 lg:order-1 h-full min-h-[350px]"
              >
                <FloatingFeed />
              </div>
              <div className="lg:col-span-6 order-1 lg:order-2">
                <PricingWrapper
                  contactHref="#contato"
                  type="waves"
                  isActive={isActive}
                >
                  <span className="text-sm font-bold tracking-widest uppercase text-primary mb-2 block">
                    03. Comunidade
                  </span>
                  <Heading>
                    Estratégias de conteúdo focadas em criar autoridade.
                  </Heading>
                  <Paragraph>
                    Planejamento, roteiro e edição. Muito além de posts bonitos:
                    criamos narrativas que conectam sua marca a quem importa.
                  </Paragraph>
                </PricingWrapper>
              </div>
            </>
          )}
        </ServiceRow>

        {/* ════════════════════════════════════════════════════════
         * ROW 4: AI Integrations (Card Left, Visual Right)
         * ════════════════════════════════════════════════════════ */}
        <ServiceRow className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {(isActive) => (
            <>
              <div
                ref={(el) => {
                  rowsRef.current[3] = el;
                }}
                className="lg:col-span-6 order-1"
              >
                <PricingWrapper
                  contactHref="#contato"
                  type="crosses"
                  isActive={isActive}
                >
                  <span className="text-sm font-bold tracking-widest uppercase text-primary mb-2 block">
                    04. Futuro
                  </span>
                  <Heading>Automação e IA no núcleo do seu negócio.</Heading>
                  <Paragraph>
                    Atendimento automático 24/7 via WhatsApp, CRM integrado e
                    bots inteligentes. Reduza custos operacionais enquanto vende
                    mais.
                  </Paragraph>
                </PricingWrapper>
              </div>
              <div className="lg:col-span-6 order-2 h-full min-h-[350px]">
                <AICore />
              </div>
            </>
          )}
        </ServiceRow>
      </div>
    </section>
  );
}
