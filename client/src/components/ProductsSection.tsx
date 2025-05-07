import { Link } from "wouter";
import produtosFarois from "@/assets/images/products/produtos-farois.png";
import faroisGol1 from "@/assets/images/products/farois-gol1.png";
import faroisFiat from "@/assets/images/products/farois-fiat.png";
import faroisGol2 from "@/assets/images/products/farois-gol2.png";
import faroisGol from "@/assets/images/products/farois-gol.png";

const ProductsSection = () => {
  const products = [
    {
      title: "Faróis para Volkswagen Gol",
      description: "Faróis dianteiros de alta qualidade para todas as gerações do Volkswagen Gol.",
      image: faroisGol1,
      features: ["Peças originais", "Alta durabilidade", "Homologados pelo INMETRO", "Garantia de 1 ano"]
    },
    {
      title: "Faróis para Fiat Uno e Fiorino",
      description: "Conjunto completo de faróis para Fiat Uno e Fiorino, com design original e excelente acabamento.",
      image: faroisFiat,
      features: ["Design original", "Instalação simplificada", "Compatível com diversos modelos", "Excelente custo-benefício"]
    },
    {
      title: "Faróis para Gol Quadrado e GTS",
      description: "Faróis para Gol Quadrado e GTS, incluindo modelos com faróis auxiliares de milha.",
      image: faroisGol2,
      features: ["Alta performance", "Versões com faróis de milha", "Compatível com todas as gerações", "Peças homologadas"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-lightgray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="800">
          <span className="text-primary font-semibold bg-blue-100 px-4 py-1 rounded-full text-sm mb-4 inline-block">PRODUTOS DE QUALIDADE</span>
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
              className="bg-white rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-xl hover:transform hover:scale-102 duration-300 border border-gray-100" 
              data-aos="fade-up" 
              data-aos-delay={100 * (index + 1)}
            >
              <div className="relative overflow-hidden group">
                <img 
                  src={product.image}
                  alt={product.title}
                  className="w-full h-64 object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-primary/0 text-white p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center items-center">
                  <Link 
                    href="/contato" 
                    className="font-medium text-white hover:underline"
                  >
                    Solicitar cotação agora
                  </Link>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold font-montserrat mb-2 text-darkgray">{product.title}</h3>
                <p className="text-gray-600 mb-4">
                  {product.description}
                </p>
                
                <div className="mb-5 mt-3">
                  <ul className="space-y-1">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link 
                  href="/contato" 
                  className="inline-flex items-center text-primary hover:text-darkblue font-medium transition-colors duration-300"
                >
                  Ver detalhes 
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white p-8 rounded-xl shadow-lg border border-gray-100" data-aos="fade-up" data-aos-delay="300">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <img 
                src={faroisGol} 
                alt="Faróis para Volkswagen Gol" 
                className="rounded-lg w-full h-auto object-cover shadow-md"
              />
            </div>
            <div className="md:w-1/2">
              <span className="text-primary font-semibold bg-blue-100 px-4 py-1 rounded-full text-sm mb-4 inline-block">DESTAQUE</span>
              <h3 className="text-2xl md:text-3xl font-bold font-montserrat mb-4 text-darkgray">
                Faróis para Volkswagen Gol
              </h3>
              <p className="text-gray-600 mb-6">
                Nossa linha completa de faróis para o Volkswagen Gol oferece qualidade superior, 
                durabilidade e excelente custo-benefício. Faróis dianteiros, lanternas traseiras e 
                faróis auxiliares disponíveis para todos os modelos e anos.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Compatível com todas as gerações do Gol
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Garantia de 1 ano em todos os produtos
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Peças originais homologadas
                </li>
              </ul>
              <Link 
                href="/contato" 
                className="bg-primary hover:bg-darkblue text-white font-medium py-3 px-6 rounded-md transition-all duration-300 inline-flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                Solicitar orçamento
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="400">
          <Link 
            href="/contato" 
            className="bg-primary hover:bg-darkblue text-white font-medium py-3 px-8 rounded-md transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Ver catálogo completo
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
