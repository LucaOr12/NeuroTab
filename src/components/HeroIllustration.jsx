import { motion } from "framer-motion";

const transition = {
  type: "spring",
  stiffness: 120,
  damping: 14,
};

const circleVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { ...transition, delay: i * 0.15 },
  }),
};

const lineVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 1.2,
      delay: 0.3 + i * 0.1,
      ease: [0.65, 0, 0.35, 1],
    },
  }),
};

const pulse = {
  animate: {
    scale: [1, 1.02, 1],
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 3,
      ease: "easeInOut",
    },
  },
};

export default function HeroIllustration() {
  return (
    <motion.svg
      width="400"
      height="300"
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      initial="hidden"
      animate="visible"
    >
      {/* ✅ First render LINES (so they're underneath) */}
      {[
        [80, 150, 200, 50],
        [200, 50, 320, 150],
        [320, 150, 200, 250],
        [200, 250, 80, 150],
      ].map(([x1, y1, x2, y2], i) => (
        <motion.line
          key={`line-${i}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={i % 2 === 0 ? "#9F7AEA" : "#3F51B5"}
          strokeWidth="3"
          custom={i}
          variants={lineVariants}
        />
      ))}

      {/* ✅ Then render CIRCLES (so they're on top) */}
      {[80, 200, 320, 200].map((cx, i) => {
        const cy = [150, 50, 150, 250][i];
        const r = [12, 16, 14, 10][i];
        const fill = i % 2 === 0 ? "#9F7AEA" : "#3F51B5";

        return (
          <motion.circle
            key={`circle-${i}`}
            cx={cx}
            cy={cy}
            r={r}
            fill={fill}
            custom={i}
            variants={circleVariants}
            {...pulse}
          />
        );
      })}
    </motion.svg>
  );
}
