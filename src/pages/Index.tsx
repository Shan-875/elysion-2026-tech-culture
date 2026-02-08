import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { CardNavSection } from "@/components/CardNavSection";
import { ActivitiesSection } from "@/components/ActivitiesSection";
import { SpeakersSection } from "@/components/SpeakersSection";
import { WorkshopsSection } from "@/components/WorkshopsSection";
import { GallerySection } from "@/components/GallerySection";
import { LocationSection } from "@/components/LocationSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { PageLoader } from "@/components/PageLoader";
import { useImagePreloader } from "@/hooks/useImagePreloader";

// Import all images to preload
import elysionLogo from "@/assets/elysion-logo.png";
import heroImage from "@/assets/hero-im.png";
import comingSoon from "@/assets/coming-soon.png";
import calendarDates from "@/assets/calendar-dates.png";
import asces from "@/assets/asces.png";
import ieee from "@/assets/ieee.png";
import ies from "@/assets/ies.png";
import isb from "@/assets/isb.png";
import yuva from "@/assets/yuva.png";
import { RegistrationSection } from "@/components/RegistrationSection";

const imagesToPreload = [
  elysionLogo,
  heroImage,
  comingSoon,
  calendarDates,
  asces,
  ieee,
  ies,
  isb,
  yuva,
  "/favicon.png",
];

const MIN_LOADING_TIME = 600; // Show ELYSION + Coming Soon briefly before curtains open (shorter on mobile)

const Index = () => {
  const imagesLoaded = useImagePreloader(imagesToPreload);
  const [isLoading, setIsLoading] = useState(true);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [exiting, setExiting] = useState(false);

  // Minimum time with loader visible
  useEffect(() => {
    const timer = setTimeout(() => setMinTimeElapsed(true), MIN_LOADING_TIME);
    return () => clearTimeout(timer);
  }, []);

  // When ready: start curtain-open (exiting), then hide loader after animation
  useEffect(() => {
    if (imagesLoaded && minTimeElapsed && !exiting) {
      setExiting(true);
    }
  }, [imagesLoaded, minTimeElapsed, exiting]);

  const handleLoaderExitComplete = () => {
    setIsLoading(false);
    setExiting(false);
  };

  return (
    <>
      <PageLoader
        isLoading={isLoading}
        exiting={exiting}
        onExitComplete={handleLoaderExitComplete}
      />
      <div className="min-h-screen">
        <Navbar />
        <HeroSection />
        <CardNavSection />
        <AboutSection />
        <ActivitiesSection />
        <SpeakersSection />
        <WorkshopsSection />
        <RegistrationSection />
        <GallerySection />
        <LocationSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
};

export default Index;
