import { Link } from "wouter";
import backgroundVideo from "@/assets/videos/background-video.mp4";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Ativa a animação após o componente montar
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

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
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight text-white">
                  <span className="block mb-2">Soluções Premium em</span>
                  <span className="text-light-blue">Faróis Automotivos</span>
                </h1>
                <p className="text-xl md:text-2xl mb-10 text-white/90 font-medium leading-relaxed max-w-3xl">
                  Elevando o padrão de iluminação veicular para lojas, oficinas e distribuidores em todo o Brasil.
                </p>
                
                <div className="mt-12 flex flex-col sm:flex-row gap-6">
                  <Link 
                    href="/contato" 
                    className="bg-medium-blue hover:bg-light-blue text-white text-xl font-bold py-5 px-10 rounded-md text-center shadow-custom-intense btn-cta group relative overflow-hidden"
                  >
                    <span className="relative z-10">Solicite seu orçamento</span>
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 opacity-70 group-hover:opacity-100 group-hover:translate-x-2">→</span>
                  </Link>
                  <Link 
                    href="/quem-somos" 
                    className="border-2 border-white/30 hover:border-white/80 bg-transparent text-white text-xl font-bold py-5 px-10 rounded-md text-center shadow-custom-intense btn-cta"
                  >
                    Conheça nossa empresa
                  </Link>
                </div>
                
                {/* Marcadores de credibilidade */}
                <div className="mt-12 flex flex-wrap gap-8 items-center">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-light-blue/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-light-blue">
                        <path d="M12 22V8" /><path d="m5 12 7-4 7 4" /><path d="M5 12v4a7 7 0 0 0 14 0v-4" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <span className="block text-sm text-white/70">Experiência</span>
                      <span className="block text-xl font-bold">+15 anos</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-light-blue/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-light-blue">
                        <path d="m9 12 2 2 4-4" /><circle cx="12" cy="12" r="10" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <span className="block text-sm text-white/70">Garantia</span>
                      <span className="block text-xl font-bold">Qualidade Premium</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Coluna da direita - Elemento visual */}
          <div 
            className={`md:col-span-5 transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <div className="relative mx-auto max-w-md">
              {/* Elemento central com efeito de profundidade */}
              <div className="relative w-full aspect-square rounded-[40px] border border-white/20 bg-dark-blue/40 backdrop-blur-xl overflow-hidden shadow-2xl">
                {/* Efeito de brilho interno */}
                <div className="absolute inset-0 bg-gradient-to-br from-light-blue/10 via-transparent to-transparent"></div>
                
                {/* Círculos concêntricos com efeito de luz */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 rounded-full border border-white/10 flex items-center justify-center animate-[spin_30s_linear_infinite]">
                    <div className="w-2/3 h-2/3 rounded-full border border-white/20 flex items-center justify-center animate-[spin_20s_linear_infinite_reverse]">
                      <div className="w-1/2 h-1/2 rounded-full bg-light-blue/30 flex items-center justify-center animate-pulse">
                        <div className="w-1/2 h-1/2 rounded-full bg-light-blue/60 shadow-lg shadow-light-blue/20"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Linhas que saem do centro */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full rotate-[10deg] animate-[spin_60s_linear_infinite_reverse]">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
                  </div>
                </div>
              </div>
              
              {/* Elementos decorativos ao redor */}
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-light-blue/20 backdrop-blur-xl border border-white/20 animate-[bounce_6s_ease-in-out_infinite_alternate]"></div>
              <div className="absolute -bottom-10 -left-6 w-16 h-16 rounded-full bg-medium-blue/30 backdrop-blur-xl border border-white/20 animate-[bounce_7s_ease-in-out_infinite_alternate-reverse]"></div>
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
