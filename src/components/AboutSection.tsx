import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import gallery6 from "@/assets/gallery-6.jpg";
import CinematicReveal from "@/components/CinematicReveal";
import AnimatedHeading from "@/components/AnimatedHeading";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const textY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section id="about" className="relative py-24 md:py-40 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Image with parallax */}
          <motion.div style={{ y: imageY }} className="relative">
            <CinematicReveal direction="left" delay={0}>
              <div className="relative overflow-hidden rounded-lg group">
                <motion.img
                  src={gallery6}
                  alt="Devansh Pareek portrait"
                  className="w-full object-cover aspect-[4/5]"
                  loading="lazy"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className="absolute inset-0 border border-gold/10 rounded-lg group-hover:border-gold/25 transition-colors duration-500" />
                
                {/* Dramatic corner accent */}
                <motion.div
                  className="absolute -bottom-2 -right-2 w-20 h-20 border-r-2 border-b-2 border-gold/30 rounded-br-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
                <motion.div
                  className="absolute -top-2 -left-2 w-16 h-16 border-l-2 border-t-2 border-gold/20 rounded-tl-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1, duration: 0.6 }}
                />
              </div>
            </CinematicReveal>
          </motion.div>

          {/* Text with parallax */}
          <motion.div style={{ y: textY }}>
            <CinematicReveal delay={0.2}>
              <span className="font-body text-xs tracking-[0.4em] uppercase text-gold/60 block mb-4">
                The Artist
              </span>
            </CinematicReveal>

            <AnimatedHeading
              text="About Devansh"
              className="font-display text-3xl md:text-5xl text-ivory mb-8 leading-tight"
              delay={0.3}
            />

            <CinematicReveal delay={0.5}>
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

                {/* Animated stats */}
                <div className="pt-6 flex items-center gap-8">
                  {[
                    { value: "4+", label: "Productions" },
                    { value: "Stage", label: "& Screen" },
                    { value: "∞", label: "Passion" },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.8 + i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-col"
                    >
                      <span className="font-display text-2xl md:text-3xl text-gold">{stat.value}</span>
                      <p className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-1">
                        {stat.label}
                      </p>
                      {i < 2 && <div className="hidden" />}
                    </motion.div>
                  ))}
                </div>
              </div>
            </CinematicReveal>
          </motion.div>
        </div>
      </div>

      {/* Cinematic quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 1.5 }}
        className="relative z-10 max-w-4xl mx-auto mt-24 md:mt-32 px-6 md:px-12 text-center"
      >
        <motion.blockquote
          className="font-display text-xl md:text-2xl lg:text-3xl text-ivory/60 italic leading-relaxed"
        >
          {"\"Acting is not about pretending. It's about revealing.\"".split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.4 + i * 0.02, duration: 0.3 }}
              style={{ display: "inline-block", minWidth: char === " " ? "0.25em" : undefined }}
            >
              {char}
            </motion.span>
          ))}
        </motion.blockquote>
      </motion.div>
    </section>
  );
};

export default AboutSection;
