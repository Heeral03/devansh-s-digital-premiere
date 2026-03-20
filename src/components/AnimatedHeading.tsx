import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Props {
  text: string;
  className?: string;
  delay?: number;
}

const AnimatedHeading = ({ text, className = "", delay = 0 }: Props) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const words = text.split(" ");

  return (
    <h2 ref={ref} className={className}>
      {words.map((word, wi) => (
        <motion.span
          key={wi}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: delay + wi * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </h2>
  );
};

export default AnimatedHeading;
