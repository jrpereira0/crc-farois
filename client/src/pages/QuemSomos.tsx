import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/CTASection";
import { useEffect } from "react";

const QuemSomos = () => {
  useEffect(() => {
    // Atualize o título da página
    document.title = "Quem Somos | CRC Faróis";
    
    // Reiniciar AOS após a montagem do componente
    // @ts-ignore
    if (typeof AOS !== 'undefined') {
      // @ts-ignore
      AOS.refresh();
    }
    
    // Rolar para o topo da página
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <div className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-6" data-aos="fade-up">
            Quem Somos
          </h1>
          <p className="text-xl max-w-3xl" data-aos="fade-up" data-aos-delay="100">
            Conheça a CRC Faróis, referência em fabricação e fornecimento de faróis automotivos de alta qualidade.
          </p>
        </div>
      </div>
      
      <AboutSection />
      <CTASection />
    </main>
  );
};

export default QuemSomos;
