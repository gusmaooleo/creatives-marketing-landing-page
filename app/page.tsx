"use client";

import { Suspense, lazy } from "react";
import { Header } from "@/components/ui/header";
import Hero from "@/components/sections/Hero";
import Partners from "@/components/sections/Partners";
import AboutUs from "@/components/sections/AboutUs";
import { ScrollTracker } from "@/components/ui/scroll-tracker";
import { SmoothScroll } from "@/components/ui/smooth-scroll";

const Waves = lazy(() =>
  import("@/components/ui/wave-background").then((mod) => ({
    default: mod.Waves,
  })),
);
const Services = lazy(() => import("@/components/sections/Services"));

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Partners />
        <div className="relative">
          <Suspense fallback={null}>
            <Waves className="h-full w-full opacity-10" />
          </Suspense>
          <AboutUs />
        </div>
        <Suspense fallback={null}>
          <Services />
        </Suspense>
      </main>
      <ScrollTracker />
    </div>
  );
}
