import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import logoWhite from "@/assets/images/logo-nova.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Fecha o menu móvel quando mudar de página
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Adiciona a sombra ao header quando a página é rolada
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`sticky top-0 z-50 bg-dark-blue ${isScrolled ? 'shadow-custom' : ''} transition-all duration-300`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img 
                src={logoWhite} 
                alt="CRC Faróis" 
                className="h-10 md:h-12 transition-transform hover:scale-105 duration-300" 
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <nav className="flex justify-end items-center space-x-8">
              <Link 
                href="/" 
                className={`${location === '/' ? 'text-white font-bold' : 'text-white text-opacity-90'} hover:text-white font-medium transition-colors duration-300`}
              >
                Home
              </Link>
              <Link 
                href="/quem-somos" 
                className={`${location === '/quem-somos' ? 'text-white font-bold' : 'text-white text-opacity-90'} hover:text-white font-medium transition-colors duration-300`}
              >
                Quem Somos
              </Link>
              <Link 
                href="/contato" 
                className={`${location === '/contato' ? 'text-white font-bold' : 'text-white text-opacity-90'} hover:text-white font-medium transition-colors duration-300`}
              >
                Contato
              </Link>
              <Link 
                href="/contato" 
                className="bg-white hover:bg-light-gray text-dark-blue font-medium py-2.5 px-5 rounded-md transition-all duration-300 shadow-custom hover:shadow-custom-hover transform hover:-translate-y-0.5"
              >
                Solicitar Orçamento
              </Link>
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="text-white hover:text-white focus:outline-none"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transform transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 mt-2 bg-white rounded-md shadow-custom">
            <Link 
              href="/" 
              className={`block px-3 py-2 rounded-md ${location === '/' ? 'text-dark-blue font-bold' : 'text-gray-black'} hover:bg-light-gray hover:text-medium-blue font-medium transition-colors duration-300`}
            >
              Home
            </Link>
            <Link 
              href="/quem-somos" 
              className={`block px-3 py-2 rounded-md ${location === '/quem-somos' ? 'text-dark-blue font-bold' : 'text-gray-black'} hover:bg-light-gray hover:text-medium-blue font-medium transition-colors duration-300`}
            >
              Quem Somos
            </Link>
            <Link 
              href="/contato" 
              className={`block px-3 py-2 rounded-md ${location === '/contato' ? 'text-dark-blue font-bold' : 'text-gray-black'} hover:bg-light-gray hover:text-medium-blue font-medium transition-colors duration-300`}
            >
              Contato
            </Link>
            <Link 
              href="/contato" 
              className="block px-3 py-2 mt-2 bg-dark-blue hover:bg-medium-blue text-white font-medium rounded-md transition-colors duration-300 text-center shadow-custom"
            >
              Solicitar Orçamento
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
