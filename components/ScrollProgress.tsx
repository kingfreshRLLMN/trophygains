"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 top-0 z-[70] h-1 origin-left bg-[linear-gradient(90deg,#fff1a8,#c8a64b,#8f6d24)] shadow-[0_0_24px_rgba(239,211,130,0.45)]"
      style={{ scaleX }}
    />
  );
}
