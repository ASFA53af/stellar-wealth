import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, Radio, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
import satVega from "@/assets/sat-vega.png";
import satHyperspectra from "@/assets/sat-hyperspectra.png";
import satCloudscan from "@/assets/sat-cloudscan.png";
import satOrbithub from "@/assets/sat-orbithub.png";
import satEcoguard from "@/assets/sat-ecoguard.png";
import satGeomag from "@/assets/sat-geomag.png";

const satellites = [
  {
    id: "terra-eye-1", name: "TERRA-EYE 1",
    type: { ru: "Оптическая съёмка высокого разрешения", en: "High-Resolution Optical Imaging" },
    desc: {
      ru: "Спутник оптического наблюдения, способный делать снимки Земли с разрешением до 30 см. Используется для картографии, городского планирования и мониторинга сельского хозяйства.",
      en: "Optical observation satellite capable of imaging Earth at up to 30cm resolution. Used for cartography, urban planning, and agricultural monitoring.",
    },
    orbit: "LEO 550km", data: "142 TB", revenue: "$1.2M", apy: "22.4%",
    status: "active" as const, image: satTerraEye,
  },
  {
    id: "sentinel-7a", name: "SENTINEL-7A",
    type: { ru: "SAR-радар", en: "SAR Radar" },
    desc: {
      ru: "Радарный спутник с синтетической апертурой, работающий в любую погоду и время суток. Данные для разведки недр и мониторинга деформаций земной поверхности.",
      en: "Synthetic aperture radar satellite operating in any weather. Data for subsurface exploration and ground deformation monitoring.",
    },
    orbit: "LEO 600km", data: "98 TB", revenue: "$890K", apy: "19.1%",
    status: "active" as const, image: satSentinel,
  },
  {
    id: "aqua-net", name: "AQUA-NET",
    type: { ru: "Мониторинг океанов", en: "Ocean Monitoring" },
    desc: {
      ru: "Спутник для мониторинга мирового океана: температура воды, течения, загрязнения и отслеживание судов.",
      en: "Satellite for global ocean monitoring: water temperature, currents, pollution, and vessel tracking.",
    },
    orbit: "LEO 520km", data: "76 TB", revenue: "$640K", apy: "17.8%",
    status: "active" as const, image: satAquaNet,
  },
  {
    id: "geo-chron-5", name: "GEO-CHRON 5",
    type: { ru: "Климатический мониторинг", en: "Climate Monitoring" },
    desc: {
      ru: "Кубсат для климатического мониторинга. Измеряет CO₂, метан и другие парниковые газы с высокой точностью.",
      en: "CubeSat for climate monitoring. Measures CO₂, methane, and other greenhouse gases with high precision.",
    },
    orbit: "LEO 580km", data: "34 TB", revenue: "$310K", apy: "15.2%",
    status: "active" as const, image: satGeoChron,
  },
  {
    id: "astra-track", name: "ASTRA-TRACK",
    type: { ru: "Геодезия", en: "Geodesy" },
    desc: {
      ru: "Сферический спутник с лазерными ретрорефлекторами для высокоточной геодезии. Данные о гравитационном поле Земли и тектонике.",
      en: "Spherical satellite with laser retroreflectors for precision geodesy. Data on Earth's gravitational field and tectonics.",
    },
    orbit: "LEO 480km", data: "12 TB", revenue: "$180K", apy: "12.6%",
    status: "active" as const, image: satAstraTrack,
  },
  {
    id: "polar-scout", name: "POLAR-SCOUT",
    type: { ru: "Мониторинг ледников", en: "Ice Monitoring" },
    desc: {
      ru: "Полярный спутник для мониторинга ледяного покрова Арктики и Антарктики. Таяние льдов, движение айсбергов, площадь ледников.",
      en: "Polar satellite for Arctic and Antarctic ice monitoring. Ice melting, iceberg movement, glacier area changes.",
    },
    orbit: "SSO 700km", data: "28 TB", revenue: "$220K", apy: "14.1%",
    status: "active" as const, image: satPolarScout,
  },
  {
    id: "vega-7", name: "VEGA-7",
    type: { ru: "Мониторинг Земли", en: "Earth Monitoring" },
    desc: {
      ru: "Многоцелевой спутник наблюдения с широкополосной камерой. Мониторинг лесных пожаров, вырубки лесов и экологических катастроф в реальном времени.",
      en: "Multi-purpose observation satellite with wide-band camera. Real-time monitoring of wildfires, deforestation, and ecological disasters.",
    },
    orbit: "LEO 560km", data: "89 TB", revenue: "$720K", apy: "18.5%",
    status: "active" as const, image: satVega,
  },
  {
    id: "hyper-spectra-1", name: "HYPER-SPECTRA 1",
    type: { ru: "Гиперспектральная съёмка", en: "Hyperspectral Imaging" },
    desc: {
      ru: "Гиперспектральный спутник с 200+ спектральными каналами. Определяет состав почвы, минералов и растительности из космоса для горнодобычи и агроиндустрии.",
      en: "Hyperspectral satellite with 200+ spectral channels. Identifies soil, mineral, and vegetation composition from space for mining and agriculture.",
    },
    orbit: "LEO 540km", data: "56 TB", revenue: "$480K", apy: "16.3%",
    status: "active" as const, image: satHyperspectra,
  },
  {
    id: "cloud-scan", name: "CLOUD-SCAN",
    type: { ru: "Атмосферный мониторинг", en: "Atmospheric Monitoring" },
    desc: {
      ru: "Спутник с уникальной зонтичной антенной для анализа атмосферы. Прогнозирование погоды, мониторинг качества воздуха и озонового слоя.",
      en: "Satellite with unique umbrella antenna for atmospheric analysis. Weather forecasting, air quality, and ozone layer monitoring.",
    },
    orbit: "LEO 620km", data: "41 TB", revenue: "$350K", apy: "14.7%",
    status: "active" as const, image: satCloudscan,
  },
  {
    id: "orbit-hub-3", name: "ORBIT-HUB 3",
    type: { ru: "Ретрансляция данных", en: "Data Relay" },
    desc: {
      ru: "Ретрансляционный спутник с двумя тарелочными антеннами. Обеспечивает скоростную передачу данных между остальными спутниками констелляции и наземными станциями.",
      en: "Data relay satellite with twin dish antennas. Provides high-speed data transmission between constellation satellites and ground stations.",
    },
    orbit: "MEO 2000km", data: "210 TB", revenue: "$1.5M", apy: "24.2%",
    status: "launching" as const, image: satOrbithub,
  },
  {
    id: "eco-guard", name: "ECO-GUARD",
    type: { ru: "Экологический мониторинг", en: "Environmental Monitoring" },
    desc: {
      ru: "Кубсат для мониторинга экосистем: загрязнение рек, незаконная вырубка лесов, состояние коралловых рифов и биоразнообразия.",
      en: "CubeSat for ecosystem monitoring: river pollution, illegal deforestation, coral reef status, and biodiversity.",
    },
    orbit: "LEO 510km", data: "—", revenue: "—", apy: "—",
    status: "planned" as const, image: satEcoguard,
  },
  {
    id: "geo-mag-2", name: "GEO-MAG 2",
    type: { ru: "Магнитометрия", en: "Magnetometry" },
    desc: {
      ru: "Спутник с выносной штангой магнитометра для изучения магнитного поля Земли. Данные используются для навигации, геологоразведки и прогнозирования геомагнитных бурь.",
      en: "Satellite with boom magnetometer for studying Earth's magnetic field. Data used for navigation, geological exploration, and geomagnetic storm prediction.",
    },
    orbit: "LEO 550km", data: "—", revenue: "—", apy: "—",
    status: "planned" as const, image: satGeomag,
  },
];

