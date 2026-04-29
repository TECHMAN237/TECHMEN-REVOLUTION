"use client";

import { ScrollReveal } from "@/components/layout/ScrollReveal";
import Image from "next/image";

export function CeoSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-32">
      <ScrollReveal>
        <div className="text-xs tracking-[0.2em] uppercase text-muted mb-16">
          Vision Behind the Revolution
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* Portrait */}
        <ScrollReveal direction="left">
          <div className="relative group">
            <div className="aspect-[3/4] bg-surface overflow-hidden relative">
              <Image
                src="/IMG_1252.jpg"
                alt="ZALI STEEVE — Founder & CEO"
                fill
                className="object-cover grayscale transition-all duration-700 group-hover:grayscale-[0.7] group-hover:scale-[1.02]"
                priority
              />
              {/* Soft lighting overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent" />
            </div>
            <div className="absolute inset-0 border border-white/[0.06] pointer-events-none" />
          </div>
        </ScrollReveal>

        {/* Text */}
        <ScrollReveal direction="right" delay={0.2}>
          <div className="md:py-12">
            <h2 className="text-3xl md:text-4xl font-light mb-2 tracking-tight">
              zali steeve
            </h2>
            <p className="text-sm text-muted uppercase tracking-wider mb-8">
              Founder & CEO
            </p>
            <p className="text-base text-muted/80 leading-relaxed max-w-md font-light">
              Leading the revolution at the intersection of technology and design.
              Every pixel matters, every line of code has purpose.
            </p>
            <div className="mt-8 w-12 h-px bg-white/20" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
