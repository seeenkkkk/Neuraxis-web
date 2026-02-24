import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CountersSection from "@/components/CountersSection";
import ProblemSection from "@/components/ProblemSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PlansSection from "@/components/PlansSection";
import TargetSection from "@/components/TargetSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <CountersSection />
      <ProblemSection />
      <HowItWorksSection />
      <PlansSection />
      <TargetSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
