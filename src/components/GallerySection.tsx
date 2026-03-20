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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const navigate = (dir: number) => {
    if (lightbox === null) return;
    setLightbox((lightbox + dir + images.length) % images.length);
  };

  const scrollHorizontal = (dir: number) => {
    scrollContainerRef.current?.scrollBy({ left: dir * 400, behavior: "smooth" });
  };

  return (
    <section id="gallery" className="relative py-24 md:py-40 cinematic-gradient" ref={ref}>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="px-6 md:px-12">
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

            {/* Navigation arrows */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="hidden md:flex gap-3"
            >
              <button
                onClick={() => scrollHorizontal(-1)}
                className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center hover:border-gold/50 hover:bg-gold/5 transition-all active:scale-95"
              >
                <ChevronLeft className="w-4 h-4 text-muted-foreground" />
              </button>
              <button
                onClick={() => scrollHorizontal(1)}
                className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center hover:border-gold/50 hover:bg-gold/5 transition-all active:scale-95"
              >
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Horizontal scroll - Netflix style */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            ref={scrollContainerRef}
            className="flex gap-5 overflow-x-auto pb-6 px-6 md:px-12 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {images.map((img, i) => (
              <motion.div
                key={i}
                data-cursor="View"
                onClick={() => setLightbox(i)}
                className="group flex-none w-[75vw] sm:w-[45vw] md:w-[32vw] lg:w-[26vw] cursor-pointer relative overflow-hidden rounded-lg snap-start"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="aspect-[3/4] overflow-hidden rounded-lg relative">
                  <motion.img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Border glow */}
                  <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/25 rounded-lg transition-colors duration-500" />

                  {/* Caption */}
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
              initial={{ opacity: 0, scale: 0.88, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.88, filter: "blur(12px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              src={images[lightbox].src}
              alt={images[lightbox].alt}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Caption */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <span className="font-body text-xs tracking-[0.3em] uppercase text-gold/60">
                {images[lightbox!].caption} — {lightbox! + 1} / {images.length}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
