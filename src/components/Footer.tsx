import { Rocket } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const Footer = () => {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border/50 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(228,30%,4%)] to-background" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-primary" />
            <span className="font-display font-bold tracking-wider text-foreground">
              ORBITAL<span className="text-primary">STAKE</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 OrbitalStake. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
