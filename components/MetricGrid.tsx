"use client";

import { Users, Zap, Clock, Target } from "lucide-react";

interface MetricGridProps {
  metrics: {
    totalUsers: number;
    activeNow: number;
    avgSessionDuration: string;
    conversionRate: number;
  };
}

const metricCards = [
  {
    key: "totalUsers",
    label: "Total Registered Users",
    icon: Users,
    format: (v: number) => v.toLocaleString(),
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    key: "activeNow",
    label: "Active Users Right Now",
    icon: Zap,
    format: (v: number) => v.toLocaleString(),
    gradient: "from-emerald-500 to-teal-400",
  },
  {
    key: "avgSessionDuration",
    label: "Avg. Session Duration",
    icon: Clock,
    format: (v: string) => v,
    gradient: "from-violet-500 to-purple-400",
  },
  {
    key: "conversionRate",
    label: "Conversion Rate",
    icon: Target,
    format: (v: number) => v + "%",
    gradient: "from-amber-500 to-orange-400",
  },
];

export default function MetricGrid({ metrics }: MetricGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {metricCards.map((card, index) => {
        const Icon = card.icon;
        const value = metrics[card.key as keyof typeof metrics];
        
        return (
          <div
            key={card.key}
            className="relative overflow-hidden bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover-lift animate-slide-up group"
            style={{ animationDelay: `${(index + 4) * 100}ms` }}
          >
            <div className={`absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br ${card.gradient} rounded-full opacity-10 group-hover:opacity-20 transition-opacity blur-xl`} />
            
            <div className="relative flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${card.gradient} shadow-lg`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {card.label}
              </span>
            </div>

            <div className="relative">
              <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                {card.format(value as any)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
