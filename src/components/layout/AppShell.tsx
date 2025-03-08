
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Calendar, Activity, MessageCircle, User } from "lucide-react";

const AppShell = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);

  // Check if user is onboarded
  useEffect(() => {
    const onboardingStatus = localStorage.getItem("sakhi-onboarded");
    setIsOnboarded(onboardingStatus === "true");
  }, []);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Show navigation only if user is onboarded
  if (!isOnboarded && location.pathname !== "/onboarding") {
    navigate("/onboarding");
    return null;
  }

  // Hide navigation on welcome and onboarding screens
  const hideNavigation = ["/", "/onboarding"].includes(location.pathname);

  const navItems = [
    { path: "/dashboard", icon: Home, label: "Home" },
    { path: "/tracker", icon: Calendar, label: "Tracker" },
    { path: "/remedies", icon: Activity, label: "Remedies" },
    { path: "/chat", icon: MessageCircle, label: "Ask Sakhi" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {!hideNavigation && (
        <header 
          className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${
            isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
          }`}
        >
          <div className="container px-4 h-16 flex items-center justify-between">
            <h1 className="text-lg font-semibold text-primary-foreground">
              Her<span className="text-secondary-foreground">Sakhi</span>
            </h1>
          </div>
        </header>
      )}

      <main className={`flex-1 ${!hideNavigation ? "pt-16 pb-16" : ""}`}>
        {children}
      </main>

      {!hideNavigation && (
        <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border z-10">
          <div className="flex justify-around items-center h-16">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                  location.pathname === item.path
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon size={20} className={location.pathname === item.path ? "animate-pulse-gentle" : ""} />
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
};

export default AppShell;
