"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { forwardRef } from "react";

const MotionButton = motion("button");

type ButtonProps = {
  variant?: "primary" | "ghost" | "outline";
  children: React.ReactNode;
} & Omit<React.ComponentProps<typeof MotionButton>, "ref">;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    return (
      <MotionButton
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "inline-flex items-center justify-center px-6 py-3 text-sm tracking-wider uppercase font-medium transition-all duration-300",
          variant === "primary" &&
            "bg-text text-bg hover:bg-white/90",
          variant === "ghost" &&
            "bg-transparent text-muted hover:text-text",
          variant === "outline" &&
            "border border-white/20 text-text hover:bg-white/5 hover:border-white/30",
          className
        )}
        {...(props as any)}
      >
        {children}
      </MotionButton>
    );
  }
);

Button.displayName = "Button";
