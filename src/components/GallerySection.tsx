import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import CinematicReveal from "@/components/CinematicReveal";
import AnimatedHeading from "@/components/AnimatedHeading";

const images = [
  { src: gallery1, alt: "Dramatic monologue performance", caption: "Monologue" },
  { src: gallery2, alt: "Mime act on stage", caption: "Mime" },
  { src: gallery3, alt: "Backstage preparation", caption: "Backstage" },
  { src: gallery4, alt: "Ensemble stage performance", caption: "Ensemble" },
  { src: gallery5, alt: "Contemplative portrait", caption: "Portrait" },
  { src: gallery6, alt: "Dramatic close-up portrait", caption: "Close-up" },
];

const GallerySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [lightbox, setLightbox] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const navigate = (dir: number) => {
    if (lightbox === null) return;
    setLightbox((lightbox + dir + images.length) % images.length);
  };

  const scrollH = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 350, behavior: "smooth" });
  };

  return (
    <section id="gallery" className="relative py-28 md:py-36 cinematic-gradient" ref={ref}>
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <CinematicReveal>
            <span className="font-body text-xs tracking-[0.4em] uppercase text-gold/60 block mb-4">
              Behind the Curtain
            </span>
          </CinematicReveal>

          <div className="flex items-end justify-between mb-12">
            <AnimatedHeading
              text="Gallery"
              className="font-display text-3xl md:text-5xl lg:text-6xl text-gold italic leading-tight"
              delay={0.1}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="hidden md:flex gap-3"
            >
              <button
                onClick={() => scrollH(-1)}
                className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center hover:border-gold/50 hover:bg-gold/5 transition-all active:scale-95"
              >
                <ChevronLeft className="w-4 h-4 text-muted-foreground" />
              </button>
              <button
                onClick={() => scrollH(1)}
                className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center hover:border-gold/50 hover:bg-gold/5 transition-all active:scale-95"
              >
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Horizontal scroll gallery */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 px-6 md:px-12 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
          >
            <style>{`.snap-x::-webkit-scrollbar { display: none; }`}</style>
            {images.map((img, i) => (
              <motion.div
                key={i}
                onClick={() => setLightbox(i)}
                className="group flex-none w-[70vw] sm:w-[45vw] md:w-[30vw] lg:w-[24vw] cursor-pointer relative overflow-hidden rounded-lg snap-start"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="aspect-[3/4] overflow-hidden rounded-lg relative">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/20 rounded-lg transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <span className="font-body text-[10px] tracking-[0.3em] uppercase text-gold/80">
                      {img.caption}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: "hsla(0, 0%, 4%, 0.95)" }}
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full border border-border/60 flex items-center justify-center bg-card hover:bg-muted transition-colors active:scale-95"
            >
              <X className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              className="absolute left-4 md:left-8 z-10 w-10 h-10 rounded-full border border-border/60 flex items-center justify-center bg-card hover:bg-muted transition-colors active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="absolute right-4 md:right-8 z-10 w-10 h-10 rounded-full border border-border/60 flex items-center justify-center bg-card hover:bg-muted transition-colors active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              src={images[lightbox].src}
              alt={images[lightbox].alt}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <span className="font-body text-xs tracking-[0.3em] uppercase text-gold/60">
                {images[lightbox].caption} — {lightbox + 1} / {images.length}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
