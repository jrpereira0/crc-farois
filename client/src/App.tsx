import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import QuemSomos from "@/pages/QuemSomos";
import Contato from "@/pages/Contato";
import Admin from "./pages/Admin";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import LoginPage from "./pages/LoginPage";
import { AuthProvider, ProtectedRoute } from "./hooks/use-auth";

// Componente que envolve as rotas administrativas com o ProtectedRoute
const ProtectedAdminRoute = () => {
  return (
    <ProtectedRoute>
      <Admin />
    </ProtectedRoute>
  );
};

function Router() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith('/admin');
  const isLoginRoute = location === '/login';
  
  // Inicializar AOS após renderização dos componentes
  useEffect(() => {
    // @ts-ignore
    if (typeof AOS !== 'undefined') {
      // @ts-ignore
      AOS.refresh();
    }
  }, []);

  return (
    <>
      {!isAdminRoute && !isLoginRoute && <Header />}
      <Switch>
        <Route path="/login" component={LoginPage} />

        {/* Todas as rotas admin são protegidas */}
        <Route path="/admin/:rest*" component={ProtectedAdminRoute} />
        
        {/* Rotas públicas */}
        <Route path="/quem-somos" component={QuemSomos} />
        <Route path="/contato" component={Contato} />
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
      {!isAdminRoute && !isLoginRoute && <Footer />}
      {!isAdminRoute && !isLoginRoute && <BackToTop />}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />
        <Router />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
