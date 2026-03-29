import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Rocket, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <Rocket className="h-6 w-6 text-primary" />
          <span className="font-display text-lg font-bold tracking-wider text-foreground">
            ORBITAL<span className="text-primary">STAKE</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Как это работает
          </a>
          <a href="#satellites" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Спутники
          </a>
          <a href="#stats" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Статистика
          </a>
          <Link to="/dashboard">
            <Button variant="hero" size="sm">Личный кабинет</Button>
          </Link>
        </nav>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-border/50 p-4 flex flex-col gap-4">
          <a href="#how-it-works" className="text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>
            Как это работает
          </a>
          <a href="#satellites" className="text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>
            Спутники
          </a>
          <a href="#stats" className="text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>
            Статистика
          </a>
          <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
            <Button variant="hero" size="sm" className="w-full">Личный кабинет</Button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
