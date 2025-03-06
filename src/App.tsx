
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Course from "./pages/Course";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminModules from "./pages/admin/AdminModules";
import AdminUsers from "./pages/admin/AdminUsers";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";

const queryClient = new QueryClient();

// Simple auth context for now - would be replaced with a proper auth system later
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<{id: string, name: string, email: string} | null>(null);
  
  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
      setIsAdmin(parsedUser.isAdmin === true);
    }
  }, []);
  
  const login = (email: string, password: string, remember = false) => {
    // This is a mock login function - to be replaced with a real one
    // Admin user: admin@tum-academy.de / password
    if (email === 'admin@tum-academy.de' && password === 'password') {
      const adminUser = {id: 'admin1', name: 'Admin User', email, isAdmin: true};
      setUser(adminUser);
      setIsAuthenticated(true);
      setIsAdmin(true);
      localStorage.setItem('user', JSON.stringify(adminUser));
      return true;
    }
    
    // Regular user: user@tum-academy.de / password
    if (email === 'user@tum-academy.de' && password === 'password') {
      const regularUser = {id: 'user1', name: 'Test User', email, isAdmin: false};
      setUser(regularUser);
      setIsAuthenticated(true);
      setIsAdmin(false);
      localStorage.setItem('user', JSON.stringify(regularUser));
      return true;
    }
    
    return false;
  };
  
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('user');
  };
  
  const register = (name: string, email: string, password: string) => {
    // This is a mock register function - to be replaced with a real one
    const newUser = {id: 'user' + Date.now(), name, email, isAdmin: false};
    setUser(newUser);
    setIsAuthenticated(true);
    setIsAdmin(false);
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
  };
  
  return {
    isAuthenticated,
    isAdmin,
    user,
    login,
    logout,
    register
  };
};

// Protected Route component
const ProtectedRoute = ({ children, requiresAdmin = false }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiresAdmin && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

const App = () => {
  const auth = useAuth();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login auth={auth} />} />
            <Route path="/register" element={<Register auth={auth} />} />
            
            {/* Protected user routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <UserDashboard auth={auth} />
              </ProtectedRoute>
            } />
            <Route path="/course/:courseId" element={
              <ProtectedRoute>
                <Course />
              </ProtectedRoute>
            } />
            
            {/* Protected admin routes */}
            <Route path="/admin" element={
              <ProtectedRoute requiresAdmin={true}>
                <AdminDashboard auth={auth} />
              </ProtectedRoute>
            } />
            <Route path="/admin/courses" element={
              <ProtectedRoute requiresAdmin={true}>
                <AdminCourses auth={auth} />
              </ProtectedRoute>
            } />
            <Route path="/admin/modules/:courseId" element={
              <ProtectedRoute requiresAdmin={true}>
                <AdminModules auth={auth} />
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute requiresAdmin={true}>
                <AdminUsers auth={auth} />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
