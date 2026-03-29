import { useI18n } from "@/lib/i18n";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { lang, setLang } = useI18n();

  return (
    <button
      onClick={() => setLang(lang === "ru" ? "en" : "ru")}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground transition-colors glass"
    >
      <Globe className="h-3.5 w-3.5" />
      <span className="uppercase tracking-wider">{lang === "ru" ? "EN" : "RU"}</span>
    </button>
  );
};

export default LanguageSwitcher;
