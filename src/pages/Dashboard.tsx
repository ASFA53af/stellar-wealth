import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Rocket, ArrowLeft, Wallet, TrendingUp, Satellite, Clock,
  ArrowUpRight, ArrowDownRight, Copy, BarChart3, Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import InteractiveStars from "@/components/InteractiveStars";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useI18n } from "@/lib/i18n";

const Dashboard = () => {
  const [stakeAmount, setStakeAmount] = useState("");
  const { t } = useI18n();

  const handleStake = () => {
    if (!stakeAmount || parseFloat(stakeAmount) < 100) {
      toast.error(t("dash.minError"));
      return;
    }
    toast.success(`${stakeAmount} USDT — ${t("dash.success")}`);
    setStakeAmount("");
  };

  const statsCards = [
    { icon: Wallet, label: t("dash.staked"), value: "$4,250.00", change: "+12.5%", positive: true },
    { icon: TrendingUp, label: t("dash.earned"), value: "$387.42", change: `+$23.10 ${t("dash.today")}`, positive: true },
    { icon: Satellite, label: t("dash.mySats"), value: "3 / 12", change: "Terra-Eye, Sentinel, Aqua-Net", positive: true },
    { icon: Clock, label: t("dash.apy"), value: "18.2%", change: t("dash.updated"), positive: true },
  ];

  const transactions = [
    { type: "reward", desc: t("dash.reward"), amount: "+$23.10", time: t("time.hoursAgo") },
    { type: "stake", desc: t("dash.stakeAction"), amount: "-$1,000.00", time: t("time.daysAgo3") },
    { type: "reward", desc: t("dash.reward"), amount: "+$18.45", time: t("time.daysAgo5") },
    { type: "reward", desc: t("dash.reward"), amount: "+$21.30", time: t("time.weekAgo") },
    { type: "stake", desc: t("dash.stakeAction"), amount: "-$3,250.00", time: t("time.weeksAgo2") },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(199,89%,48%,0.04)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(265,80%,60%,0.03)_0%,transparent_50%)]" />
      </div>

      {/* Header */}
      <header className="glass-strong border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-primary" />
              <span className="font-display text-sm font-bold tracking-wider text-foreground">
                ORBITAL<span className="text-primary">STAKE</span>
              </span>
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm text-foreground font-medium">{t("dash.title")}</span>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 glass rounded-lg text-xs font-mono text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
              onClick={() => { navigator.clipboard.writeText("0x1a2b...9f8e"); toast.success("Copied!"); }}
            >
              0x1a2b...9f8e <Copy className="h-3 w-3" />
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center border border-primary/20">
              <span className="text-xs font-bold text-primary">OS</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> {t("dash.back")}
        </Link>

        {/* Stats cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statsCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass border-border/50 hover:box-glow transition-all duration-500 hover:-translate-y-1">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                      <card.icon className="h-5 w-5 text-primary" />
                    </div>
                    {card.positive ? (
                      <ArrowUpRight className="h-4 w-4 text-success" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                  <div className="text-2xl font-bold font-display text-foreground">{card.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{card.label}</div>
                  <div className="text-xs text-success mt-1">{card.change}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Staking panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  {t("dash.staking")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="stake">
                  <TabsList className="glass mb-6">
                    <TabsTrigger value="stake">{t("dash.stake")}</TabsTrigger>
                    <TabsTrigger value="unstake">{t("dash.unstake")}</TabsTrigger>
                  </TabsList>

                  <TabsContent value="stake" className="space-y-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">{t("dash.amount")}</label>
                      <div className="flex gap-3">
                        <Input
                          type="number"
                          placeholder={t("dash.min")}
                          value={stakeAmount}
                          onChange={(e) => setStakeAmount(e.target.value)}
                          className="bg-secondary/50 border-border/50"
                        />
                        <Button variant="hero" onClick={handleStake}>{t("dash.stakeBtn")}</Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {["100", "500", "1000", "5000"].map((val) => (
                        <Button
                          key={val}
                          variant="secondary"
                          size="sm"
                          onClick={() => setStakeAmount(val)}
                          className="text-xs hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          ${val}
                        </Button>
                      ))}
                    </div>

                    <div className="glass rounded-lg p-4 space-y-3 mt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{t("dash.currentApy")}</span>
                        <span className="text-primary font-semibold">18.2%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{t("dash.lockPeriod")}</span>
                        <span className="text-foreground">{t("dash.days")}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{t("dash.fee")}</span>
                        <span className="text-foreground">0.5%</span>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="unstake" className="space-y-4">
                    <div className="glass rounded-lg p-8 text-center">
                      <p className="text-muted-foreground text-sm mb-2">{t("dash.available")}</p>
                      <p className="text-4xl font-bold font-display gradient-text mb-1">$1,250.00</p>
                      <Button variant="hero" className="mt-6">{t("dash.withdrawBtn")}</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          {/* Satellite status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <Satellite className="h-5 w-5 text-primary" />
                  {t("dash.satStatus")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "TERRA-EYE 1", health: 98, status: "active" },
                  { name: "SENTINEL-7A", health: 95, status: "active" },
                  { name: "AQUA-NET", health: 91, status: "active" },
                  { name: "POLAR-SCOUT", health: 45, status: "launching" },
                ].map((sat) => (
                  <div key={sat.name} className="glass rounded-lg p-3 hover:box-glow transition-all duration-500">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          sat.status === "active" ? "bg-success animate-pulse-glow" : "bg-star"
                        }`} />
                        <span className="text-sm font-medium text-foreground">{sat.name}</span>
                      </div>
                      <Badge variant={sat.status === "active" ? "default" : "secondary"} className="text-[10px]">
                        {sat.status === "active" ? "Online" : t("sats.launching")}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={sat.health} className="h-1.5" />
                      <span className="text-xs text-muted-foreground w-8">{sat.health}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Rewards & Transactions row */}
        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          {/* Portfolio summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <Award className="h-5 w-5 text-star" />
                  {t("dash.portfolio")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground mb-1">{t("dash.staked")}</p>
                    <p className="text-4xl font-bold font-display gradient-text">$4,250.00</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass rounded-lg p-4 text-center">
                      <p className="text-xs text-muted-foreground mb-1">{t("dash.rewards")}</p>
                      <p className="text-xl font-bold font-display text-success">$387.42</p>
                    </div>
                    <div className="glass rounded-lg p-4 text-center">
                      <p className="text-xs text-muted-foreground mb-1">APY</p>
                      <p className="text-xl font-bold font-display text-primary">18.2%</p>
                    </div>
                  </div>
                  <div className="glass rounded-lg p-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">{t("dash.lockPeriod")}</span>
                      <span className="text-foreground font-medium">24 / 30</span>
                    </div>
                    <Progress value={80} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">6 {t("dash.days")} remaining</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="font-display text-lg">{t("dash.transactions")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactions.map((tx, i) => (
                    <div key={i} className="flex items-center justify-between py-2.5 border-b border-border/30 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          tx.type === "reward" ? "bg-success/10" : "bg-primary/10"
                        }`}>
                          {tx.type === "reward" ? (
                            <ArrowDownRight className="h-4 w-4 text-success" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-foreground">{tx.desc}</div>
                          <div className="text-xs text-muted-foreground">{tx.time}</div>
                        </div>
                      </div>
                      <span className={`text-sm font-semibold font-display ${
                        tx.type === "reward" ? "text-success" : "text-foreground"
                      }`}>
                        {tx.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
