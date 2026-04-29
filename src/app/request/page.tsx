"use client";

import { PageTransition } from "@/components/layout/PageTransition";
import { ScrollReveal } from "@/components/layout/ScrollReveal";
import { ProjectRequestForm } from "@/components/forms/ProjectRequestForm";

export default function RequestPage() {
  return (
    <PageTransition>
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        <ScrollReveal>
          <div className="text-xs tracking-[0.2em] uppercase text-muted mb-4">
            New Project
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-16">
            Start a Project
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <ProjectRequestForm />
        </ScrollReveal>
      </section>
    </PageTransition>
  );
}
