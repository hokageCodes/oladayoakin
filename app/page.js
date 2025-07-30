"use client"

import Awards from "@/components/sections/AwwardsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import SpeakingEngagements from "@/components/sections/SpeakingTestimonials";
import AboutSection from "@/components/sections/AboutSection";
import CyberLawyerHero from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ImageGallerySection from "@/components/sections/ImageGallerySection";

export default function Home() {
  return (
    <div>
      <CyberLawyerHero />
      <AboutSection />
      <ProjectsSection />
      <SpeakingEngagements />
      <TestimonialsSection />
      <Awards />
      <ImageGallerySection />
    </div>
  );
}
