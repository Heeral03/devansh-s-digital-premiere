import { motion, useInView, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState, MouseEvent } from "react";
import { X, Play } from "lucide-react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import CinematicReveal from "@/components/CinematicReveal";
import AnimatedHeading from "@/components/AnimatedHeading";

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

// 3D Tilt Card
const TiltCard = ({ work, index, onSelect, inView }: { work: typeof works[0]; index: number; onSelect: () => void; inView: boolean }) => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 25 });
  const [hovered, setHovered] = useState(false);

  const handleMouse = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.8, delay: 0.2 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 800 }}
    >
      <motion.div
        data-cursor="View"
        onClick={onSelect}
        onMouseMove={handleMouse}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="cursor-pointer relative overflow-hidden rounded-lg bg-card border border-border/40 hover:border-gold/30 transition-colors duration-500"
      >
        <div className="aspect-[16/10] overflow-hidden relative">
          <motion.img
            src={work.image}
            alt={work.title}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.12 : 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            loading="lazy"
          />
          {/* Overlay that shifts on hover */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: hovered
                ? "linear-gradient(180deg, hsla(0,0%,4%,0.1) 0%, hsla(0,0%,4%,0.75) 100%)"
                : "linear-gradient(180deg, hsla(0,0%,4%,0.2) 0%, hsla(0,0%,4%,0.85) 100%)",
            }}
            transition={{ duration: 0.5 }}
          />

          {/* Shine effect on hover */}
          {hovered && (
            <motion.div
              className="absolute inset-0"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "100%", opacity: 0.08 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{
                background: "linear-gradient(90deg, transparent, hsla(43, 60%, 70%, 1), transparent)",
                width: "50%",
              }}
            />
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <motion.span
            className="font-body text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-2 block"
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {work.type}
          </motion.span>
          <motion.h3
            className="font-display text-xl md:text-2xl text-ivory"
            animate={{ x: hovered ? 4 : 0, color: hovered ? "hsl(43, 60%, 55%)" : "hsl(38, 40%, 92%)" }}
            transition={{ duration: 0.3 }}
          >
            {work.title}
          </motion.h3>
          <motion.p
            className="font-body text-xs text-muted-foreground mt-1"
            animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.7 }}
            transition={{ duration: 0.3 }}
          >
            {work.role}
          </motion.p>
        </div>

        {/* Play icon */}
        <motion.div
          className="absolute top-4 right-4"
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-10 h-10 rounded-full border border-gold/50 flex items-center justify-center bg-background/50">
            <Play className="w-4 h-4 text-gold ml-0.5" />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const WorksSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="works" className="relative py-24 md:py-40" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <CinematicReveal>
          <span className="font-body text-xs tracking-[0.4em] uppercase text-gold/60 block mb-4">
            Portfolio
          </span>
        </CinematicReveal>

        <AnimatedHeading
          text="Works & Performances"
          className="font-display text-3xl md:text-5xl lg:text-6xl text-ivory mb-16 leading-tight"
          delay={0.1}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {works.map((work, i) => (
            <TiltCard
              key={work.title}
              work={work}
              index={i}
              inView={inView}
              onSelect={() => setSelected(i)}
            />
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
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ backgroundColor: "hsla(0, 0%, 4%, 0.92)" }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ scale: 0.88, opacity: 0, y: 30, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-3xl w-full bg-card border border-border/40 rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full border border-border/60 flex items-center justify-center bg-background/60 hover:bg-background transition-colors active:scale-95"
              >
                <X className="w-4 h-4 text-foreground" />
              </button>

              <div className="aspect-video relative overflow-hidden">
                <motion.img
                  src={works[selected].image}
                  alt={works[selected].title}
                  className="w-full h-full object-cover"
                  layoutId={`work-${selected}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="w-16 h-16 rounded-full border-2 border-gold/60 flex items-center justify-center bg-background/30 cursor-pointer hover:bg-gold/10 transition-all active:scale-95"
                  >
                    <Play className="w-6 h-6 text-gold ml-0.5" />
                  </motion.div>
                </div>
              </div>

              <motion.div
                className="p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <span className="font-body text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-2 block">
                  {works[selected].type} · {works[selected].role}
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-ivory mb-4">
                  {works[selected].title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {works[selected].description}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WorksSection;
