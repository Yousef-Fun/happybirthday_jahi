import { motion } from "framer-motion";

const glyphs = ["✦", "❋", "✿", "♥", "❀", "⋆", "✧", "𓆸"];

export default function RisingGlyphs({ reduced }) {
  if (reduced) return null;

  return (
    <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 3, pointerEvents: "none", overflow: "hidden" }}>
      {glyphs.map((g, i) => (
        <motion.span
          key={i}
          style={{
            position: "absolute",
            left: `${8 + (i * 11) % 84}%`,
            bottom: "-5%",
            fontSize: 12 + (i % 4) * 6,
            color: i % 2 === 0 ? "rgba(255,107,157,0.55)" : "rgba(192,132,252,0.45)",
            textShadow: "0 0 18px rgba(255,255,255,0.25)",
          }}
          initial={{ y: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: ["0vh", "-120vh"],
            opacity: [0, 0.85, 0.7, 0],
            rotate: [0, (i % 2 === 0 ? 1 : -1) * 45],
          }}
          transition={{
            duration: 10 + i * 1.4,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.9,
          }}
        >
          {g}
        </motion.span>
      ))}
    </div>
  );
}
