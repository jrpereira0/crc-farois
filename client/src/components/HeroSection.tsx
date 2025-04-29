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
    <section className="relative text-white overflow-hidden min-h-[100vh] flex items-center">
      {/* Background video com efeito de overlay mais profissional */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute w-full h-full object-cover"
          style={{ minWidth: '100%', minHeight: '100%' }}
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
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight tracking-tight">
                  <span className="block mb-3 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">Soluções Premium em</span>
                  <span className="text-light-blue drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">Faróis Automotivos</span>
                </h1>
                <p className="text-xl md:text-2xl mb-12 text-white font-medium leading-relaxed max-w-3xl drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
                  Elevando o padrão de iluminação veicular para lojas, oficinas e distribuidores em todo o Brasil.
                </p>
                
                <div className="mt-12 flex flex-col sm:flex-row gap-6">
                  <Link 
                    href="/contato" 
                    className="bg-medium-blue hover:bg-light-blue text-white text-xl font-extrabold py-6 px-10 rounded-md text-center shadow-xl btn-cta group relative overflow-hidden"
                  >
                    <span className="relative z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">Solicite seu orçamento</span>
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 opacity-70 group-hover:opacity-100 group-hover:translate-x-2">→</span>
                  </Link>
                  <Link 
                    href="/quem-somos" 
                    className="border-2 border-white/50 hover:border-white bg-transparent hover:bg-white/10 text-white hover:text-white text-xl font-extrabold py-6 px-10 rounded-md text-center shadow-xl btn-cta"
                  >
                    <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">Conheça nossa empresa</span>
                  </Link>
                </div>
                
                {/* Marcadores de credibilidade */}
                <div className="mt-12 flex flex-wrap gap-8 items-center">
                  <div className="flex items-center bg-dark-blue/40 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10 shadow-lg transform hover:scale-105 transition-transform">
                    <div className="w-14 h-14 rounded-full bg-light-blue/20 flex items-center justify-center glow-effect">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-light-blue">
                        <path d="M12 22V8" /><path d="m5 12 7-4 7 4" /><path d="M5 12v4a7 7 0 0 0 14 0v-4" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <span className="block text-sm text-white/80 font-medium">Experiência</span>
                      <span className="block text-2xl font-extrabold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">+15 anos</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center bg-dark-blue/40 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10 shadow-lg transform hover:scale-105 transition-transform">
                    <div className="w-14 h-14 rounded-full bg-light-blue/20 flex items-center justify-center glow-effect">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-light-blue">
                        <path d="m9 12 2 2 4-4" /><circle cx="12" cy="12" r="10" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <span className="block text-sm text-white/80 font-medium">Garantia</span>
                      <span className="block text-2xl font-extrabold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">Qualidade Premium</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Coluna da direita - Carrossel de imagens reais */}
          <div 
            className={`md:col-span-5 transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <div className="relative mx-auto max-w-md">
              {/* Carrossel de imagens */}
              <div className="relative w-full aspect-[4/3] rounded-[30px] border-4 border-white/20 overflow-hidden shadow-2xl glow-effect">
                {/* Container para as imagens com efeito de transição */}
                <div className="relative w-full h-full">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                        index === activeImage ? 'opacity-100 z-10' : 'opacity-0 z-0'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`Farol automotivo de alta qualidade ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  
                  {/* Overlay de gradiente para garantir contraste com os indicadores */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/70 via-transparent to-transparent z-20"></div>
                </div>
                
                {/* Indicadores de imagem */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-30">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === activeImage 
                          ? 'bg-white scale-125' 
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                      aria-label={`Ver imagem ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Elementos decorativos ao redor */}
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full decorative-circle animate-float"></div>
              <div className="absolute -bottom-10 -left-6 w-16 h-16 rounded-full decorative-circle animate-[bounce_7s_ease-in-out_infinite_alternate-reverse]"></div>
              
              {/* Badge flutuante */}
              <div className="absolute -top-2 -left-2 bg-light-blue text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold tracking-wide animate-[bounce_4s_ease-in-out_infinite_alternate] z-30">
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
