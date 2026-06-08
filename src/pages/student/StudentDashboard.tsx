import React from "react";
import {
  BookOpen,
  Clock,
  Trophy,
  TrendingUp,
  ChevronRight,
  Play,
  CheckCircle2,
  AlertCircle,
  Star,
  Flame,
  Calendar,
  Target,
  Zap,
} from "lucide-react";

// ── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  color,
  gradient,
}: {
  label: string;
  value: string | number;
  sub: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0`}>
        <Icon size={20} className="text-white" />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{sub}</p>
      </div>
    </div>
  );
}

// ── Course Card ──────────────────────────────────────────────────────────────
function CourseCard({
  title,
  subject,
  progress,
  color,
}: {
  title: string;
  subject: string;
  progress: number;
  color: string;
}) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:shadow-md transition-shadow cursor-pointer group">
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: color + "20" }}
        >
          <BookOpen size={18} style={{ color }} />
        </div>
        <button className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
          <Play size={12} className="text-slate-500 group-hover:text-white ml-0.5 transition-colors" />
        </button>
      </div>
      <p className="font-semibold text-sm text-slate-900 dark:text-white mb-0.5 line-clamp-2">{title}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{subject}</p>
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">Progress</span>
          <span className="font-semibold" style={{ color }}>{progress}%</span>
        </div>
        <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${progress}%`, backgroundColor: color }}
          />
        </div>
      </div>
    </div>
  );
}

// ── Upcoming Test Card ───────────────────────────────────────────────────────
function TestCard({
  title,
  date,
  duration,
  type,
  urgent,
}: {
  title: string;
  date: string;
  duration: string;
  type: "mock" | "live" | "quiz";
  urgent?: boolean;
}) {
  const colors = {
    mock: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    live: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
    quiz: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
      <div className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase shrink-0 ${colors[type]}`}>
        {type}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{title}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Calendar size={10} /> {date}
          </span>
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Clock size={10} /> {duration}
          </span>
        </div>
      </div>
      {urgent && (
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
      )}
      <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-500 transition-colors shrink-0" />
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export function StudentDashboard() {
  const stats = [
    { label: "Courses Enrolled", value: 5, sub: "+1 this week", icon: BookOpen, color: "text-blue-600", gradient: "from-blue-500 to-cyan-400" },
    { label: "Tests Completed", value: 24, sub: "3 pending review", icon: CheckCircle2, color: "text-emerald-600", gradient: "from-emerald-500 to-teal-400" },
    { label: "Overall Rank", value: "#142", sub: "Top 15% nationally", icon: Trophy, color: "text-amber-600", gradient: "from-amber-500 to-orange-400" },
    { label: "Study Streak", value: "12d", sub: "Keep it up! 🔥", icon: Flame, color: "text-red-600", gradient: "from-red-500 to-pink-400" },
  ];

  const courses = [
    { title: "Anatomy & Physiology Complete", subject: "AIIMS Nursing", progress: 68, color: "#3B82F6" },
    { title: "General Knowledge for Paramedical", subject: "Current Affairs", progress: 45, color: "#10B981" },
    { title: "Biochemistry & Pathology", subject: "Lab Technician", progress: 82, color: "#8B5CF6" },
    { title: "Microbiology Essentials", subject: "AIIMS CRE Core", progress: 31, color: "#F59E0B" },
  ];

  const tests = [
    { title: "AIIMS CRE Full Mock Test 14", date: "Today, 4:00 PM", duration: "3 hrs", type: "live" as const, urgent: true },
    { title: "Anatomy Chapter 7 Quiz", date: "Tomorrow", duration: "30 min", type: "quiz" as const },
    { title: "AIIMS CRE Mock Test 15", date: "10 Jun", duration: "3 hrs", type: "mock" as const },
    { title: "Current Affairs Weekly Test", date: "12 Jun", duration: "45 min", type: "quiz" as const },
  ];

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-violet-700 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white transform translate-x-20 -translate-y-20" />
          <div className="absolute bottom-0 right-24 w-32 h-32 rounded-full bg-white transform translate-y-10" />
        </div>
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">Good morning 👋</p>
            <h2 className="text-xl font-bold mt-1">Welcome back, Mandeep!</h2>
            <p className="text-blue-200 text-sm mt-1">AIIMS CRE exam in <strong className="text-white">47 days</strong> — stay focused.</p>
            <div className="flex items-center gap-3 mt-4">
              <button className="bg-white text-blue-700 text-xs font-bold px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-1.5">
                <Zap size={13} /> Continue Learning
              </button>
              <button className="border border-white/30 text-white text-xs font-medium px-4 py-2 rounded-xl hover:bg-white/10 transition-colors">
                View Schedule
              </button>
            </div>
          </div>
          <div className="hidden md:flex flex-col items-center bg-white/10 rounded-xl p-4 gap-1">
            <Target size={24} className="text-white" />
            <p className="text-2xl font-bold text-white">72%</p>
            <p className="text-xs text-blue-200">Goal Progress</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Middle row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Courses */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-900 dark:text-white">My Courses</h3>
            <button className="text-xs text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1 hover:gap-2 transition-all">
              View all <ChevronRight size={12} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {courses.map((c) => (
              <CourseCard key={c.title} {...c} />
            ))}
          </div>
        </div>

        {/* Upcoming Tests */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 dark:text-white">Upcoming Tests</h3>
            <button className="text-xs text-blue-600 dark:text-blue-400 font-medium">View all</button>
          </div>
          <div className="space-y-1">
            {tests.map((t) => (
              <TestCard key={t.title} {...t} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Performance summary */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 dark:text-white">Performance Summary</h3>
            <TrendingUp size={16} className="text-emerald-500" />
          </div>
          <div className="space-y-3">
            {[
              { subject: "Anatomy", score: 78, color: "#3B82F6" },
              { subject: "Physiology", score: 65, color: "#10B981" },
              { subject: "Biochemistry", score: 82, color: "#8B5CF6" },
              { subject: "General Knowledge", score: 54, color: "#F59E0B" },
              { subject: "Microbiology", score: 70, color: "#EF4444" },
            ].map((item) => (
              <div key={item.subject} className="flex items-center gap-3">
                <p className="text-xs text-slate-600 dark:text-slate-400 w-32 shrink-0">{item.subject}</p>
                <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${item.score}%`, backgroundColor: item.color }}
                  />
                </div>
                <p className="text-xs font-bold w-8 text-right" style={{ color: item.color }}>
                  {item.score}%
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 dark:text-white">Recent Activity</h3>
            <Star size={16} className="text-amber-500" />
          </div>
          <div className="space-y-3">
            {[
              { action: "Completed Mock Test 13", time: "2 hrs ago", icon: CheckCircle2, color: "text-emerald-500" },
              { action: "Watched: Anatomy Ch. 6", time: "Yesterday", icon: Play, color: "text-blue-500" },
              { action: "Scored 85/100 in Quiz", time: "Yesterday", icon: Trophy, color: "text-amber-500" },
              { action: "Downloaded Physiology PDF", time: "2 days ago", icon: BookOpen, color: "text-violet-500" },
              { action: "Ranked #142 nationally", time: "3 days ago", icon: TrendingUp, color: "text-red-500" },
            ].map((item) => (
              <div key={item.action} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  <item.icon size={13} className={item.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate">{item.action}</p>
                  <p className="text-[10px] text-slate-400">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
