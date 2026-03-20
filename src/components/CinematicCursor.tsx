import { useEffect, useRef, useState, useCallback } from "react";

const CinematicCursor = () => {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [label, setLabel] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const trailRef = useRef<{ x: number; y: number }[]>([]);
  const rafRef = useRef<number>(0);
  const smoothPos = useRef({ x: -200, y: -200 });

  const updateLabel = useCallback(() => {
    const el = document.elementFromPoint(pos.x, pos.y);
    if (!el) { setLabel(""); setIsHovering(false); return; }

    const closest = el.closest("[data-cursor]");
    if (closest) {
      setLabel(closest.getAttribute("data-cursor") || "");
      setIsHovering(true);
    } else if (el.closest("a, button, [role='button']")) {
      setIsHovering(true);
      setLabel("");
    } else {
      setLabel("");
      setIsHovering(false);
    }
  }, [pos]);

  useEffect(() => {
    updateLabel();
  }, [updateLabel]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      trailRef.current.push({ x: e.clientX, y: e.clientY });
      if (trailRef.current.length > 8) trailRef.current.shift();
    };
    window.addEventListener("mousemove", handler);

    const loop = () => {
      smoothPos.current.x += (pos.x - smoothPos.current.x) * 0.15;
      smoothPos.current.y += (pos.y - smoothPos.current.y) * 0.15;
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handler);
      cancelAnimationFrame(rafRef.current);
    };
  }, [pos]);

  return (
    <>
      {/* Glow */}
      <div
        className="pointer-events-none fixed z-[45] hidden md:block transition-[width,height,opacity] duration-300"
        style={{
          left: pos.x - (isHovering ? 100 : 175),
          top: pos.y - (isHovering ? 100 : 175),
          width: isHovering ? 200 : 350,
          height: isHovering ? 200 : 350,
          background: `radial-gradient(circle, hsla(43, 60%, 55%, ${isHovering ? 0.1 : 0.05}) 0%, transparent 70%)`,
          transition: "left 0.12s cubic-bezier(0.16, 1, 0.3, 1), top 0.12s cubic-bezier(0.16, 1, 0.3, 1), width 0.3s, height 0.3s",
        }}
      />

      {/* Cursor dot + label */}
      <div
        className="pointer-events-none fixed z-[46] hidden md:flex items-center justify-center"
        style={{
          left: pos.x,
          top: pos.y,
          transform: "translate(-50%, -50%)",
          transition: "all 0.08s ease-out",
        }}
      >
        <div
          className="rounded-full border transition-all duration-300"
          style={{
            width: isHovering ? (label ? 80 : 48) : 8,
            height: isHovering ? (label ? 80 : 48) : 8,
            borderColor: isHovering ? "hsla(43, 60%, 55%, 0.6)" : "hsla(43, 60%, 55%, 0.3)",
            backgroundColor: isHovering ? "hsla(43, 60%, 55%, 0.05)" : "hsla(43, 60%, 55%, 0.15)",
          }}
        />
        {label && (
          <span
            className="absolute font-body text-[9px] tracking-[0.2em] uppercase text-gold/80 whitespace-nowrap"
            style={{ transition: "opacity 0.2s" }}
          >
            {label}
          </span>
        )}
      </div>
    </>
  );
};

export default CinematicCursor;
