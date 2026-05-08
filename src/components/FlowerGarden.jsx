import { useLayoutEffect, useRef, useId } from "react";
import gsap from "gsap";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * Stems end at mount point; [data-bloom] has no translate so GSAP scale/rotate stays stable.
 */
function PeonyFlower({ uid }) {
  return (
    <>
      <defs>
        <linearGradient id={`${uid}-stem`} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#166534" />
          <stop offset="50%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#86efac" />
        </linearGradient>
        <linearGradient id={`${uid}-leaf`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#14532d" />
          <stop offset="100%" stopColor="#4ade80" />
        </linearGradient>
        <radialGradient id={`${uid}-p1`} cx="32%" cy="28%" r="68%">
          <stop offset="0%" stopColor="#fff7ed" />
          <stop offset="45%" stopColor="#fda4af" />
          <stop offset="100%" stopColor="#f43f5e" />
        </radialGradient>
        <radialGradient id={`${uid}-p2`} cx="55%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#fce7f3" />
          <stop offset="55%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#db2777" />
        </radialGradient>
        <radialGradient id={`${uid}-heart`} cx="35%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#fef9c3" />
          <stop offset="100%" stopColor="#eab308" />
        </radialGradient>
      </defs>

      <path
        data-leaf
        d="M58 248c-12-28-8-52 12-60-8 28 2 52 32 58z"
        fill={`url(#${uid}-leaf)`}
        opacity="0"
      />
      <path
        data-leaf
        d="M92 252c16-22 20-48 8-62 4 26-10 50-40 60z"
        fill={`url(#${uid}-leaf)`}
        opacity="0"
      />

      <path
        data-stem
        d="M 74 302 C 62 238 88 178 74 112 L 74 108"
        fill="none"
        stroke={`url(#${uid}-stem)`}
        strokeWidth="8"
        strokeLinecap="round"
      />

      <g transform="translate(74 108)">
        <g data-bloom>
          {[0, 40, 80, 120, 160, 200, 240, 280].map((deg, i) => (
            <g key={deg} data-petal transform={`rotate(${deg})`}>
              <ellipse
                cx="0"
                cy="-22"
                rx={36 - i * 1.1}
                ry="19"
                fill={i % 2 === 0 ? `url(#${uid}-p1)` : `url(#${uid}-p2)`}
                opacity={0.88 + (8 - i) * 0.012}
              />
            </g>
          ))}
          <g data-petal>
            <circle cx="0" cy="0" r="13" fill={`url(#${uid}-heart)`} />
            <circle cx="0" cy="0" r="5" fill="#fde047" opacity="0.85" />
          </g>
        </g>
      </g>
    </>
  );
}

function RoseFlower({ uid }) {
  return (
    <>
      <defs>
        <linearGradient id={`${uid}-stem`} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#14532d" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
        <linearGradient id={`${uid}-leaf`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#166534" />
          <stop offset="100%" stopColor="#4ade80" />
        </linearGradient>
        <radialGradient id={`${uid}-rOut`} cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#fecdd3" />
          <stop offset="45%" stopColor="#fb7185" />
          <stop offset="100%" stopColor="#881337" />
        </radialGradient>
        <radialGradient id={`${uid}-rIn`} cx="48%" cy="42%" r="58%">
          <stop offset="0%" stopColor="#fff1f2" />
          <stop offset="100%" stopColor="#be123c" />
        </radialGradient>
      </defs>

      <path
        data-leaf
        d="M52 242c-10-24-6-50 14-54-12 24-6 46 24 52z"
        fill={`url(#${uid}-leaf)`}
        opacity="0"
      />

      <path
        data-stem
        d="M 70 304 C 58 252 82 198 70 140 L 70 118"
        fill="none"
        stroke={`url(#${uid}-stem)`}
        strokeWidth="8"
        strokeLinecap="round"
      />

      <g transform="translate(70 118)">
        <g data-bloom>
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
            <g key={deg} data-petal transform={`rotate(${deg + i * 2})`}>
              <ellipse
                cx="0"
                cy={-18 - i * 0.35}
                rx={32 - i * 0.95}
                ry="15"
                fill={i % 3 === 0 ? `url(#${uid}-rOut)` : `url(#${uid}-rIn)`}
                opacity={0.9 - i * 0.02}
              />
            </g>
          ))}
          <g data-petal>
            <circle cx="0" cy="0" r="11" fill="#7f1d1d" />
            <circle cx="-2" cy="-2" r="4" fill="#fda4af" opacity="0.95" />
          </g>
        </g>
      </g>
    </>
  );
}

