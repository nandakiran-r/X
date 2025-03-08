
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import pages
import Welcome from "./pages/Welcome";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Tracker from "./pages/Tracker";
import Remedies from "./pages/Remedies";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

// Import layouts
import AppShell from "./components/layout/AppShell";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/onboarding" element={<Onboarding />} />
          
          {/* Protected routes wrapped in AppShell */}
          <Route path="/dashboard" element={<AppShell><Dashboard /></AppShell>} />
          <Route path="/tracker" element={<AppShell><Tracker /></AppShell>} />
          <Route path="/remedies" element={<AppShell><Remedies /></AppShell>} />
          <Route path="/chat" element={<AppShell><Chat /></AppShell>} />
          <Route path="/profile" element={<AppShell><Profile /></AppShell>} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
