import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AgentsSection from "@/components/AgentsSection";
import AgentBuilder from "@/components/AgentBuilder";
import AcademySection from "@/components/AcademySection";
import MetodologiaSection from "@/components/MetodologiaSection";
import PlansSection from "@/components/PlansSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      {/* Divider */}
      <div className="section-divider" />
      <AgentsSection />
      <div className="section-divider" />
      <AgentBuilder />
      <div className="section-divider" />
      <AcademySection />
      <div className="section-divider" />
      <MetodologiaSection />
      <div className="section-divider" />
      <PlansSection />
      <div className="section-divider" />
      <CtaSection />
      <Footer />
    </main>
  );
}
