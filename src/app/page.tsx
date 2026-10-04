import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import WorkSection from "@/components/home/WorkSection";
import ServicesSection from "@/components/home/ServicesSection";
import ProcessSection from "@/components/home/ProcessSection";
import AboutSection from "@/components/home/AboutSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ShowreelSection from "@/components/home/ShowreelSection";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ServicesSection />
      <WorkSection />
      <ProcessSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
