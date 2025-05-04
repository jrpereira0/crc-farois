import { useState } from "react";
import testimonialsBackground from "@/assets/images/testimonial-bg.svg";

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      text: "Trabalhamos com a CRC Faróis há mais de 5 anos. Os produtos são de excelente qualidade e o atendimento é sempre impecável. Nossa oficina só utiliza faróis deles. A durabilidade dos produtos faz toda a diferença para nossos clientes finais.",
      name: "Roberto Mendes",
      position: "Proprietário",
      company: "Auto Peças São Paulo",
      location: "São Paulo - SP",
      stars: 5,
      image: "https://randomuser.me/api/portraits/men/32.jpg" // Imagem placeholder que pode ser substituída
    },
    {
      text: "Como distribuidor de peças automotivas, precisamos de fornecedores confiáveis. A CRC Faróis entrega sempre no prazo e com a qualidade que prometem. A equipe de suporte técnico também é excelente, sempre pronta para nos atender.",
      name: "Ana Carvalho",
      position: "Gerente de Compras",
      company: "Distribuidora AutoParts",
      location: "Rio de Janeiro - RJ",
      stars: 5,
      image: "https://randomuser.me/api/portraits/women/44.jpg" // Imagem placeholder que pode ser substituída
    },
    {
      text: "Os faróis da CRC têm excelente custo-benefício. Nossas vendas aumentaram significativamente desde que começamos a trabalhar com eles. Os clientes sempre retornam com feedback positivo sobre a qualidade e durabilidade dos produtos.",
      name: "Carlos Oliveira",
      position: "Diretor Comercial",
      company: "Loja Acessórios Veiculares",
      location: "Belo Horizonte - MG",
      stars: 4.5,
      image: "https://randomuser.me/api/portraits/men/62.jpg" // Imagem placeholder que pode ser substituída
    }
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`star-full-${i}`} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="star-half" className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
          <path d="M12 17.27V2" fill="none" stroke="#ffffff" strokeWidth="1.5" />
          <path d="M12 2v15.27" fill="none" stroke="#1e293b" strokeWidth="1.5" />
        </svg>
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`star-empty-${i}`} className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    }

    return stars;
  };

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const setTestimonial = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={testimonialsBackground} 
          alt="Background" 
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="800">
          <span className="text-primary font-semibold bg-blue-100 px-4 py-1 rounded-full text-sm mb-4 inline-block">CLIENTES SATISFEITOS</span>
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4 text-darkgray">
            O que nossos clientes dizem
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A satisfação dos nossos clientes é o nosso maior reconhecimento. 
            Veja o que nossos parceiros têm a dizer sobre nossos produtos e serviços.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main testimonial */}
          <div 
            className="bg-white rounded-2xl p-8 md:p-10 shadow-xl border border-gray-100 relative"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            {/* Large quote mark */}
            <div className="absolute top-6 left-6 opacity-10">
              <svg width="80" height="60" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 60L30 0H50L30 60H0ZM45 60L75 0H80L60 60H45Z" fill="#0047AB"/>
              </svg>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center relative z-10">
              {/* Image and name */}
              <div className="flex flex-col items-center text-center md:text-left">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary/10 shadow-lg mb-4">
                  <img 
                    src={testimonials[activeIndex].image} 
                    alt={testimonials[activeIndex].name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex mb-2">
                  {renderStars(testimonials[activeIndex].stars)}
                </div>
                <h4 className="font-bold text-lg text-darkgray">{testimonials[activeIndex].name}</h4>
                <p className="text-sm text-gray-500 mb-1">{testimonials[activeIndex].position}</p>
                <p className="text-sm font-medium text-primary">{testimonials[activeIndex].company}</p>
                <p className="text-xs text-gray-500">{testimonials[activeIndex].location}</p>
              </div>
              
              {/* Testimonial text */}
              <div className="flex-1">
                <p className="text-lg md:text-xl text-gray-700 italic leading-relaxed">
                  "{testimonials[activeIndex].text}"
                </p>
              </div>
            </div>
            
            {/* Navigation controls */}
            <div className="flex justify-between mt-10">
              <button
                onClick={prevTestimonial}
                className="bg-gray-100 hover:bg-primary hover:text-white text-gray-500 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                aria-label="Depoimento anterior"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeIndex === index ? 'bg-primary scale-125' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Ir para depoimento ${index + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextTestimonial}
                className="bg-gray-100 hover:bg-primary hover:text-white text-gray-500 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                aria-label="Próximo depoimento"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Testimonial summary */}
          <div className="mt-12 bg-blue-50 rounded-lg p-6 shadow-inner flex flex-col md:flex-row items-center justify-between" data-aos="fade-up" data-aos-delay="200">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h3 className="text-xl font-bold text-darkgray mb-2">Junte-se aos nossos clientes satisfeitos</h3>
              <p className="text-gray-600">Descubra a qualidade que faz a diferença no seu negócio.</p>
            </div>
            <button className="bg-primary hover:bg-darkblue text-white font-medium py-3 px-6 rounded-md transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Solicitar orçamento
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
