# CRC Faróis - Site Institucional

Este é um site institucional para a CRC Faróis, desenvolvido em HTML, CSS e JavaScript puro, otimizado para hospedagem em servidores compartilhados como a Hostinger.

## Estrutura do Projeto

```
html-site/
├── css/
│   └── style.css          # Arquivo CSS principal com todos os estilos do site
├── images/                # Pasta com todas as imagens do site
├── js/
│   └── main.js            # Arquivo JavaScript principal com todas as funcionalidades
├── videos/                # Pasta com vídeos utilizados no site
├── index.html             # Página inicial
├── quem-somos.html        # Página "Quem Somos"
├── contato.html           # Página de contato
└── obrigado.html          # Página de agradecimento após envio do formulário
```

## Hospedando na Hostinger

### Passo 1: Adquira um plano de hospedagem
- Acesse o site da [Hostinger](https://www.hostinger.com.br/) e adquira um plano de hospedagem compartilhada.
- Um plano básico já é suficiente para este site.

### Passo 2: Configure seu domínio
- Registre um novo domínio ou utilize um domínio que você já possua.
- No painel da Hostinger, associe o domínio à sua hospedagem.

### Passo 3: Acesse o painel de controle
- Faça login no painel de controle da Hostinger (hPanel).
- Navegue até a seção de gerenciamento de arquivos ou Gerenciador de Arquivos.

### Passo 4: Faça upload dos arquivos
- No Gerenciador de Arquivos, acesse a pasta `public_html`.
- Faça upload de todos os arquivos e pastas do site.
- Você pode fazer upload dos arquivos um por um ou comprimir tudo em um arquivo ZIP e depois extrair no servidor.

### Passo 5: Configure o Formulário de Contato
O formulário de contato no site utiliza o serviço gratuito [Formspree](https://formspree.io/) para envio de e-mails sem necessidade de backend. Para configurá-lo:

1. Acesse [formspree.io](https://formspree.io/) e crie uma conta gratuita.
2. Crie um novo formulário e obtenha o ID do formulário.
3. No arquivo `contato.html`, localize a linha com o action do formulário:
   ```html
   <form class="contact-form" action="https://formspree.io/f/seu-form-id-aqui" method="POST">
   ```
4. Substitua `seu-form-id-aqui` pelo ID do formulário que você obteve no Formspree.
5. Salve o arquivo e faça upload novamente.

### Passo 6: Configure a Página de Obrigado
No arquivo `contato.html`, localize a linha:
```html
<input type="hidden" name="_next" value="https://seusite.com.br/obrigado.html">
```
Substitua `https://seusite.com.br/obrigado.html` pela URL completa da sua página de agradecimento, por exemplo, `https://seudominio.com.br/obrigado.html`.

## Personalizações Adicionais

### Alterando Informações de Contato
- Todas as informações de contato (telefone, e-mail, endereço) estão presentes nos arquivos HTML.
- Você pode facilmente alterá-las usando um editor de texto para abrir os arquivos e substituir os dados.

### Alterando Imagens
- Para substituir as imagens, basta criar novas imagens com o mesmo nome e dimensões e substituir os arquivos na pasta `images/`.
- Caso queira usar imagens com outros nomes, será necessário alterar as referências no HTML.

### Alterando Cores
- O esquema de cores está definido no arquivo `css/style.css` no início do arquivo, na seção de variáveis:
  ```css
  :root {
    --dark-blue: #2B308C;
    --medium-blue: #3238A6;
    --light-blue: #828FD9;
    /* outras cores... */
  }
  ```
- Altere esses valores para personalizar as cores do site.

## Suporte

Para quaisquer dúvidas ou suporte, entre em contato através do e-mail `[seu-email]` ou telefone `[seu-telefone]`.

---

Desenvolvido em 2025 | CRC Faróis