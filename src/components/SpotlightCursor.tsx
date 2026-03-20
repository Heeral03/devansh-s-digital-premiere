import { useEffect, useState } from "react";

const SpotlightCursor = () => {
  const [pos, setPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-40 hidden md:block"
      style={{
        left: pos.x - 150,
        top: pos.y - 150,
        width: 300,
        height: 300,
        background: `radial-gradient(circle, hsla(43, 60%, 55%, 0.06) 0%, transparent 70%)`,
        transition: "left 0.15s ease-out, top 0.15s ease-out",
      }}
    />
  );
};

export default SpotlightCursor;
