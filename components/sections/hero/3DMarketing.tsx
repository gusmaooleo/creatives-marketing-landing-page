"use client";
import Spline from "@splinetool/react-spline";

export default function HeroAnimation() {
  return (
    <main className="w-full h-full">
      <Spline
        scene={"https://prod.spline.design/4xLc7PRR6kLlHdPo/scene.splinecode"}
        className="w-full h-full bg-transparent"
      />
    </main>
  );
}
