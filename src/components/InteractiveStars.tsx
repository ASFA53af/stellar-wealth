import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
  speed: number;
}

const InteractiveStars = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const starsRef = useRef<Star[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * window.devicePixelRatio;
      canvas.height = h * window.devicePixelRatio;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
      initStars();
    };

    const initStars = () => {
      const count = Math.min(Math.floor((w * h) / 5000), 250);
      starsRef.current = Array.from({ length: count }, () => {
        const x = Math.random() * w;
        const y = Math.random() * h;
        return {
          x, y, baseX: x, baseY: y,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.6 + 0.2,
          speed: Math.random() * 0.5 + 0.2,
        };
      });
    };

    const MAGNETIC_RADIUS = 200;
    const CONNECTION_DIST = 130;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const { x: mx, y: my } = mouseRef.current;
      const stars = starsRef.current;
      const now = Date.now();

      for (const s of stars) {
        const dx = mx - s.x;
        const dy = my - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MAGNETIC_RADIUS && dist > 0) {
          const force = (1 - dist / MAGNETIC_RADIUS) * 3;
          s.x += dx * force * 0.025;
          s.y += dy * force * 0.025;
        } else {
          s.x += (s.baseX - s.x) * 0.04;
          s.y += (s.baseY - s.y) * 0.04;
        }
        s.y += Math.sin(now * 0.001 * s.speed + s.baseX) * 0.12;
      }

      // Connections
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const midX = (stars[i].x + stars[j].x) / 2;
            const midY = (stars[i].y + stars[j].y) / 2;
            const distToCursor = Math.sqrt((midX - mx) ** 2 + (midY - my) ** 2);
            if (distToCursor < MAGNETIC_RADIUS * 1.8) {
              const alpha = (1 - dist / CONNECTION_DIST) * (1 - distToCursor / (MAGNETIC_RADIUS * 1.8)) * 0.5;
              ctx.beginPath();
              ctx.moveTo(stars[i].x, stars[i].y);
              ctx.lineTo(stars[j].x, stars[j].y);
              ctx.strokeStyle = `rgba(14, 165, 233, ${alpha})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
      }

      // Stars
      for (const s of stars) {
        const distToCursor = Math.sqrt((s.x - mx) ** 2 + (s.y - my) ** 2);
        const boost = distToCursor < MAGNETIC_RADIUS ? (1 - distToCursor / MAGNETIC_RADIUS) * 0.7 : 0;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size + boost * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14, 165, 233, ${s.opacity + boost})`;
        ctx.fill();

        if (boost > 0.1) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size + boost * 8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(14, 165, 233, ${boost * 0.12})`;
          ctx.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    // Listen on WINDOW for consistent tracking
    const handlePointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointer, { passive: true });
    canvas.addEventListener("mouseleave", handleLeave);
    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointer);
      canvas.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
};

export default InteractiveStars;
