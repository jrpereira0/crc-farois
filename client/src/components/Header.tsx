import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import logoImage from "@/assets/logo.png";

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
    <header className={`sticky top-0 z-50 bg-primary ${isScrolled ? 'shadow-lg' : ''} transition-all duration-300`}>
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img src={logoImage} alt="CRC Faróis" className="h-12 md:h-14 transition-transform hover:scale-105 duration-300" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`${location === '/' ? 'text-white font-bold' : 'text-white text-opacity-90'} hover:text-white font-medium transition-colors duration-300`}>
              Home
            </Link>
            <Link href="/quem-somos" className={`${location === '/quem-somos' ? 'text-white font-bold' : 'text-white text-opacity-90'} hover:text-white font-medium transition-colors duration-300`}>
              Quem Somos
            </Link>
            <Link href="/contato" className={`${location === '/contato' ? 'text-white font-bold' : 'text-white text-opacity-90'} hover:text-white font-medium transition-colors duration-300`}>
              Contato
            </Link>
            <Link href="/contato" className="bg-white hover:bg-lightgray text-primary font-medium py-2.5 px-5 rounded-md transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Solicitar Orçamento
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="text-white hover:text-white focus:outline-none"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transform transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 mt-2 bg-white rounded-md shadow-lg">
            <Link href="/" className={`block px-3 py-2 rounded-md ${location === '/' ? 'text-primary font-bold' : 'text-darkgray'} hover:bg-gray-50 hover:text-primary font-medium transition-colors duration-300`}>
              Home
            </Link>
            <Link href="/quem-somos" className={`block px-3 py-2 rounded-md ${location === '/quem-somos' ? 'text-primary font-bold' : 'text-darkgray'} hover:bg-gray-50 hover:text-primary font-medium transition-colors duration-300`}>
              Quem Somos
            </Link>
            <Link href="/contato" className={`block px-3 py-2 rounded-md ${location === '/contato' ? 'text-primary font-bold' : 'text-darkgray'} hover:bg-gray-50 hover:text-primary font-medium transition-colors duration-300`}>
              Contato
            </Link>
            <Link href="/contato" className="block px-3 py-2 mt-2 bg-primary hover:bg-darkblue text-white font-medium rounded-md transition-colors duration-300 text-center shadow-md">
              Solicitar Orçamento
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
