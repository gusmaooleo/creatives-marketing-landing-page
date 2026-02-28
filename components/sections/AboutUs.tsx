"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { GlowingEffect } from "../ui/glowing-effect";
import FlowfieldGlyphsBackground from "../ui/flowfield-glyphs-background";

const cardVariants: any = {
  hidden: { opacity: 0, y: 50, filter: "blur(4px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut", delay },
  }),
};

function NpsRing({ value, max = 10 }: { value: number; max?: number }) {
  const radius = 36;
  const stroke = 4;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / max) * circumference;

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg
        className="transform -rotate-90"
        width="96"
        height="96"
        viewBox="0 0 96 96"
      >
        <circle
          cx="48"
          cy="48"
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-foreground/5"
          strokeWidth={stroke}
        />
        <motion.circle
          cx="48"
          cy="48"
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-primary"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: circumference - progress }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        />
      </svg>
      <span className="absolute text-2xl font-bold text-foreground tabular-nums">
        {value}
      </span>
    </div>
  );
}

/* ── Growth Bar Chart ── */
const barData = [18, 24, 22, 30, 28, 38, 35, 50, 48, 62, 58, 75];

function GrowthChart() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const maxVal = Math.max(...barData);
  const chartH = 140;
  const barW = 100 / barData.length;

  const points = barData
    .map((v, i) => {
      const x = (i / (barData.length - 1)) * 100;
      const y = chartH - (v / maxVal) * chartH;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div ref={ref} className="relative w-full" style={{ height: chartH + 32 }}>
      {/* Bars */}
      <div className="absolute inset-0 flex items-end gap-[3px] px-0.5">
        {barData.map((v, i) => {
          const pct = (v / maxVal) * 100;
          const ratio = i / (barData.length - 1);
          return (
            <motion.div
              key={i}
              className="flex-1 rounded-t-md relative overflow-hidden"
              initial={{ height: 0 }}
              animate={isInView ? { height: `${pct}%` } : { height: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.15 + i * 0.06,
                ease: "easeOut",
              }}
            >
              {/* gradient fill per bar */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top, hsl(${38 - ratio * 8}, ${85 + ratio * 10}%, ${72 - ratio * 18}%), hsl(${32}, ${90}%, ${58 - ratio * 10}%))`,
                  opacity: 0.85 + ratio * 0.15,
                }}
              />
            </motion.div>
          );
        })}
      </div>

      <svg
        className="absolute inset-0 w-full pointer-events-none"
        style={{ height: chartH }}
        viewBox={`0 0 100 ${chartH}`}
        preserveAspectRatio="none"
      >
        <motion.polyline
          points={points}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          opacity={0.5}
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
        />
      </svg>

      {/* ROI Badge */}
      <motion.div
        className="absolute top-0 right-0 z-10"
        initial={{ opacity: 0, y: 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <span className="inline-flex items-center rounded-full bg-primary text-primary-foreground text-[11px] font-bold px-2.5 py-1 shadow-lg shadow-primary/20">
          +142% ROI
        </span>
      </motion.div>
    </div>
  );
}

const expertiseTags = [
  "Tráfego Pago",
  "Branding",
  "UI/UX",
  "Mídias Sociais",
  "SEO",
  "Análise de Dados",
];

const glowProps = {
  spread: 40,
  glow: true,
  disabled: false,
  proximity: 64,
  inactiveZone: 0.01,
  borderWidth: 3,
};

export default function AboutUs() {
  return (
    <section id="sobre-nos" className="py-20 md:py-32 relative overflow-hidden">
      {/* Flowfield background */}
      <div className="absolute inset-0 -z-10 opacity-15 pointer-events-none">
        <FlowfieldGlyphsBackground particleCount={400}>
          <></>
        </FlowfieldGlyphsBackground>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        {/* Section Title */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-medium tracking-widest uppercase text-primary">
            Sobre Nós
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-foreground">
            Quem move a <span className="italic text-primary">Creatives</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 auto-rows-auto">
          <motion.div
            className="md:col-span-7 md:row-span-2 list-none"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={0}
          >
            <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border/20 p-2 md:rounded-[1.5rem] md:p-3">
              <GlowingEffect {...glowProps} />
              <div className="relative h-full rounded-xl border-[0.75px] border-border/10 bg-background/70 backdrop-blur-2xl p-8 md:p-12 overflow-hidden group shadow-lg shadow-primary/5">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/[0.04] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-opacity duration-700 group-hover:opacity-100 opacity-50" />

                <div className="relative z-10">
                  <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-foreground/90 font-light">
                    Somos um{" "}
                    <span className="font-serif italic text-primary">
                      grupo criativo
                    </span>{" "}
                    de pessoas, dispostas a alavancar o seu produto. Nascemos da
                    necessidade e da visibilidade, plantamos{" "}
                    <span className="font-semibold">qualidade</span> e{" "}
                    <span className="font-semibold">excelência</span> nos nossos
                    serviços, e colhemos
                  </p>

                  <div className="mt-6 mb-4 overflow-hidden rounded-2xl bg-primary/[0.06] dark:bg-primary/[0.08] py-3 relative">
                    <motion.div
                      className="flex whitespace-nowrap"
                      animate={{ x: ["0%", "-50%"] }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      {Array.from({ length: 8 }).map((_, i) => (
                        <span
                          key={i}
                          className="text-2xl md:text-3xl lg:text-4xl font-serif italic text-primary/80 mx-6 select-none"
                        >
                          muuuuuitas vendas ✦
                        </span>
                      ))}
                    </motion.div>
                  </div>

                  <p className="text-lg text-foreground/60 font-light">
                    Essa é a nossa promessa. Resultados que você mede,
                    criatividade que você sente.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Cell 2 — NPS + Growth Chart (5 cols, 2 rows) */}
          <motion.div
            className="md:col-span-5 md:row-span-2 list-none"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={0.15}
          >
            <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border/20 p-2 md:rounded-[1.5rem] md:p-3">
              <GlowingEffect {...glowProps} />
              <div className="relative h-full rounded-xl border-[0.75px] border-primary/15 bg-background/70 backdrop-blur-2xl p-8 md:p-10 overflow-hidden flex flex-col justify-between shadow-lg shadow-primary/10">
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/[0.05] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 flex-1 flex flex-col justify-between gap-6">
                  {/* NPS Score */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground/70 font-medium mb-1">
                        NPS Score
                      </p>
                      <p className="text-xs text-muted-foreground/50">
                        Satisfação dos clientes
                      </p>
                    </div>
                    <NpsRing value={9.8} />
                  </div>

                  {/* Growth Chart */}
                  <div className="flex-1 flex flex-col justify-end">
                    <p className="text-xs tracking-widest uppercase text-muted-foreground/50 mb-3 font-medium">
                      Crescimento dos clientes
                    </p>
                    <GrowthChart />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Cell 3 — Especialidades (4 cols) */}
          <motion.div
            className="md:col-span-4 list-none"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={0.3}
          >
            <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border/20 p-2 md:rounded-[1.5rem] md:p-3">
              <GlowingEffect {...glowProps} />
              <div className="relative h-full rounded-xl border-[0.75px] border-border/10 bg-background/70 backdrop-blur-2xl p-6 md:p-8 overflow-hidden shadow-lg shadow-primary/5">
                <p className="text-xs tracking-widest uppercase text-muted-foreground/50 mb-4 font-medium">
                  Especialidades
                </p>
                <div className="flex flex-wrap gap-2">
                  {expertiseTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-border/20 text-foreground/60 hover:text-primary hover:border-primary/30 hover:bg-primary/[0.04] transition-all duration-300 cursor-default font-normal"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Cell 4 — Fundação / Time (4 cols) */}
          <motion.div
            className="md:col-span-4 list-none"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={0.4}
          >
            <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border/20 p-2 md:rounded-[1.5rem] md:p-3">
              <GlowingEffect {...glowProps} />
              <div className="relative h-full rounded-xl border-[0.75px] border-primary/15 bg-primary/[0.03] backdrop-blur-2xl p-6 md:p-8 overflow-hidden flex flex-col justify-center shadow-lg shadow-primary/10">
                <p className="text-4xl md:text-5xl font-serif font-bold text-foreground tracking-tight">
                  2026
                </p>
                <p className="text-sm text-muted-foreground/60 mt-2 font-medium">
                  Fundados com uma missão
                </p>
                <div className="mt-4 pt-4 border-t border-border/10">
                  <p className="text-2xl font-bold text-primary tabular-nums">
                    5+
                  </p>
                  <p className="text-sm text-muted-foreground/60 font-medium">
                    Criativos no time
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Cell 5 — CTA (4 cols) */}
          <motion.div
            className="md:col-span-4 list-none"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={0.5}
          >
            <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border/20 p-2 md:rounded-[1.5rem] md:p-3">
              <GlowingEffect {...glowProps} />
              <div className="relative h-full rounded-xl border-[0.75px] border-border/10 bg-primary/[0.06] backdrop-blur-2xl p-6 md:p-8 overflow-hidden flex flex-col justify-center items-start group cursor-pointer hover:bg-primary/[0.12] transition-colors duration-500">
                <p className="text-xl md:text-2xl font-serif italic text-foreground/80 mb-4">
                  Vamos conversar?
                </p>
                <div className="flex items-center gap-2 text-primary font-medium text-sm tracking-wide uppercase">
                  <span>Fale conosco</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
