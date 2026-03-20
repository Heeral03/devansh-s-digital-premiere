import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Play } from "lucide-react";
import showreelBg from "@/assets/showreel-bg.jpg";

const ShowreelSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="showreel" className="relative py-24 md:py-40 cinematic-gradient" ref={ref}>
      <div className="absolute inset-0 spotlight-gradient opacity-50" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <span className="font-body text-xs tracking-[0.4em] uppercase text-gold/60">
            Featured
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-3xl md:text-5xl lg:text-6xl text-ivory mb-16 leading-tight"
        >
          Showreel —<br />
          <span className="text-gold italic">Do Watch This</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative group cursor-pointer rounded-lg overflow-hidden gold-glow"
        >
          <div className="aspect-video relative">
            <img
              src={showreelBg}
              alt="Showreel preview"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-colors duration-500" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-gold/60 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/10 transition-all duration-500 group-active:scale-95">
                <Play className="w-8 h-8 md:w-10 md:h-10 text-gold ml-1" />
              </div>
            </div>
          </div>

          {/* Info bar */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold/70">
              Acting Reel 2025
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ShowreelSection;
