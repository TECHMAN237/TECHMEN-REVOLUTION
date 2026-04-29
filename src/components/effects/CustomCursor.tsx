"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

function useCustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    if (isMobile) return;
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove, isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const handlePointerCheck = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest('a, button, [role="button"], input, select, textarea');
      setIsPointer(!!isInteractive);
    };

    document.addEventListener("mousemove", handlePointerCheck);
    return () => document.removeEventListener("mousemove", handlePointerCheck);
  }, [isMobile]);

  return { position, isPointer, isMobile };
}

export function CustomCursor() {
  const { position, isPointer, isMobile } = useCustomCursor();

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]" style={{ mixBlendMode: "difference" }}>
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-white"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isPointer ? 2 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.1 }}
      />
      <motion.div
        className="absolute w-8 h-8 rounded-full border border-white/30"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isPointer ? 1.5 : 1,
          borderColor: isPointer ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.3)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.2 }}
      />
    </div>
  );
}
