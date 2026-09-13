"use client";

import { TableData } from "@/lib/mockData";
import { ArrowUpDown, ExternalLink } from "lucide-react";

interface DataTableProps {
  data: TableData[];
  showFull?: boolean;
}

export default function DataTable({ data, showFull }: DataTableProps) {
  return (
    <div className={`bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden animate-fade-in ${showFull ? "" : ""}`}>
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {showFull ? "All Pages" : "Top Pages"}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Page performance metrics
            </p>
          </div>
          {showFull && (
            <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
              Export CSV
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-y border-gray-100 dark:border-gray-800">
              <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-6 py-3">
                <button className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                  Page <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-6 py-3">
                <button className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-200 transition-colors ml-auto">
                  Visitors <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-6 py-3 hidden sm:table-cell">
                Bounce Rate
              </th>
              <th className="text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-6 py-3 hidden md:table-cell">
                Avg. Time
              </th>
              <th className="text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-6 py-3">
                Conversions
              </th>
              {showFull && (
                <th className="text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-6 py-3 hidden lg:table-cell">
                  Revenue
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={row.id}
                className="border-b border-gray-50 dark:border-gray-800/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
              >
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {row.page}
                    </span>
                    <ExternalLink className="w-3 h-3 text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </td>
                <td className="text-right px-6 py-3.5">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {row.visitors.toLocaleString()}
                  </span>
                </td>
                <td className="text-right px-6 py-3.5 hidden sm:table-cell">
                  <span
                    className={`text-sm font-medium ${
                      row.bounceRate < 40
                        ? "text-emerald-600 dark:text-emerald-400"
                        : row.bounceRate < 60
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {row.bounceRate}%
                  </span>
                </td>
                <td className="text-right px-6 py-3.5 hidden md:table-cell">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {row.avgTime}
                  </span>
                </td>
                <td className="text-right px-6 py-3.5">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {row.conversions.toLocaleString()}
                  </span>
                </td>
                {showFull && (
                  <td className="text-right px-6 py-3.5 hidden lg:table-cell">
                    <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                      ${row.revenue.toLocaleString()}
                    </span>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
