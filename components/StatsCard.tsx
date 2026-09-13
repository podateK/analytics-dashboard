"use client";

import { StatsCardData } from "@/lib/mockData";
import {
  DollarSign,
  Users,
  Activity,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

interface StatsCardProps {
  data: StatsCardData;
  index: number;
}

const iconMap: Record<string, React.ElementType> = {
  "dollar-sign": DollarSign,
  users: Users,
  activity: Activity,
  "trending-down": TrendingDown,
};

const colorMap: Record<string, { bg: string; icon: string; ring: string }> = {
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    icon: "text-emerald-600 dark:text-emerald-400",
    ring: "ring-emerald-500/20",
  },
  blue: {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    icon: "text-blue-600 dark:text-blue-400",
    ring: "ring-blue-500/20",
  },
  violet: {
    bg: "bg-violet-50 dark:bg-violet-950/30",
    icon: "text-violet-600 dark:text-violet-400",
    ring: "ring-violet-500/20",
  },
  orange: {
    bg: "bg-orange-50 dark:bg-orange-950/30",
    icon: "text-orange-600 dark:text-orange-400",
    ring: "ring-orange-500/20",
  },
};

export default function StatsCard({ data, index }: StatsCardProps) {
  const Icon = iconMap[data.icon] || Activity;
  const colors = colorMap[data.color] || colorMap.blue;
  const isPositive = data.change >= 0;

  return (
    <div
      className="group relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover-lift overflow-hidden animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5 dark:opacity-10">
        <div className={`w-full h-full rounded-full ${colors.bg}`} />
      </div>

      <div className="relative flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {data.title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            {data.value}
          </p>
          <div className="flex items-center gap-1.5">
            {isPositive ? (
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5 text-red-500" />
            )}
            <span
              className={`text-xs font-semibold ${
                isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {isPositive ? "+" : ""}{data.change}%
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {data.changeLabel}
            </span>
          </div>
        </div>

        <div
          className={`p-2.5 rounded-xl ${colors.bg} ring-1 ${colors.ring} transition-transform group-hover:scale-110`}
        >
          <Icon className={`w-5 h-5 ${colors.icon}`} />
        </div>
      </div>
    </div>
  );
}
