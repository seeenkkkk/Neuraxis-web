import Sidebar from "@/components/Sidebar";
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
    <div className="flex min-h-screen bg-background">
      {/* Fixed sidebar */}
      <Sidebar />

      {/* Main content — offset for sidebar on desktop */}
      <main className="flex-1 w-full lg:pl-56 overflow-x-hidden">
        <HeroSection />
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
    </div>
  );
}
