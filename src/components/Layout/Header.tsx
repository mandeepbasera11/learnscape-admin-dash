import React, { useState } from "react";
import { Bell, Search, Sun, Moon, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  subtitle?: string;
  onMenuToggle?: () => void;
  theme: "light" | "dark";
  onThemeToggle: () => void;
  notifCount?: number;
}

export function Header({
  title,
  subtitle,
  onMenuToggle,
  theme,
  onThemeToggle,
  notifCount = 0,
}: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-4 md:px-6 gap-4 sticky top-0 z-20">
      {/* Left */}
      <div className="flex items-center gap-4 min-w-0">
        {/* Mobile menu button */}
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
        >
          <Menu size={18} />
        </button>

        {!searchOpen && (
          <div className="min-w-0">
            <h1 className="font-bold text-slate-900 dark:text-white text-base leading-tight truncate">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Search bar (expands on mobile) */}
        {searchOpen && (
          <div className="flex-1 flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl px-3 py-2">
            <Search size={14} className="text-slate-400 shrink-0" />
            <input
              autoFocus
              placeholder="Search pages, features..."
              className="bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none flex-1"
            />
            <button onClick={() => setSearchOpen(false)}>
              <X size={14} className="text-slate-400 hover:text-slate-600" />
            </button>
          </div>
        )}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Search icon */}
        {!searchOpen && (
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
          >
            <Search size={16} />
          </button>
        )}

        {/* Theme toggle */}
        <button
          onClick={onThemeToggle}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
        >
          {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors">
          <Bell size={16} />
          {notifCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
              {notifCount > 9 ? "9+" : notifCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;
