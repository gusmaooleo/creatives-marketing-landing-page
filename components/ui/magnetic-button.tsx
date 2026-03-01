"use client";

import { useRef, useCallback, useState } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  className = "",
  onClick,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const MAGNETIC_RADIUS = 50;
  const MAGNETIC_STRENGTH = 0.35;

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance < MAGNETIC_RADIUS) {
      gsap.to(buttonRef.current, {
        x: deltaX * MAGNETIC_STRENGTH,
        y: deltaY * MAGNETIC_STRENGTH,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!buttonRef.current) return;
    setIsHovered(false);
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="inline-block"
      style={{ padding: MAGNETIC_RADIUS }}
    >
      <button
        ref={buttonRef}
        onClick={onClick}
        className={`group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full bg-primary px-10 md:px-12 text-base font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 active:scale-95 will-change-transform ${
          isHovered ? "shadow-[0_0_24px_rgba(244,170,65,0.3)] scale-105" : ""
        } ${className}`}
      >
        <span className="relative z-10">{children}</span>
        <ArrowRight
          className={`h-5 w-5 relative z-10 transition-transform duration-300 ${
            isHovered ? "translate-x-1" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
