import { useEffect, useRef } from "react";

const AmbientBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    const animate = () => {
      t += 0.008;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Slow-moving warm gradients scattered vertically
      const spots = [
        { y: 0.15, hue: 43, sat: 60, x: 0.8 },
        { y: 0.35, hue: 0, sat: 50, x: 0.15 },
        { y: 0.55, hue: 43, sat: 50, x: 0.7 },
        { y: 0.75, hue: 20, sat: 60, x: 0.25 },
        { y: 0.9, hue: 43, sat: 55, x: 0.6 },
      ];

      for (const spot of spots) {
        const sx = (spot.x + Math.sin(t + spot.y * 10) * 0.05) * w;
        const sy = spot.y * h + Math.cos(t * 0.7 + spot.x * 5) * h * 0.02;
        const r = w * 0.35;

        const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, r);
        grad.addColorStop(0, `hsla(${spot.hue}, ${spot.sat}%, 45%, 0.025)`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ display: "block" }}
    />
  );
};

export default AmbientBackground;
