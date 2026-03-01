"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

export const ServiceRow: React.FC<{
  children: (isActive: boolean) => React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  // Trigger active state when the row hits the middle of the viewport
  const isInView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  return (
    <div ref={ref} className={className}>
      {children(isInView)}
    </div>
  );
};