const Satellites = () => {
  const { t, lang } = useI18n();

  const statusBadge = (status: string) => {
    if (status === "active") return <Badge variant="default" className="text-xs">{t("sats.active")}</Badge>;
    if (status === "launching") return <Badge variant="secondary" className="text-xs bg-star/10 text-star border-star/20">{t("sats.launching")}</Badge>;
    return <Badge variant="secondary" className="text-xs">{t("sats.planned")}</Badge>;
  };

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
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              {t("sats.title1")} <span className="gradient-text">{t("sats.title2")}</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{t("sats.subtitle")}</p>
          </motion.div>
        </div>
      </section>

      {/* All 12 Satellites */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {satellites.map((sat, i) => (
              <motion.div
                key={sat.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-2xl overflow-hidden hover:box-glow transition-all duration-700 group"
              >
                <div className={`grid md:grid-cols-2 gap-0 items-center`}>
                  {/* Image */}
                  <div className={`relative flex items-center justify-center p-8 md:p-12 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
                    <div className="absolute w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                    <motion.img
                      src={sat.image}
                      alt={sat.name}
                      className="relative w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      width={768}
                      height={768}
                    />
                  </div>

                  {/* Info */}
                  <div className={`p-8 md:p-12 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                    <div className="flex items-center gap-3 mb-3">
                      {statusBadge(sat.status)}
                      <span className="text-xs text-muted-foreground font-mono">{sat.orbit}</span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-2">{sat.name}</h2>
                    <p className="text-sm text-primary font-medium mb-4">{sat.type[lang]}</p>
                    <p className="text-muted-foreground leading-relaxed mb-6">{sat.desc[lang]}</p>

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
