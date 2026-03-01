"use client";

import AboutUs from "@/components/sections/AboutUs";
import Hero from "@/components/sections/Hero";
import { Header } from "@/components/ui/header";
import LoadingScreen from "@/components/ui/loading-screen";
import { ScrollTracker } from "@/components/ui/scroll-tracker";
import { LinePath } from "@/components/ui/svg-follow-scroll";
import { useScroll } from "framer-motion";
import { Suspense, lazy, useCallback, useRef, useState } from "react";

const Services = lazy(() => import("@/components/sections/Services"));
const SeparatedServices = lazy(
  () => import("@/components/sections/SeparatedServices"),
);
const Hook = lazy(() => import("@/components/sections/Hook"));
const MetaProof = lazy(() => import("@/components/sections/MetaProof"));

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const scrollSectionsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollSectionsRef,
    offset: ["start end", "end start"],
  });

  const handleSplineLoad = useCallback(() => {
    // Small delay for a smoother transition
    setTimeout(() => setIsLoading(false), 400);
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />

      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Hero onSplineLoad={handleSplineLoad} />
          <AboutUs />

          {/* Sections spanned by the SVG scroll path */}
          <div ref={scrollSectionsRef} className="relative">
            {/* SVG follow-scroll line — scoped to these sections only */}
            <div className="absolute top-0 right-0 w-full h-full z-[5] pointer-events-none overflow-hidden hidden lg:block">
              <div className="sticky top-0 h-screen flex items-start justify-end pt-16 pr-4 xl:pr-12">
                <LinePath
                  scrollYProgress={scrollYProgress}
                  strokeColor="var(--primary)"
                  strokeWidth={14}
                  className="w-[50vw] max-w-[700px] h-auto opacity-35"
                />
              </div>
            </div>

            <div className="relative">
              <Suspense fallback={null}>
                <Services />
              </Suspense>
            </div>
            <div className="relative">
              <Suspense fallback={null}>
                <SeparatedServices />
              </Suspense>
            </div>
            <div className="relative">
              <Suspense fallback={null}>
                <Hook />
              </Suspense>
            </div>
            <div className="relative">
              <Suspense fallback={null}>
                <MetaProof />
              </Suspense>
            </div>
          </div>
        </main>
        <ScrollTracker />
      </div>
    </>
  );
}
