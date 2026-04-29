import { Hero } from "@/components/homepage/Hero";
import { CeoSection } from "@/components/homepage/CeoSection";
import { ServicesGrid } from "@/components/homepage/ServicesGrid";
import { TechTools } from "@/components/homepage/TechTools";
import { PortfolioPreview } from "@/components/homepage/PortfolioPreview";
import { ContactPreview } from "@/components/homepage/ContactPreview";

export default function Home() {
  return (
    <>
      <Hero />
      <CeoSection />
      <TechTools />
      <ServicesGrid />
      <PortfolioPreview />
      <ContactPreview />
    </>
  );
}
