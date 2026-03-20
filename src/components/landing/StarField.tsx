"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  pz: number;
  color: [number, number, number];
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const rafRef = useRef<number>();
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const NUM = 200;

    // Color palette: purple, cyan, white
    const palette: [number, number, number][] = [
      [155, 48, 255],
      [0, 196, 255],
      [255, 255, 255],
      [0, 204, 106],
      [0, 122, 255],
    ];

    const initStars = () => {
      starsRef.current = Array.from({ length: NUM }, () => {
        const col = palette[Math.floor(Math.random() * palette.length)];
        return {
          x: (Math.random() - 0.5) * W * 2,
          y: (Math.random() - 0.5) * H * 2,
          z: Math.random() * W,
          pz: 0,
          color: col,
        };
      });
    };

    initStars();

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      initStars();
    };

    const onMouse = (e: MouseEvent) => {
      mouseRef.current.tx = (e.clientX / W - 0.5) * 60;
      mouseRef.current.ty = (e.clientY / H - 0.5) * 40;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouse);

    const draw = () => {
      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.06;

      // Trail effect — partial clear for motion blur
      ctx.fillStyle = "rgba(13,13,26,0.18)";
      ctx.fillRect(0, 0, W, H);

      const cx = W / 2 + mouseRef.current.x;
      const cy = H / 2 + mouseRef.current.y;

      for (const s of starsRef.current) {
        s.pz = s.z;
        s.z -= 1.2;

        if (s.z <= 0) {
          s.x = (Math.random() - 0.5) * W * 2;
          s.y = (Math.random() - 0.5) * H * 2;
          s.z = W;
          s.pz = s.z;
        }

        const k = 128 / s.z;
        const pk = 128 / s.pz;

        const sx = s.x * k + cx;
        const sy = s.y * k + cy;
        const px = s.x * pk + cx;
        const py = s.y * pk + cy;

        if (sx < 0 || sx > W || sy < 0 || sy > H) continue;

        const life = 1 - s.z / W;
        const size = Math.max(0.3, life * 2.8);
        const opacity = life * 0.9;
        const [r, g, b] = s.color;

        // Draw trail line
        const lineLen = Math.hypot(sx - px, sy - py);
        if (lineLen > 0.5 && lineLen < 40) {
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(sx, sy);
          ctx.strokeStyle = `rgba(${r},${g},${b},${opacity * 0.5})`;
          ctx.lineWidth = size * 0.6;
          ctx.stroke();
        }

        // Draw star dot
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`;
        ctx.fill();

        // Bright core for close stars
        if (life > 0.75) {
          ctx.beginPath();
          ctx.arc(sx, sy, size * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${opacity * 0.9})`;
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
      style={{ opacity: 0.75 }}
    />
  );
}
