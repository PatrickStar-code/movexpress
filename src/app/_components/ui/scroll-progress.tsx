"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps, useScroll, useSpring } from "motion/react";
import React from "react";
interface ScrollProgressProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {}

export const ScrollProgress = React.forwardRef<
  HTMLDivElement,
  ScrollProgressProps
>(({ className, ...props }, ref) => {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });

  return (
    <motion.div
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-[1] h-1 origin-left bg-gradient-to-r from-[#F9802D] via-[#F9802D] to-[#F9802D]",
        className
      )}
      style={{
        scaleX,
      }}
      {...props}
    />
  );
});

ScrollProgress.displayName = "ScrollProgress";
