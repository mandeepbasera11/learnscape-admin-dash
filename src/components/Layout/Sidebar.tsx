import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  studentNav,
  facultyNav,
  adminNav,
  NavGroup,
  NavItem,
} from "@/lib/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LogOut,
  GraduationCap,
  Shield,
  BookOpen,
  Stethoscope,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Role = "student" | "faculty" | "admin";

interface SidebarProps {
  role: Role;
  activePage: string;
  onNavigate: (key: string) => void;
  userName?: string;
  userAvatar?: string;
  onLogout?: () => void;
}

const ROLE_CONFIG: Record<
  Role,
  { nav: NavGroup[]; label: string; color: string; gradient: string; icon: React.ElementType }
> = {
  student: {
    nav: studentNav,
    label: "Student Panel",
    color: "text-blue-600",
    gradient: "from-blue-600 to-cyan-500",
    icon: GraduationCap,
  },
  faculty: {
    nav: facultyNav,
    label: "Faculty Panel",
    color: "text-emerald-600",
    gradient: "from-emerald-600 to-teal-500",
    icon: BookOpen,
  },
  admin: {
    nav: adminNav,
    label: "Super Admin",
    color: "text-violet-600",
    gradient: "from-violet-600 to-purple-500",
    icon: Shield,
  },
};

function NavItemComponent({
  item,
  isActive,
  isCollapsed,
  onNavigate,
  depth = 0,
}: {
  item: NavItem;
  isActive: boolean;
  isCollapsed: boolean;
  onNavigate: (key: string) => void;
  depth?: number;
}) {
  const [open, setOpen] = useState(false);
  const Icon = item.icon;
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setOpen((prev) => !prev);
    } else {
      onNavigate(item.key);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        title={isCollapsed ? item.label : undefined}
        className={cn(
          "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
          depth > 0 && "pl-8 text-xs",
          isActive
            ? "bg-gradient-to-r text-white shadow-md shadow-black/10"
            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100",
          isCollapsed && "justify-center px-2"
        )}
        style={
          isActive
            ? { backgroundImage: "var(--sidebar-active-gradient)" }
            : {}
        }
      >
        <Icon
          size={depth > 0 ? 15 : 17}
          className={cn(
            "shrink-0 transition-transform duration-200",
            isActive ? "text-white" : "text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200"
          )}
        />

        {!isCollapsed && (
          <>
            <span className="flex-1 text-left truncate">{item.label}</span>

            {item.badge !== undefined && (
              <Badge
                variant="secondary"
                className={cn(
                  "text-[10px] px-1.5 py-0 h-4 font-semibold",
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400"
                )}
              >
                {item.badge}
              </Badge>
            )}

            {hasChildren && (
              <ChevronDown
                size={13}
                className={cn(
                  "transition-transform duration-200 opacity-50",
                  open && "rotate-180"
                )}
              />
            )}
          </>
        )}

        {/* Tooltip for collapsed state */}
        {isCollapsed && (
          <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-900 dark:bg-slate-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-lg transition-opacity duration-150">
            {item.label}
            {item.badge !== undefined && (
              <span className="ml-1.5 bg-red-500 text-white text-[10px] px-1 rounded-full">
                {item.badge}
              </span>
            )}
            <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900 dark:border-r-slate-700" />
          </div>
        )}
      </button>

      {/* Children */}
      {hasChildren && open && !isCollapsed && (
        <div className="mt-1 space-y-0.5 ml-2 border-l-2 border-slate-200 dark:border-slate-700 pl-2">
          {item.children!.map((child) => (
            <NavItemComponent
              key={child.key}
              item={child}
              isActive={false}
              isCollapsed={false}
              onNavigate={onNavigate}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar({
  role,
  activePage,
  onNavigate,
  userName = "User",
  userAvatar,
  onLogout,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const config = ROLE_CONFIG[role];
  const RoleIcon = config.icon;

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out relative",
        collapsed ? "w-[68px]" : "w-64"
      )}
      style={
        {
          "--sidebar-active-gradient": `linear-gradient(135deg, var(--tw-gradient-stops))`,
        } as React.CSSProperties
      }
    >
      {/* Collapse toggle button */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="absolute -right-3 top-[72px] z-10 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
      >
        {collapsed ? (
          <ChevronRight size={12} className="text-slate-500" />
        ) : (
          <ChevronLeft size={12} className="text-slate-500" />
        )}
      </button>

      {/* Header / Logo */}
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-4 border-b border-slate-200 dark:border-slate-800",
          collapsed && "justify-center px-2"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br shrink-0",
            `bg-gradient-to-br ${config.gradient}`
          )}
        >
          <Stethoscope size={18} className="text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="font-bold text-slate-900 dark:text-white text-sm leading-tight truncate">
              AIIMS CRE
            </p>
            <p className={cn("text-[11px] font-medium truncate", config.color)}>
              {config.label}
            </p>
          </div>
        )}
      </div>

      {/* Role switcher pills */}
      {!collapsed && (
        <div className="px-3 py-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
            {(["student", "faculty", "admin"] as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => {
                  const defaultKeys: Record<Role, string> = {
                    student: "student-dashboard",
                    faculty: "faculty-dashboard",
                    admin: "admin-dashboard",
                  };
                  onNavigate(defaultKeys[r]);
                }}
                className={cn(
                  "flex-1 text-[10px] font-semibold py-1 rounded-md transition-all capitalize",
                  role === r
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                )}
              >
                {r === "admin" ? "Admin" : r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-5 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
        {config.nav.map((group) => (
          <div key={group.group}>
            {!collapsed && (
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest px-3 mb-2">
                {group.group}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavItemComponent
                  key={item.key}
                  item={item}
                  isActive={activePage === item.key}
                  isCollapsed={collapsed}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className={cn("border-t border-slate-200 dark:border-slate-800 p-3")}>
        <div
          className={cn(
            "flex items-center gap-3",
            collapsed && "justify-center"
          )}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700 flex items-center justify-center shrink-0 overflow-hidden">
            {userAvatar ? (
              <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs font-bold text-white">
                {userName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                  {userName}
                </p>
                <p className={cn("text-[10px] capitalize font-medium", config.color)}>
                  {role}
                </p>
              </div>
              <button
                onClick={onLogout}
                className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <LogOut size={14} />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
