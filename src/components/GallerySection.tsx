import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const images = [
  { src: gallery1, alt: "Dramatic monologue performance", tall: true },
  { src: gallery2, alt: "Mime act on stage", tall: false },
  { src: gallery3, alt: "Backstage preparation", tall: true },
  { src: gallery4, alt: "Ensemble stage performance", tall: false },
  { src: gallery5, alt: "Contemplative portrait", tall: true },
  { src: gallery6, alt: "Dramatic close-up portrait", tall: false },
];

const GallerySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [lightbox, setLightbox] = useState<number | null>(null);

  const navigate = (dir: number) => {
    if (lightbox === null) return;
    setLightbox((lightbox + dir + images.length) % images.length);
  };

  return (
    <section id="gallery" className="relative py-24 md:py-40 cinematic-gradient" ref={ref}>
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <span className="font-body text-xs tracking-[0.4em] uppercase text-gold/60">
            Behind the Curtain
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-3xl md:text-5xl lg:text-6xl text-ivory mb-16 leading-tight"
        >
          <span className="text-gold italic">Gallery</span>
        </motion.h2>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 gap-4 md:gap-6">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setLightbox(i)}
              className="group relative mb-4 md:mb-6 cursor-pointer overflow-hidden rounded-md break-inside-avoid"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500" />
              <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/20 rounded-md transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
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
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              src={images[lightbox].src}
              alt={images[lightbox].alt}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
