import { motion } from "framer-motion";
import { Coins, Rocket, Satellite, PiggyBank } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const HowItWorks = () => {
  const { t } = useI18n();

  const steps = [
    { icon: Coins, title: t("how.step1.title"), description: t("how.step1.desc") },
    { icon: Rocket, title: t("how.step2.title"), description: t("how.step2.desc") },
    { icon: Satellite, title: t("how.step3.title"), description: t("how.step3.desc") },
    { icon: PiggyBank, title: t("how.step4.title"), description: t("how.step4.desc") },
  ];

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Cosmic background */}
      <div className="absolute inset-0 cosmic-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(199,89%,48%,0.04)_0%,transparent_70%)]" />
      {/* Decorative line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t("how.title1")} <span className="gradient-text">{t("how.title2")}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t("how.subtitle")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass rounded-xl p-6 relative group hover:box-glow-strong transition-all duration-700 hover:-translate-y-1"
            >
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground font-display shadow-lg shadow-primary/30">
                {i + 1}
              </div>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-5 group-hover:shadow-lg group-hover:shadow-primary/20 transition-shadow duration-500">
                <step.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2 text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
