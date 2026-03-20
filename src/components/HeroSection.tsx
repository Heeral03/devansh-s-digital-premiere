import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

// Interactive spotlight canvas overlay
const SpotlightOverlay = ({ mousePos }: { mousePos: { x: number; y: number } }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; vy: number; size: number; alpha: number; speed: number }[] = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * (canvas.width || 1920),
        y: Math.random() * (canvas.height || 1080),
        vy: -Math.random() * 0.4 - 0.1,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.02 + 0.01,
      });
    }

    const animate = () => {
      timeRef.current += 0.016;
      const t = timeRef.current;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Mouse spotlight reveal — brighter area around cursor
      if (mousePos.x > 0 && mousePos.y > 0) {
        const mGrad = ctx.createRadialGradient(
          mousePos.x, mousePos.y, 0,
          mousePos.x, mousePos.y, 300
        );
        mGrad.addColorStop(0, "hsla(43, 60%, 65%, 0.12)");
        mGrad.addColorStop(0.4, "hsla(43, 60%, 55%, 0.04)");
        mGrad.addColorStop(1, "transparent");
        ctx.fillStyle = mGrad;
        ctx.fillRect(0, 0, w, h);
      }

      // Floating dust particles
      for (const p of particles) {
        p.y += p.vy;
        p.x += Math.sin(t * p.speed * 10 + p.y * 0.01) * 0.3;

        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }

        const flicker = Math.sin(t * 3 + p.x * 0.1) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(43, 50%, 75%, ${p.alpha * flicker})`;
        ctx.fill();
      }

      // Subtle light leak top-right
      const leakAlpha = 0.03 + Math.sin(t * 0.2) * 0.015;
      const leak = ctx.createRadialGradient(w * 0.85, h * 0.1, 0, w * 0.85, h * 0.1, w * 0.5);
      leak.addColorStop(0, `hsla(35, 70%, 50%, ${leakAlpha})`);
      leak.addColorStop(1, "transparent");
      ctx.fillStyle = leak;
      ctx.fillRect(0, 0, w, h);

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [mousePos]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-[2] pointer-events-none"
    />
  );
};

const HeroSection = () => {
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  return (
    <section
      className="relative h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Hero image with slow zoom */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: [1, 1.06] }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
      >
        <img
          src={heroBg}
          alt="Devansh Pareek on stage"
          className="w-full h-full object-cover object-top"
        />
      </motion.div>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-background via-background/60 to-background/20" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-background/50 via-transparent to-background/50" />

      {/* Interactive canvas layer */}
      <SpotlightOverlay mousePos={mousePos} />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, hsla(0,0%,0%,0.5) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-[4] h-full flex flex-col justify-end pb-20 md:pb-32 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6"
        >
          <span className="font-body text-xs md:text-sm tracking-[0.4em] uppercase text-gold/70">
            Actor &nbsp;·&nbsp; Performer &nbsp;·&nbsp; Storyteller
          </span>
        </motion.div>

        <motion.h1
          className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-shadow-cinematic leading-[0.9]"
        >
          <motion.span
            className="text-ivory block"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Devansh
          </motion.span>
          <motion.span
            className="text-gold block"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Pareek
          </motion.span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex items-center gap-6"
        >
          <a
            href="#showreel"
            className="group flex items-center gap-3 font-body text-sm tracking-widest uppercase text-gold hover:text-primary transition-colors duration-300"
          >
            <motion.span
              className="flex items-center justify-center w-14 h-14 rounded-full border border-gold/40 group-hover:border-gold transition-all duration-300 group-active:scale-95"
              whileHover={{ scale: 1.1, boxShadow: "0 0 30px hsla(43, 60%, 55%, 0.25)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-5 h-5 ml-0.5" />
            </motion.span>
            Play Showreel
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[4] flex flex-col items-center gap-2"
      >
        <motion.span
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="font-body text-[9px] tracking-[0.4em] uppercase text-gold/40"
        >
          Scroll
        </motion.span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-gold/50 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
