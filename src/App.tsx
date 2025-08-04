import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import MyCourses from "./pages/MyCourses";
import Courses from "./pages/Courses";
import TestSeries from "./pages/TestSeries";
import MockTest from "./pages/MockTest";
import LiveTest from "./pages/LiveTest";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import Orders from "./pages/Orders";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/*" element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/my-courses" element={<MyCourses />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/test-series" element={<TestSeries />} />
                    <Route path="/mock-test" element={<MockTest />} />
                    <Route path="/live-test" element={<LiveTest />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/change-password" element={<ChangePassword />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
