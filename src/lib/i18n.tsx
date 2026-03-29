import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "ru" | "en";

const translations = {
  // Header
  "nav.howItWorks": { ru: "Как это работает", en: "How It Works" },
  "nav.satellites": { ru: "Спутники", en: "Satellites" },
  "nav.stats": { ru: "Статистика", en: "Statistics" },
  "nav.dashboard": { ru: "Личный кабинет", en: "Dashboard" },
  "nav.roadmap": { ru: "Дорожная карта", en: "Roadmap" },

  // Hero
  "hero.badge": { ru: "DeFi × Космические технологии", en: "DeFi × Space Technology" },
  "hero.title1": { ru: "Стейкай крипту.", en: "Stake Crypto." },
  "hero.title2": { ru: "Запускай спутники.", en: "Launch Satellites." },
  "hero.title3": { ru: "Зарабатывай.", en: "Earn Rewards." },
  "hero.desc": {
    ru: "Ваши стейкнутые активы финансируют создание реальных космических спутников. Доходы от продажи геоданных, аналитических подписок и IoT-сервисов распределяются между всеми участниками.",
    en: "Your staked assets fund real space satellites. Revenue from geodata sales, analytics subscriptions, and IoT services is distributed among all participants.",
  },
  "hero.cta": { ru: "Начать стейкинг", en: "Start Staking" },
  "hero.learn": { ru: "Узнать больше", en: "Learn More" },
  "hero.tvl": { ru: "Общий TVL", en: "Total TVL" },
  "hero.stakers": { ru: "Стейкеров", en: "Stakers" },
  "hero.sats": { ru: "Спутников", en: "Satellites" },

  // How It Works — expanded
  "how.title1": { ru: "Как это", en: "How It" },
  "how.title2": { ru: "работает", en: "Works" },
  "how.subtitle": { ru: "Простая схема: ваши токены → спутники → реальный доход", en: "Simple flow: your tokens → satellites → real revenue" },
  "how.step1.title": { ru: "Подключите кошелёк", en: "Connect Wallet" },
  "how.step1.desc": {
    ru: "Подключите свой криптокошелёк (MetaMask, Trust Wallet и др.) к платформе OrbitalStake. Это занимает меньше минуты и полностью безопасно.",
    en: "Connect your crypto wallet (MetaMask, Trust Wallet, etc.) to the OrbitalStake platform. Takes less than a minute and is completely secure.",
  },
  "how.step2.title": { ru: "Стейкайте токены", en: "Stake Tokens" },
  "how.step2.desc": {
    ru: "Отправьте USDT или ETH в смарт-контракт. Минимальный вход — всего 100 USDT. Ваши средства блокируются на 30 дней, но работают на вас каждую секунду.",
    en: "Send USDT or ETH to the smart contract. Minimum entry — just 100 USDT. Your funds are locked for 30 days but work for you every second.",
  },
  "how.step3.title": { ru: "Мы строим спутники", en: "We Build Satellites" },
  "how.step3.desc": {
    ru: "Собранный капитал идёт на проектирование, сборку и запуск реальных космических спутников. Каждый спутник — это физический актив на орбите Земли.",
    en: "Collected capital goes toward designing, building, and launching real space satellites. Each satellite is a physical asset in Earth's orbit.",
  },
  "how.step4.title": { ru: "Спутники работают", en: "Satellites Work" },
  "how.step4.desc": {
    ru: "Наши спутники круглосуточно собирают данные: фото высокого разрешения, радарные снимки, климатические замеры, данные для навигации и IoT.",
    en: "Our satellites collect data 24/7: high-res photos, radar imagery, climate measurements, navigation data, and IoT signals.",
  },
  "how.step5.title": { ru: "Продаём данные", en: "We Sell Data" },
  "how.step5.desc": {
    ru: "Геоданные продаются крупным компаниям, правительствам и страховым агентствам. Также мы зарабатываем на аналитических подписках, мониторинге катастроф и отслеживании судов.",
    en: "Geodata is sold to major corporations, governments, and insurance agencies. We also earn from analytics subscriptions, disaster monitoring, and vessel tracking.",
  },
  "how.step6.title": { ru: "Получайте доход", en: "Earn Revenue" },
  "how.step6.desc": {
    ru: "Прибыль автоматически распределяется между всеми стейкерами пропорционально их вкладу. Вы получаете пассивный доход каждую неделю прямо на кошелёк.",
    en: "Profits are automatically distributed among all stakers proportionally. You receive passive income every week directly to your wallet.",
  },

  // Revenue sources
  "rev.title1": { ru: "Источники", en: "Revenue" },
  "rev.title2": { ru: "дохода", en: "Sources" },
  "rev.geo": { ru: "Продажа геоданных", en: "Geodata Sales" },
  "rev.geoDesc": { ru: "Снимки высокого разрешения для картографии, строительства и сельского хозяйства", en: "High-resolution imagery for cartography, construction, and agriculture" },
  "rev.analytics": { ru: "Аналитические подписки", en: "Analytics Subscriptions" },
  "rev.analyticsDesc": { ru: "SaaS-подписки для компаний, которым нужен регулярный доступ к спутниковой аналитике", en: "SaaS subscriptions for companies needing regular access to satellite analytics" },
  "rev.disaster": { ru: "Мониторинг катастроф", en: "Disaster Monitoring" },
  "rev.disasterDesc": { ru: "Страховые компании и МЧС платят за оперативные данные о наводнениях, пожарах и землетрясениях", en: "Insurance companies and emergency services pay for real-time data on floods, fires, and earthquakes" },
  "rev.maritime": { ru: "Морское отслеживание", en: "Maritime Tracking" },
  "rev.maritimeDesc": { ru: "Отслеживание судов и контейнеров для логистических компаний и портов", en: "Vessel and container tracking for logistics companies and ports" },
  "rev.iot": { ru: "IoT и связь", en: "IoT & Connectivity" },
  "rev.iotDesc": { ru: "Предоставление спутниковой связи для IoT-устройств в труднодоступных регионах", en: "Providing satellite connectivity for IoT devices in remote regions" },

  // Roadmap
  "road.title1": { ru: "Дорожная", en: "Project" },
  "road.title2": { ru: "карта", en: "Roadmap" },
  "road.subtitle": { ru: "Наш путь от идеи до глобальной спутниковой сети", en: "Our journey from idea to global satellite network" },
  "road.q1.title": { ru: "Запуск платформы", en: "Platform Launch" },
  "road.q1.desc": { ru: "Разработка смарт-контрактов, запуск веб-платформы, первый раунд стейкинга. Аудит безопасности от CertiK.", en: "Smart contract development, web platform launch, first staking round. Security audit by CertiK." },
  "road.q2.title": { ru: "Первые 4 спутника", en: "First 4 Satellites" },
  "road.q2.desc": { ru: "Проектирование и сборка первых 4 спутников: TERRA-EYE 1, SENTINEL-7A, AQUA-NET и GEO-CHRON 5. Партнёрства с космическими агентствами.", en: "Design and assembly of first 4 satellites: TERRA-EYE 1, SENTINEL-7A, AQUA-NET, and GEO-CHRON 5. Partnerships with space agencies." },
  "road.q3.title": { ru: "Запуск на орбиту", en: "Orbital Launch" },
  "road.q3.desc": { ru: "Запуск первых спутников с помощью SpaceX Falcon 9. Начало сбора и продажи геоданных. Первые выплаты стейкерам.", en: "Launch of first satellites via SpaceX Falcon 9. Start of geodata collection and sales. First payouts to stakers." },
  "road.q4.title": { ru: "Расширение сети", en: "Network Expansion" },
  "road.q4.desc": { ru: "Запуск ещё 4 спутников. Запуск аналитической платформы для B2B-клиентов. Листинг токена на крупных биржах.", en: "Launch of 4 more satellites. B2B analytics platform launch. Token listing on major exchanges." },
  "road.q5.title": { ru: "IoT и связь", en: "IoT & Connectivity" },
  "road.q5.desc": { ru: "Запуск IoT-сервисов: спутниковый интернет для удалённых регионов. Интеграция с DeFi-протоколами для автоматического реинвестирования.", en: "IoT service launch: satellite internet for remote regions. DeFi protocol integration for auto-reinvestment." },
  "road.q6.title": { ru: "Полная констелляция", en: "Full Constellation" },
  "road.q6.desc": { ru: "Все 12 спутников на орбите. Глобальное покрытие. Запуск программы «Спутник-как-Сервис» для корпоративных клиентов.", en: "All 12 satellites in orbit. Global coverage. Launch of 'Satellite-as-a-Service' program for enterprise clients." },

  // Stats
  "stats.title1": { ru: "Цифры", en: "Numbers" },
  "stats.title2": { ru: "говорят", en: "Speak" },
  "stats.tvl": { ru: "Общий объём стейкнутых активов", en: "Total value of staked assets" },
  "stats.apy": { ru: "Среднегодовая доходность", en: "Average annual yield" },
  "stats.stakers": { ru: "Активных участников платформы", en: "Active platform participants" },
  "stats.satellites": { ru: "На орбите и в процессе запуска", en: "In orbit and launching" },
  "stats.paid": { ru: "Суммарно распределено наград", en: "Total rewards distributed" },
  "stats.data": { ru: "Собрано и продано клиентам", en: "Collected and sold to clients" },

  // Satellites page
  "sats.title1": { ru: "Наша", en: "Our" },
  "sats.title2": { ru: "констелляция", en: "Constellation" },
  "sats.subtitle": { ru: "Каждый спутник — это реальный актив, генерирующий доход от продажи данных", en: "Each satellite is a real asset generating revenue from data sales" },
  "sats.orbit": { ru: "Орбита", en: "Orbit" },
  "sats.data": { ru: "Данные", en: "Data" },
  "sats.revenue": { ru: "Доход", en: "Revenue" },
  "sats.status": { ru: "Статус", en: "Status" },
  "sats.active": { ru: "Активен", en: "Active" },
  "sats.launching": { ru: "Запуск", en: "Launching" },
  "sats.planned": { ru: "Планируется", en: "Planned" },
  "sats.viewAll": { ru: "Смотреть все спутники", en: "View All Satellites" },

  // Dashboard
  "dash.title": { ru: "Личный кабинет", en: "Dashboard" },
  "dash.back": { ru: "На главную", en: "Back Home" },
  "dash.staked": { ru: "Стейкнуто", en: "Staked" },
  "dash.earned": { ru: "Заработано", en: "Earned" },
  "dash.mySats": { ru: "Мои спутники", en: "My Satellites" },
  "dash.apy": { ru: "APY", en: "APY" },
  "dash.staking": { ru: "Стейкинг", en: "Staking" },
  "dash.stake": { ru: "Стейкать", en: "Stake" },
  "dash.unstake": { ru: "Вывести", en: "Withdraw" },
  "dash.amount": { ru: "Сумма (USDT)", en: "Amount (USDT)" },
  "dash.min": { ru: "Минимум 100", en: "Minimum 100" },
  "dash.stakeBtn": { ru: "Стейкнуть", en: "Stake" },
  "dash.currentApy": { ru: "Текущий APY", en: "Current APY" },
  "dash.lockPeriod": { ru: "Период блокировки", en: "Lock Period" },
  "dash.days": { ru: "30 дней", en: "30 days" },
  "dash.fee": { ru: "Комиссия", en: "Fee" },
  "dash.available": { ru: "Доступно для вывода", en: "Available for withdrawal" },
  "dash.withdrawBtn": { ru: "Вывести средства", en: "Withdraw Funds" },
  "dash.satStatus": { ru: "Статус спутников", en: "Satellite Status" },
  "dash.transactions": { ru: "Последние транзакции", en: "Recent Transactions" },
  "dash.reward": { ru: "Награда за геоданные", en: "Geodata Reward" },
  "dash.stakeAction": { ru: "Стейкинг USDT", en: "USDT Staking" },
  "dash.today": { ru: "сегодня", en: "today" },
  "dash.updated": { ru: "Обновлено 1ч назад", en: "Updated 1h ago" },
  "dash.minError": { ru: "Минимальная сумма стейкинга — 100 USDT", en: "Minimum staking amount — 100 USDT" },
  "dash.success": { ru: "Стейкинг успешно инициирован!", en: "Staking successfully initiated!" },
  "dash.portfolio": { ru: "Портфель", en: "Portfolio" },
  "dash.rewards": { ru: "Награды", en: "Rewards" },

  // Footer
  "footer.rights": { ru: "Децентрализованная космическая инфраструктура", en: "Decentralized Space Infrastructure" },

  // Time
  "time.hoursAgo": { ru: "2 часа назад", en: "2 hours ago" },
  "time.daysAgo3": { ru: "3 дня назад", en: "3 days ago" },
  "time.daysAgo5": { ru: "5 дней назад", en: "5 days ago" },
  "time.weekAgo": { ru: "1 неделю назад", en: "1 week ago" },
  "time.weeksAgo2": { ru: "2 недели назад", en: "2 weeks ago" },
} as const;

type TranslationKey = keyof typeof translations;

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType>({
  lang: "ru",
  setLang: () => {},
  t: (key) => key,
});

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem("lang");
    return (saved === "en" || saved === "ru") ? saved : "ru";
  });

  const changeLang = (newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  const t = (key: TranslationKey): string => {
    return translations[key]?.[lang] ?? key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
