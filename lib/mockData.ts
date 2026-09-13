export interface StatsCardData {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: string;
  color: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  value2?: number;
}

export interface TableData {
  id: string;
  page: string;
  visitors: number;
  bounceRate: number;
  avgTime: string;
  conversions: number;
  revenue: number;
}

export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  avatar: string;
}

export interface DashboardData {
  stats: StatsCardData[];
  lineChartData: ChartDataPoint[];
  barChartData: ChartDataPoint[];
  tableData: TableData[];
  activityFeed: ActivityItem[];
  metrics: {
    totalUsers: number;
    activeNow: number;
    avgSessionDuration: string;
    conversionRate: number;
  };
  lastUpdated: string;
}

const userNames = [
  "Sarah Chen", "Marcus Williams", "Emily Rodriguez", "David Kim",
  "Lisa Thompson", "Alex Petrov", "Maria Garcia", "James Wilson",
  "Sofia Andersson", "Omar Hassan"
];

const actions = [
  "completed purchase", "signed up for premium", "updated profile",
  "subscribed to newsletter", "left a 5-star review", "referred a friend",
  "exported report", "created new project", "invited team member",
  "downgraded plan", "contacted support", "activated 2FA"
];

const pages = [
  "/home", "/pricing", "/features", "/blog/getting-started",
  "/docs/api-reference", "/dashboard", "/settings", "/integrations",
  "/enterprise", "/changelog", "/about", "/contact"
];

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateTimeSeriesData(days: number = 14): ChartDataPoint[] {
  const data: ChartDataPoint[] = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dayStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    const base = 1200 + Math.sin(i * 0.5) * 300;
    const value = Math.floor(base + Math.random() * 400);
    const value2 = Math.floor(base * 0.6 + Math.random() * 250);
    
    data.push({ name: dayStr, value, value2 });
  }
  return data;
}

function generateBarData(): ChartDataPoint[] {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map(day => ({
    name: day,
    value: randomBetween(800, 2200),
    value2: randomBetween(400, 1200),
  }));
}

function generateTableData(): TableData[] {
  return pages.map(page => ({
    id: Math.random().toString(36).substring(7),
    page,
    visitors: randomBetween(1200, 15000),
    bounceRate: parseFloat((Math.random() * 60 + 20).toFixed(1)),
    avgTime: `${Math.floor(Math.random() * 8)}:${String(randomBetween(10, 59)).padStart(2, '0')}`,
    conversions: randomBetween(10, 500),
    revenue: randomBetween(200, 25000),
  })).sort((a, b) => b.visitors - a.visitors);
}

function generateActivityFeed(): ActivityItem[] {
  return Array.from({ length: 8 }, (_, i) => ({
    id: i.toString(),
    user: userNames[randomBetween(0, userNames.length - 1)],
    action: actions[randomBetween(0, actions.length - 1)],
    timestamp: `${randomBetween(1, 59)} min ago`,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomBetween(0, 100)}`,
  }));
}

export function generateDashboardData(): DashboardData {
  const totalUsers = 847293 + randomBetween(-500, 500);
  const activeNow = 2847 + randomBetween(-100, 100);

  return {
    stats: [
      {
        title: "Total Revenue",
        value: "$84,254",
        change: 12.5,
        changeLabel: "vs last month",
        icon: "dollar-sign",
        color: "emerald",
      },
      {
        title: "Total Users",
        value: totalUsers.toLocaleString(),
        change: 8.2,
        changeLabel: "vs last month",
        icon: "users",
        color: "blue",
      },
      {
        title: "Active Now",
        value: activeNow.toLocaleString(),
        change: 5.1,
        changeLabel: "vs last hour",
        icon: "activity",
        color: "violet",
      },
      {
        title: "Bounce Rate",
        value: "32.4%",
        change: -2.1,
        changeLabel: "vs last week",
        icon: "trending-down",
        color: "orange",
      },
    ],
    lineChartData: generateTimeSeriesData(),
    barChartData: generateBarData(),
    tableData: generateTableData(),
    activityFeed: generateActivityFeed(),
    metrics: {
      totalUsers,
      activeNow,
      avgSessionDuration: "4m 32s",
      conversionRate: parseFloat((Math.random() * 3 + 2.5).toFixed(1)),
    },
    lastUpdated: new Date().toISOString(),
  };
}
