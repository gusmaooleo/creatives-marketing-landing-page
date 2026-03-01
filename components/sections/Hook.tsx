"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hook() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinnedWrapperRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const exitOverlayRef = useRef<HTMLDivElement>(null);
  const headlineWhiteRef = useRef<HTMLHeadingElement>(null);
  const headlineMaskedRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pinnedWrapper = pinnedWrapperRef.current;
    const videoWrap = videoWrapRef.current;
    const exitOverlay = exitOverlayRef.current;
    const headlineWhite = headlineWhiteRef.current;
    const headlineMasked = headlineMaskedRef.current;
    const sub = subRef.current;
    if (
      !section ||
      !pinnedWrapper ||
      !videoWrap ||
      !exitOverlay ||
      !headlineWhite ||
      !headlineMasked ||
      !sub
    )
      return;

    // GPU hints
    videoWrap.style.willChange = "clip-path";
    headlineMasked.style.willChange = "opacity";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=500%",
          pin: pinnedWrapper,
          scrub: 1.5,
          anticipatePin: 1,
        },
      });

      tl.fromTo(
        videoWrap,
        { clipPath: "inset(42% 42% 42% 42% round 16px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "power2.inOut",
          duration: 0.2,
        },
        0,
      );

      const whiteChars =
        headlineWhite.querySelectorAll<HTMLSpanElement>(".hook-char");

      tl.fromTo(
        whiteChars,
        { opacity: 0, y: 50, rotateX: -80 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.015,
          ease: "power3.out",
          duration: 0.15,
        },
        0.1,
      );

      tl.fromTo(
        sub,
        { opacity: 0, y: 20, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          ease: "power2.out",
          duration: 0.1,
        },
        0.2,
      );

      tl.to(
        headlineWhite,
        {
          opacity: 0,
          ease: "power2.inOut",
          duration: 0.12,
        },
        0.45,
      );

      tl.fromTo(
        headlineMasked,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "power2.inOut",
          duration: 0.12,
        },
        0.47,
      );

      tl.to(
        exitOverlay,
        {
          opacity: 1,
          ease: "power2.in",
          duration: 0.15,
        },
        0.8,
      );

      tl.to(
        headlineMasked,
        {
          opacity: 0,
          scale: 0.9,
          ease: "power2.in",
          duration: 0.12,
        },
        0.82,
      );

      tl.to(
        sub,
        {
          opacity: 0,
          y: -20,
          ease: "power2.in",
          duration: 0.1,
        },
        0.88,
      );

      tl.to(
        videoWrap,
        {
          clipPath: "inset(48% 48% 48% 48% round 16px)",
          ease: "power2.inOut",
          duration: 0.15,
        },
        0.85,
      );
    }, section);

    return () => {
      ctx.revert();
      videoWrap.style.willChange = "auto";
      headlineMasked.style.willChange = "auto";
    };
  }, []);

  // Split headline into spans
  const headlineText = "O mundo está gritando.";
  const charSpans = headlineText.split("").map((char, i) => (
    <span
      key={i}
      className="hook-char inline-block"
      style={{ display: char === " " ? "inline" : undefined }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <section ref={sectionRef} className="relative w-full bg-background">
      <div
        ref={pinnedWrapperRef}
        className="relative w-full h-screen overflow-hidden"
      >
        {/* Video layer with animated clip-path */}
        <div
          ref={videoWrapRef}
          className="absolute inset-0 z-0"
          style={{ clipPath: "inset(42% 42% 42% 42% round 16px)" }}
        >
          <video
            muted
            loop
            playsInline
            autoPlay
            className="absolute inset-0 w-full h-full object-cover"
            src="/hook-section-video.webm"
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]" />
        </div>

        {/* Exit overlay — fades to bg color */}
        <div
          ref={exitOverlayRef}
          className="absolute inset-0 z-30 bg-background opacity-0 pointer-events-none"
        />

        {/* Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-10 md:col-start-2 text-center">
                {/* Headline container — both layers stacked */}
                <div className="relative">
                  {/* Layer 1: White text (visible first) */}
                  <h2
                    ref={headlineWhiteRef}
                    className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold tracking-tight text-white leading-[1.05]"
                    style={{ perspective: "800px" }}
                  >
                    {charSpans}
                  </h2>

                  {/* Layer 2: Video-masked text (fades in during Phase 4)
                       Technique: black bg + white text + mix-blend-mode: screen
                       → black disappears, video shows through the white text */}
                  <div
                    ref={headlineMaskedRef}
                    className="absolute inset-0 opacity-0 flex items-center justify-center overflow-hidden"
                    aria-hidden="true"
                    style={{ isolation: "isolate" }}
                  >
                    {/* Video playing behind the text */}
                    <video
                      muted
                      loop
                      playsInline
                      autoPlay
                      className="absolute inset-0 w-full h-full object-cover"
                      src="/hook-section-video.webm"
                    />
                    {/* Black background + white text — screen blend makes black vanish */}
                    <div
                      className="relative z-10 w-full h-full flex items-center justify-center bg-black"
                      style={{ mixBlendMode: "screen" }}
                    >
                      <span className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold tracking-tight text-white leading-[1.05] text-center px-4">
                        {headlineText}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Subheadline — persists throughout */}
                <p
                  ref={subRef}
                  className="mt-8 text-xl md:text-2xl lg:text-3xl font-light text-white/70 max-w-2xl mx-auto leading-relaxed opacity-0"
                >
                  Nós fazemos sua marca ser{" "}
                  <span className="font-semibold text-primary">ouvida</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
