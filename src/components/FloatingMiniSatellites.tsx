import { useEffect, useState } from "react";

import sat1 from "@/assets/sat-terra-eye.png";
import sat2 from "@/assets/sat-sentinel.png";
import sat3 from "@/assets/sat-aqua-net.png";
import sat4 from "@/assets/sat-geo-chron.png";
import sat5 from "@/assets/sat-astra-track.png";
import sat6 from "@/assets/sat-polar-scout.png";
import sat7 from "@/assets/sat-vega.png";
import sat8 from "@/assets/sat-hyperspectra.png";
import sat9 from "@/assets/sat-cloudscan.png";
import sat10 from "@/assets/sat-orbithub.png";
import sat11 from "@/assets/sat-ecoguard.png";
import sat12 from "@/assets/sat-geomag.png";

const allSats = [sat1, sat2, sat3, sat4, sat5, sat6, sat7, sat8, sat9, sat10, sat11, sat12];

interface MiniSat {
  id: number;
  image: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
  opacity: number;
}

const FloatingMiniSatellites = () => {
  const [sats, setSats] = useState<MiniSat[]>([]);

  useEffect(() => {
    const generated: MiniSat[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      image: allSats[i % allSats.length],
      x: 5 + Math.random() * 85,
      y: 10 + Math.random() * 80,
      size: 20 + Math.random() * 30,
      duration: 15 + Math.random() * 25,
      delay: Math.random() * -20,
      driftX: (Math.random() - 0.5) * 60,
      driftY: (Math.random() - 0.5) * 40,
      opacity: 0.06 + Math.random() * 0.08,
    }));
    setSats(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {sats.map((s) => (
        <div
          key={s.id}
          className="absolute animate-float"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
            filter: "blur(0.5px)",
          }}
        >
          <img
            src={s.image}
            alt=""
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingMiniSatellites;
