"use client";

import { Suspense, lazy } from "react";
import { HeroContent } from "../ui/hero-dithering-card";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

const HeroAnimation = lazy(() => import("./hero/3DMarketing"));

interface HeroProps {
  onSplineLoad?: () => void;
}

export default function Hero({ onSplineLoad }: HeroProps) {
  const [slotEl, setSlotEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.getElementById("hero-3d-slot");
    if (el) setSlotEl(el);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full min-h-[calc(100vh-5rem)] flex items-center py-6 md:py-10"
    >
      <div className="container mx-auto px-4 md:px-8">
        <HeroContent />
      </div>

      {slotEl &&
        createPortal(
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
                <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              </div>
            }
          >
            <HeroAnimation onLoad={onSplineLoad} />
          </Suspense>,
          slotEl,
        )}
    </section>
  );
}
