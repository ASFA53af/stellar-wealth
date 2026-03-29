import { motion } from "framer-motion";
import {
  Wallet, Coins, Rocket, Satellite, ShoppingCart, PiggyBank,
  Map, BarChart3, ShieldAlert, Ship, Wifi
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

const HowItWorks = () => {
  const { t } = useI18n();

  const steps = [
    { icon: Wallet, title: t("how.step1.title"), description: t("how.step1.desc") },
    { icon: Coins, title: t("how.step2.title"), description: t("how.step2.desc") },
    { icon: Rocket, title: t("how.step3.title"), description: t("how.step3.desc") },
    { icon: Satellite, title: t("how.step4.title"), description: t("how.step4.desc") },
    { icon: ShoppingCart, title: t("how.step5.title"), description: t("how.step5.desc") },
    { icon: PiggyBank, title: t("how.step6.title"), description: t("how.step6.desc") },
  ];

  const revenueSources = [
    { icon: Map, title: t("rev.geo"), desc: t("rev.geoDesc"), pct: "45%" },
    { icon: BarChart3, title: t("rev.analytics"), desc: t("rev.analyticsDesc"), pct: "20%" },
    { icon: ShieldAlert, title: t("rev.disaster"), desc: t("rev.disasterDesc"), pct: "15%" },
    { icon: Ship, title: t("rev.maritime"), desc: t("rev.maritimeDesc"), pct: "12%" },
    { icon: Wifi, title: t("rev.iot"), desc: t("rev.iotDesc"), pct: "8%" },
  ];

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 cosmic-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(199,89%,48%,0.04)_0%,transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t("how.title1")} <span className="gradient-text">{t("how.title2")}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            {t("how.subtitle")}
          </p>
        </motion.div>

        {/* Steps — timeline style */}
        <div className="relative max-w-4xl mx-auto mb-24">
          {/* Central line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/30 to-primary/50 md:-translate-x-px" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex items-start gap-6 mb-10 md:mb-12 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-6 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-primary shadow-lg shadow-primary/40 z-10 mt-6 md:mt-4" />

              {/* Card */}
              <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] glass rounded-xl p-6 hover:box-glow-strong transition-all duration-700 hover:-translate-y-1 ${
                i % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center shrink-0">
                    <step.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-primary font-display bg-primary/10 px-2 py-0.5 rounded-full">
                      {i + 1}
                    </span>
                    <h3 className="font-display font-semibold text-lg text-foreground">{step.title}</h3>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Revenue Sources */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t("rev.title1")} <span className="gradient-text">{t("rev.title2")}</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {revenueSources.map((src, i) => (
            <motion.div
              key={src.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-xl p-5 text-center hover:box-glow transition-all duration-500 hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mx-auto mb-3 group-hover:shadow-lg group-hover:shadow-primary/20 transition-shadow">
                <src.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold font-display gradient-text mb-1">{src.pct}</div>
              <h4 className="font-display font-medium text-sm text-foreground mb-1">{src.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{src.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
