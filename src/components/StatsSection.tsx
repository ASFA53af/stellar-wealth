import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const StatsSection = () => {
  const { t } = useI18n();

  const stats = [
    { value: "$12.4M", label: "Total Value Locked", description: t("stats.tvl") },
    { value: "18.2%", label: "APY", description: t("stats.apy") },
    { value: "3,847", label: t("hero.stakers"), description: t("stats.stakers") },
    { value: "12", label: t("hero.sats"), description: t("stats.satellites") },
    { value: "$2.7M", label: t("dash.earned"), description: t("stats.paid") },
    { value: "142 TB", label: t("sats.data"), description: t("stats.data") },
  ];

  return (
    <section id="stats" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 cosmic-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(199,89%,48%,0.06)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(265,80%,60%,0.04)_0%,transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t("stats.title1")} <span className="gradient-text">{t("stats.title2")}</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-8 text-center hover:box-glow-strong transition-all duration-700 hover:-translate-y-1 group"
            >
              <div className="text-4xl font-bold font-display gradient-text mb-2 group-hover:text-glow transition-all">{stat.value}</div>
              <div className="text-sm font-medium text-foreground mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
