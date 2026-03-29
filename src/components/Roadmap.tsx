import { motion } from "framer-motion";
import { CheckCircle, Circle, Clock } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const Roadmap = () => {
  const { t } = useI18n();

  const phases = [
    { key: "q1", period: "Q1 2026", status: "done" as const },
    { key: "q2", period: "Q2 2026", status: "done" as const },
    { key: "q3", period: "Q3 2026", status: "current" as const },
    { key: "q4", period: "Q4 2026", status: "upcoming" as const },
    { key: "q5", period: "Q1 2027", status: "upcoming" as const },
    { key: "q6", period: "Q3 2027", status: "upcoming" as const },
  ];

  const statusIcon = (s: string) => {
    if (s === "done") return <CheckCircle className="h-5 w-5 text-success" />;
    if (s === "current") return <Clock className="h-5 w-5 text-primary animate-pulse" />;
    return <Circle className="h-5 w-5 text-muted-foreground" />;
  };

  return (
    <section id="roadmap" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(228,25%,7%)] to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(265,80%,60%,0.05)_0%,transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t("road.title1")} <span className="gradient-text">{t("road.title2")}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            {t("road.subtitle")}
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Horizontal line on desktop */}
          <div className="hidden lg:block absolute top-[60px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass rounded-xl p-6 hover:-translate-y-1 transition-all duration-500 ${
                  phase.status === "current"
                    ? "box-glow-strong border-primary/30"
                    : phase.status === "done"
                    ? "border-success/20"
                    : "hover:box-glow"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-bold font-display px-3 py-1 rounded-full ${
                    phase.status === "done"
                      ? "bg-success/10 text-success"
                      : phase.status === "current"
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {phase.period}
                  </span>
                  {statusIcon(phase.status)}
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">
                  {t(`road.${phase.key}.title` as any)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`road.${phase.key}.desc` as any)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
