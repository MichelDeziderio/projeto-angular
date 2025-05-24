# Front-End Challenge Angular 17.3.2 🚀

Aplicação desenvolvida com foco em boas práticas, arquitetura modularizada, testes unitários e estilização moderna usando SCSS e componentes standalone.

---

## ✅ Tecnologias Utilizadas

- Angular 17.3.2 (com Standalone Components)
- TypeScript (ECMAScript 6+)
- SCSS com variáveis globais
- Font Awesome para ícones
- Reactive Forms
- LocalStorage como camada de persistência
- Testes unitários com Jest
- Design Responsivo com Grid

---

## 📦 Como rodar a aplicação localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/micheldeziderio/Project-Angular.git
cd Project-Angular
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Rodar o projeto
```bash
ng serve || npm run start
```

Acesse em: http://localhost:4200

---
### 🧪 Testes Unitários

Este projeto inclui testes unitários com Jasmine e Karma.
```bash
npm run test
```

### 🧩 Estrutura da aplicação
```bash
app/
├── components/            # Componentes reaproveitáveis e encapsulados
│   ├── alerts/            # Componentes visuais para mensagens e feedbacks (ex: toast, alertas)
│   ├── form/              # Componente de formulário reativo reutilizável (criação e caso precise de umaedição)
│   ├── header/            # Cabeçalho fixo da aplicação com ícones de navegação
│   └── list/              # Componente visual de listagem (tabela e grid)
│
├── core/                  # Camada central com regras de negócio
│   ├── models/            # Interfaces e tipos (ex: User)
│   ├── services/          # Serviços de persistência, como manipulação de localStorage
│   └── utils/             # Pipes, diretivas e helpers (ex: máscaras, validação simples, formatação)
│
├── pages/                 # Páginas principais do app
│   ├── home/              # Página de cadastro de usuários
│   └── user-list/         # Página de listagem e exclusão de usuários
│
├── app.component.ts       # Componente raiz da aplicação
├── app.component.html     # HTML base da aplicação
├── app.component.scss     # Estilo global e layout principal
├── app.config.server.ts   # Configurações para SSR (Server Side Rendering) se necessário
├── app.routes.ts          # Arquivo de rotas com lazy loading e rotas standalone
```
---

### ✅ Benefícios dessa organização
- **Modularidade:** fácil manutenção e adição de novas funcionalidades
- **Reutilização:** componentes como form e list usados por várias páginas
- **Escalabilidade:** fácil evoluir para rotas autenticadas, interceptadores, guards, etc.
- **Isolamento** de responsabilidades: cada pasta com um propósito claro

---
### 🔧 Funcionalidades Implementadas

- Cadastro de usuário
- Remoção de usuário
- Visualização dos dados em tabela ou grid
- Máscaras para CPF e telefone
- Scrollbar customizada e responsiva
- Estilo minimalista com animações e transições simples
- Testes unitários configurados

📌 Os dados são armazenados temporariamente no `localStorage`.

---
### 📝 Observações

- A aplicação não utiliza backend; todos os dados são temporários.
- A estrutura segue modularizada em components, core, pages.

### 👨‍💻 Desenvolvido por:
[Michel Deziderio](https://github.com/MichelDeziderio)
