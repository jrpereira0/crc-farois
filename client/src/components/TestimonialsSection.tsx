const TestimonialsSection = () => {
  const testimonials = [
    {
      text: "Trabalhamos com a CRC Faróis há mais de 5 anos. Os produtos são de excelente qualidade e o atendimento é sempre impecável. Nossa oficina só utiliza faróis deles.",
      name: "Roberto Mendes",
      company: "Auto Peças São Paulo",
      stars: 5
    },
    {
      text: "Como distribuidor de peças automotivas, precisamos de fornecedores confiáveis. A CRC Faróis entrega sempre no prazo e com a qualidade que prometem.",
      name: "Ana Carvalho",
      company: "Distribuidora AutoParts",
      stars: 5
    },
    {
      text: "Os faróis da CRC têm excelente custo-benefício. Nossas vendas aumentaram significativamente desde que começamos a trabalhar com eles.",
      name: "Carlos Oliveira",
      company: "Loja Acessórios Veiculares",
      stars: 4.5
    }
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`star-${i}`} className="fas fa-star"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half-star" className="fas fa-star-half-alt"></i>);
    }

    return stars;
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="800">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4 text-darkgray">
            O que nossos clientes dizem
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A satisfação dos nossos clientes é o nosso maior reconhecimento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-lightgray rounded-lg p-8 shadow-sm transition-transform hover:transform hover:scale-105 duration-300" 
              data-aos="fade-up" 
              data-aos-delay={100 * (index + 1)}
            >
              <div className="text-yellow-400 flex mb-4">
                {renderStars(testimonial.stars)}
              </div>
              <p className="text-gray-600 italic mb-6">
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 flex items-center justify-center text-gray-600">
                  <i className="fas fa-user"></i>
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
