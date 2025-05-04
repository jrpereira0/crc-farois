import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ProductsSection from "@/components/ProductsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    // Atualize o título da página
    document.title = "CRC Faróis | Fabricação e Fornecimento de Faróis Automotivos";
    
    // Reiniciar AOS após a montagem do componente
    // @ts-ignore
    if (typeof AOS !== 'undefined') {
      // @ts-ignore
      AOS.refresh();
    }
  }, []);

  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <ProductsSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
};

export default Home;
