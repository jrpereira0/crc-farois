import { Link } from "wouter";
import backgroundVideo from "@/assets/videos/background-video.mp4";
import { useEffect, useState, useCallback } from "react";
import image1 from "@/assets/images/FOTO1.png";
import image2 from "@/assets/images/FOTO2.png";
import image3 from "@/assets/images/FOTO3.png";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const images = [image1, image2, image3];

  // Função para rodar o carrossel de imagens
  const rotateImages = useCallback(() => {
    setActiveImage((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    // Ativa a animação após o componente montar
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    // Configura o intervalo para trocar as imagens a cada 3 segundos
    const imageInterval = setInterval(rotateImages, 3000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(imageInterval);
    };
  }, [rotateImages]);

  return (
    <section className="relative text-white overflow-hidden min-h-[90vh] flex items-center">
      {/* Background video com efeito de overlay mais profissional */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source src={backgroundVideo} type="video/mp4" />
          Seu navegador não suporta vídeos HTML5.
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-dark-blue/90 via-medium-blue/75 to-dark-blue/95"></div>
        
        {/* Padrão de pontos */}
        <div className="absolute inset-0 opacity-10" 
          style={{ 
            backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', 
            backgroundSize: '30px 30px' 
          }}
        ></div>
      </div>
      
      {/* Content com layout mais impactante */}
      <div className="container mx-auto px-4 py-20 relative z-10 w-full">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          {/* Coluna da esquerda - Texto principal */}
          <div 
            className={`md:col-span-7 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <div className="relative">
              <div className="absolute -left-4 top-0 w-2 h-24 bg-light-blue rounded-full"></div>
              <div className="pl-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight tracking-tight">
                  <span className="block mb-1 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">Soluções Premium em</span>
                  <span className="text-light-blue drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">Faróis Automotivos</span>
                </h1>
                <p className="text-base md:text-lg mb-8 text-white font-medium leading-relaxed max-w-2xl drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
                  Elevando o padrão de iluminação veicular para lojas, oficinas e distribuidores em todo o Brasil.
                </p>
                
                <div className="mt-10 flex flex-col sm:flex-row gap-5">
                  <Link 
                    href="/contato" 
                    className="bg-medium-blue hover:bg-light-blue text-white text-lg font-bold py-4 px-8 rounded-md text-center shadow-xl btn-cta group relative overflow-hidden"
                  >
                    <span className="relative z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">Solicite seu orçamento</span>
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-all duration-300 opacity-70 group-hover:opacity-100 group-hover:translate-x-2">→</span>
                  </Link>
                  <Link 
                    href="/quem-somos" 
                    className="border-2 border-white/50 hover:border-white bg-transparent hover:bg-white/10 text-white hover:text-white text-lg font-bold py-4 px-8 rounded-md text-center shadow-xl btn-cta"
                  >
                    <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">Conheça nossa empresa</span>
                  </Link>
                </div>
                
                {/* Marcadores de credibilidade */}
                <div className="mt-10 flex flex-wrap gap-6 items-center">
                  <div className="flex items-center bg-dark-blue/40 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10 shadow-lg transform hover:scale-105 transition-transform">
                    <div className="w-12 h-12 rounded-full bg-light-blue/20 flex items-center justify-center glow-effect">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-light-blue">
                        <path d="M12 22V8" /><path d="m5 12 7-4 7 4" /><path d="M5 12v4a7 7 0 0 0 14 0v-4" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <span className="block text-xs text-white/80 font-medium">Experiência</span>
                      <span className="block text-xl font-bold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">+15 anos</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center bg-dark-blue/40 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10 shadow-lg transform hover:scale-105 transition-transform">
                    <div className="w-12 h-12 rounded-full bg-light-blue/20 flex items-center justify-center glow-effect">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-light-blue">
                        <path d="m9 12 2 2 4-4" /><circle cx="12" cy="12" r="10" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <span className="block text-xs text-white/80 font-medium">Garantia</span>
                      <span className="block text-xl font-bold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">Qualidade Premium</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Coluna da direita - Composição de imagens flutuantes */}
          <div 
            className={`md:col-span-5 transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <div className="relative mx-auto h-[320px] md:h-[380px] w-full max-w-[90%]">
              {/* Três imagens flutuantes com profundidade */}
              
              {/* Imagem 1 - Maior e central */}
              <div 
                className="absolute top-[15%] md:top-[10%] left-1/2 transform -translate-x-1/2 w-[60%] md:w-[55%] h-[50%] z-20 rounded-lg shadow-xl overflow-hidden border border-white/30 animate-[bounce_12s_ease-in-out_infinite_alternate] glow-effect"
                style={{ animationDelay: "0.5s" }}
              >
                <img 
                  src={image1} 
                  alt="Farol automotivo premium"
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/40 to-transparent"></div>
              </div>
              
              {/* Imagem 2 - Esquerda e ligeiramente menor */}
              <div 
                className="absolute top-[30%] md:top-[25%] left-[8%] md:left-[12%] w-[40%] md:w-[38%] h-[40%] z-10 rounded-lg shadow-lg overflow-hidden border border-white/20 animate-[bounce_10s_ease-in-out_infinite_reverse] rotate-[-6deg]"
                style={{ animationDelay: "1.5s" }}
              >
                <img 
                  src={image2} 
                  alt="Design de farol moderno"
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-dark-blue/30 to-transparent"></div>
              </div>
              
              {/* Imagem 3 - Direita */}
              <div 
                className="absolute top-[40%] md:top-[35%] right-[8%] md:right-[12%] w-[40%] md:w-[38%] h-[40%] z-10 rounded-lg shadow-lg overflow-hidden border border-white/20 animate-[bounce_11s_ease-in-out_infinite_alternate] rotate-[8deg]"
                style={{ animationDelay: "2.5s" }}
              >
                <img 
                  src={image3} 
                  alt="Farol de alta performance"
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-l from-dark-blue/30 to-transparent"></div>
              </div>
              
              {/* Elementos decorativos */}
              <div className="absolute top-[5%] left-[20%] w-16 h-16 rounded-full decorative-circle opacity-80 animate-float"></div>
              <div className="absolute bottom-[10%] right-[15%] w-12 h-12 rounded-full decorative-circle opacity-70 animate-[bounce_7s_ease-in-out_infinite_alternate-reverse]"></div>
              
              {/* Detalhe circular com brilho */}
              <div className="absolute bottom-[5%] left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full bg-light-blue/10 backdrop-blur-md border border-white/10 shadow-md flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-light-blue/20 flex items-center justify-center animate-[spin_30s_linear_infinite]">
                  <div className="w-8 h-8 rounded-full bg-light-blue/40 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-light-blue/60 glow-effect"></div>
                  </div>
                </div>
              </div>
              
              {/* Badge flutuante */}
              <div className="absolute top-[3%] right-[15%] bg-light-blue text-white px-3 py-1 rounded-full shadow-md text-xs font-bold tracking-wide animate-[bounce_4s_ease-in-out_infinite_alternate] z-30">
                Qualidade Premium
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave decoration at bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#ffffff">
          <path d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
