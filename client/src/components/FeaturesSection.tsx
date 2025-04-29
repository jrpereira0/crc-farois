const FeaturesSection = () => {
  const features = [
    {
      icon: "fas fa-award",
      title: "Qualidade Premium",
      description: "Nossos faróis automotivos são fabricados com os melhores materiais, garantindo durabilidade e desempenho superior."
    },
    {
      icon: "fas fa-truck",
      title: "Entrega Rápida",
      description: "Sistema logístico eficiente que garante a entrega dos produtos no prazo combinado para todo o território nacional."
    },
    {
      icon: "fas fa-tools",
      title: "Suporte Técnico",
      description: "Equipe especializada para oferecer assistência técnica e tirar todas as suas dúvidas sobre nossos produtos."
    },
    {
      icon: "fas fa-tags",
      title: "Preços Competitivos",
      description: "Oferecemos condições especiais para revendedores e distribuidores, com preços justos e competitivos."
    },
    {
      icon: "fas fa-cogs",
      title: "Amplo Catálogo",
      description: "Diversidade de faróis automotivos para atender diferentes modelos e marcas de veículos no mercado."
    },
    {
      icon: "fas fa-certificate",
      title: "Garantia Estendida",
      description: "Todos os nossos produtos contam com garantia estendida, demonstrando nossa confiança na qualidade oferecida."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="800">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4 text-darkgray">Nossos Diferenciais</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Compromisso com qualidade e atendimento eficiente fazem da CRC Faróis a melhor escolha para o seu negócio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-lightgray rounded-lg p-8 shadow-sm transition-transform hover:transform hover:scale-105 duration-300" 
              data-aos="fade-up" 
              data-aos-delay={100 * (index + 1)}
            >
              <div className="text-primary text-4xl mb-4">
                <i className={feature.icon}></i>
              </div>
              <h3 className="text-xl font-bold font-montserrat mb-3">{feature.title}</h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
