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
import PageTransition from "./components/PageTransition";

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
      
      <PageTransition location={location}>
        <Switch>
          <Route path="/login">
            {(params) => <LoginPage />}
          </Route>

          {/* Todas as rotas admin são protegidas */}
          <Route path="/admin">
            {(params) => <ProtectedAdminRoute />}
          </Route>
          <Route path="/admin/:rest*">
            {(params) => <ProtectedAdminRoute />}
          </Route>
          
          {/* Rotas públicas */}
          <Route path="/quem-somos">
            {(params) => <QuemSomos />}
          </Route>
          <Route path="/contato">
            {(params) => <Contato />}
          </Route>
          <Route path="/">
            {(params) => <Home />}
          </Route>
          <Route>
            {(params) => <NotFound />}
          </Route>
        </Switch>
      </PageTransition>
      
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
