import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";

import satTerraEye from "@/assets/sat-terra-eye.png";
import satSentinel from "@/assets/sat-sentinel.png";
import satAquaNet from "@/assets/sat-aqua-net.png";
import satGeoChron from "@/assets/sat-geo-chron.png";
import satVega from "@/assets/sat-vega.png";
import satHyperspectra from "@/assets/sat-hyperspectra.png";

const satellites = [
  { name: "TERRA-EYE 1", status: "active", orbit: "LEO 550km", data: "142 TB", revenue: "$1.2M", image: satTerraEye },
  { name: "SENTINEL-7A", status: "active", orbit: "LEO 600km", data: "98 TB", revenue: "$890K", image: satSentinel },
  { name: "AQUA-NET", status: "active", orbit: "LEO 520km", data: "76 TB", revenue: "$640K", image: satAquaNet },
  { name: "VEGA-7", status: "active", orbit: "LEO 560km", data: "89 TB", revenue: "$720K", image: satVega },
  { name: "HYPER-SPECTRA 1", status: "active", orbit: "LEO 540km", data: "56 TB", revenue: "$480K", image: satHyperspectra },
  { name: "GEO-CHRON 5", status: "launching", orbit: "LEO 580km", data: "34 TB", revenue: "$310K", image: satGeoChron },
];

const SatellitesSection = () => {
  const { t } = useI18n();

  return (
    <section id="satellites" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(228,25%,8%)] to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(265,80%,60%,0.05)_0%,transparent_60%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t("sats.title1")} <span className="gradient-text">{t("sats.title2")}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t("sats.subtitle")}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {satellites.map((sat, i) => (
            <motion.div
              key={sat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-xl overflow-hidden group hover:box-glow transition-all duration-700 hover:-translate-y-2"
            >
              <div className="relative h-48 flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden">
                <div className="absolute w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
                <img
                  src={sat.image}
                  alt={sat.name}
                  className="relative w-36 h-36 object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  width={768}
                  height={768}
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display font-bold text-foreground">{sat.name}</h3>
                  <Badge variant={sat.status === "active" ? "default" : "secondary"} className="text-[10px]">
                    {sat.status === "active" ? t("sats.active") : t("sats.launching")}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground font-mono mb-3">{sat.orbit}</div>
                <div className="flex justify-between text-sm">
                  <div>
                    <div className="text-xs text-muted-foreground">{t("sats.data")}</div>
                    <div className="font-medium text-foreground">{sat.data}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">{t("sats.revenue")}</div>
                    <div className="font-medium text-primary">{sat.revenue}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/satellites">
            <Button variant="hero-outline" size="lg">
              {t("sats.viewAll")} (12) <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SatellitesSection;
