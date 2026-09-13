"use client";

import { ActivityItem } from "@/lib/mockData";

interface ActivityFeedProps {
  items: ActivityItem[];
}

export default function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 h-full animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Activity
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Latest user actions
          </p>
        </div>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400">
          Live
        </span>
      </div>

      <div className="space-y-1">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="flex items-start gap-3 p-2.5 -mx-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors animate-slide-in-right"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="relative flex-shrink-0">
              <img
                src={item.avatar}
                alt={item.user}
                className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-900" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {item.user}
                </span>{" "}
                {item.action}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                {item.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
