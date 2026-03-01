"use client";

import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star, Sparkles, Info } from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
  isCustom?: boolean;
}

interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
}

const cardVariants: any = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut", delay },
  }),
};

const glowProps = {
  spread: 40,
  glow: true,
  disabled: false,
  proximity: 64,
  inactiveZone: 0.01,
  borderWidth: 3,
};

export function Pricing({
  plans,
  title = "Planos & Preços",
  description = "Escolha o plano ideal para o seu negócio.\nTodos os planos incluem suporte dedicado e acesso à nossa plataforma.",
}: PricingProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const switchRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: ["#F4AA41", "#FFD497", "#EC4E02", "#FFF3DB"],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  return (
    <div>
      {/* Section header */}
      <motion.div
        className="text-center space-y-4 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-4xl md:text-5xl font-bold tracking-tight font-serif">
          {title}
        </h3>
        <p className="text-muted-foreground text-base md:text-lg whitespace-pre-line max-w-2xl mx-auto">
          {description}
        </p>
      </motion.div>

      {/* Billing toggle */}
      <motion.div
        className="flex justify-center items-center mb-10 gap-3"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <span
          className={cn(
            "text-sm font-medium transition-colors",
            isMonthly ? "text-foreground" : "text-muted-foreground/50",
          )}
        >
          Mensal
        </span>
        <label className="relative inline-flex items-center cursor-pointer">
          <Label>
            <Switch
              ref={switchRef as any}
              checked={!isMonthly}
              onCheckedChange={handleToggle}
              className="relative"
            />
          </Label>
        </label>
        <span
          className={cn(
            "text-sm font-medium transition-colors",
            !isMonthly ? "text-foreground" : "text-muted-foreground/50",
          )}
        >
          Anual{" "}
          <span className="text-primary font-semibold">(Economize 20%)</span>
        </span>
      </motion.div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            className="list-none"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={index * 0.1}
          >
            <div
              className={cn(
                "relative h-full rounded-[1.25rem] border-[0.75px] p-2 md:rounded-[1.5rem] md:p-3",
                plan.isPopular ? "border-primary/40" : "border-border/20",
              )}
            >
              {plan.isPopular && <GlowingEffect {...glowProps} />}

              <div
                className={cn(
                  "relative h-full rounded-xl border-[0.75px] overflow-hidden flex flex-col",
                  plan.isPopular
                    ? "border-primary/20 bg-primary/[0.04] dark:bg-primary/[0.06]"
                    : "border-border/10 bg-foreground/[0.02] dark:bg-foreground/[0.03]",
                  "backdrop-blur-xl p-6 md:p-8",
                )}
              >
                {/* Popular badge */}
                {plan.isPopular && (
                  <div className="absolute top-0 right-0 bg-primary py-1 px-3 rounded-bl-xl rounded-tr-lg flex items-center gap-1.5">
                    <Star className="text-primary-foreground h-3.5 w-3.5 fill-current" />
                    <span className="text-primary-foreground text-xs font-semibold tracking-wide uppercase">
                      Popular
                    </span>
                  </div>
                )}

                {/* Plan name */}
                <p className="text-xs tracking-widest uppercase text-muted-foreground/50 font-medium mb-4">
                  {plan.name}
                </p>

                {/* Price */}
                {!plan.isCustom && (
                  <div className="text-xs text-muted-foreground/40 -mb-1 flex flex-row items-center gap-1">
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3 w-3" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          O valor é aproximado e pode variar de acordo com a
                          demanda.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                    <p>cerca de:</p>
                  </div>
                )}
                <div className="flex items-baseline gap-x-1 mb-1">
                  <span className="text-4xl md:text-5xl font-bold tracking-tight text-foreground tabular-nums">
                    {plan.isCustom ? (
                      plan.price
                    ) : (
                      <NumberFlow
                        value={
                          isMonthly
                            ? Number(plan.price)
                            : Number(plan.yearlyPrice)
                        }
                        format={{
                          style: "currency",
                          currency: "BRL",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }}
                        transformTiming={{
                          duration: 500,
                          easing: "ease-out",
                        }}
                        willChange
                        className="tabular-nums"
                      />
                    )}
                  </span>
                  {plan.period !== "sob consulta" && !plan.isCustom && (
                    <span className="text-sm font-medium text-muted-foreground/60">
                      /{plan.period}
                    </span>
                  )}
                </div>

                <p className="text-xs text-muted-foreground/40 mb-6">
                  {plan.isCustom
                    ? "\u00A0"
                    : isMonthly
                      ? "cobrado mensalmente"
                      : "cobrado anualmente"}
                </p>

                {/* Features */}
                <ul className="flex-1 space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground/70 leading-snug">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={plan.href}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full gap-2 text-sm font-semibold tracking-tight",
                    "transition-all duration-300 ease-out",
                    "hover:ring-2 hover:ring-primary hover:ring-offset-1 hover:bg-primary hover:text-primary-foreground",
                    plan.isPopular
                      ? "bg-primary text-primary-foreground border-primary/30"
                      : "bg-foreground/[0.03] border-border/20 text-foreground hover:border-primary/30",
                  )}
                >
                  {plan.isPopular && (
                    <Sparkles className="h-4 w-4 fill-current" />
                  )}
                  {plan.buttonText}
                </Link>

                {/* Description */}
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground/40 text-center">
                  {plan.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
