import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 95, damping: 17 },
  },
};

export default function Hero({ onOpen, reduced }) {
  return (
    <motion.header className="hero" variants={container} initial="hidden" animate="show">
      <div className="hero__rings" aria-hidden>
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="hero__ring"
            style={{ scale: 1 - i * 0.12 }}
            animate={
              reduced
                ? {}
                : {
                    rotate: [0, 360],
                    opacity: [0.42, 0.72, 0.42],
                  }
            }
            transition={{
              duration: 26 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.p className="eyebrow" variants={item}>
        happy birthday · made with love, just for you
      </motion.p>

      <motion.h1 className="title" variants={item}>
        <span className="title__line title__line--sm">Happy Birthday,</span>
        <motion.span
          className="title__line title__line--xl gradient-text"
          animate={
            reduced
              ? {}
              : {
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }
          }
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{ backgroundSize: "320% 320%" }}
        >
          cutie
        </motion.span>
      </motion.h1>

      <motion.p className="sub" variants={item}>
        I made you a ridiculous, extra, over-animated bouquet — because your birthday should feel a little magical, sweet, and proudly cheesy.
      </motion.p>

      <motion.div variants={item}>
        <motion.button
          type="button"
          className="cta"
          onClick={onOpen}
          whileHover={{ scale: 1.05, y: -3, rotate: [-1, 1, -1, 0] }}
          transition={{ rotate: { duration: 0.45 } }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="cta__glow" />
          <span>Open the good-luck card</span>
          <motion.svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            animate={reduced ? {} : { y: [0, 5, 0] }}
            transition={{ duration: 1.35, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </motion.svg>
        </motion.button>
      </motion.div>

      <motion.p
        className="scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: reduced ? 0.45 : [0.35, 0.72, 0.35] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
      >
        scroll · breathe · celebrate you
      </motion.p>
    </motion.header>
  );
}