function LilyFlower({ uid }) {
  return (
    <>
      <defs>
        <linearGradient id={`${uid}-stem`} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#14532d" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
        <linearGradient id={`${uid}-leaf`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#14532d" />
          <stop offset="100%" stopColor="#6ee7b7" />
        </linearGradient>
        <linearGradient id={`${uid}-white`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="40%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#e9d5ff" />
        </linearGradient>
        <radialGradient id={`${uid}-stamen`} cx="40%" cy="35%" r="55%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#f59e0b" />
        </radialGradient>
      </defs>

      <path
        data-leaf
        d="M96 246c22-20 26-50 12-66 0 28-16 54-46 62z"
        fill={`url(#${uid}-leaf)`}
        opacity="0"
      />

      <path
        data-stem
        d="M 78 306 C 92 258 68 210 78 162 L 78 122"
        fill="none"
        stroke={`url(#${uid}-stem)`}
        strokeWidth="7.5"
        strokeLinecap="round"
      />

      <g transform="translate(78 122)">
        <g data-bloom>
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <g key={deg} data-petal transform={`rotate(${deg})`}>
              <path
                d="M0 8 C 12 -38 8 -58 0 -64 C -8 -58 -12 -38 0 8z"
                fill={`url(#${uid}-white)`}
                opacity="0.94"
              />
            </g>
          ))}
          <g data-petal>
            <circle r="15" fill={`url(#${uid}-stamen)`} />
          </g>
          {[15, 135, 255].map((deg) => (
            <g key={deg} data-petal transform={`rotate(${deg})`}>
              <ellipse cx="0" cy="-50" rx="2.5" ry="7" fill="#a855f7" opacity="0.9" />
            </g>
          ))}
        </g>
      </g>
    </>
  );
}

export default function FlowerGarden({ reduced }) {
  const wrapRef = useRef(null);
  const flowerRoots = useRef([]);
  const idBase = useId().replace(/:/g, "fl");

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });

  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], reduced ? [0, 0, 0] : [8, 0, -6]),
    { stiffness: 78, damping: 22 }
  );
  const lift = useSpring(
    useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [32, -48]),
    { stiffness: 68, damping: 24 }
  );

  useLayoutEffect(() => {
    if (reduced) {
      flowerRoots.current.forEach((root) => {
        if (!root) return;
        root.style.opacity = "1";
        const svg = root.querySelector("svg");
        svg?.querySelectorAll("[data-stem]").forEach((path) => {
          if (path instanceof SVGPathElement) {
            const len = path.getTotalLength();
            path.style.strokeDasharray = `${len}`;
            path.style.strokeDashoffset = "0";
          }
        });
        svg?.querySelectorAll("[data-leaf]").forEach((leaf) => {
          leaf.setAttribute("opacity", "1");
        });
      });
      return;
    }

    const ctx = gsap.context(() => {
      flowerRoots.current.forEach((root, i) => {
        if (!root) return;
        const stems = root.querySelectorAll("[data-stem]");
        const bloom = root.querySelector("[data-bloom]");
        const leaves = root.querySelectorAll("[data-leaf]");
        const petals = bloom ? [...bloom.querySelectorAll("[data-petal]")] : [];

        stems.forEach((path) => {
          if (!(path instanceof SVGPathElement)) return;
          const len = path.getTotalLength();
          gsap.set(path, {
            strokeDasharray: len,
            strokeDashoffset: len,
            opacity: 1,
          });
        });

        gsap.set(bloom, {
          scale: 0,
          opacity: 0,
          transformOrigin: "50% 100%",
        });

        gsap.set(leaves, { opacity: 0, scale: 0.6 });
        gsap.set(petals, {
          scale: 0.4,
          opacity: 0,
          transformOrigin: "50% 80%",
        });

        const tl = gsap.timeline({ delay: 0.42 + i * 0.26 });
        tl.to(root, { opacity: 1, duration: 0.1 }, 0);
        tl.to(
          stems,
          {
            strokeDashoffset: 0,
            duration: 1.15,
            ease: "power2.inOut",
          },
          0
        );
        tl.to(
          leaves,
          {
            opacity: 1,
            scale: 1,
            duration: 0.55,
            ease: "back.out(1.5)",
            stagger: 0.08,
          },
          "-=0.5"
        );
        tl.to(
          bloom,
          {
            scale: 1,
            opacity: 1,
            duration: 0.95,
            ease: "elastic.out(1, 0.55)",
          },
          "-=0.42"
        );
        tl.to(
          petals,
          {
            scale: 1,
            opacity: 1,
            duration: 0.55,
            stagger: {
              each: 0.04,
              from: "center",
            },
            ease: "back.out(1.35)",
          },
          "-=0.58"
        );
      });

      flowerRoots.current.forEach((root, i) => {
        const bloom = root.querySelector("[data-bloom]");
        if (!bloom) return;
        gsap.to(bloom, {
          y: i % 2 === 0 ? -2.5 : 2.5,
          duration: 2.8 + i * 0.35,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, wrapRef);

    return () => ctx.revert();
  }, [reduced]);

  const setRoot = (idx) => (el) => {
    flowerRoots.current[idx] = el;
  };

  const flowers = [
    { render: () => <PeonyFlower uid={`${idBase}-p`} /> },
    { render: () => <RoseFlower uid={`${idBase}-r`} /> },
    { render: () => <LilyFlower uid={`${idBase}-l`} /> },
  ];

  return (
    <div ref={wrapRef} className="garden-wrap">
      <motion.section
        className="garden garden--advanced"
        aria-label="Animated bouquet"
        style={{ rotateX, y: lift }}
      >
        <motion.div
          className="garden__glow"
          aria-hidden
          animate={reduced ? {} : { scale: [1, 1.1, 1], opacity: [0.55, 0.92, 0.55] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="stems stems--svg">
          {flowers.map((F, i) => (
            <div key={i} ref={setRoot(i)} className="flower-svg-col flower-svg-col--adv" style={{ opacity: 0 }}>
              <svg className="flower-svg" viewBox="0 0 160 320" role="img" aria-label={i === 0 ? "Peony" : i === 1 ? "Rose" : "Lily"}>
                {F.render()}
              </svg>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
