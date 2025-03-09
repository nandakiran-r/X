import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/config/firebase";
import { Home, Calendar, Activity, MessageCircle, User } from "lucide-react";
import { signOut } from "firebase/auth";

const AppShell = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [loading, setLoading] = useState(true); // To prevent flickering during auth check

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        localStorage.setItem("sakhi-uid", uid);

        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          localStorage.setItem("sakhi-profile", JSON.stringify(userData));
          setIsOnboarded(true);
        } else {
          setIsOnboarded(false);
        }
      } else {
        await signOut(auth);
        localStorage.clear();
        localStorage.removeItem("sakhi-uid");
        localStorage.removeItem("sakhi-profile");
        setIsOnboarded(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Redirect to onboarding if not onboarded & not on the onboarding page
  useEffect(() => {
    if (!loading && !isOnboarded && location.pathname !== "/onboarding") {
      navigate("/onboarding");
    }
  }, [loading, isOnboarded, location.pathname, navigate]);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide navigation on welcome and onboarding screens
  const hideNavigation = ["/", "/onboarding"].includes(location.pathname);

  const navItems = [
    { path: "/dashboard", icon: Home, label: "Home" },
    { path: "/tracker", icon: Calendar, label: "Tracker" },
    { path: "/remedies", icon: Activity, label: "Remedies" },
    { path: "/chat", icon: MessageCircle, label: "Ask Sakhi" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  if (loading) return null; // Prevent UI flickering during auth check

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {!hideNavigation && (
        <header
          className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${
            isScrolled
              ? "bg-background/80 backdrop-blur-md shadow-sm"
              : "bg-transparent"
          }`}
        >
          <div className="container px-4 h-16 flex items-center justify-between cursor-pointer">
            <h1 className="text-lg font-semibold text-primary-foreground" onClick={() => navigate('/dashboard')}>
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
                <item.icon
                  size={20}
                  className={
                    location.pathname === item.path
                      ? "animate-pulse-gentle"
                      : ""
                  }
                />
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
