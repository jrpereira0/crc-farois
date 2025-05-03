# Como Conectar Este Projeto ao GitHub

Se você estiver enfrentando problemas ao conectar este projeto ao GitHub através da interface do Replit, siga estas instruções passo a passo.

## Passo 1: Crie um novo repositório no GitHub

1. Acesse [GitHub](https://github.com/) e faça login na sua conta
2. Clique no botão "+" no canto superior direito e selecione "New repository"
3. Dê um nome ao repositório (exemplo: "crc-farois-website")
4. Escolha se o repositório será público ou privado
5. NÃO inicialize o repositório com README, .gitignore ou licença (mantenha tudo desmarcado)
6. Clique em "Create repository"

## Passo 2: Exportar o código do Replit

Há duas maneiras de exportar seu código do Replit para o GitHub:

### Opção 1: Usando a interface gráfica do Replit

1. No Replit, clique no ícone de "Version Control" no painel lateral esquerdo (o ícone do Git)
2. Clique em "Connect to GitHub"
3. Selecione o repositório que você acabou de criar
4. Siga as instruções na tela para autorizar o Replit a acessar sua conta GitHub
5. Faça commit e push do seu código

### Opção 2: Baixar o projeto e fazer upload manualmente

Se a opção acima não funcionar, você pode:

1. No Replit, clique nos três pontos (...) ao lado do nome do projeto
2. Selecione "Download as zip"
3. Descompacte o arquivo em seu computador
4. Abra o terminal em seu computador e navegue até a pasta do projeto descompactado
5. Execute os seguintes comandos:

```bash
# Inicializar um repositório Git
git init

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "Commit inicial"

# Adicionar o repositório remoto (substitua USUARIO e REPOSITORIO com seus dados)
git remote add origin https://github.com/USUARIO/REPOSITORIO.git

# Enviar o código para o GitHub
git push -u origin main
```

## Solução de problemas comuns

### Erro de autenticação

Se você receber um erro de autenticação ao fazer push, pode ser necessário usar um token de acesso pessoal:

1. Acesse [GitHub Settings > Developer Settings > Personal Access Tokens](https://github.com/settings/tokens)
2. Clique em "Generate new token"
3. Dê um nome ao token e selecione o escopo "repo"
4. Copie o token gerado
5. Quando solicitado um nome de usuário e senha ao fazer push, use seu nome de usuário GitHub e o token como senha

### Erro "fatal: remote origin already exists"

Se receber este erro, execute:
```bash
git remote remove origin
```
E depois tente adicionar o remote novamente.