import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "ru" | "en";

const translations = {
  // Header
  "nav.howItWorks": { ru: "Как это работает", en: "How It Works" },
  "nav.satellites": { ru: "Спутники", en: "Satellites" },
  "nav.stats": { ru: "Статистика", en: "Statistics" },
  "nav.dashboard": { ru: "Личный кабинет", en: "Dashboard" },

  // Hero
  "hero.badge": { ru: "DeFi × Космические технологии", en: "DeFi × Space Technology" },
  "hero.title1": { ru: "Стейкай крипту.", en: "Stake Crypto." },
  "hero.title2": { ru: "Запускай спутники.", en: "Launch Satellites." },
  "hero.title3": { ru: "Зарабатывай.", en: "Earn Rewards." },
  "hero.desc": {
    ru: "Ваши стейкнутые активы финансируют создание реальных космических спутников. Доходы от продажи геоданных распределяются между всеми участниками.",
    en: "Your staked assets fund real space satellites. Revenue from geodata sales is distributed among all participants.",
  },
  "hero.cta": { ru: "Начать стейкинг", en: "Start Staking" },
  "hero.learn": { ru: "Узнать больше", en: "Learn More" },
  "hero.tvl": { ru: "Общий TVL", en: "Total TVL" },
  "hero.stakers": { ru: "Стейкеров", en: "Stakers" },
  "hero.sats": { ru: "Спутников", en: "Satellites" },

  // How It Works
  "how.title1": { ru: "Как это", en: "How It" },
  "how.title2": { ru: "работает", en: "Works" },
  "how.subtitle": { ru: "От стейкинга до пассивного дохода — четыре простых шага", en: "From staking to passive income — four simple steps" },
  "how.step1.title": { ru: "Стейкинг", en: "Staking" },
  "how.step1.desc": { ru: "Вы стейкаете свою крипту в смарт-контракт. Минимальный вход — от 100 USDT.", en: "Stake your crypto into a smart contract. Minimum entry — 100 USDT." },
  "how.step2.title": { ru: "Запуск", en: "Launch" },
  "how.step2.desc": { ru: "Собранные средства направляются на создание и запуск космических спутников.", en: "Collected funds go towards building and launching space satellites." },
  "how.step3.title": { ru: "Продажа данных", en: "Data Sales" },
  "how.step3.desc": { ru: "Спутники собирают и продают геоданные корпорациям и госструктурам.", en: "Satellites collect and sell geodata to corporations and governments." },
  "how.step4.title": { ru: "Доход", en: "Revenue" },
  "how.step4.desc": { ru: "Прибыль от продажи данных распределяется пропорционально между всеми стейкерами.", en: "Profits from data sales are proportionally distributed among all stakers." },

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
  "sats.subtitle": { ru: "Каждый спутник — это реальный актив, генерирующий доход от продажи геоданных", en: "Each satellite is a real asset generating revenue from geodata sales" },
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
