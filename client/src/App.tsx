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
import { useEffect } from "react";

function Router() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith('/admin');
  
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
      {!isAdminRoute && <Header />}
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/admin/dashboard" component={Admin} />
        <Route path="/admin/contacts" component={Admin} />
        <Route path="/admin/contacts/all" component={Admin} />
        <Route path="/admin/contacts/pending" component={Admin} />
        <Route path="/admin/contacts/in-progress" component={Admin} />
        <Route path="/admin/contacts/completed" component={Admin} />
        <Route path="/admin/settings" component={Admin} />
        <Route path="/quem-somos" component={QuemSomos} />
        <Route path="/contato" component={Contato} />
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <BackToTop />}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
