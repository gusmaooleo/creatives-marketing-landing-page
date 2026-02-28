"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ArrowRight, Send } from "lucide-react";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const headline =
  "Se você rolou até aqui, você acabou de provar que nosso produto funciona.";

const subheadline =
  "A explicação é simples: nossas landing pages não apenas convertem, elas retêm. Esta página que você está navegando é o nosso maior portfólio vivo. Design estratégico, psicologia de vendas e performance em cada pixel.";

/* ─── Chat Messages ─── */
const chatMessages = [
  { text: "Quanto custa uma landing page? 🤔", from: "user", delay: 0.1 },
  { text: "Depende do escopo! Quer conversar?", from: "bot", delay: 0.35 },
  { text: "Vi o portfólio de vocês 🔥", from: "user", delay: 0.6 },
  { text: "Obrigado! Bora marcar uma call?", from: "bot", delay: 0.85 },
  { text: "Preciso de tráfego pago também!", from: "user", delay: 1.1 },
  { text: "Fazemos tudo. Vamos agendar? 🚀", from: "bot", delay: 1.35 },
];

function ChatBubble({
  text,
  from,
  delay,
}: {
  text: string;
  from: string;
  delay: number;
}) {
  const isUser = from === "user";
  return (
    <motion.div
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      <div
        className={`
          max-w-[280px] px-4 py-2.5 rounded-2xl text-sm font-medium
          backdrop-blur-md border
          ${
            isUser
              ? "bg-primary/15 border-primary/20 text-foreground rounded-br-sm"
              : "bg-foreground/[0.04] border-border/15 text-foreground/80 rounded-bl-sm"
          }
        `}
      >
        {text}
      </div>
    </motion.div>
  );
}

function ScrubText({ text, className }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLSpanElement>(".scrub-word");

    const ctx = gsap.context(() => {
      gsap.set(words, { opacity: 0.1 });

      gsap.to(words, {
        opacity: 1,
        stagger: 0.05,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 40%",
          scrub: 1,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const wordElements = text.split(" ").map((word, i) => (
    <span key={i} className="scrub-word inline-block mr-[0.3em]">
      {word}
    </span>
  ));

  return (
    <div ref={containerRef} className={className}>
      {wordElements}
    </div>
  );
}

export default function MetaProof() {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden">
      {/* Subtle radial accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/[0.04] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left — Text column */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Label */}
            <motion.span
              className="inline-block text-sm font-medium tracking-widest uppercase text-primary mb-8"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              A Prova
            </motion.span>

            {/* Headline — GSAP scrub */}
            <ScrubText
              text={headline}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-foreground leading-[1.15] mb-10"
            />

            {/* Sub-headline — GSAP scrub */}
            <ScrubText
              text={subheadline}
              className="text-lg md:text-xl text-foreground/70 font-light leading-relaxed mb-16 max-w-2xl"
            />

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Button
                size="lg"
                className="group rounded-full px-10 py-6 text-base font-semibold gap-2.5 bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/25 transition-all duration-300 hover:scale-[1.03] uppercase tracking-wider"
                asChild
              >
                <a href="#contato">
                  Quero essa performance no meu negócio
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Right — Floating chat */}
          <div className="lg:col-span-5">
            <motion.div
              className="relative rounded-3xl border border-border/10 bg-foreground/[0.02] dark:bg-foreground/[0.03] backdrop-blur-sm p-6 shadow-lg shadow-primary/5"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {/* Chat header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/10">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">C</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Creatives Marketing
                  </p>
                  <p className="text-xs text-foreground/40">Online agora</p>
                </div>
                <div className="ml-auto w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>

              {/* Messages */}
              <div className="space-y-3 mb-6">
                {chatMessages.map((msg, i) => (
                  <ChatBubble
                    key={i}
                    text={msg.text}
                    from={msg.from}
                    delay={msg.delay}
                  />
                ))}
              </div>

              {/* Input bar */}
              <div className="flex items-center gap-2 rounded-full border border-border/15 bg-foreground/[0.03] dark:bg-foreground/[0.04] px-4 py-2.5">
                <input
                  type="text"
                  readOnly
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-transparent text-sm text-foreground/60 placeholder:text-foreground/30 outline-none cursor-default"
                />
                <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors cursor-default">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
