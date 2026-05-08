import { useEffect, useRef } from "react";

function rand(a, b) {
  return a + Math.random() * (b - a);
}

export default function PetalCanvas({ reduced }) {
  const ref = useRef(null);
  const petalsRef = useRef([]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf = 0;
    const count = reduced ? 24 : 88;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      petalsRef.current = Array.from({ length: count }, () => ({
        x: rand(0, window.innerWidth),
        y: rand(-window.innerHeight, 0),
        r: rand(3, 12),
        rot: rand(0, Math.PI * 2),
        spin: rand(-0.035, 0.035),
        vy: rand(0.35, 1.75),
        vx: rand(-0.45, 0.45),
        hue: rand(300, 355),
        a: rand(0.3, 0.78),
      }));
    };

    const tick = () => {
      if (!reduced) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        for (const p of petalsRef.current) {
          p.y += p.vy;
          p.x += p.vx + Math.sin(p.y * 0.009) * 0.32;
          p.rot += p.spin;
          if (p.y > window.innerHeight + 24) {
            p.y = rand(-60, 0);
            p.x = rand(0, window.innerWidth);
          }
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = `hsla(${p.hue}, 86%, 73%, ${p.a})`;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.r * 0.45, p.r, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    init();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
