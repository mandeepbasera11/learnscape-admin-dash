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
  ChevronRight
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
    type: "single"
  },
  {
    title: "My Courses",
    url: "/my-courses",
    icon: BookOpen,
    type: "single"
  },
  {
    title: "Courses",
    url: "/courses",
    icon: GraduationCap,
    type: "single"
  },
  {
    title: "Test Series",
    url: "/test-series",
    icon: FileText,
    type: "single"
  },
  {
    title: "Mock Test",
    url: "/mock-test",
    icon: Timer,
    type: "single"
  },
  {
    title: "Live Test",
    url: "/live-test",
    icon: Video,
    type: "single"
  },
  {
    title: "Account",
    type: "group",
    items: [
      { title: "My Profile", url: "/profile", icon: User },
      { title: "Change Password", url: "/change-password", icon: Lock },
      { title: "My Orders", url: "/orders", icon: ShoppingCart },
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
      ? "bg-primary text-primary-foreground font-medium shadow-sm" 
      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"

  const toggleGroup = (groupTitle: string) => {
    setOpenGroups(prev => 
      prev.includes(groupTitle) 
        ? prev.filter(g => g !== groupTitle)
        : [...prev, groupTitle]
    )
  }

  return (
    <Sidebar
      className="border-r border-sidebar-border"
      collapsible="icon"
    >
      <SidebarContent className="px-2 py-4">
        <div className="mb-6">
          {!isCollapsed && (
            <div className="px-4 py-2">
              <h2 className="text-lg font-semibold text-sidebar-foreground">Student Portal</h2>
              <p className="text-sm text-muted-foreground">Welcome back!</p>
            </div>
          )}
        </div>

        {menuItems.map((item) => (
          <div key={item.title} className="mb-2">
            {item.type === "single" ? (
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url!} 
                      end 
                      className={({ isActive }) => `${getNavCls({ isActive })} rounded-lg px-3 py-2 flex items-center gap-3 transition-colors`}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!isCollapsed && <span className="font-medium">{item.title}</span>}
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
                    <SidebarGroupLabel className="group cursor-pointer flex items-center justify-between px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent rounded-lg transition-colors">
                      {!isCollapsed && (
                        <>
                          <span>{item.title}</span>
                          {openGroups.includes(item.title) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </>
                      )}
                    </SidebarGroupLabel>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <SidebarMenu className="space-y-1">
                        {item.items?.map((subItem) => (
                          <SidebarMenuItem key={subItem.title}>
                            <SidebarMenuButton asChild>
                              <NavLink 
                                to={subItem.url} 
                                end 
                                className={({ isActive }) => `${getNavCls({ isActive })} rounded-lg px-3 py-2 ml-4 flex items-center gap-3 transition-colors text-sm`}
                              >
                                <subItem.icon className="h-4 w-4 shrink-0" />
                                {!isCollapsed && <span>{subItem.title}</span>}
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
      </SidebarContent>
    </Sidebar>
  )
}