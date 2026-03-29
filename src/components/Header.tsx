import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Rocket, Menu, X } from "lucide-react";
import { useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useI18n } from "@/lib/i18n";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useI18n();

  const navItems = [
    { href: "/#how-it-works", label: t("nav.howItWorks"), isLink: false },
    { href: "/satellites", label: t("nav.satellites"), isLink: true },
    { href: "/#roadmap", label: t("nav.roadmap"), isLink: false },
    { href: "/#stats", label: t("nav.stats"), isLink: false },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 pt-3">
        <div className="glass-strong rounded-2xl px-5 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Rocket className="h-6 w-6 text-primary" />
            <span className="font-display text-lg font-bold tracking-wider text-foreground">
              ORBITAL<span className="text-primary">STAKE</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <div className="flex items-center gap-1 rounded-xl bg-secondary/40 p-1">
              {navItems.map((item) =>
                item.isLink ? (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 px-4 py-2 rounded-lg transition-all duration-300"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 px-4 py-2 rounded-lg transition-all duration-300"
                  >
                    {item.label}
                  </a>
                )
              )}
            </div>
            <div className="ml-3 flex items-center gap-2">
              <LanguageSwitcher />
              <Link to="/dashboard">
                <Button variant="hero" size="sm">{t("nav.dashboard")}</Button>
              </Link>
            </div>
          </nav>

          <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden glass-strong rounded-2xl mt-2 p-4 flex flex-col gap-3">
            {navItems.map((item) =>
              item.isLink ? (
                <Link key={item.href} to={item.href} className="text-sm text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors" onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
              ) : (
                <a key={item.href} href={item.href} className="text-sm text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors" onClick={() => setMobileOpen(false)}>
                  {item.label}
                </a>
              )
            )}
            <div className="flex items-center gap-2 pt-2 border-t border-border/30">
              <LanguageSwitcher />
              <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="flex-1">
                <Button variant="hero" size="sm" className="w-full">{t("nav.dashboard")}</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
