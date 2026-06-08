import React from "react";
import { Construction, Sparkles } from "lucide-react";

interface PlaceholderPageProps {
  pageKey: string;
  title: string;
  subtitle?: string;
}

const FEATURE_HINTS: Record<string, string[]> = {
  "student-dashboard": ["Enrollment stats", "Upcoming tests", "Recent activity", "AI insights"],
  "student-vacancies": ["Official PDF viewer", "Eligibility checker", "Deadline tracker", "Apply links"],
  "student-exam": ["Auto-save answers", "Timer with alerts", "Negative marking", "Review screen"],
  "student-performance": ["AI performance analysis", "Subject-wise charts", "Rank prediction", "Weak areas"],
  "faculty-courses": ["Drag-drop curriculum builder", "Video upload", "Preview mode", "Publish controls"],
  "faculty-ai": ["Generate MCQs from PDF", "Summarize topics", "Create explanations", "Auto-tag questions"],
  "admin-dashboard": ["Revenue chart", "User growth", "Active exams", "Server health"],
  "admin-roles": ["Role creator", "Permission matrix", "Assign to users", "Audit trail"],
};

export function PlaceholderPage({ pageKey, title, subtitle }: PlaceholderPageProps) {
  const hints = FEATURE_HINTS[pageKey] || [];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-violet-100 dark:from-blue-900/30 dark:to-violet-900/30 flex items-center justify-center mb-5">
        <Construction size={28} className="text-blue-500 dark:text-blue-400" />
      </div>

      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{title}</h2>
      {subtitle && <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-sm">{subtitle}</p>}

      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 mb-6">
        <Sparkles size={12} className="text-amber-500" />
        <span className="text-xs font-medium text-amber-700 dark:text-amber-400">
          Coming up — ask Claude to build this page
        </span>
      </div>

      {hints.length > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 max-w-sm w-full">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
            Planned Features
          </p>
          <div className="grid grid-cols-2 gap-2">
            {hints.map((hint) => (
              <div
                key={hint}
                className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 rounded-lg px-2.5 py-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                {hint}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PlaceholderPage;
