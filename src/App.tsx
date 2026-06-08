import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PAGE_MAP, PageRole } from "@/lib/pageMap";
import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

// ── Import real pages as you build them ──────────────────────────────────────
import { StudentDashboard } from "@/pages/student/StudentDashboard";
import { AdminDashboard } from "@/pages/admin/AdminDashboard";
// import FacultyDashboard from "@/pages/faculty/FacultyDashboard";

// ── Page registry: replace PlaceholderPage with your real component ──────────
const PAGE_COMPONENTS: Record<string, React.ComponentType<any>> = {
  "student-dashboard": StudentDashboard,
  "admin-dashboard": AdminDashboard,
  // Add real components here as they're built
};

// ── Role detection from current page key ────────────────────────────────────
function getRoleFromKey(key: string): PageRole {
  if (key.startsWith("faculty-")) return "faculty";
  if (key.startsWith("admin-")) return "admin";
  return "student";
}

// ── Default landing pages per role ──────────────────────────────────────────
const ROLE_HOME: Record<PageRole, string> = {
  student: "student-dashboard",
  faculty: "faculty-dashboard",
  admin: "admin-dashboard",
};

function App() {
  const [activePage, setActivePage] = useState<string>("student-dashboard");

  const handleNavigate = (key: string) => {
    if (PAGE_MAP[key]) {
      setActivePage(key);
    }
  };

  // Resolve current page meta
  const meta = PAGE_MAP[activePage];
  if (!meta) {
    // Fallback
    return (
      <div className="flex items-center justify-center h-screen text-slate-500">
        Page not found: {activePage}
      </div>
    );
  }

  const role = meta.role;

  // Resolve component
  const PageComponent = PAGE_COMPONENTS[activePage];

  return (
    <AppLayout
      role={role}
      activePage={activePage}
      pageTitle={meta.title}
      pageSubtitle={meta.subtitle}
      onNavigate={handleNavigate}
      userName="Mandeep Singh"
      onLogout={() => alert("Logged out")}
    >
      {PageComponent ? (
        <PageComponent />
      ) : (
        <PlaceholderPage
          pageKey={activePage}
          title={meta.title}
          subtitle={meta.subtitle}
        />
      )}
    </AppLayout>
  );
}

export default App;
