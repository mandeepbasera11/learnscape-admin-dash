import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Bell, Search, User } from "lucide-react"
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

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top Navigation */}
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              
              <div className="flex items-center gap-3">
                <div className="text-lg font-semibold text-foreground">
                  {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Medical Student'}
                </div>
                <div className="hidden sm:block text-sm text-muted-foreground">
                  AIIMS Aspirant
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="hidden md:flex relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search courses, tests..." 
                  className="pl-10 w-64 bg-muted/50 border-border/50 focus:bg-background"
                />
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-destructive-foreground rounded-full text-xs flex items-center justify-center">
                  3
                </span>
              </Button>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.user_metadata?.full_name || 'User'} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.user_metadata?.full_name || 'Medical Student'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive" onClick={handleSignOut}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 bg-background">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}