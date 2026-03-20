import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Props {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  tag?: "h2" | "h3" | "span" | "p";
}

const AnimatedHeading = ({ text, className = "", delay = 0, stagger = 0.03, tag: Tag = "h2" }: Props) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block mr-[0.3em]">
          {word.split("").map((char, ci) => {
            const globalIndex = words.slice(0, wi).join(" ").length + ci;
            return (
              <motion.span
                key={ci}
                initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
                animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{
                  duration: 0.5,
                  delay: delay + globalIndex * stagger,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
};

export default AnimatedHeading;
