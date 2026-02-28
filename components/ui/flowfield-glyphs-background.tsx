"use client";

import React, { useRef, useEffect } from "react";
import { useTheme } from "next-themes";

// Flowfield Glyphs Background Props
interface FlowfieldGlyphsBackgroundProps {
  children: React.ReactNode;
  backgroundColor?: string; // default "#040010"
  glyphColor?: string; // default "rgba(0, 255, 255, 1)"
  particleCount?: number; // default 1500
}

const FlowfieldGlyphsBackground: React.FC<FlowfieldGlyphsBackgroundProps> = ({
  children,
  backgroundColor = "transparent",
  glyphColor = "#F4AA41",
  particleCount = 1500,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  // Perlin noise generator
  const noise = (() => {
    const p = new Uint8Array(512);
    for (let i = 0; i < 256; i++) p[i] = i;
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [p[i], p[j]] = [p[j], p[i]];
    }
    for (let i = 0; i < 256; i++) p[i + 256] = p[i];

    const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
    const lerp = (t: number, a: number, b: number) => a + t * (b - a);
    const grad = (hash: number, x: number, y: number, z: number) => {
      const h = hash & 15;
      const u = h < 8 ? x : y;
      const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
      return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    };

    return (x: number, y: number, z: number) => {
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;
      const Z = Math.floor(z) & 255;
      x -= Math.floor(x);
      y -= Math.floor(y);
      z -= Math.floor(z);
      const u = fade(x),
        v = fade(y),
        w = fade(z);
      const A = p[X] + Y,
        AA = p[A] + Z,
        AB = p[A + 1] + Z;
      const B = p[X + 1] + Y,
        BA = p[B] + Z,
        BB = p[B + 1] + Z;

      return lerp(
        w,
        lerp(
          v,
          lerp(u, grad(p[AA], x, y, z), grad(p[BA], x - 1, y, z)),
          lerp(u, grad(p[AB], x, y - 1, z), grad(p[BB], x - 1, y - 1, z)),
        ),
        lerp(
          v,
          lerp(
            u,
            grad(p[AA + 1], x, y, z - 1),
            grad(p[BA + 1], x - 1, y, z - 1),
          ),
          lerp(
            u,
            grad(p[AB + 1], x, y - 1, z - 1),
            grad(p[BB + 1], x - 1, y - 1, z - 1),
          ),
        ),
      );
    };
  })();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark = resolvedTheme === "dark";

    let width: number, height: number;
    let particles: Particle[] = [];
    let frameId: number;
    let zoff = 0;
    const resolution = 20;
    const noiseScale = 0.05;
    const glyphs = ["+", "<", ">", "/", "!", "?", "*", "%", "&", "$", "#", "@"];

    class Particle {
      x: number;
      y: number;
      vel: { x: number; y: number };
      acc: { x: number; y: number };
      maxSpeed: number;
      glyph: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vel = { x: 0, y: 0 };
        this.acc = { x: 0, y: 0 };
        this.maxSpeed = 1.5;
        this.glyph = glyphs[Math.floor(Math.random() * glyphs.length)];
      }

      applyForce(force: { x: number; y: number }) {
        this.acc.x += force.x;
        this.acc.y += force.y;
      }

      update() {
        this.vel.x += this.acc.x;
        this.vel.y += this.acc.y;
        const speed = Math.hypot(this.vel.x, this.vel.y);
        if (speed > this.maxSpeed) {
          this.vel.x = (this.vel.x / speed) * this.maxSpeed;
          this.vel.y = (this.vel.y / speed) * this.maxSpeed;
        }
        this.x += this.vel.x;
        this.y += this.vel.y;
        this.acc.x = 0;
        this.acc.y = 0;
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;
      }

      draw() {
        if (!ctx) return;
        const angle = Math.atan2(this.vel.y, this.vel.x);
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(angle);
        ctx.font = "12px monospace";
        ctx.fillStyle = glyphColor;
        ctx.fillText(this.glyph, 0, 0);
        ctx.restore();
      }
    }

    const setup = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      particles = Array.from({ length: particleCount }, () => new Particle());
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);
    };

    const animate = () => {
      // Light mode trail: matches --background (#FFF3DB) RGB is 255, 243, 219
      // Dark mode trail: dark color like 4, 0, 16
      ctx.fillStyle = isDark
        ? "rgba(4, 0, 16, 0.05)"
        : "rgba(255, 243, 219, 0.05)";
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        const x = Math.floor(p.x / resolution);
        const y = Math.floor(p.y / resolution);
        const angle = noise(x * noiseScale, y * noiseScale, zoff) * Math.PI * 2;
        const force = { x: Math.cos(angle), y: Math.sin(angle) };
        p.applyForce(force);
        p.update();
        p.draw();
      });

      zoff += 0.0005;
      frameId = requestAnimationFrame(animate);
    };

    setup();
    animate();
    window.addEventListener("resize", setup);
    return () => {
      window.removeEventListener("resize", setup);
      cancelAnimationFrame(frameId);
    };
  }, [glyphColor, particleCount, backgroundColor, resolvedTheme]);

  return (
    <div className="relative h-screen w-full" style={{ backgroundColor }}>
      <canvas ref={canvasRef} className="absolute inset-0 z-0 h-full w-full" />
      <div className="relative z-10 flex h-full items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default FlowfieldGlyphsBackground;
