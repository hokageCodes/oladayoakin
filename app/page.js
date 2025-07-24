import Awards from "@/components/sections/AwwardsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import SpeakingEngagements from "@/components/sections/SpeakingTestimonials";
import ProjectsSection from "@/components/sections/ProjectsSection";
import AboutSection from "@/components/sections/AboutSection";
import CyberLawyerHero from "@/components/sections/HeroSection";

export default function Home() {
  return (
    <div>
      <CyberLawyerHero />
      <AboutSection />
      <ProjectsSection />
      <SpeakingEngagements />
      <TestimonialsSection />
      <Awards />
    </div>
  );
}
