import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  blur?: boolean;
}

const CinematicReveal = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  blur = true,
}: RevealProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });

  const dirMap = {
    up: { y: 24, x: 0 },
    left: { y: 0, x: -50 },
    right: { y: 0, x: 50 },
    none: { y: 0, x: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: dirMap[direction].y,
        x: dirMap[direction].x,
        filter: blur ? "blur(8px)" : "blur(0px)",
      }}
      animate={
        inView
          ? { opacity: 1, y: 0, x: 0, filter: "blur(0px)" }
          : {}
      }
      transition={{
        duration: 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default CinematicReveal;
