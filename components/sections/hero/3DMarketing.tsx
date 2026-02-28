"use client";
import Spline from "@splinetool/react-spline";

interface HeroAnimationProps {
  onLoad?: () => void;
}

export default function HeroAnimation({ onLoad }: HeroAnimationProps) {
  return (
    <div className="w-full h-full relative">
      <Spline
        scene={"https://prod.spline.design/4xLc7PRR6kLlHdPo/scene.splinecode"}
        className="!w-full !h-full bg-transparent"
        style={{ position: "absolute", inset: 0 }}
        onLoad={onLoad}
      />
    </div>
  );
}
