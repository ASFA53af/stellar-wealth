import { Rocket } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/50 py-12">
    <div className="container mx-auto px-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Rocket className="h-5 w-5 text-primary" />
          <span className="font-display font-bold tracking-wider text-foreground">
            ORBITAL<span className="text-primary">STAKE</span>
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          © 2026 OrbitalStake. Decentralized Space Infrastructure.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
