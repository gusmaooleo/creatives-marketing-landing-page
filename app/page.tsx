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

          <AboutUs />
        </main>

        {/* Scroll Tracker — fixed on right edge */}
        <ScrollTracker />
      </div>
    </SmoothScroll>
  );
}
