import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, Radio, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InteractiveStars from "@/components/InteractiveStars";
import { useI18n } from "@/lib/i18n";

import satTerraEye from "@/assets/sat-terra-eye.png";
import satSentinel from "@/assets/sat-sentinel.png";
import satAquaNet from "@/assets/sat-aqua-net.png";
import satGeoChron from "@/assets/sat-geo-chron.png";
import satAstraTrack from "@/assets/sat-astra-track.png";
import satPolarScout from "@/assets/sat-polar-scout.png";

const satellites = [
  {
    id: "terra-eye-1",
    name: "TERRA-EYE 1",
    type: { ru: "Оптическая съёмка высокого разрешения", en: "High-Resolution Optical Imaging" },
    desc: {
      ru: "Спутник оптического наблюдения, способный делать снимки Земли с разрешением до 30 см. Используется для картографии, городского планирования и мониторинга сельского хозяйства.",
      en: "Optical observation satellite capable of imaging Earth at up to 30cm resolution. Used for cartography, urban planning, and agricultural monitoring.",
    },
    orbit: "LEO 550km",
    data: "142 TB",
    revenue: "$1.2M",
    apy: "22.4%",
    status: "active" as const,
    image: satTerraEye,
  },
  {
    id: "sentinel-7a",
    name: "SENTINEL-7A",
    type: { ru: "SAR-радар", en: "SAR Radar" },
    desc: {
      ru: "Радарный спутник с синтетической апертурой, работающий в любую погоду и время суток. Обеспечивает данные для разведки недр и мониторинга деформаций земной поверхности.",
      en: "Synthetic aperture radar satellite operating in any weather and time of day. Provides data for subsurface exploration and ground deformation monitoring.",
    },
    orbit: "LEO 600km",
    data: "98 TB",
    revenue: "$890K",
    apy: "19.1%",
    status: "active" as const,
    image: satSentinel,
  },
  {
    id: "aqua-net",
    name: "AQUA-NET",
    type: { ru: "Мониторинг океанов", en: "Ocean Monitoring" },
    desc: {
      ru: "Специализированный спутник для мониторинга мирового океана: температура поверхности воды, течения, уровень загрязнения и отслеживание судов.",
      en: "Specialized satellite for global ocean monitoring: water surface temperature, currents, pollution levels, and vessel tracking.",
    },
    orbit: "LEO 520km",
    data: "76 TB",
    revenue: "$640K",
    apy: "17.8%",
    status: "active" as const,
    image: satAquaNet,
  },
  {
    id: "geo-chron-5",
    name: "GEO-CHRON 5",
    type: { ru: "Климатический мониторинг", en: "Climate Monitoring" },
    desc: {
      ru: "Кубсат нового поколения для климатического мониторинга. Измеряет уровень CO₂, метана и других парниковых газов в атмосфере с высокой точностью.",
      en: "Next-gen CubeSat for climate monitoring. Measures CO₂, methane, and other greenhouse gas levels in the atmosphere with high precision.",
    },
    orbit: "LEO 580km",
    data: "34 TB",
    revenue: "$310K",
    apy: "15.2%",
    status: "active" as const,
    image: satGeoChron,
  },
  {
    id: "astra-track",
    name: "ASTRA-TRACK",
    type: { ru: "Геодезия", en: "Geodesy" },
    desc: {
      ru: "Сферический спутник-отражатель с лазерными ретрорефлекторами для высокоточной геодезии. Обеспечивает данные о гравитационном поле Земли и тектонических движениях.",
      en: "Spherical reflector satellite with laser retroreflectors for precision geodesy. Provides data on Earth's gravitational field and tectonic movements.",
    },
    orbit: "LEO 480km",
    data: "12 TB",
    revenue: "$180K",
    apy: "12.6%",
    status: "active" as const,
    image: satAstraTrack,
  },
  {
    id: "polar-scout",
    name: "POLAR-SCOUT",
    type: { ru: "Мониторинг ледников", en: "Ice Monitoring" },
    desc: {
      ru: "Полярный спутник для мониторинга ледяного покрова Арктики и Антарктики. Отслеживает таяние льдов, движение айсбергов и изменение площади ледников.",
      en: "Polar satellite for Arctic and Antarctic ice cover monitoring. Tracks ice melting, iceberg movement, and glacier area changes.",
    },
    orbit: "SSO 700km",
    data: "—",
    revenue: "—",
    apy: "—",
    status: "launching" as const,
    image: satPolarScout,
  },
];

const Satellites = () => {
  const { t, lang } = useI18n();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <InteractiveStars />
          <div className="absolute inset-0 cosmic-gradient opacity-80" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" /> {t("dash.back")}
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              {t("sats.title1")} <span className="gradient-text">{t("sats.title2")}</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("sats.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Satellite Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {satellites.map((sat, i) => (
              <motion.div
                key={sat.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl overflow-hidden hover:box-glow transition-all duration-700 group"
              >
                <div className={`grid md:grid-cols-2 gap-0 items-center ${i % 2 === 1 ? "md:direction-rtl" : ""}`}>
                  {/* Image */}
                  <div className={`relative flex items-center justify-center p-8 md:p-12 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
                    <div className="absolute w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                    <motion.img
                      src={sat.image}
                      alt={sat.name}
                      className="relative w-56 h-56 md:w-72 md:h-72 object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      width={768}
                      height={768}
                    />
                  </div>

                  {/* Info */}
                  <div className={`p-8 md:p-12 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant={sat.status === "active" ? "default" : "secondary"} className="text-xs">
                        {sat.status === "active" ? t("sats.active") : t("sats.launching")}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-mono">{sat.orbit}</span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-2">
                      {sat.name}
                    </h2>
                    <p className="text-sm text-primary font-medium mb-4">
                      {sat.type[lang]}
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {sat.desc[lang]}
                    </p>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="glass rounded-lg p-3 text-center">
                        <Radio className="h-4 w-4 text-primary mx-auto mb-1" />
                        <div className="text-xs text-muted-foreground">{t("sats.data")}</div>
                        <div className="text-sm font-bold font-display text-foreground">{sat.data}</div>
                      </div>
                      <div className="glass rounded-lg p-3 text-center">
                        <TrendingUp className="h-4 w-4 text-success mx-auto mb-1" />
                        <div className="text-xs text-muted-foreground">{t("sats.revenue")}</div>
                        <div className="text-sm font-bold font-display text-primary">{sat.revenue}</div>
                      </div>
                      <div className="glass rounded-lg p-3 text-center">
                        <MapPin className="h-4 w-4 text-star mx-auto mb-1" />
                        <div className="text-xs text-muted-foreground">APY</div>
                        <div className="text-sm font-bold font-display text-success">{sat.apy}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Satellites;
