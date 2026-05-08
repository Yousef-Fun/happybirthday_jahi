import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import PetalCanvas from "./components/PetalCanvas.jsx";
import AmbientOrbs from "./components/AmbientOrbs.jsx";
import CursorAura from "./components/CursorAura.jsx";
import ScrollProgressBar from "./components/ScrollProgressBar.jsx";
import Hero from "./components/Hero.jsx";
import FlowerGarden from "./components/FlowerGarden.jsx";
import MessageModal from "./components/MessageModal.jsx";
import RisingGlyphs from "./components/RisingGlyphs.jsx";

function usePointerParallax(reduced) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const hx = useSpring(mx, { stiffness: 50, damping: 20 });
  const hy = useSpring(my, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced, mx, my]);

  const mainX = useTransform(hx, (v) => v * 14);
  const mainY = useTransform(hy, (v) => v * 10);
  const gardenX = useTransform(hx, (v) => v * -18);
  const gardenY = useTransform(hy, (v) => v * -12);

  return { mainX, mainY, gardenX, gardenY };
}

export default function App() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const { mainX, mainY, gardenX, gardenY } = usePointerParallax(reduced);

  return (
    <>
      <ScrollProgressBar reduced={reduced} />
      <PetalCanvas reduced={reduced} />
      <AmbientOrbs reduced={reduced} />
      <RisingGlyphs reduced={reduced} />
      {!reduced && <CursorAura />}
      <div className="grain" aria-hidden />
      <div className="vignette" aria-hidden />

      <motion.main
        className="stage"
        style={reduced ? undefined : { x: mainX, y: mainY }}
      >
        <Hero onOpen={() => setOpen(true)} reduced={reduced} />
        <motion.div style={reduced ? undefined : { x: gardenX, y: gardenY }}>
          <FlowerGarden reduced={reduced} />
        </motion.div>
      </motion.main>

      <MessageModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
