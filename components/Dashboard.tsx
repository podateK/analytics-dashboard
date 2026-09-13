"use client";

import { useEffect, useState } from "react";
import { DashboardData } from "@/lib/mockData";
import DashboardHeader from "./DashboardHeader";
import StatsCard from "./StatsCard";
import LineChartComponent from "./LineChart";
import BarChartComponent from "./BarChart";
import DataTable from "./DataTable";
import ActivityFeed from "./ActivityFeed";
import MetricGrid from "./MetricGrid";

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  async function fetchData() {
    try {
      const res = await fetch("/api/analytics");
      const json = await res.json();
      setData(json);
      setLoading(false);
      setLastUpdate(new Date());
    } catch (error) {
      console.error("Failed to fetch analytics data:", error);
    }
  }

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      <div className="relative z-10">
        <DashboardHeader lastUpdate={lastUpdate} onRefresh={fetchData} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {data.stats.map((stat, index) => (
              <StatsCard key={stat.title} data={stat} index={index} />
            ))}
          </div>

          <MetricGrid metrics={data.metrics} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <LineChartComponent data={data.lineChartData} />
            </div>
            <div>
              <ActivityFeed items={data.activityFeed} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <BarChartComponent data={data.barChartData} />
            <DataTable data={data.tableData.slice(0, 6)} />
          </div>

          <div className="grid grid-cols-1 gap-6">
            <DataTable data={data.tableData} showFull />
          </div>
        </main>

        <footer className="border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Analytics Dashboard v1.0 — Built with Next.js 14 & Recharts
              </p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Live data streaming
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
