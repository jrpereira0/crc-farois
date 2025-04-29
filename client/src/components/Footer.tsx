import { Link } from "wouter";
import logoWhite from "@/assets/images/logo-white.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-blue text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="mb-6">
              <img 
                src={logoWhite} 
                alt="CRC Faróis" 
                className="h-16 mb-4"
              />
            </div>
            <p className="text-white mb-6">
              Somos especializados na fabricação e fornecimento de faróis automotivos de alta qualidade para lojas, oficinas e distribuidores.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="text-white hover:text-light-blue transition-colors duration-300 text-xl">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-light-blue transition-colors duration-300 text-xl">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white hover:text-light-blue transition-colors duration-300 text-xl">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-white hover:text-light-blue transition-colors duration-300 text-xl">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold font-montserrat mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-300">Home</Link>
              </li>
              <li>
                <Link href="/quem-somos" className="text-gray-300 hover:text-white transition-colors duration-300">Quem Somos</Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-300 hover:text-white transition-colors duration-300">Contato</Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Política de Privacidade</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Termos de Uso</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold font-montserrat mb-6">Produtos</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Faróis Principais</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Lanternas Traseiras</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Faróis Auxiliares</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Iluminação LED</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Catálogo Completo</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold font-montserrat mb-6">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3"></i>
                <span className="text-gray-300">
                  Av. Industrial, 1500 - Distrito Industrial<br />
                  São Paulo - SP, 04000-000
                </span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone-alt mt-1 mr-3"></i>
                <span className="text-gray-300">(11) 5555-0000</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-3"></i>
                <span className="text-gray-300">contato@crcfarois.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} CRC Faróis. Todos os direitos reservados.
            </p>
            <p className="text-gray-400 text-sm">
              Desenvolvido com <i className="fas fa-heart text-red-500 mx-1"></i> por CRC Faróis
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
