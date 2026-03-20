import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ShowreelSection from "@/components/ShowreelSection";
import WorksSection from "@/components/WorksSection";
import GallerySection from "@/components/GallerySection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import FilmGrain from "@/components/FilmGrain";
import SpotlightCursor from "@/components/SpotlightCursor";

const Index = () => {
  return (
    <div className="bg-background min-h-screen overflow-x-hidden">
      <FilmGrain />
      <SpotlightCursor />
      <Navbar />
      <HeroSection />
      <ShowreelSection />
      <WorksSection />
      <GallerySection />
      <AboutSection />
      <ContactSection />
    </div>
  );
};

export default Index;
