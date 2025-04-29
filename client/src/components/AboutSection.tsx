const AboutSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2" data-aos="fade-right" data-aos-duration="1000">
            <div className="bg-gray-200 rounded-lg h-96 lg:h-[500px] w-full flex items-center justify-center">
              <svg className="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path>
              </svg>
            </div>
          </div>
          <div className="lg:w-1/2" data-aos="fade-left" data-aos-duration="1000">
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-6 text-darkgray">
              Quem Somos
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                A <strong>CRC Faróis</strong> é uma empresa especializada na fabricação e fornecimento de faróis automotivos de alta qualidade, atendendo lojas, oficinas e distribuidores em todo o Brasil há mais de 15 anos.
              </p>
              <p>
                Iniciamos nossas atividades em 2008, com o objetivo de oferecer produtos com excelência técnica e preços competitivos para o mercado de reposição automotiva. Ao longo dos anos, consolidamos nossa posição como um dos principais fabricantes de faróis do país.
              </p>
              <p>
                Contamos com uma equipe altamente capacitada e uma estrutura de produção moderna, o que nos permite desenvolver produtos que atendem às mais rigorosas normas de segurança e qualidade.
              </p>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-bold font-montserrat mb-4 text-darkgray">Nossa Missão</h3>
              <p className="text-gray-600 mb-6">
                Fornecer produtos de iluminação automotiva de alta qualidade, contribuindo para a segurança no trânsito e para o sucesso dos nossos parceiros comerciais.
              </p>
              
              <h3 className="text-xl font-bold font-montserrat mb-4 text-darkgray">Nossa Visão</h3>
              <p className="text-gray-600 mb-6">
                Ser reconhecida como a principal referência no mercado brasileiro de faróis automotivos, oferecendo soluções inovadoras e sustentáveis.
              </p>
              
              <h3 className="text-xl font-bold font-montserrat mb-4 text-darkgray">Nossos Valores</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Qualidade e excelência em todos os processos</li>
                <li>Compromisso com a satisfação do cliente</li>
                <li>Integridade e transparência nas relações comerciais</li>
                <li>Inovação constante em produtos e serviços</li>
                <li>Responsabilidade socioambiental</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
