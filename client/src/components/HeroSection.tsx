import { Link } from "wouter";
import heroBackground from "@/assets/images/hero-background.svg";

const HeroSection = () => {
  return (
    <section className="relative text-white overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img 
          src={heroBackground} 
          alt="Faróis automotivos" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-darkblue/90 to-primary/70"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-28 md:py-36 lg:py-40 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div 
            className="md:w-1/2 max-w-3xl mb-12 md:mb-0" 
            data-aos="fade-right" 
            data-aos-duration="1000"
            data-aos-delay="100"
          >
            <div className="bg-darkblue/50 backdrop-blur-md p-6 md:p-8 lg:p-10 rounded-xl shadow-custom-intense border border-white/20">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
                Soluções em <span className="text-white">Faróis Automotivos</span> para o seu Negócio
              </h1>
              <p className="text-xl mb-8 text-white font-medium">
                Fornecemos faróis de alta qualidade para lojas, oficinas e distribuidores em todo o Brasil.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  href="/contato" 
                  className="bg-dark-blue hover:bg-medium-blue text-white text-lg font-semibold py-3 px-6 rounded-md transition-all duration-500 text-center shadow-custom-intense hover:shadow-custom-glow transform hover:-translate-y-1 btn-shine btn-pulse"
                >
                  Solicite seu orçamento agora
                </Link>
                <Link 
                  href="/quem-somos" 
                  className="bg-white hover:bg-light-gray text-dark-blue text-lg font-semibold py-3 px-6 rounded-md transition-all duration-500 text-center shadow-custom-intense hover:shadow-custom-glow transform hover:scale-105 btn-shine"
                >
                  Conheça nossa empresa
                </Link>
              </div>
            </div>
          </div>
          
          {/* Animation for light beams */}
          <div 
            className="md:w-1/2 flex justify-center items-center"
            data-aos="fade-left" 
            data-aos-duration="1200"
            data-aos-delay="300"
          >
            <div className="relative">
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-white/20 flex items-center justify-center">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-primary/40 flex items-center justify-center animate-pulse">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white shadow-lg shadow-white/50"></div>
                  </div>
                </div>
              </div>
              
              {/* Light rays */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                <div className="absolute h-[300%] w-1 bg-gradient-to-t from-white/0 via-white/30 to-white/0 animate-[spin_8s_linear_infinite] origin-bottom" style={{ transformOrigin: 'bottom center' }}></div>
                <div className="absolute h-[300%] w-1 bg-gradient-to-t from-white/0 via-white/20 to-white/0 animate-[spin_10s_linear_infinite] origin-bottom rotate-45" style={{ transformOrigin: 'bottom center' }}></div>
                <div className="absolute h-[300%] w-1 bg-gradient-to-t from-white/0 via-white/10 to-white/0 animate-[spin_12s_linear_infinite] origin-bottom rotate-90" style={{ transformOrigin: 'bottom center' }}></div>
                <div className="absolute h-[300%] w-1 bg-gradient-to-t from-white/0 via-white/30 to-white/0 animate-[spin_9s_linear_infinite] origin-bottom rotate-135" style={{ transformOrigin: 'bottom center' }}></div>
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
