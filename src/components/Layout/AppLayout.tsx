
import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { cn } from "@/lib/utils";

type Role = "student" | "faculty" | "admin";

interface AppLayoutProps {
  role: Role;
  activePage: string;
  pageTitle: string;
  pageSubtitle?: string;
  children: React.ReactNode;
  onNavigate: (key: string) => void;
  userName?: string;
  onLogout?: () => void;
}

export function AppLayout({
  role,
  activePage,
  pageTitle,
  pageSubtitle,
  children,
  onNavigate,
  userName = "User",
  onLogout,
}: AppLayoutProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div className={cn("flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden")}>
      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar - desktop always visible, mobile drawer */}
      <div
        className={cn(
          "fixed md:static inset-y-0 left-0 z-40 md:z-auto transition-transform duration-300",
          "md:translate-x-0",
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Sidebar
          role={role}
          activePage={activePage}
          onNavigate={(key) => {
            onNavigate(key);
            setMobileSidebarOpen(false);
          }}
          userName={userName}
          onLogout={onLogout}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          title={pageTitle}
          subtitle={pageSubtitle}
          theme={theme}
          onThemeToggle={toggleTheme}
          onMenuToggle={() => setMobileSidebarOpen((o) => !o)}
          notifCount={3}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
