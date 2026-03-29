import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import constellationImg from "@/assets/satellite-constellation.jpg";

const satellites = [
  { name: "ORB-SAT Alpha", status: "active", orbit: "LEO 550km", data: "142 TB", revenue: "$1.2M" },
  { name: "ORB-SAT Beta", status: "active", orbit: "LEO 600km", data: "98 TB", revenue: "$890K" },
  { name: "ORB-SAT Gamma", status: "active", orbit: "LEO 520km", data: "76 TB", revenue: "$640K" },
  { name: "ORB-SAT Delta", status: "launching", orbit: "LEO 580km", data: "—", revenue: "—" },
];

const SatellitesSection = () => {
  return (
    <section id="satellites" className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Наша <span className="gradient-text">констелляция</span>
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Сеть спутников на низкой орбите, которые собирают геоданные высокого разрешения
              для коммерческих клиентов по всему миру.
            </p>

            <div className="space-y-3">
              {satellites.map((sat, i) => (
                <motion.div
                  key={sat.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-lg p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                      sat.status === "active" ? "bg-success animate-pulse-glow" : "bg-star"
                    }`} />
                    <div className="min-w-0">
                      <div className="font-display font-medium text-sm text-foreground">{sat.name}</div>
                      <div className="text-xs text-muted-foreground">{sat.orbit}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right hidden sm:block">
                      <div className="text-xs text-muted-foreground">Данные</div>
                      <div className="text-sm font-medium text-foreground">{sat.data}</div>
                    </div>
                    <div className="text-right hidden sm:block">
                      <div className="text-xs text-muted-foreground">Доход</div>
                      <div className="text-sm font-medium text-primary">{sat.revenue}</div>
                    </div>
                    <Badge variant={sat.status === "active" ? "default" : "secondary"} className="text-xs">
                      {sat.status === "active" ? "Активен" : "Запуск"}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-accent/10 blur-3xl rounded-full scale-75" />
              <img
                src={constellationImg}
                alt="Констелляция спутников OrbitalStake"
                className="relative rounded-2xl shadow-2xl w-full"
                loading="lazy"
                width={1200}
                height={600}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SatellitesSection;
