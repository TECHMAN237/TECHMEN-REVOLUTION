"use client";

import { ScrollReveal } from "@/components/layout/ScrollReveal";
import { motion } from "framer-motion";

const services = [
  {
    title: "Web Development",
    description: "Custom web applications built with modern technologies.",
  },
  {
    title: "Mobile App Development",
    description: "Native and cross-platform apps for iOS and Android.",
  },
  {
    title: "Data Analysis",
    description: "Transform raw data into actionable business insights.",
  },
  {
    title: "Graphic Design",
    description: "Visual identities and design systems that resonate.",
  },
  {
    title: "Video Editing",
    description: "Cinematic storytelling and polished visual content.",
  },
];

export function ServicesGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-32">
      <ScrollReveal>
        <div className="text-xs tracking-[0.2em] uppercase text-muted mb-16">
          What We Do
        </div>
      </ScrollReveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
        {services.map((service, index) => (
          <ScrollReveal key={service.title} delay={index * 0.1}>
            <motion.div
              className="bg-bg p-8 md:p-10 group cursor-pointer h-full relative overflow-hidden"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-xs text-muted/40 mb-4">
                0{index + 1}
              </div>
              <h3 className="text-lg font-medium mb-3 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-500">
                {service.title}
              </h3>
              <p className="text-sm text-muted font-light leading-relaxed opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                {service.description}
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
