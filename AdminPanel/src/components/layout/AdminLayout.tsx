
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Sidebar, SidebarProvider, SidebarTrigger, SidebarContent, SidebarHeader, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Users, Leaf, Home, BarChart, Settings, LogOut, Bell, Flower } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the admin panel",
    });
    navigate("/login");
  };

  const menuItems = [
    { title: "Dashboard", icon: Home, path: "/dashboard" },
    { title: "Doctors", icon: Users, path: "/doctors" },
    { title: "Remedies", icon: Leaf, path: "/remedies" },
    { title: "Analytics", icon: BarChart, path: "/analytics" },
    { title: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader className="flex h-14 items-center px-4 border-b">
            <div className="flex items-center space-x-2">
              <Flower className="h-6 w-6 text-hersaki-purple" />
              <span className="font-semibold text-lg">HerSakhi Admin</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        onClick={() => navigate(item.path)}
                        className="flex items-center"
                      >
                        <item.icon className="h-5 w-5 mr-2" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <div className="absolute bottom-4 left-4 right-4">
              <Button
                variant="outline"
                className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col min-h-screen">
          <header className="h-14 border-b flex items-center justify-between px-4 bg-white">
            <SidebarTrigger />
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  3
                </span>
              </Button>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-hersaki-purple text-white flex items-center justify-center">
                  A
                </div>
                <span className="font-medium text-sm hidden md:inline-block">Admin User</span>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto bg-gray-50 p-4">
            <Outlet />
          </main>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};

export default AdminLayout;
