# Guia para conectar seu projeto ao GitHub

Este guia fornece instruções passo a passo para conectar seu projeto do Replit ao GitHub.

## Pré-requisitos

- Uma conta GitHub
- Seu projeto no Replit

## Passos para conectar ao GitHub

### 1. Pela Interface do Replit (Método Recomendado)

O Replit possui uma integração direta com o GitHub que é a maneira mais fácil e segura de conectar seu projeto:

1. No seu projeto Replit, clique no ícone do Git (controle de versão) na barra lateral esquerda
2. Se solicitado, autorize o Replit a acessar sua conta GitHub
3. Clique em "Connect to GitHub"
4. Escolha:
   - Conectar a um repositório existente (seu repositório atual: https://github.com/jrpereira0/crc-farois)
   - Ou criar um novo repositório

5. Siga as instruções na tela para finalizar a conexão

### 2. Para enviar as alterações atuais (depois de conectado)

Quando você quiser enviar (push) suas alterações para o GitHub:

1. Abra o painel Git no Replit (ícone na barra lateral esquerda)
2. Verifique os arquivos alterados
3. Adicione uma mensagem de commit para descrever suas mudanças
4. Clique em "Commit & Push"

## Arquivos importantes já configurados

Seu projeto já tem os arquivos necessários configurados:

- `.gitignore`: Configurado para ignorar arquivos desnecessários como `node_modules` e arquivos de build

## Problemas comuns

### Erro de autenticação

Se você receber erros de autenticação:
1. Verifique se você autorizou o Replit no GitHub
2. Tente desconectar e reconectar sua conta GitHub no Replit

### Conflitos de arquivo

Se houver conflitos entre seus arquivos locais e os do GitHub:
1. O Replit oferecerá opções para resolver os conflitos
2. Escolha manter suas alterações, usar as alterações do GitHub, ou mesclar manualmente

### Arquivo .git/index.lock

Se você encontrar erros relacionados ao arquivo index.lock:
1. Isso geralmente ocorre quando uma operação Git foi interrompida
2. Reinicie seu Replit para limpar os bloqueios

## Informações do seu repositório atual

Seu repositório no GitHub:
- URL: https://github.com/jrpereira0/crc-farois 
- Nome de usuário: jrpereira0

## Dicas adicionais

- Faça commits pequenos e frequentes com mensagens descritivas
- Sempre crie um backup antes de operações grandes
- Considere criar branches diferentes para funcionalidades em desenvolvimento