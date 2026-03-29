import { motion } from "framer-motion";

const stats = [
  { value: "$12.4M", label: "Total Value Locked", description: "Общий объём стейкнутых активов" },
  { value: "18.2%", label: "APY", description: "Среднегодовая доходность" },
  { value: "3,847", label: "Стейкеров", description: "Активных участников платформы" },
  { value: "12", label: "Спутников", description: "На орбите и в процессе запуска" },
  { value: "$2.7M", label: "Выплачено", description: "Суммарно распределено наград" },
  { value: "142 TB", label: "Геоданных", description: "Собрано и продано клиентам" },
];

const StatsSection = () => {
  return (
    <section id="stats" className="py-24 cosmic-gradient">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Цифры <span className="gradient-text">говорят</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-6 text-center hover:box-glow transition-shadow duration-500"
            >
              <div className="text-3xl font-bold font-display gradient-text mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-foreground mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
