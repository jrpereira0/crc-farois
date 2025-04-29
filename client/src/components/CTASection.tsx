import { Link } from "wouter";

const CTASection = () => {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="mb-8 lg:mb-0 text-center lg:text-left" data-aos="fade-right" data-aos-duration="800">
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
              Pronto para melhorar seu estoque?
            </h2>
            <p className="text-xl text-white opacity-90 max-w-xl">
              Entre em contato agora mesmo e solicite uma cotação para faróis automotivos de alta qualidade.
            </p>
          </div>
          <div data-aos="fade-left" data-aos-duration="800">
            <Link href="/contato" className="bg-white hover:bg-lightgray text-primary text-lg font-medium py-3 px-6 rounded-md transition-colors duration-300 inline-block">
              Solicite seu orçamento
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
