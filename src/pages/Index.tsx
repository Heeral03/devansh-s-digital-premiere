import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ShowreelSection from "@/components/ShowreelSection";
import WorksSection from "@/components/WorksSection";
import GallerySection from "@/components/GallerySection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import FilmGrain from "@/components/FilmGrain";
import CinematicCursor from "@/components/CinematicCursor";
import AmbientBackground from "@/components/AmbientBackground";

const Index = () => {
  return (
    <div className="bg-background min-h-screen overflow-x-hidden">
      <AmbientBackground />
      <FilmGrain />
      <CinematicCursor />
      <Navbar />
      <main className="relative z-[1]">
        <HeroSection />
        <ShowreelSection />
        <WorksSection />
        <GallerySection />
        <AboutSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
