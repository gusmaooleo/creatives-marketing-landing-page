"use client";

import { Header } from "@/components/ui/header";
import Hero from "@/components/sections/Hero";
import AboutUs from "@/components/sections/AboutUs";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="p-4">
          <Hero />
          <AboutUs />
        </div>
      </main>
    </div>
  );
}
