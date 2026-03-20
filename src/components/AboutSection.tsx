import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import gallery6 from "@/assets/gallery-6.jpg";
import CinematicReveal from "@/components/CinematicReveal";
import AnimatedHeading from "@/components/AnimatedHeading";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const textY = useTransform(scrollYProgress, [0, 1], [15, -15]);

  return (
    <section id="about" className="relative py-28 md:py-36 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-center">
          {/* Image with parallax */}
          <motion.div style={{ y: imageY }}>
            <CinematicReveal direction="left">
              <div className="relative overflow-hidden rounded-lg group">
                <img
                  src={gallery6}
                  alt="Devansh Pareek portrait"
                  className="w-full object-cover aspect-[4/5] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 border border-gold/10 rounded-lg group-hover:border-gold/20 transition-colors duration-500" />
              </div>
              {/* Corner accents */}
              <motion.div
                className="absolute -bottom-3 -right-3 w-20 h-20 border-r-2 border-b-2 border-gold/25 rounded-br-lg"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
              />
            </CinematicReveal>
          </motion.div>

          {/* Text */}
          <motion.div style={{ y: textY }}>
            <CinematicReveal delay={0.15}>
              <span className="font-body text-xs tracking-[0.4em] uppercase text-gold/60 block mb-4">
                The Artist
              </span>
            </CinematicReveal>

            <AnimatedHeading
              text="About Devansh"
              className="font-display text-3xl md:text-5xl text-ivory mb-8 leading-tight"
              delay={0.2}
            />

            <CinematicReveal delay={0.4}>
              <div className="space-y-5">
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
                  {[
                    { value: "4+", label: "Productions" },
                    { value: "Stage", label: "& Screen" },
                    { value: "∞", label: "Passion" },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 15 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.7 + i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="font-display text-2xl md:text-3xl text-gold">{stat.value}</span>
                      <p className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-1">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CinematicReveal>
          </motion.div>
        </div>

        {/* Quote */}
        <CinematicReveal delay={0.2}>
          <blockquote className="max-w-3xl mx-auto mt-24 text-center font-display text-xl md:text-2xl text-ivory/50 italic leading-relaxed">
            "Acting is not about pretending. It's about revealing."
          </blockquote>
        </CinematicReveal>
      </div>
    </section>
  );
};

export default AboutSection;
