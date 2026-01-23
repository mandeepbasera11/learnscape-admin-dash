import { useState } from "react"
import { 
  Home, 
  BookOpen, 
  GraduationCap, 
  FileText, 
  Timer, 
  Video,
  User, 
  Lock, 
  ShoppingCart,
  ChevronDown,
  ChevronRight,
  Sparkles
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const menuItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
    emoji: "🏠",
    type: "single"
  },
  {
    title: "My Courses",
    url: "/my-courses",
    icon: BookOpen,
    emoji: "📚",
    type: "single"
  },
  {
    title: "Courses",
    url: "/courses",
    icon: GraduationCap,
    emoji: "🎓",
    type: "single"
  },
  {
    title: "Test Series",
    url: "/test-series",
    icon: FileText,
    emoji: "📝",
    type: "single"
  },
  {
    title: "Mock Test",
    url: "/mock-test",
    icon: Timer,
    emoji: "⏱️",
    type: "single"
  },
  {
    title: "Live Test",
    url: "/live-test",
    icon: Video,
    emoji: "🔴",
    type: "single"
  },
  {
    title: "Account",
    type: "group",
    emoji: "⚙️",
    items: [
      { title: "My Profile", url: "/profile", icon: User, emoji: "👤" },
      { title: "Change Password", url: "/change-password", icon: Lock, emoji: "🔐" },
      { title: "My Orders", url: "/orders", icon: ShoppingCart, emoji: "🛒" },
    ]
  }
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const isCollapsed = state === "collapsed"

  const [openGroups, setOpenGroups] = useState<string[]>(['Account'])

  const isActive = (path: string) => currentPath === path
  
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "gradient-primary text-white font-bold shadow-md rounded-xl" 
      : "text-sidebar-foreground hover:bg-primary/10 hover:text-primary rounded-xl"

  const toggleGroup = (groupTitle: string) => {
    setOpenGroups(prev => 
      prev.includes(groupTitle) 
        ? prev.filter(g => g !== groupTitle)
        : [...prev, groupTitle]
    )
  }

  return (
    <Sidebar
      className="border-r border-sidebar-border/50 bg-sidebar"
      collapsible="icon"
    >
      <SidebarContent className="px-3 py-4">
        {/* Logo Section */}
        <div className="mb-6">
          {!isCollapsed ? (
            <div className="px-3 py-4 rounded-2xl bg-primary/5 border border-primary/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-md">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">MedPrep</h2>
                  <p className="text-xs text-muted-foreground">AIIMS Success Hub 🚀</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-md">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <div className="space-y-1">
          {menuItems.map((item) => (
            <div key={item.title}>
              {item.type === "single" ? (
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url!} 
                        end 
                        className={({ isActive }) => `${getNavCls({ isActive })} px-3 py-3 flex items-center gap-3 transition-all duration-200`}
                      >
                        {!isCollapsed && <span className="text-lg">{item.emoji}</span>}
                        <item.icon className={`h-5 w-5 shrink-0 ${isCollapsed ? '' : 'hidden'}`} />
                        {!isCollapsed && <span className="font-semibold">{item.title}</span>}
                        {isCollapsed && (
                          <span className="sr-only">{item.title}</span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              ) : (
                <SidebarGroup>
                  <Collapsible
                    open={openGroups.includes(item.title)}
                    onOpenChange={() => toggleGroup(item.title)}
                  >
                    <CollapsibleTrigger asChild>
                      <SidebarGroupLabel className="group cursor-pointer flex items-center justify-between px-3 py-3 text-sm font-semibold text-sidebar-foreground hover:bg-primary/10 rounded-xl transition-all duration-200">
                        {!isCollapsed && (
                          <>
                            <span className="flex items-center gap-3">
                              <span className="text-lg">{item.emoji}</span>
                              <span>{item.title}</span>
                            </span>
                            <div className="p-1 rounded-lg bg-muted/50">
                              {openGroups.includes(item.title) ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </div>
                          </>
                        )}
                      </SidebarGroupLabel>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <SidebarGroupContent>
                        <SidebarMenu className="space-y-1 mt-1">
                          {item.items?.map((subItem) => (
                            <SidebarMenuItem key={subItem.title}>
                              <SidebarMenuButton asChild>
                                <NavLink 
                                  to={subItem.url} 
                                  end 
                                  className={({ isActive }) => `${getNavCls({ isActive })} px-3 py-2.5 ml-6 flex items-center gap-3 transition-all duration-200 text-sm`}
                                >
                                  <span className="text-base">{subItem.emoji}</span>
                                  {!isCollapsed && <span className="font-medium">{subItem.title}</span>}
                                </NavLink>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </CollapsibleContent>
                  </Collapsible>
                </SidebarGroup>
              )}
            </div>
          ))}
        </div>

        {/* Fun Footer Message */}
        {!isCollapsed && (
          <div className="mt-auto pt-6">
            <div className="px-3 py-4 rounded-2xl bg-accent/20 border border-accent/30 text-center">
              <p className="text-sm font-semibold text-foreground mb-1">Keep Going! 💪</p>
              <p className="text-xs text-muted-foreground">Every hour of study brings you closer to your dream!</p>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  )
}
