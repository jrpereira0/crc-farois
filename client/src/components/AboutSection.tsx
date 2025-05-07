import aboutUsBg from "@/assets/images/about-us-bg.svg";
import { motion } from "framer-motion";
import { CheckCircle, Target, Award, AlertTriangle, Truck, Users } from "lucide-react";

const AboutSection = () => {
  const timelineItems = [
    { year: "2020", event: "Desenvolvimento de Moldes" },
    { year: "2021", event: "Primeiros testes e ajustes de projeto" },
    { year: "2022", event: "Inicio das operações e desenvolvimento fabril" },
    { year: "2023", event: "Primeiros lotes de peças e contato com mercado" },
    { year: "2024", event: "Desenvolvimento de novos faróis e robotização de processos" },
    { year: "2025", event: "Projetos em andamento..." }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={aboutUsBg} 
          alt="Background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2" data-aos="fade-right" data-aos-duration="1000">
            <div className="relative">
              {/* Main video/image container with blue overlay */}
              <div className="bg-gradient-to-tr from-primary/70 to-primary/40 rounded-2xl h-96 lg:h-[500px] w-full overflow-hidden shadow-xl transform rotate-1">
                {/* We're using this div as a background for the moment */}
                <div className="absolute inset-0 bg-blue-800/10">
                  {/* Factory/manufacturing decorative elements */}
                  <div className="absolute bottom-10 left-10 right-10 h-40 border-t-2 border-white/20"></div>
                  <div className="absolute bottom-10 left-20 h-60 w-20 border-l-2 border-r-2 border-white/20"></div>
                  <div className="absolute bottom-10 right-20 h-40 w-20 border-l-2 border-r-2 border-white/20"></div>
                  <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 h-80 w-40 border-l-2 border-r-2 border-t-2 rounded-t-full border-white/20"></div>
                  
                  {/* Animated gear elements */}
                  <div className="absolute top-20 left-20 w-16 h-16 border-4 border-white/30 rounded-full animate-spin" style={{ animationDuration: '15s' }}></div>
                  <div className="absolute top-40 right-20 w-12 h-12 border-4 border-white/30 rounded-full animate-spin" style={{ animationDuration: '10s' }}></div>
                </div>
                
                {/* Company name overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white p-6 bg-primary/50 backdrop-blur-sm rounded-xl border border-white/10">
                    <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-2">CRC FARÓIS</h1>
                    <p className="text-xl">Excelência em iluminação automotiva</p>
                    <div className="mt-4 flex items-center justify-center">
                      <span className="inline-block w-3 h-3 bg-white rounded-full animate-pulse mr-2"></span>
                      <span className="text-sm">Desde 2022</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative element */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-100 rounded-full z-[-1] opacity-50"></div>
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-primary/20 rounded-full z-[-1]"></div>
            </div>
            
            {/* Timeline */}
            <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100" data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-xl font-bold font-montserrat mb-6 text-darkgray inline-flex items-center">
                <span className="w-8 h-8 bg-primary/10 flex items-center justify-center rounded-full mr-2">
                  <span className="text-primary text-sm">3+</span>
                </span>
                Nossa História
              </h3>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-blue-100"></div>
                
                {/* Timeline items */}
                <div className="space-y-4">
                  {timelineItems.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center relative z-10 mt-0.5">
                        <span className="text-xs">{index + 1}</span>
                      </div>
                      <div className="ml-4">
                        <span className="text-primary font-bold">{item.year}</span>
                        <p className="text-darkgray">{item.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2" data-aos="fade-left" data-aos-duration="1000">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-100">
              <span className="text-primary font-semibold bg-blue-100 px-4 py-1 rounded-full text-sm mb-4 inline-block">NOSSA EMPRESA</span>
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-6 text-darkgray">
                Quem Somos
              </h2>
              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">
                  A <strong className="text-primary">CRC Faróis</strong> é uma empresa especializada na fabricação e fornecimento de faróis automotivos de alta qualidade, atendendo lojas, oficinas e distribuidores em todo o Brasil há mais de 3 anos.
                </p>
                <p className="leading-relaxed">
                  Iniciamos nossas atividades em 2022, com o objetivo de oferecer produtos com excelência técnica e preços competitivos para o mercado de reposição automotiva. Ao longo desse período, consolidamos nossa posição como um dos principais fabricantes de faróis dos modelos fabricados.
                </p>
                <p className="leading-relaxed">
                  Contamos com uma equipe altamente capacitada e uma estrutura de produção moderna, o que nos permite desenvolver produtos que atendem às mais rigorosas normas de segurança e qualidade.
                </p>
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-50">
                  <div className="flex items-start mb-4">
                    <div className="bg-primary/10 p-2 rounded-lg mr-3">
                      <Target className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold font-montserrat text-darkgray">Nossa Missão</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Fornecer produtos de iluminação automotiva de alta qualidade, contribuindo para a segurança no trânsito e para o sucesso dos nossos parceiros comerciais.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-50">
                  <div className="flex items-start mb-4">
                    <div className="bg-primary/10 p-2 rounded-lg mr-3">
                      <Award className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold font-montserrat text-darkgray">Nossa Visão</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Ser reconhecida como a principal referência no mercado brasileiro de faróis automotivos, oferecendo soluções inovadoras e sustentáveis.
                  </p>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-bold font-montserrat mb-6 text-darkgray flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-2" />
                  Nossos Valores
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-1.5 rounded-md mr-3">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-gray-600 text-sm">Qualidade e excelência em todos os processos</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-1.5 rounded-md mr-3">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-gray-600 text-sm">Compromisso com a satisfação do cliente</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-1.5 rounded-md mr-3">
                      <AlertTriangle className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-gray-600 text-sm">Integridade e transparência nas relações</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-1.5 rounded-md mr-3">
                      <Truck className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-gray-600 text-sm">Inovação constante em produtos e serviços</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <a 
                  href="/contato" 
                  className="inline-flex items-center justify-center bg-primary hover:bg-darkblue text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Conheça mais sobre nossa história
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
