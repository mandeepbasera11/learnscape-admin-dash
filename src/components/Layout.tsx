import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Bell, Search, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/useAuth"
import { Link } from "react-router-dom"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top Navigation - Playful Header */}
          <header className="h-18 border-b border-border/50 bg-card/80 backdrop-blur-md supports-[backdrop-filter]:bg-card/60 flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl p-2 transition-all" />
              
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-muted-foreground">{getGreeting()},</span>
                  <span className="text-lg font-bold text-foreground">
                    {user?.user_metadata?.full_name?.split(' ')[0] || 'Student'}
                  </span>
                  <span className="text-xl">👋</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="hidden md:flex relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 group-focus-within:text-primary transition-colors" />
                <Input 
                  placeholder="Search courses, tests..." 
                  className="pl-11 w-72 h-11 bg-muted/50 border-border/50 rounded-xl focus:bg-background focus:border-primary/50 transition-all"
                />
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative h-11 w-11 rounded-xl hover:bg-primary/10 transition-all">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center font-bold animate-pulse">
                  3
                </span>
              </Button>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-11 w-11 rounded-xl p-0 hover:ring-2 hover:ring-primary/20 transition-all">
                    <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                      <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.user_metadata?.full_name || 'User'} />
                      <AvatarFallback className="gradient-primary text-white font-bold">
                        {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-60 rounded-xl p-2" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal p-3 bg-muted/50 rounded-lg mb-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="gradient-primary text-white font-bold">
                          {user?.user_metadata?.full_name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="font-bold text-foreground">
                          {user?.user_metadata?.full_name || 'Medical Student'}
                        </p>
                        <p className="text-xs text-muted-foreground truncate max-w-[140px]">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuItem className="rounded-lg py-3 cursor-pointer" asChild>
                    <Link to="/profile">
                      <Sparkles className="mr-3 h-4 w-4 text-primary" />
                      <span className="font-medium">My Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-lg py-3 cursor-pointer" asChild>
                    <Link to="/orders">
                      <span className="mr-3">🛒</span>
                      <span className="font-medium">My Orders</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-2" />
                  <DropdownMenuItem 
                    className="rounded-lg py-3 cursor-pointer text-destructive hover:text-destructive focus:text-destructive" 
                    onClick={handleSignOut}
                  >
                    <span className="mr-3">👋</span>
                    <span className="font-medium">Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 bg-background overflow-auto">
            <div className="animate-slide-up">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
