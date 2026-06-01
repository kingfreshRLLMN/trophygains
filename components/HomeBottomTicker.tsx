"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const tickerItems = [
  "Premium workout plans",
  "Cut, maintain & bulk nutrition",
  "Direct digital downloads",
  "Custom coaching intake",
  "Built for serious gains",
];

export function HomeBottomTicker() {
  const pathname = usePathname();

  if (pathname !== "/") {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[65] border-y border-gold/25 bg-black/80 py-3 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-black to-transparent" />
      <div className="overflow-hidden">
        <motion.div
          className="flex w-max gap-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        >
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <div
              className="flex items-center gap-4 whitespace-nowrap px-2 text-xs font-black uppercase tracking-[0.22em] text-gold-soft"
              key={`${item}-${index}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold-soft shadow-[0_0_16px_rgba(239,211,130,0.85)]" />
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
