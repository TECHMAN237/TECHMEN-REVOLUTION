"use client";

import { ScrollReveal } from "@/components/layout/ScrollReveal";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";

const previewProjects = [
  {
    title: "Brand Identity System",
    category: "Graphic Design",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop&q=80",
  },
  {
    title: "SaaS Dashboard",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&q=80",
  },
  {
    title: "Mobile Banking App",
    category: "Mobile App",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop&q=80",
  },
];

export function PortfolioPreview() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-32">
      <div className="flex items-end justify-between mb-16">
        <ScrollReveal>
          <div className="text-xs tracking-[0.2em] uppercase text-muted">
            Selected Work
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <Link href="/portfolio">
            <Button variant="outline">View All</Button>
          </Link>
        </ScrollReveal>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {previewProjects.map((project, index) => (
          <ScrollReveal key={project.title} delay={index * 0.15}>
            <Link href="/portfolio" className="group block">
              <div className="relative aspect-[3/2] overflow-hidden bg-surface mb-4">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-bg/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h3 className="text-sm font-medium group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all">
                {project.title}
              </h3>
              <p className="text-xs text-muted mt-1">{project.category}</p>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
