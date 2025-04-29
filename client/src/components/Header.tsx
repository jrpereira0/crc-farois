import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

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
    <header className={`sticky top-0 z-50 bg-white ${isScrolled ? 'shadow-md' : ''} transition-shadow duration-300`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="text-primary font-montserrat font-bold text-2xl md:text-3xl">
                CRC<span className="text-secondary">FARÓIS</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`${location === '/' ? 'text-primary' : 'text-darkgray'} hover:text-primary font-medium transition-colors duration-300`}>
              Home
            </Link>
            <Link href="/quem-somos" className={`${location === '/quem-somos' ? 'text-primary' : 'text-darkgray'} hover:text-primary font-medium transition-colors duration-300`}>
              Quem Somos
            </Link>
            <Link href="/contato" className={`${location === '/contato' ? 'text-primary' : 'text-darkgray'} hover:text-primary font-medium transition-colors duration-300`}>
              Contato
            </Link>
            <Link href="/contato" className="bg-primary hover:bg-darkblue text-white font-medium py-2 px-4 rounded-md transition-colors duration-300">
              Solicitar Orçamento
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="text-darkgray hover:text-primary focus:outline-none"
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 mt-2 bg-lightgray rounded-md">
            <Link href="/" className={`block px-3 py-2 ${location === '/' ? 'text-primary' : 'text-darkgray'} hover:text-primary font-medium transition-colors duration-300`}>
              Home
            </Link>
            <Link href="/quem-somos" className={`block px-3 py-2 ${location === '/quem-somos' ? 'text-primary' : 'text-darkgray'} hover:text-primary font-medium transition-colors duration-300`}>
              Quem Somos
            </Link>
            <Link href="/contato" className={`block px-3 py-2 ${location === '/contato' ? 'text-primary' : 'text-darkgray'} hover:text-primary font-medium transition-colors duration-300`}>
              Contato
            </Link>
            <Link href="/contato" className="block px-3 py-2 bg-primary hover:bg-darkblue text-white font-medium rounded-md transition-colors duration-300 text-center">
              Solicitar Orçamento
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
