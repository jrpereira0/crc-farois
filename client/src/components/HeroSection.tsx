import { Link } from "wouter";

const HeroSection = () => {
  return (
    <section className="relative bg-darkblue text-white">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="max-w-3xl" data-aos="fade-right" data-aos-duration="1000">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat mb-6">
            Soluções em Faróis Automotivos para o seu Negócio
          </h1>
          <p className="text-xl mb-8">
            Fornecemos faróis de alta qualidade para lojas, oficinas e distribuidores em todo o Brasil.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/contato" className="bg-primary hover:bg-secondary text-white text-lg font-medium py-3 px-6 rounded-md transition-colors duration-300 text-center">
              Solicite seu orçamento agora
            </Link>
            <Link href="/quem-somos" className="bg-white hover:bg-lightgray text-primary text-lg font-medium py-3 px-6 rounded-md transition-colors duration-300 text-center">
              Conheça nossa empresa
            </Link>
          </div>
        </div>
      </div>
      {/* Background gradient for hero section */}
      <div className="h-full w-full absolute inset-0 -z-10 bg-gradient-to-r from-darkblue to-primary"></div>
    </section>
  );
};

export default HeroSection;
