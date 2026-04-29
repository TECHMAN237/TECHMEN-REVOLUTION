"use client";

import { PageTransition } from "@/components/layout/PageTransition";
import { ScrollReveal } from "@/components/layout/ScrollReveal";
import { ContactForm } from "@/components/forms/ContactForm";
import Link from "next/link";

export default function ContactPage() {
  return (
    <PageTransition>
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          {/* Info */}
          <div>
            <ScrollReveal>
              <div className="text-xs tracking-[0.2em] uppercase text-muted mb-4">
                Contact
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-12">
                Let&apos;s talk.
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-8 text-sm">
                <div>
                  <p className="text-muted mb-1">Email</p>
                  <p className="text-text">[EMAIL]</p>
                </div>
                <div>
                  <p className="text-muted mb-1">Phone</p>
                  <p className="text-text">[PHONE]</p>
                </div>
                <div>
                  <p className="text-muted mb-1">Social</p>
                  <div className="flex gap-4 mt-2">
                    <Link href="#" className="text-muted hover:text-text transition-colors">
                      Twitter
                    </Link>
                    <Link href="#" className="text-muted hover:text-text transition-colors">
                      LinkedIn
                    </Link>
                    <Link href="#" className="text-muted hover:text-text transition-colors">
                      GitHub
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Form */}
          <ScrollReveal delay={0.15}>
            <ContactForm />
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  );
}
