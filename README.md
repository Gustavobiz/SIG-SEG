# SIG-SEG - Sistema de Gerenciamento de Segurança

### Um sistema para registro e monitoramento de denúncias e ocorrências

## Sobre o Projeto

O **SIG-SEG** é um sistema web desenvolvido para permitir que cidadãos registrem denúncias de eventos suspeitos e que servidores públicos gerenciem essas denúncias, aprovando-as para torná-las ocorrências. O sistema fornece uma interface amigável para o registro, consulta e administração de denúncias e ocorrências.

---

## Tecnologias Utilizadas

### **Frontend:**

- **Next.js**
- **React.js**
- **TypeScript**
- **CSS puro**

### **Backend:**

- **Node.js** (Express)
- **PostgreSQL** (Banco de Dados)
- **Prisma ORM**
- **JWT (JSON Web Token)** para autenticação

### **Outras Ferramentas:**

- **Git e GitHub** (controle de versão)

---

## Como Instalar e Rodar o Projeto

### **Clone o Repositório**

```bash
  git clone https://github.com/Gustavobiz/SIG-SEG.git
  cd SIG-SEG
```

### **Configuração do Backend**

1. **Acesse a pasta do backend:**
   ```bash
   cd backend
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Configure o banco de dados no `.env` (exemplo):**
   ```env
   DATABASE_URL=postgresql://usuario:senha@localhost:5432/sigseg
   JWT_SECRET=seu_segredo_jwt
   ```
4. **Rode as migrações do Prisma:**
   ```bash
   npx prisma migrate dev
   ```
5. **Inicie o backend:**
   ```bash
   npm start
   ```

### **Configuração do Frontend**

1. **Volte para a raiz do projeto e acesse a pasta do frontend:**
   ```bash
   cd ../frontend
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Inicie o frontend:**
   ```bash
   npm run dev
   ```

---

## Rotas e Funcionalidades

### 🔹 **Autenticação**

- `POST /auth/login` → Faz login e retorna o token JWT.
- `POST /auth/register` → Cadastra um novo usuário.

### 🔹 **Denúncias**

- `POST /denuncias/nova` → Registra uma nova denúncia.
- `GET /denuncias/todas` → Retorna todas as denúncias.
- `GET /denuncias/consulta/:codigo` → Busca uma denúncia pelo código.
- `PUT /denuncias/status/:id` → Atualiza o status da denúncia.

### 🔹 **Ocorrências**

- `POST /ocorrencias/criar` → Cria uma ocorrência a partir de uma denúncia.
- `GET /ocorrencias/todas` → Retorna todas as ocorrências.
- `PUT /ocorrencias/atualizar/:usuarioId` → Atualiza o status de uma ocorrência.

---

## Capturas de Tela

### **Página de Login**

![Tela de Login](https://github.com/Gustavobiz/SIG-SEG/blob/main/frontend/public/images/login.jpeg)

### **Página de Cadastro**

![Tela de Cadastro](https://github.com/Gustavobiz/SIG-SEG/blob/main/frontend/public/images/cadastro.jpeg)

### **Página de Tela de Denuncia pública**

Você é direcionado para essa página caso clique em Denunciar e não tiver Login, depois de fazer sua denuncia um código é gerado!
![Tela de Denuncia pública](frontend/public/images/DenunciaPublica.jpeg)

### **Página de Tela de Denuncia pública buscando denuncia por código**

![Tela de Denuncia pública buscando denuncia](https://github.com/Gustavobiz/SIG-SEG/blob/main/frontend/public/images/BuscaPorCodigo.jpeg)

### **Página de Tela de Denuncia servidor**

Você é direcionado para essa página caso clique em Denunciar e tiver Logado, você pode ver todas as denuncias, pesquisar pelo código, separar por Estado e criar uma ocorrencia a partir de uma denuncia!
![Tela de Denuncia Servidor](https://github.com/Gustavobiz/SIG-SEG/blob/main/frontend/public/images/DinunciaServidor.jpeg)

### **Token gerado ao fazer Login**

![Tela de Login token](https://github.com/Gustavobiz/SIG-SEG/blob/main/frontend/public/images/LoginTok.jpeg)

### **Criando Ocorrencia Token**

![Tela de Login token](https://github.com/Gustavobiz/SIG-SEG/blob/main/frontend/public/images/CriarOcorrencia.jpeg)

## Licença

Este projeto é licenciado sob a **MIT License** - veja o arquivo `LICENSE` para mais detalhes.

---

## Contato

Caso tenha dúvidas ou sugestões, entre em contato:

- **Email:** gustavobernardes05@hotmail.com
- **GitHub:** [Gustavobiz](https://github.com/Gustavobiz)

---

## Obs:

Tive algumas dificuldades com a nova versão do tailwindcss, e como o prazo era muito curto achei muito arriscado parar para pode me atualizar, e fui na alternativa que achei que era a mais segura, css puro, no entanto foi um erro, uma vez que isso acarreta problemas com o Next, uma vez que o css não vem pronto do servidor, resultando em bugs em algumas paginas, sendo necessário atualização das paginas.

### Desenvolvido com dedicação para facilitar a segurança e comunicação entre cidadãos e servidores públicos!
