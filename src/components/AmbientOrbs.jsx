import { motion } from "framer-motion";

const orbs = [
  { size: 460, x: "-10%", y: "6%", from: "#fda4af", to: "transparent", dur: 17, delay: 0 },
  { size: 380, x: "68%", y: "10%", from: "#fbcfe8", to: "transparent", dur: 21, delay: 1 },
  { size: 300, x: "40%", y: "56%", from: "#fcd34d", to: "transparent", dur: 15, delay: 0.35 },
  { size: 220, x: "6%", y: "58%", from: "#a7f3d0", to: "transparent", dur: 19, delay: 1.8 },
];

export default function AmbientOrbs({ reduced }) {
  if (reduced) {
    return (
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(600px 400px at 70% 20%, rgba(192,132,252,0.2), transparent 60%)",
        }}
      />
    );
  }

  return (
    <div
      aria-hidden
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}
    >
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: o.x,
            top: o.y,
            width: o.size,
            height: o.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${o.from}55 0%, ${o.to} 70%)`,
            filter: "blur(4px)",
            mixBlendMode: "screen",
          }}
          animate={{
            x: [0, 26, -18, 0],
            y: [0, -20, 14, 0],
            scale: [1, 1.06, 0.98, 1],
            opacity: [0.45, 0.7, 0.5, 0.45],
          }}
          transition={{
            duration: o.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: o.delay,
          }}
        />
      ))}
    </div>
  );
}
