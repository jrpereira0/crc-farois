import { Link } from "wouter";
import backgroundVideo from "@/assets/videos/background-video.mp4";

const HeroSection = () => {
  return (
    <section className="relative text-white overflow-hidden min-h-[90vh]">
      {/* Background video */}
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
        <div className="absolute inset-0 bg-gradient-to-r from-dark-blue/95 via-medium-blue/85 to-dark-blue/90"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-28 md:py-36 lg:py-40 relative z-10">
        <div className="flex justify-center items-center">
          <div 
            className="max-w-4xl text-center"
            data-aos="fade-up" 
            data-aos-duration="1000"
            data-aos-delay="100"
          >
            <div className="bg-dark-blue/60 backdrop-blur-xl p-8 md:p-10 lg:p-12 rounded-xl shadow-custom-intense border border-white/20">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight tracking-tight text-white">
                Soluções em <span className="text-light-blue">Faróis Automotivos</span> para o seu Negócio
              </h1>
              <p className="text-xl mb-10 text-white font-medium leading-relaxed max-w-3xl mx-auto">
                Fornecemos faróis de alta qualidade para lojas, oficinas e distribuidores em todo o Brasil.
              </p>
              <div className="flex flex-col md:flex-row justify-center space-y-5 md:space-y-0 md:space-x-8">
                <Link 
                  href="/contato" 
                  className="bg-medium-blue hover:bg-light-blue text-white text-xl font-bold py-5 px-10 rounded-lg text-center shadow-custom-intense btn-cta"
                >
                  Solicite seu orçamento agora
                </Link>
                <Link 
                  href="/quem-somos" 
                  className="bg-white hover:bg-light-gray text-dark-blue text-xl font-bold py-5 px-10 rounded-lg text-center shadow-custom-intense btn-cta"
                >
                  Conheça nossa empresa
                </Link>
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
