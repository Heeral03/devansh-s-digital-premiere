import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import gallery6 from "@/assets/gallery-6.jpg";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="about" className="relative py-24 md:py-40" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={gallery6}
                alt="Devansh Pareek portrait"
                className="w-full object-cover aspect-[4/5]"
                loading="lazy"
              />
              <div className="absolute inset-0 border border-gold/10 rounded-lg" />
            </div>
            {/* Decorative line */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r border-b border-gold/20 rounded-br-lg" />
          </motion.div>

          {/* Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-4"
            >
              <span className="font-body text-xs tracking-[0.4em] uppercase text-gold/60">
                The Artist
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-display text-3xl md:text-5xl text-ivory mb-8 leading-tight"
            >
              About <span className="text-gold italic">Devansh</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="space-y-5"
            >
              <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                A passionate aspiring actor with deep roots in theatre and live performance. 
                From commanding the stage in powerful ensemble productions to captivating audiences 
                through intimate monoacts and expressive mime work — every performance is a step 
                closer to the truth of the character.
              </p>
              <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                Driven by the belief that acting is not about pretending, but about revealing. 
                Each role is an invitation to explore the depths of human emotion and connect 
                with something universal.
              </p>

              <div className="pt-6 flex items-center gap-8">
                <div>
                  <span className="font-display text-2xl md:text-3xl text-gold">4+</span>
                  <p className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-1">
                    Productions
                  </p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div>
                  <span className="font-display text-2xl md:text-3xl text-gold">Stage</span>
                  <p className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-1">
                    & Screen
                  </p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div>
                  <span className="font-display text-2xl md:text-3xl text-gold">∞</span>
                  <p className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-1">
                    Passion
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
