import { motion, useInView, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState, MouseEvent } from "react";
import { Play } from "lucide-react";
import showreelBg from "@/assets/showreel-bg.jpg";
import CinematicReveal from "@/components/CinematicReveal";
import AnimatedHeading from "@/components/AnimatedHeading";

const ShowreelSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [hovering, setHovering] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [3, -3]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-3, 3]), { stiffness: 200, damping: 30 });

  const handleMouse = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
    setHovering(false);
  };

  return (
    <section id="showreel" className="relative py-28 md:py-36 cinematic-gradient" ref={ref}>
      <div className="absolute inset-0 spotlight-gradient opacity-50" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <CinematicReveal delay={0}>
          <span className="font-body text-xs tracking-[0.4em] uppercase text-gold/60 block mb-4">
            Featured
          </span>
        </CinematicReveal>

        <AnimatedHeading
          text="Showreel — Do Watch This"
          className="font-display text-3xl md:text-5xl lg:text-6xl text-ivory mb-14 leading-tight"
          delay={0.1}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: 1000 }}
        >
          <motion.div
            data-cursor="Play"
            className="relative group cursor-pointer rounded-lg overflow-hidden gold-glow"
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouse}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={handleLeave}
          >
            <div className="aspect-video relative overflow-hidden">
              <motion.img
                src={showreelBg}
                alt="Showreel preview"
                className="w-full h-full object-cover"
                animate={{ scale: hovering ? 1.06 : 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.div
                className="absolute inset-0"
                animate={{ backgroundColor: hovering ? "hsla(0, 0%, 4%, 0.2)" : "hsla(0, 0%, 4%, 0.45)" }}
                transition={{ duration: 0.5 }}
              />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="relative"
                  animate={hovering ? { scale: 1.08 } : { scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {hovering && (
                    <motion.div
                      className="absolute inset-0 rounded-full border border-gold/30"
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-gold/60 flex items-center justify-center bg-background/20 group-active:scale-95 transition-transform">
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-gold ml-1" />
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
              <p className="font-body text-xs tracking-[0.3em] uppercase text-gold/70">
                Acting Reel 2025
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ShowreelSection;
