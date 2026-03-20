import { motion } from "framer-motion";
import { Play } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background image with slow zoom */}
      <div className="absolute inset-0 animate-slow-zoom">
        <img
          src={heroBg}
          alt="Devansh Pareek on stage"
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />

      {/* Spotlight from top */}
      <div className="absolute inset-0 spotlight-gradient animate-spotlight-pulse" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-32 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6"
        >
          <span className="font-body text-xs md:text-sm tracking-[0.4em] uppercase text-gold/70">
            Actor &nbsp;·&nbsp; Performer &nbsp;·&nbsp; Storyteller
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-ivory text-shadow-cinematic leading-[0.9]"
        >
          Devansh
          <br />
          <span className="text-gold">Pareek</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex items-center gap-6"
        >
          <a
            href="#showreel"
            className="group flex items-center gap-3 font-body text-sm tracking-widest uppercase text-gold hover:text-primary transition-colors duration-300"
          >
            <span className="flex items-center justify-center w-12 h-12 rounded-full border border-gold/40 group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300 group-active:scale-95">
              <Play className="w-4 h-4 ml-0.5" />
            </span>
            Play Showreel
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent animate-float" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
