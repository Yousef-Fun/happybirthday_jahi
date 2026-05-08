import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MESSAGE_PARAGRAPHS } from "../data/message";

const backdrop = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const panel = {
  hidden: { opacity: 0, y: 50, scale: 0.92, rotateX: -8 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
  exit: {
    opacity: 0,
    y: 30,
    scale: 0.96,
    transition: { duration: 0.2 },
  },
};

const lineVar = {
  hidden: { opacity: 0, x: -16, skewX: -4 },
  show: (i) => ({
    opacity: 1,
    x: 0,
    skewX: 0,
    transition: { delay: 0.15 + i * 0.14, type: "spring", stiffness: 120, damping: 20 },
  }),
};

export default function MessageModal({ open, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="message-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="card-heading"
          variants={backdrop}
          initial="hidden"
          animate="show"
          exit="exit"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div className="card-glass" variants={panel} initial="hidden" animate="show" exit="exit" style={{ transformPerspective: 900 }}>
            <motion.button type="button" className="card-close" onClick={onClose} aria-label="Close message" whileHover={{ rotate: 90, scale: 1.05 }} whileTap={{ scale: 0.94 }}>
              ×
            </motion.button>
            <h2 id="card-heading" className="card-title">
              Happy Birthday, cutie
            </h2>
            <div className="card-body">
              {MESSAGE_PARAGRAPHS.map((text, i) => (
                <motion.p key={i} className="line" custom={i} variants={lineVar} initial="hidden" animate="show">
                  {text}
                </motion.p>
              ))}
            </div>
            <motion.p
              className="card-signoff"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, type: "spring", stiffness: 80 }}
            >
              — Love you lots. Hope today is everything you want it to be.
            </motion.p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
