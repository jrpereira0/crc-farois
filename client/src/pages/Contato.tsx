import ContactSection from "@/components/ContactSection";
import { useEffect } from "react";

const Contato = () => {
  useEffect(() => {
    // Atualize o título da página
    document.title = "Contato | CRC Faróis";
    
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
            Entre em Contato
          </h1>
          <p className="text-xl max-w-3xl" data-aos="fade-up" data-aos-delay="100">
            Estamos prontos para atender sua empresa e fornecer os melhores produtos para o seu negócio.
          </p>
        </div>
      </div>
      
      <ContactSection />
    </main>
  );
};

export default Contato;
