"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { floatingIcons } from "../ui/floating-icons";
import { FloatingIconsHero } from "../ui/floating-icons-hero-section";
import { Pricing } from "../blocks/pricing";
import {
  Globe,
  Megaphone,
  BarChart3,
  Share2,
  ShoppingCart,
} from "lucide-react";

/* ─── Plan Data ─── */
const plans = [
  {
    name: "Starter",
    price: "497",
    yearlyPrice: "397",
    period: "mês",
    features: [
      "Landing page simples",
      "Publicações básicas",
      "Orçamento inicial",
      "Suporte por e-mail",
    ],
    description: "Ideal para quem está começando e quer uma presença digital.",
    buttonText: "Começar Agora",
    href: "#contato",
    isPopular: false,
  },
  {
    name: "Business",
    price: "997",
    yearlyPrice: "797",
    period: "mês",
    features: [
      "Landing page profissional",
      "Publicações estratégicas",
      "Tráfego pago gerenciado",
      "Manutenção da landing page",
      "Relatórios mensais",
    ],
    description: "Para negócios que querem crescer com consistência.",
    buttonText: "Escolher Business",
    href: "#contato",
    isPopular: true,
  },
  {
    name: "Content-Creator",
    price: "1997",
    yearlyPrice: "1597",
    period: "mês",
    features: [
      "Tudo do plano Business",
      "Conteúdo diário/semanal por IA",
      "Rede de engajamento",
      "Geração constante de conteúdo",
      "Estratégia de marca pessoal",
    ],
    description: "Para criadores que precisam de volume e constância.",
    buttonText: "Quero Criar",
    href: "#contato",
    isPopular: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    yearlyPrice: "Custom",
    period: "sob consulta",
    features: [
      "Tudo dos outros planos",
      "Soluções sob medida",
      "Equipe dedicada",
      "Consultoria estratégica",
      "Prioridade total no suporte",
      "SLA personalizado",
    ],
    description: "Personalizado para grandes operações. Sob medida.",
    buttonText: "Fale Conosco",
    href: "#contato",
    isPopular: false,
    isCustom: true,
  },
];

/* ─── Service Tags ─── */
const services = [
  { label: "Landing Pages de Alta Conversão", icon: Globe },
  { label: "Tráfego Pago", icon: BarChart3 },
  { label: "Ads", icon: Megaphone },
  { label: "Social Media", icon: Share2 },
  { label: "Sistemas de E-commerce", icon: ShoppingCart },
];

const tagVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
      delay: 0.1 + i * 0.07,
    },
  }),
};

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden py-20 md:py-32">
      {/* ── Layer 1: Grid background with vignette ── */}
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
          opacity: 0.35,
        }}
      />

      {/* ── Layer 2: Floating icons (behind content) ── */}
      <div className="absolute inset-0 z-[1] opacity-40">
        <FloatingIconsHero icons={floatingIcons} className="!min-h-0 !h-full" />
      </div>

      {/* ── Layer 3: Content ── */}
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        {/* Section label */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-medium tracking-widest uppercase text-primary">
            Nossos Serviços
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-foreground max-w-3xl mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Tudo que o seu negócio precisa para{" "}
          <span className="italic text-primary">crescer</span> online.
        </motion.h2>

        {/* Service tags */}
        <div className="flex flex-wrap gap-3 mb-20">
          {services.map((s, i) => (
            <motion.div
              key={s.label}
              className={cn(
                "inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full",
                "border-[0.75px] border-border/20",
                "bg-foreground/[0.02] dark:bg-foreground/[0.03] backdrop-blur-xl",
                "text-sm font-medium text-foreground/70",
                "hover:border-primary/30 hover:text-primary hover:bg-primary/[0.04]",
                "transition-all duration-300 cursor-default select-none",
              )}
              variants={tagVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              <s.icon className="h-4 w-4 text-primary/70" />
              {s.label}
            </motion.div>
          ))}
        </div>

        {/* Pricing cards */}
        <Pricing plans={plans} />
      </div>
    </section>
  );
}
