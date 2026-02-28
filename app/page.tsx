"use client";

import { Header } from "@/components/ui/header";
import Hero from "@/components/sections/Hero";
import AboutUs from "@/components/sections/AboutUs";
import { ScrollTracker } from "@/components/ui/scroll-tracker";
import { SmoothScroll } from "@/components/ui/smooth-scroll";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Hero />

          <section id="sobre-nos" className="min-h-screen py-20 px-4 md:px-8">
            <AboutUs />
          </section>

          <section id="parceiros" className="min-h-screen py-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-serif font-bold text-foreground mb-8">
                Parceiros
              </h2>
              <p className="text-muted-foreground text-lg">Em breve.</p>
            </div>
          </section>

          <section id="servicos" className="min-h-screen py-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-serif font-bold text-foreground mb-8">
                Serviços
              </h2>
              <p className="text-muted-foreground text-lg">Em breve.</p>
            </div>
          </section>

          <section id="contate-nos" className="min-h-screen py-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-serif font-bold text-foreground mb-8">
                Contate-nos
              </h2>
              <p className="text-muted-foreground text-lg">Em breve.</p>
            </div>
          </section>
        </main>

        {/* Scroll Tracker — fixed on right edge */}
        <ScrollTracker />
      </div>
    </SmoothScroll>
  );
}
