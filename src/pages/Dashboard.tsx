import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Rocket, ArrowLeft, Wallet, TrendingUp, Satellite, Clock,
  ArrowUpRight, ArrowDownRight, ChevronRight, Copy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Dashboard = () => {
  const [stakeAmount, setStakeAmount] = useState("");

  const handleStake = () => {
    if (!stakeAmount || parseFloat(stakeAmount) < 100) {
      toast.error("Минимальная сумма стейкинга — 100 USDT");
      return;
    }
    toast.success(`Стейкинг ${stakeAmount} USDT успешно инициирован!`);
    setStakeAmount("");
  };

  return (
    <div className="min-h-screen bg-background">
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
            <span className="text-sm text-foreground font-medium">Личный кабинет</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 glass rounded-lg text-xs font-mono text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
              onClick={() => { navigator.clipboard.writeText("0x1a2b...9f8e"); toast.success("Адрес скопирован"); }}
            >
              0x1a2b...9f8e <Copy className="h-3 w-3" />
            </div>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">OS</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Back */}
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> На главную
        </Link>

        {/* Stats cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Wallet, label: "Стейкнуто", value: "$4,250.00", change: "+12.5%", positive: true },
            { icon: TrendingUp, label: "Заработано", value: "$387.42", change: "+$23.10 сегодня", positive: true },
            { icon: Satellite, label: "Мои спутники", value: "3 из 12", change: "Alpha, Beta, Gamma", positive: true },
            { icon: Clock, label: "APY", value: "18.2%", change: "Обновлено 1ч назад", positive: true },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass border-border/50 hover:box-glow transition-shadow duration-500">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <card.icon className="h-4 w-4 text-primary" />
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
                <CardTitle className="font-display text-lg">Стейкинг</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="stake">
                  <TabsList className="glass mb-6">
                    <TabsTrigger value="stake">Стейкать</TabsTrigger>
                    <TabsTrigger value="unstake">Вывести</TabsTrigger>
                  </TabsList>

                  <TabsContent value="stake" className="space-y-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Сумма (USDT)</label>
                      <div className="flex gap-3">
                        <Input
                          type="number"
                          placeholder="Минимум 100"
                          value={stakeAmount}
                          onChange={(e) => setStakeAmount(e.target.value)}
                          className="bg-secondary/50 border-border/50"
                        />
                        <Button variant="hero" onClick={handleStake}>Стейкнуть</Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {["100", "500", "1000", "5000"].map((val) => (
                        <Button
                          key={val}
                          variant="secondary"
                          size="sm"
                          onClick={() => setStakeAmount(val)}
                          className="text-xs"
                        >
                          ${val}
                        </Button>
                      ))}
                    </div>

                    <div className="glass rounded-lg p-4 space-y-3 mt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Текущий APY</span>
                        <span className="text-primary font-semibold">18.2%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Период блокировки</span>
                        <span className="text-foreground">30 дней</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Комиссия</span>
                        <span className="text-foreground">0.5%</span>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="unstake" className="space-y-4">
                    <div className="glass rounded-lg p-4 text-center">
                      <p className="text-muted-foreground text-sm mb-2">Доступно для вывода</p>
                      <p className="text-3xl font-bold font-display text-foreground">$1,250.00</p>
                      <Button variant="hero" className="mt-4">Вывести средства</Button>
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
                <CardTitle className="font-display text-lg">Статус спутников</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "ORB-SAT Alpha", health: 98, status: "active" },
                  { name: "ORB-SAT Beta", health: 95, status: "active" },
                  { name: "ORB-SAT Gamma", health: 91, status: "active" },
                  { name: "ORB-SAT Delta", health: 45, status: "launching" },
                ].map((sat) => (
                  <div key={sat.name} className="glass rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          sat.status === "active" ? "bg-success" : "bg-star"
                        }`} />
                        <span className="text-sm font-medium text-foreground">{sat.name}</span>
                      </div>
                      <Badge variant={sat.status === "active" ? "default" : "secondary"} className="text-[10px]">
                        {sat.status === "active" ? "Online" : "Запуск"}
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

        {/* Recent transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="font-display text-lg">Последние транзакции</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { type: "reward", desc: "Награда за геоданные", amount: "+$23.10", time: "2 часа назад" },
                  { type: "stake", desc: "Стейкинг USDT", amount: "-$1,000.00", time: "3 дня назад" },
                  { type: "reward", desc: "Награда за геоданные", amount: "+$18.45", time: "5 дней назад" },
                  { type: "reward", desc: "Награда за геоданные", amount: "+$21.30", time: "1 неделю назад" },
                  { type: "stake", desc: "Стейкинг USDT", amount: "-$3,250.00", time: "2 недели назад" },
                ].map((tx, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
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
  );
};

export default Dashboard;
