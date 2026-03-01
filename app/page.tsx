"use client";

import AboutUs from "@/components/sections/AboutUs";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import { Header } from "@/components/ui/header";
import LoadingScreen from "@/components/ui/loading-screen";
import { ScrollTracker } from "@/components/ui/scroll-tracker";
import { LinePath } from "@/components/ui/svg-follow-scroll";
import { useScroll } from "framer-motion";
import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";

const Services = lazy(() => import("@/components/sections/Services"));
const SeparatedServices = lazy(
  () => import("@/components/sections/SeparatedServices"),
);
const Hook = lazy(() => import("@/components/sections/Hook"));
const MetaProof = lazy(() => import("@/components/sections/MetaProof"));

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const hasHiddenLoadingRef = useRef(false);
  const loadingTimeoutRef = useRef<number | null>(null);

  const scrollSectionsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollSectionsRef,
    offset: ["start end", "end start"],
  });

  const hideLoadingScreen = useCallback((delayMs: number) => {
    if (hasHiddenLoadingRef.current) return;
    hasHiddenLoadingRef.current = true;

    if (loadingTimeoutRef.current !== null) {
      window.clearTimeout(loadingTimeoutRef.current);
    }

    loadingTimeoutRef.current = window.setTimeout(() => {
      setIsLoading(false);
      loadingTimeoutRef.current = null;
    }, delayMs);
  }, []);

  useEffect(() => {
    const fallbackTimeout = window.setTimeout(() => {
      hideLoadingScreen(0);
    }, 3500);

    return () => {
      window.clearTimeout(fallbackTimeout);
      if (loadingTimeoutRef.current !== null) {
        window.clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, [hideLoadingScreen]);

  const handleSplineLoad = useCallback(() => {
    hideLoadingScreen(400);
  }, [hideLoadingScreen]);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />

      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Hero onSplineLoad={handleSplineLoad} />
          <AboutUs />

          <div ref={scrollSectionsRef} className="relative">
            <div className="absolute top-0 right-0 w-full h-full z-[5] pointer-events-none overflow-hidden hidden lg:block">
              <div className="absolute left-[20%] top-[400px] z-0 pointer-events-none hidden md:block">
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
        <Footer />
        <ScrollTracker />
      </div>
    </>
  );
}
