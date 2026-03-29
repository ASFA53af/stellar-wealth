import { motion } from "framer-motion";
import { Coins, Rocket, Satellite, PiggyBank } from "lucide-react";

const steps = [
  {
    icon: Coins,
    title: "Стейкинг",
    description: "Вы стейкаете свою крипту в смарт-контракт. Минимальный вход — от 100 USDT.",
  },
  {
    icon: Rocket,
    title: "Запуск",
    description: "Собранные средства направляются на создание и запуск космических спутников.",
  },
  {
    icon: Satellite,
    title: "Продажа данных",
    description: "Спутники собирают и продают геоданные корпорациям и госструктурам.",
  },
  {
    icon: PiggyBank,
    title: "Доход",
    description: "Прибыль от продажи данных распределяется пропорционально между всеми стейкерами.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 cosmic-gradient">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Как это <span className="gradient-text">работает</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            От стейкинга до пассивного дохода — четыре простых шага
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass rounded-xl p-6 relative group hover:box-glow transition-shadow duration-500"
            >
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground font-display">
                {i + 1}
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2 text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
