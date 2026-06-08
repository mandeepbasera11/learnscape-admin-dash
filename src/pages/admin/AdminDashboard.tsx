import React, { useState } from "react";
import {
  Users,
  GraduationCap,
  BookOpen,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Activity,
  Shield,
  Zap,
  Eye,
  RefreshCw,
  ChevronRight,
  UserPlus,
  FileText,
  Bell,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  Star,
  Award,
  Target,
  Calendar,
  Download,
  Filter,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Trend = "up" | "down" | "neutral";

// ─── Mini sparkline using inline SVG ─────────────────────────────────────────
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 32;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");
  const areaPoints = `0,${h} ${points} ${w},${h}`;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <defs>
        <linearGradient id={`sg-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={areaPoints}
        fill={`url(#sg-${color.replace("#", "")})`}
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Last dot */}
      <circle
        cx={(((data.length - 1) / (data.length - 1)) * w)}
        cy={h - ((data[data.length - 1] - min) / range) * h}
        r="3"
        fill={color}
      />
    </svg>
  );
}

// ─── KPI Stat Card ────────────────────────────────────────────────────────────
function KPICard({
  label,
  value,
  change,
  trend,
  sparkData,
  color,
  icon: Icon,
  prefix = "",
  suffix = "",
}: {
  label: string;
  value: string | number;
  change: string;
  trend: Trend;
  sparkData: number[];
  color: string;
  icon: React.ElementType;
  prefix?: string;
  suffix?: string;
}) {
  const trendColor =
    trend === "up"
      ? "text-emerald-600 dark:text-emerald-400"
      : trend === "down"
      ? "text-red-500 dark:text-red-400"
      : "text-slate-500";
  const TrendIcon = trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : ArrowUpRight;
  const trendBg =
    trend === "up"
      ? "bg-emerald-50 dark:bg-emerald-900/20"
      : trend === "down"
      ? "bg-red-50 dark:bg-red-900/20"
      : "bg-slate-50";

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group">
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: color + "18" }}
        >
          <Icon size={18} style={{ color }} />
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${trendBg} ${trendColor}`}>
          <TrendIcon size={11} />
          {change}
        </div>
      </div>
      <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
        {prefix}{typeof value === "number" ? value.toLocaleString() : value}{suffix}
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 mb-3">{label}</p>
      <Sparkline data={sparkData} color={color} />
    </div>
  );
}

// ─── Revenue Chart (custom SVG bar chart) ─────────────────────────────────────
function RevenueChart() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const revenue = [145000, 182000, 167000, 210000, 198000, 243000];
  const expenses = [92000, 108000, 98000, 125000, 115000, 138000];
  const maxVal = Math.max(...revenue);
  const chartH = 140;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white">Revenue Overview</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Last 6 months</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <span className="w-3 h-3 rounded-sm bg-violet-500 inline-block" />
            Revenue
          </span>
          <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <span className="w-3 h-3 rounded-sm bg-slate-200 dark:bg-slate-700 inline-block" />
            Expenses
          </span>
          <button className="flex items-center gap-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 transition-colors">
            <Filter size={11} /> Filter
          </button>
        </div>
      </div>

      <svg width="100%" viewBox="0 0 480 160" preserveAspectRatio="xMidYMid meet" className="overflow-visible">
        <defs>
          <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        {months.map((month, i) => {
          const barW = 28;
          const gap = 80;
          const x = i * gap + 20;
          const revH = (revenue[i] / maxVal) * chartH;
          const expH = (expenses[i] / maxVal) * chartH;
          const y = chartH - revH + 10;
          const ey = chartH - expH + 10;

          return (
            <g key={month}>
              {/* Grid line */}
              <line x1={x + barW / 2} y1="10" x2={x + barW / 2} y2={chartH + 10} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
              {/* Expense bar (behind) */}
              <rect x={x + 4} y={ey} width={barW - 4} height={expH} fill="#e2e8f0" className="dark:fill-slate-700" rx="4" opacity="0.7" />
              {/* Revenue bar */}
              <rect x={x} y={y} width={barW} height={revH} fill="url(#revGrad)" rx="4" className="hover:opacity-80 transition-opacity cursor-pointer" />
              {/* Month label */}
              <text x={x + barW / 2} y={chartH + 26} textAnchor="middle" fontSize="10" fill="#94a3b8" fontFamily="system-ui">
                {month}
              </text>
              {/* Value on hover - shown on last bar as example */}
              {i === 5 && (
                <g>
                  <rect x={x - 10} y={y - 28} width={48} height={22} rx="6" fill="#1e1b4b" />
                  <text x={x + barW / 2 - 4} y={y - 13} textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">
                    ₹{(revenue[i] / 1000).toFixed(0)}K
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>

      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        {[
          { label: "Total Revenue", value: "₹11.45L", color: "text-violet-600" },
          { label: "Total Expenses", value: "₹6.76L", color: "text-slate-500" },
          { label: "Net Profit", value: "₹4.69L", color: "text-emerald-600" },
        ].map((item) => (
          <div key={item.label} className="text-center">
            <p className={`text-base font-bold ${item.color}`}>{item.value}</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Donut Chart (user distribution) ─────────────────────────────────────────
function UserDistributionChart() {
  const segments = [
    { label: "Students", count: 12480, pct: 72, color: "#6366F1" },
    { label: "Faculty", count: 248, pct: 14, color: "#10B981" },
    { label: "Free Users", count: 2410, pct: 14, color: "#F59E0B" },
  ];

  // Simple CSS-based donut
  const total = segments.reduce((a, b) => a + b.pct, 0);
  let cumulative = 0;
  const r = 40;
  const cx = 60;
  const cy = 60;
  const circumference = 2 * Math.PI * r;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white">User Distribution</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Active accounts</p>
        </div>
        <button className="text-xs text-violet-600 dark:text-violet-400 font-medium flex items-center gap-1 hover:gap-2 transition-all">
          Details <ChevronRight size={12} />
        </button>
      </div>

      <div className="flex items-center gap-5">
        {/* SVG donut */}
        <div className="shrink-0 relative">
          <svg width="120" height="120" viewBox="0 0 120 120">
            {segments.map((seg, i) => {
              const offset = circumference - (seg.pct / 100) * circumference;
              const rotation = (cumulative / 100) * 360 - 90;
              cumulative += seg.pct;
              return (
                <circle
                  key={seg.label}
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth="16"
                  strokeDasharray={`${circumference}`}
                  strokeDashoffset={offset}
                  strokeLinecap="butt"
                  transform={`rotate(${rotation} ${cx} ${cy})`}
                  className="transition-all duration-300"
                />
              );
            })}
            <text x={cx} y={cy - 6} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b" className="dark:fill-white">
              15.1K
            </text>
            <text x={cx} y={cy + 10} textAnchor="middle" fontSize="9" fill="#94a3b8">
              Total Users
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3">
          {segments.map((seg) => (
            <div key={seg.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
                <span className="text-xs text-slate-600 dark:text-slate-400">{seg.label}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900 dark:text-white">{seg.count.toLocaleString()}</p>
                <p className="text-[10px] text-slate-400">{seg.pct}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Recent Transactions ──────────────────────────────────────────────────────
function RecentTransactions() {
  const txns = [
    { name: "Rahul Sharma", course: "AIIMS CRE Complete Pack", amount: 2999, time: "2m ago", status: "success" },
    { name: "Priya Mehta", course: "Anatomy + Physiology Bundle", amount: 1499, time: "18m ago", status: "success" },
    { name: "Arjun Nair", course: "Mock Test Series — 50 Tests", amount: 799, time: "45m ago", status: "pending" },
    { name: "Sneha Gupta", course: "AIIMS CRE Complete Pack", amount: 2999, time: "1h ago", status: "success" },
    { name: "Vikram Singh", course: "Study Material Bundle", amount: 499, time: "2h ago", status: "failed" },
    { name: "Anjali Roy", course: "Live Class Monthly Pass", amount: 1299, time: "3h ago", status: "success" },
  ];

  const statusConfig = {
    success: { cls: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400", label: "Paid" },
    pending: { cls: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400", label: "Pending" },
    failed: { cls: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400", label: "Failed" },
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white">Recent Transactions</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Today's payments</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-xs border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 px-3 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5">
            <Download size={11} /> Export
          </button>
          <button className="text-xs text-violet-600 dark:text-violet-400 font-medium flex items-center gap-1 hover:gap-2 transition-all">
            View all <ChevronRight size={12} />
          </button>
        </div>
      </div>

      <div className="space-y-1">
        {txns.map((txn, i) => {
          const sc = statusConfig[txn.status as keyof typeof statusConfig];
          return (
            <div
              key={i}
              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group cursor-pointer"
            >
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                {txn.name.charAt(0)}
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{txn.name}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{txn.course}</p>
              </div>
              {/* Amount */}
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-slate-900 dark:text-white">₹{txn.amount.toLocaleString()}</p>
                <p className="text-[10px] text-slate-400">{txn.time}</p>
              </div>
              {/* Status */}
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${sc.cls}`}>
                {sc.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Top Courses Table ────────────────────────────────────────────────────────
function TopCourses() {
  const courses = [
    { name: "AIIMS CRE Complete Pack", sales: 1248, revenue: 37_40_752, rating: 4.9, trend: "up" },
    { name: "Anatomy + Physiology Bundle", sales: 896, revenue: 13_43_504, rating: 4.8, trend: "up" },
    { name: "Mock Test Series — 50 Tests", sales: 742, revenue: 5_92_858, rating: 4.7, trend: "neutral" },
    { name: "Live Class Monthly Pass", sales: 521, revenue: 6_77_279, rating: 4.8, trend: "up" },
    { name: "Study Material Bundle", sales: 418, revenue: 2_08_582, rating: 4.6, trend: "down" },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white">Top Performing Courses</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">By enrollment & revenue</p>
        </div>
        <button className="text-xs text-violet-600 dark:text-violet-400 font-medium flex items-center gap-1 hover:gap-2 transition-all">
          Manage <ChevronRight size={12} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[500px]">
          <thead>
            <tr className="text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
              <th className="text-left pb-3 font-semibold">Course</th>
              <th className="text-right pb-3 font-semibold">Sales</th>
              <th className="text-right pb-3 font-semibold">Revenue</th>
              <th className="text-right pb-3 font-semibold">Rating</th>
              <th className="text-right pb-3 font-semibold">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {courses.map((c, i) => (
              <tr key={c.name} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer">
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-bold text-slate-300 dark:text-slate-600 w-4">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-medium text-slate-800 dark:text-slate-200 text-xs leading-tight">
                      {c.name}
                    </span>
                  </div>
                </td>
                <td className="py-3 text-right">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {c.sales.toLocaleString()}
                  </span>
                </td>
                <td className="py-3 text-right">
                  <span className="text-xs font-bold text-violet-600 dark:text-violet-400">
                    ₹{(c.revenue / 100000).toFixed(1)}L
                  </span>
                </td>
                <td className="py-3 text-right">
                  <span className="flex items-center justify-end gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
                    <Star size={10} className="fill-amber-400 text-amber-400" />
                    {c.rating}
                  </span>
                </td>
                <td className="py-3 text-right">
                  {c.trend === "up" ? (
                    <ArrowUpRight size={14} className="inline text-emerald-500" />
                  ) : c.trend === "down" ? (
                    <ArrowDownRight size={14} className="inline text-red-500" />
                  ) : (
                    <span className="text-slate-300 text-xs">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── System Health ─────────────────────────────────────────────────────────────
function SystemHealth() {
  const metrics = [
    { label: "CPU Usage", value: 34, color: "#6366F1", icon: Cpu },
    { label: "Memory", value: 61, color: "#10B981", icon: Server },
    { label: "Storage", value: 47, color: "#F59E0B", icon: HardDrive },
    { label: "Uptime", value: 99.8, color: "#3B82F6", icon: Wifi, suffix: "%" },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white">System Health</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Live server metrics</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
          All systems operational
        </div>
      </div>

      <div className="space-y-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          const pct = m.suffix ? m.value : m.value;
          return (
            <div key={m.label}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Icon size={13} style={{ color: m.color }} />
                  <span className="text-xs text-slate-600 dark:text-slate-400">{m.label}</span>
                </div>
                <span className="text-xs font-bold" style={{ color: m.color }}>
                  {m.value}{m.suffix || "%"}
                </span>
              </div>
              <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, backgroundColor: m.color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Recent Activity Feed ─────────────────────────────────────────────────────
function ActivityFeed() {
  const events = [
    { type: "user", text: "New student registered", detail: "Rahul Sharma · Nursing", time: "2m", icon: UserPlus, color: "#6366F1" },
    { type: "payment", text: "Payment received ₹2,999", detail: "AIIMS CRE Complete Pack", time: "18m", icon: DollarSign, color: "#10B981" },
    { type: "content", text: "New course published", detail: "Biochemistry Advanced by Dr. Priya", time: "1h", icon: BookOpen, color: "#F59E0B" },
    { type: "alert", text: "Failed payment detected", detail: "Vikram Singh · ₹499", time: "2h", icon: AlertTriangle, color: "#EF4444" },
    { type: "user", text: "Faculty account created", detail: "Dr. Amit Kumar · AIIMS Delhi", time: "3h", icon: Users, color: "#8B5CF6" },
    { type: "system", text: "Backup completed", detail: "Database snapshot saved", time: "6h", icon: Shield, color: "#06B6D4" },
    { type: "content", text: "Question bank updated", detail: "450 new questions added", time: "8h", icon: FileText, color: "#3B82F6" },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white">Activity Feed</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Platform events</p>
        </div>
        <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
          <RefreshCw size={13} />
        </button>
      </div>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-100 dark:bg-slate-800" />
        <div className="space-y-4">
          {events.map((e, i) => {
            const Icon = e.icon;
            return (
              <div key={i} className="flex items-start gap-3 pl-1 group cursor-pointer">
                <div
                  className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 border-white dark:border-slate-900"
                  style={{ backgroundColor: e.color + "18" }}
                >
                  <Icon size={13} style={{ color: e.color }} />
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {e.text}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{e.detail}</p>
                </div>
                <span className="text-[10px] text-slate-400 shrink-0 pt-0.5">{e.time} ago</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Quick Actions ─────────────────────────────────────────────────────────────
function QuickActions({ onNavigate }: { onNavigate?: (key: string) => void }) {
  const actions = [
    { label: "Add Student", icon: UserPlus, color: "#6366F1", key: "admin-students" },
    { label: "New Course", icon: BookOpen, color: "#10B981", key: "admin-courses" },
    { label: "Send Notification", icon: Bell, color: "#F59E0B", key: "admin-notifications" },
    { label: "Add Vacancy", icon: FileText, color: "#EF4444", key: "admin-vacancies" },
    { label: "View Reports", icon: Activity, color: "#3B82F6", key: "admin-reports" },
    { label: "Manage Coupons", icon: Award, color: "#8B5CF6", key: "admin-coupons" },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
      <h3 className="font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-3 gap-3">
        {actions.map((a) => {
          const Icon = a.icon;
          return (
            <button
              key={a.label}
              onClick={() => onNavigate?.(a.key)}
              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all hover:-translate-y-0.5 group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ backgroundColor: a.color + "18" }}
              >
                <Icon size={17} style={{ color: a.color }} />
              </div>
              <span className="text-[10px] font-medium text-slate-600 dark:text-slate-400 text-center leading-tight">
                {a.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Alerts Banner ────────────────────────────────────────────────────────────
function AlertsBanner() {
  const alerts = [
    { type: "warning", text: "3 faculty accounts pending verification", icon: Clock, color: "amber" },
    { type: "error", text: "5 failed payment transactions today", icon: AlertTriangle, color: "red" },
    { type: "info", text: "Server backup scheduled at 2:00 AM tonight", icon: Shield, color: "blue" },
  ];

  const colorMap: Record<string, string> = {
    amber: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300",
    red: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400",
    blue: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300",
  };

  return (
    <div className="flex flex-wrap gap-3">
      {alerts.map((a, i) => {
        const Icon = a.icon;
        return (
          <div
            key={i}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium ${colorMap[a.color]} flex-1 min-w-[200px]`}
          >
            <Icon size={13} className="shrink-0" />
            <span className="truncate">{a.text}</span>
            <button className="ml-auto shrink-0 opacity-60 hover:opacity-100">
              <Eye size={12} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

// ─── New Registrations ────────────────────────────────────────────────────────
function NewRegistrations() {
  const users = [
    { name: "Rahul Sharma", role: "Student", subject: "AIIMS Nursing", joined: "Today", avatar: "R" },
    { name: "Dr. Priya Mehta", role: "Faculty", subject: "Anatomy", joined: "Today", avatar: "P" },
    { name: "Arjun Nair", role: "Student", subject: "Lab Technician", joined: "Yesterday", avatar: "A" },
    { name: "Sneha Gupta", role: "Student", subject: "AIIMS CRE", joined: "Yesterday", avatar: "S" },
    { name: "Dr. Vikram Singh", role: "Faculty", subject: "Biochemistry", joined: "2 days ago", avatar: "V" },
  ];

  const roleColors: Record<string, string> = {
    Student: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400",
    Faculty: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white">New Registrations</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Latest sign-ups</p>
        </div>
        <button className="text-xs text-violet-600 dark:text-violet-400 font-medium flex items-center gap-1 hover:gap-2 transition-all">
          View all <ChevronRight size={12} />
        </button>
      </div>
      <div className="space-y-3">
        {users.map((u, i) => (
          <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {u.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{u.name}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{u.subject}</p>
            </div>
            <div className="text-right shrink-0">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${roleColors[u.role]}`}>
                {u.role}
              </span>
              <p className="text-[10px] text-slate-400 mt-0.5">{u.joined}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export function AdminDashboard({ onNavigate }: { onNavigate?: (key: string) => void }) {
  const [activeTab, setActiveTab] = useState<"today" | "week" | "month">("today");

  const kpis = [
    {
      label: "Total Students",
      value: 12480,
      change: "+8.2%",
      trend: "up" as Trend,
      sparkData: [8200, 9100, 9800, 10200, 11100, 11800, 12480],
      color: "#6366F1",
      icon: GraduationCap,
    },
    {
      label: "Revenue (Month)",
      value: "₹2.43L",
      change: "+22.5%",
      trend: "up" as Trend,
      sparkData: [145, 162, 158, 175, 190, 210, 243],
      color: "#10B981",
      icon: DollarSign,
    },
    {
      label: "Active Courses",
      value: 64,
      change: "+3 this week",
      trend: "up" as Trend,
      sparkData: [48, 51, 53, 55, 58, 61, 64],
      color: "#F59E0B",
      icon: BookOpen,
    },
    {
      label: "Live Tests Today",
      value: 7,
      change: "-2 vs yesterday",
      trend: "down" as Trend,
      sparkData: [5, 9, 7, 11, 8, 9, 7],
      color: "#EF4444",
      icon: Zap,
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Top bar */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            Good morning, Admin 👋
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Here's what's happening on the AIIMS CRE platform today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 gap-1">
            {(["today", "week", "month"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                  activeTab === t
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 text-xs bg-violet-600 hover:bg-violet-700 text-white px-3 py-2 rounded-xl font-semibold transition-colors">
            <Download size={13} /> Export Report
          </button>
        </div>
      </div>

      {/* Alerts */}
      <AlertsBanner />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <KPICard key={k.label} {...k} />
        ))}
      </div>

      {/* Row 2 — Revenue + User Distribution + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-6">
          <RevenueChart />
        </div>
        <div className="lg:col-span-3">
          <UserDistributionChart />
        </div>
        <div className="lg:col-span-3">
          <QuickActions onNavigate={onNavigate} />
        </div>
      </div>

      {/* Row 3 — Top Courses + New Registrations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <TopCourses />
        </div>
        <div className="lg:col-span-1">
          <NewRegistrations />
        </div>
      </div>

      {/* Row 4 — Transactions + Activity + Health */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-5">
          <RecentTransactions />
        </div>
        <div className="lg:col-span-4">
          <ActivityFeed />
        </div>
        <div className="lg:col-span-3">
          <SystemHealth />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
