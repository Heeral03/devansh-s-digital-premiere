import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

// Theater stage canvas with moving spotlights and particles
const TheaterCanvas = ({ mousePos }: { mousePos: { x: number; y: number } }) => {
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

    // Particles
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; life: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.5 - 0.1,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
        life: Math.random() * 1000,
      });
    }

    const animate = () => {
      timeRef.current += 0.016;
      const t = timeRef.current;
      const w = canvas.width;
      const h = canvas.height;

      // Clear
      ctx.fillStyle = "hsl(0, 0%, 4%)";
      ctx.fillRect(0, 0, w, h);

      // Ambient moving gradients
      const g1x = w * 0.3 + Math.sin(t * 0.3) * w * 0.15;
      const g1y = h * 0.2 + Math.cos(t * 0.2) * h * 0.1;
      const grad1 = ctx.createRadialGradient(g1x, g1y, 0, g1x, g1y, w * 0.5);
      grad1.addColorStop(0, "hsla(0, 55%, 25%, 0.06)");
      grad1.addColorStop(1, "transparent");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, w, h);

      const g2x = w * 0.7 + Math.cos(t * 0.25) * w * 0.15;
      const g2y = h * 0.3 + Math.sin(t * 0.35) * h * 0.1;
      const grad2 = ctx.createRadialGradient(g2x, g2y, 0, g2x, g2y, w * 0.4);
      grad2.addColorStop(0, "hsla(43, 60%, 55%, 0.04)");
      grad2.addColorStop(1, "transparent");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, w, h);

      // Spotlight beams from top
      const beamCount = 3;
      for (let i = 0; i < beamCount; i++) {
        const baseX = w * (0.2 + i * 0.3);
        const swayX = Math.sin(t * (0.4 + i * 0.15) + i * 2) * w * 0.08;
        const topX = baseX + swayX;
        const bottomSpread = w * 0.12;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(topX - 2, 0);
        ctx.lineTo(topX - bottomSpread, h * 0.85);
        ctx.lineTo(topX + bottomSpread, h * 0.85);
        ctx.lineTo(topX + 2, 0);
        ctx.closePath();

        const beamGrad = ctx.createLinearGradient(topX, 0, topX, h * 0.85);
        const beamAlpha = 0.03 + Math.sin(t * (0.5 + i * 0.2)) * 0.015;
        beamGrad.addColorStop(0, `hsla(43, 60%, 75%, ${beamAlpha + 0.02})`);
        beamGrad.addColorStop(0.5, `hsla(43, 60%, 55%, ${beamAlpha})`);
        beamGrad.addColorStop(1, "transparent");
        ctx.fillStyle = beamGrad;
        ctx.fill();
        ctx.restore();
      }

      // Mouse spotlight
      if (mousePos.x > 0 && mousePos.y > 0) {
        const mGrad = ctx.createRadialGradient(
          mousePos.x, mousePos.y, 0,
          mousePos.x, mousePos.y, 250
        );
        mGrad.addColorStop(0, "hsla(43, 60%, 55%, 0.08)");
        mGrad.addColorStop(0.5, "hsla(43, 60%, 55%, 0.03)");
        mGrad.addColorStop(1, "transparent");
        ctx.fillStyle = mGrad;
        ctx.fillRect(0, 0, w, h);
      }

      // Particles
      for (const p of particles) {
        p.life += 1;
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        const flicker = Math.sin(p.life * 0.05) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(43, 50%, 70%, ${p.alpha * flicker})`;
        ctx.fill();
      }

      // Light leak (top-right warmth)
      const leakAlpha = 0.02 + Math.sin(t * 0.15) * 0.01;
      const leak = ctx.createRadialGradient(w * 0.9, 0, 0, w * 0.9, 0, w * 0.6);
      leak.addColorStop(0, `hsla(30, 80%, 50%, ${leakAlpha})`);
      leak.addColorStop(1, "transparent");
      ctx.fillStyle = leak;
      ctx.fillRect(0, 0, w, h);

      // Vignette
      const vig = ctx.createRadialGradient(w / 2, h / 2, w * 0.25, w / 2, h / 2, w * 0.75);
      vig.addColorStop(0, "transparent");
      vig.addColorStop(1, "hsla(0, 0%, 0%, 0.5)");
      ctx.fillStyle = vig;
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
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  );
};

// Letter-by-letter animated text
const AnimatedLetters = ({
  text,
  delay = 0,
  className = "",
  stagger = 0.04,
}: {
  text: string;
  delay?: number;
  className?: string;
  stagger?: number;
}) => (
  <span className={className} aria-label={text}>
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          duration: 0.6,
          delay: delay + i * stagger,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ display: "inline-block", minWidth: char === " " ? "0.25em" : undefined }}
      >
        {char}
      </motion.span>
    ))}
  </span>
);

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
      {/* Canvas background */}
      <TheaterCanvas mousePos={mousePos} />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-32 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-6"
        >
          <span className="font-body text-xs md:text-sm tracking-[0.5em] uppercase text-gold/60">
            {"Actor  ·  Performer  ·  Storyteller".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.8 + i * 0.025 }}
                style={{ display: "inline-block", minWidth: char === " " ? "0.2em" : undefined }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        </motion.div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-shadow-cinematic leading-[0.9]">
          <AnimatedLetters
            text="Devansh"
            delay={0.6}
            stagger={0.06}
            className="text-ivory block"
          />
          <AnimatedLetters
            text="Pareek"
            delay={1.1}
            stagger={0.06}
            className="text-gold block"
          />
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex items-center gap-6"
        >
          <a
            href="#showreel"
            className="magnetic-btn group flex items-center gap-3 font-body text-sm tracking-widest uppercase text-gold hover:text-primary transition-colors duration-300"
          >
            <motion.span
              className="flex items-center justify-center w-14 h-14 rounded-full border border-gold/40 group-hover:border-gold transition-all duration-300 group-active:scale-95"
              whileHover={{ scale: 1.1, boxShadow: "0 0 30px hsla(43, 60%, 55%, 0.2)" }}
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
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.span
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="font-body text-[9px] tracking-[0.4em] uppercase text-gold/50"
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
