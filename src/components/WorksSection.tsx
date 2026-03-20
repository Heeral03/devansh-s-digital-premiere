import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { X, Play } from "lucide-react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";

const works = [
  {
    title: "KALYUG",
    type: "Stage Play",
    role: "Lead Ensemble",
    description: "A powerful theatrical exploration of modern society's moral dilemmas, blending mythological narratives with contemporary themes.",
    image: gallery4,
  },
  {
    title: "KISHAN",
    type: "Monoact",
    role: "Solo Performer",
    description: "A deeply personal one-man performance capturing the essence of devotion and human connection through movement and voice.",
    image: gallery1,
  },
  {
    title: "Papa Smile Please",
    type: "Mime Act",
    role: "Mime Artist",
    description: "A wordless narrative exploring the tender relationship between a father and child, told entirely through physical expression.",
    image: gallery2,
  },
  {
    title: "MAYA",
    type: "Stage Play",
    role: "Supporting Lead",
    description: "An immersive theatrical experience delving into the illusions we create and the truths we hide behind them.",
    image: gallery5,
  },
];

const WorksSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="works" className="relative py-24 md:py-40" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <span className="font-body text-xs tracking-[0.4em] uppercase text-gold/60">
            Portfolio
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-3xl md:text-5xl lg:text-6xl text-ivory mb-16 leading-tight"
        >
          Works &<br />
          <span className="text-gold italic">Performances</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {works.map((work, i) => (
            <motion.div
              key={work.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelected(i)}
              className="group cursor-pointer relative overflow-hidden rounded-lg bg-card border border-border/40 hover:border-gold/30 transition-all duration-500"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="font-body text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-2 block">
                  {work.type}
                </span>
                <h3 className="font-display text-xl md:text-2xl text-ivory group-hover:text-gold transition-colors duration-300">
                  {work.title}
                </h3>
                <p className="font-body text-xs text-muted-foreground mt-1">
                  {work.role}
                </p>
              </div>

              {/* Hover play icon */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center bg-background/40">
                  <Play className="w-4 h-4 text-gold ml-0.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/90 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-3xl w-full bg-card border border-border/40 rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full border border-border/60 flex items-center justify-center bg-background/60 hover:bg-background transition-colors active:scale-95"
              >
                <X className="w-4 h-4 text-foreground" />
              </button>

              <div className="aspect-video">
                <img
                  src={works[selected].image}
                  alt={works[selected].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-2 border-gold/60 flex items-center justify-center bg-background/30 cursor-pointer hover:bg-gold/10 transition-all active:scale-95">
                    <Play className="w-6 h-6 text-gold ml-0.5" />
                  </div>
                </div>
              </div>

              <div className="p-8">
                <span className="font-body text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-2 block">
                  {works[selected].type} · {works[selected].role}
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-ivory mb-4">
                  {works[selected].title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {works[selected].description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WorksSection;
