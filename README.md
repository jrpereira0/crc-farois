# CRC Faróis - Website Institucional

## Visão Geral

Este é o código-fonte do site institucional da CRC Faróis, uma empresa especializada na fabricação e fornecimento de faróis automotivos de alta qualidade para lojas, oficinas e distribuidores em todo o Brasil.

## Características Principais

- **Design Moderno e Responsivo** - Otimizado para todos os dispositivos
- **Alta Performance** - Carregamento rápido e experiência fluida
- **Otimizado para SEO** - Meta tags e estrutura semântica
- **Formulário de Contato Funcional** - Validação de dados e feedback em tempo real
- **Compartilhamento Social** - Imagens e meta tags para redes sociais
- **Manutenção Simplificada** - Código limpo e bem estruturado

## Tecnologias Utilizadas

- **Frontend**
  - React 18
  - TypeScript
  - TailwindCSS
  - Shadcn UI
  - React Query
  - Wouter (roteamento)
  - Zod (validação)
  - Lucide React (ícones)

- **Backend**
  - Node.js com Express
  - Armazenamento em memória
  - API RESTful

## Estrutura do Projeto

```
client/                # Frontend React
├── public/            # Arquivos estáticos (favicon, etc.)
├── src/               # Código-fonte React
│   ├── assets/        # Imagens e recursos
│   ├── components/    # Componentes reutilizáveis
│   ├── hooks/         # Hooks personalizados
│   ├── lib/           # Funções utilitárias
│   └── pages/         # Páginas do site
│
server/                # Backend Express
└── storage.ts         # Serviço de armazenamento em memória
```

## Páginas do Site

- **Home** - Apresentação geral da empresa e produtos
- **Quem Somos** - História e valores da empresa
- **Contato** - Formulário de contato e informações

## Desenvolvimento

Para executar localmente:

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

## Implantação

O projeto está configurado para implantação fácil no Replit ou em qualquer hospedagem Node.js. Para implantação em hospedagem compartilhada tradicional (sem Node.js), poderia ser gerada uma versão estática.

## GitHub

O projeto está conectado ao repositório GitHub: https://github.com/jrpereira0/crc-farois

## Contato

Para suporte ou mais informações: contato@crcfarois.com.br