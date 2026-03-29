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

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      initStars();
    };

    const initStars = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const count = Math.min(Math.floor((w * h) / 6000), 200);
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

    const MAGNETIC_RADIUS = 180;
    const CONNECTION_DIST = 120;

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      const { x: mx, y: my } = mouseRef.current;
      const stars = starsRef.current;

      // Update positions — attract toward cursor
      for (const s of stars) {
        const dx = mx - s.x;
        const dy = my - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MAGNETIC_RADIUS && dist > 0) {
          const force = (1 - dist / MAGNETIC_RADIUS) * 2;
          s.x += dx * force * 0.02;
          s.y += dy * force * 0.02;
        } else {
          // Return to base
          s.x += (s.baseX - s.x) * 0.03;
          s.y += (s.baseY - s.y) * 0.03;
        }

        // Gentle float
        s.y += Math.sin(Date.now() * 0.001 * s.speed + s.baseX) * 0.15;
      }

      // Draw connections (constellation lines)
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            // Only draw if near cursor
            const midX = (stars[i].x + stars[j].x) / 2;
            const midY = (stars[i].y + stars[j].y) / 2;
            const distToCursor = Math.sqrt((midX - mx) ** 2 + (midY - my) ** 2);
            if (distToCursor < MAGNETIC_RADIUS * 1.5) {
              const alpha = (1 - dist / CONNECTION_DIST) * (1 - distToCursor / (MAGNETIC_RADIUS * 1.5)) * 0.4;
              ctx.beginPath();
              ctx.moveTo(stars[i].x, stars[i].y);
              ctx.lineTo(stars[j].x, stars[j].y);
              ctx.strokeStyle = `rgba(14, 165, 233, ${alpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      // Draw stars
      for (const s of stars) {
        const distToCursor = Math.sqrt((s.x - mx) ** 2 + (s.y - my) ** 2);
        const boost = distToCursor < MAGNETIC_RADIUS ? (1 - distToCursor / MAGNETIC_RADIUS) * 0.6 : 0;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size + boost * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14, 165, 233, ${s.opacity + boost})`;
        ctx.fill();

        // Glow for close stars
        if (boost > 0.1) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size + boost * 6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(14, 165, 233, ${boost * 0.15})`;
          ctx.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouse);
    canvas.addEventListener("mouseleave", handleLeave);
    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouse);
      canvas.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "auto" }}
    />
  );
};

export default InteractiveStars;
