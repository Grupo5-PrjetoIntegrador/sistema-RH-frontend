# Build Minds RH

A aplicação é composta pela implementação de um sistema de cadastro RH com todos os métodos básicos de CRUD, métodos de busca específicos por nome em todas as suas entidades, cadastro de novos funcionários e exclusão de funcionários, um método especial de cálculo automático de salários com base em horas trabalhadas, bônus e descontos para a entidade Funcionário e o método de autenticação para a entidade Usuário que em conjunto com o ecossistema de segurança do Spring, garante uma aplicação funcional e protegida.

## 🚀 Escopo

#### [Leia o escopo do Projeto](./escopo-PI-desafio-final.docx)
## 🚀 Entidades E Atributos

1. Usuário:
- Id
- Nome
- Usuário (email)
- Foto
- Senha
- Lista de Funcionários (Relação de classes)

2. Funcionário:
- Id
- Nome
- Cargo
- Salário Base
- Horas Trabalhadas
- Bonus
- Descontos
- Aniversário Empresa
- Setor (Relação de classes)
- Usuário (Relação de classes)

3. Setor:
- Id
- Nome Setor
- Lista de Funcionários (Relação de classes)
## 🚀 Tecnologias e Dependências Utilizadas

### 📌 Tecnologias Principais

#### Backend
- **Java** com o FrameWork **Spring**
- Banco de Dados: **MySQL**
- Cliente Teste Local: **Insomnia**
- Deploy e Banco de Dados Remoto: **Render e Docker**
- Documentação: Ferramenta **Swagger**

#### Frontend
- **React** (^18.3.1) - Biblioteca para construção de interfaces dinâmicas e declarativas.  
- **Vite** (^6.0.5) - Ferramenta para construção e desenvolvimento rápido de aplicações frontend.  
- **TypeScript** (~5.6.2) - Superset do JavaScript que adiciona tipagem estática.  
- **Tailwind CSS** (^3.4.17) - Framework CSS utilitário para estilização rápida e responsiva.  

### 📦 Dependências
- Spring Boot **DevTools**
- Spring Web
- Spring Data **JPA**
- **MySQL Driver**
- **Validation**
- **Spring Security**
- Geração e Validação **Token JWT**  
- **axios** (^1.7.9) - Cliente HTTP para consumo de APIs.  
- **framer-motion** (^12.0.6) - Biblioteca para animações fluidas em React.  
- **react-router-dom** (^7.1.4) - Gerenciamento de rotas no React.  
- **react-toastify** (^11.0.3) - Notificações elegantes e customizáveis.  
- **reactjs-popup** (^2.0.6) - Biblioteca para criação de popups modais.  

### 🛠️ Ferramentas e Configuração  
- **PostCSS** (^8.5.1) - Processador CSS para melhor compatibilidade e otimização.  
- **TypeScript ESLint** (^8.18.2) - Integração do ESLint com TypeScript.  
- **@vitejs/plugin-react** (^4.3.4) - Plugin para otimizar o uso do React no Vite.  
## 🚀 Rodando o projeto

### 📍 Localmente
Clone o projeto

```bash
  git clone https://github.com/Grupo5-PrjetoIntegrador/sistema-RH-frontend.git
```

Entre no diretório do projeto

```bash
  cd my-project
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run start
```
### 🗺 Remotamente
Acesse a url https://sistema-rh-wwxr.onrender.com, digite um usuário e senhas válidos fornecidos pelo time de desenvolvedores e utilize a aplicação.
## 🙌🏻 Equipe

Desenvolvido com ❤️ por Anna Carolina Vighi, Bruno Alexandre Barros, Cacia Rodrigues e Marcos Lopes

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/annavighi">
        <img src="https://avatars.githubusercontent.com/u/180130500?v=4" width="125px;" alt="Colaboradora Anna Carolina Vighi"/><br />
        <sub><b>Anna Carolina Vighi</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/brunoalexb">
        <img src="https://avatars.githubusercontent.com/u/88696076?v=4" width="125px;" alt="Colaborador Bruno Alexandre Barros"/><br />
        <sub><b>Bruno Alexandre Barros</b></sub>
      </a>
    </td>
         <td align="center">
      <a href="https://github.com/CaciaRodrigues">
        <img src="https://avatars.githubusercontent.com/u/98604798?v=4" width="125px;" alt="Colaboradora Cacia Rodrigues"/><br />
        <sub><b>Cacia Rodrigues</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/marcoslopesdev">
        <img src="https://avatars.githubusercontent.com/u/110929754?v=4" width="125px;" alt="Colaborador Marcos Lopes"/><br />
        <sub><b>Marcos Lopes</b></sub>
      </a>
    </td>
  </tr>
</table>
