import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import InteractiveStars from "@/components/InteractiveStars";
import { useI18n } from "@/lib/i18n";

const HeroSection = () => {
  const { t } = useI18n();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Deep space gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(228,30%,4%)] to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(199,89%,48%,0.08)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(265,80%,60%,0.06)_0%,transparent_50%)]" />

      {/* Interactive star canvas */}
      <InteractiveStars />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-8"
            >
              <Zap className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-primary tracking-wide">{t("hero.badge")}</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-8">
              {t("hero.title1")}{" "}
              <br className="hidden sm:block" />
              <span className="gradient-text text-glow">{t("hero.title2")}</span>{" "}
              <br className="hidden sm:block" />
              {t("hero.title3")}
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              {t("hero.desc")}
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/dashboard">
                <Button variant="hero" size="lg" className="text-base">
                  {t("hero.cta")} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button variant="hero-outline" size="lg" className="text-base">
                  {t("hero.learn")}
                </Button>
              </a>
            </div>

            {/* Mini stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center gap-12 mt-16"
            >
              {[
                { value: "$12.4M", label: t("hero.tvl") },
                { value: "3,847", label: t("hero.stakers") },
                { value: "12", label: t("hero.sats") },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold font-display text-foreground text-glow">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
