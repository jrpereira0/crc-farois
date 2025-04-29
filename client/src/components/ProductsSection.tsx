import { Link } from "wouter";

const ProductsSection = () => {
  const products = [
    {
      title: "Faróis Principais",
      description: "Faróis dianteiros de alta qualidade para diversos modelos de veículos, com tecnologia LED e halógena."
    },
    {
      title: "Lanternas Traseiras",
      description: "Conjunto completo de lanternas traseiras com design moderno e sinalização eficiente para maior segurança."
    },
    {
      title: "Faróis Auxiliares",
      description: "Faróis de neblina e auxiliares para complementar a iluminação e garantir maior visibilidade em condições adversas."
    }
  ];

  return (
    <section className="py-20 bg-lightgray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="800">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4 text-darkgray">
            Nossos Produtos
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Oferecemos uma linha completa de faróis automotivos para diversos modelos e marcas de veículos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:transform hover:scale-105 duration-300" 
              data-aos="fade-up" 
              data-aos-delay={100 * (index + 1)}
            >
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <svg className="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 15h16v-2H4v2zm0 4h16v-2H4v2zm0-8h16V9H4v2zm0-6v2h16V5H4z"></path>
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold font-montserrat mb-2">{product.title}</h3>
                <p className="text-gray-600 mb-4">
                  {product.description}
                </p>
                <Link href="/contato" className="text-primary hover:text-secondary font-medium transition-colors duration-300">
                  Solicitar cotação <i className="fas fa-arrow-right ml-1"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="400">
          <Link href="/contato" className="bg-primary hover:bg-darkblue text-white font-medium py-3 px-6 rounded-md transition-colors duration-300 inline-block">
            Ver catálogo completo
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
