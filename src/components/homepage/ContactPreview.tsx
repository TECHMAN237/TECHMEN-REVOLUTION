"use client";

import { ScrollReveal } from "@/components/layout/ScrollReveal";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function ContactPreview() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-32 border-t border-white/[0.06]">
      <ScrollReveal>
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs tracking-[0.2em] uppercase text-muted mb-8">
            Get in Touch
          </div>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-6">
            Let&apos;s create something
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">extraordinary.</span>
          </h2>
          <p className="text-muted font-light mb-10">
            Have a project in mind? We&apos;d love to hear about it.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/contact">
              <Button variant="outline">Contact Us</Button>
            </Link>
            <Link href="/request">
              <Button variant="primary">Start a Project</Button>
            </Link>
          </div>

          <div className="mt-16 text-sm text-muted">
            <p>techmandesign237@gmail.com</p>
            <p className="mt-1">+237 697 36 82 51</p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
