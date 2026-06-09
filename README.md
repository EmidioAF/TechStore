# TechStore RA3

TechStore é um projeto acadêmico de e-commerce desenvolvido para a disciplina de **Web Development: Framework**, com foco em evolução incremental da aplicação até a entrega final do **RA3**. O projeto começou como uma vitrine simples de produtos em React e foi expandido para incluir rotas, componentes reutilizáveis, filtros, autenticação, área administrativa, persistência de dados, integração com backend e upload de imagens, alinhando-se aos temas trabalhados na disciplina e aos critérios do RA3 apresentados no ambiente da disciplina.[1][2]

## Visão geral

A proposta da aplicação é simular uma loja virtual de produtos de tecnologia, permitindo navegação entre páginas, visualização de catálogo, detalhes de produtos e uma área administrativa para gerenciamento de itens. Na versão final, a aplicação combina **frontend em React + Vite** com **backend em Node.js + Express**, usando autenticação com token, armazenamento em arquivo JSON e upload de imagens com Multer.[1][2]

## Evolução do projeto

O projeto passou por etapas progressivas ao longo da disciplina. Inicialmente, a aplicação possuía estrutura base com React, rotas, páginas e dados mockados locais, organizados em pastas como `components`, `pages`, `data`, `services` e `styles`.[3]

Na sequência, a aplicação evoluiu para incluir listagem dinâmica de produtos, filtros por categoria, busca por nome, ordenação por título e preço e integração com um service responsável pelo carregamento de dados. Esses elementos aparecem nos arquivos de catálogo e serviço já existentes, como `Products.jsx` e `productService.js`.[4][5]

Na etapa final do RA3, foram adicionados persistência, autenticação, upload de imagens e uma área administrativa protegida, acompanhando o foco do conteúdo da disciplina e os critérios explicitados na página do curso para a entrega final do projeto.[1][2]

## Objetivos do RA3

De acordo com a página da disciplina, o RA3 tem foco em persistência, segurança e finalização do projeto, contemplando persistência de dados, upload de arquivos/imagens, autenticação, refinamento de interface e consistência geral do sistema.[1]

O que será avaliado inclui aplicação funcional, integração entre frontend e serviços externos, mecanismos básicos de segurança, qualidade da interface, usabilidade, clareza e organização da apresentação do trabalho.[1]

## Funcionalidades implementadas

### Frontend

O frontend foi construído com React e Vite, organizando a aplicação em componentes reutilizáveis, páginas e contextos. A aplicação possui navegação entre páginas como Home, Produtos, Sobre, Login, Cadastro, Detalhes do Produto e Administração.[3]

As principais funcionalidades visíveis no frontend incluem:

- Página inicial com destaque para produtos.
- Catálogo com busca, filtros e ordenação.
- Página de detalhes do produto.
- Página sobre a empresa/projeto.
- Página de login.
- Página de cadastro de usuário.
- Área administrativa para cadastrar e excluir produtos.
- Exibição condicional de rotas e opções de menu conforme autenticação e perfil do usuário.

### Catálogo e dados

O catálogo originalmente utilizava dados mockados locais e categorias armazenadas em arquivos separados, o que permitia desenvolver a interface e os componentes antes da integração real com backend. Os produtos e categorias foram organizados em arquivos específicos para facilitar manutenção e reutilização.[query]

O catálogo também passou a suportar:

- Busca por nome do produto.
- Filtro por categoria.
- Ordenação alfabética crescente/decrescente.
- Ordenação por preço crescente/decrescente.[4]

### Autenticação

A autenticação foi implementada com backend em Express e token JWT, permitindo login, cadastro e leitura do usuário autenticado. O frontend persiste o token no navegador e valida a sessão ao carregar a aplicação por meio do `AuthContext`.[2]

A aplicação também diferencia usuários comuns e administrador. O usuário admin possui acesso à rota protegida de administração, enquanto usuários sem esse perfil não acessam o gerenciamento de produtos.[2]

### Área administrativa

A página administrativa permite:

- Exibir informações do usuário logado.
- Cadastrar novos produtos.
- Persistir produtos no backend.
- Excluir produtos existentes.
- Visualizar estatísticas simples do catálogo.
- Trabalhar com upload de imagem local ou URL de imagem, conforme o formulário configurado.[query][2]

### Upload de imagens

O upload de imagem é tratado no backend com **Multer**, com armazenamento em pasta própria e validação para aceitar apenas arquivos de imagem, respeitando o tipo de implementação demonstrado no conteúdo da disciplina.[2]

No frontend, o formulário de produto foi ajustado para enviar `FormData`, permitindo upload real de arquivos para o backend e posterior exibição da imagem cadastrada no catálogo e na área administrativa.[2]

## Tecnologias utilizadas

| Camada | Tecnologias |
|---|---|
| Frontend | React, Vite, React Router DOM, JavaScript, CSS [3][6] |
| Backend | Node.js, Express, JWT, bcryptjs, Multer, CORS [2] |
| Persistência | Arquivo JSON local (`db.json`) [2] |
| Upload | Multer + pasta `uploads/` [2] |

## Estrutura do projeto

A estrutura final pode ser organizada da seguinte forma:

```bash
TechStore-RA3/
├── package.json
├── vite.config.js
├── index.html
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── components/
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── ProductsContext.jsx
│   ├── data/
│   │   ├── products.js
│   │   └── categories.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── About.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── AdminProducts.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── productService.js
│   │   └── validateService.js (opcional)
│   └── styles/
│       └── global.css
└── backend/
    ├── package.json
    ├── server.js
    ├── db.json
    └── uploads/
```

A raiz do projeto concentra o frontend. A pasta `backend/` contém o servidor, banco local em JSON e os arquivos enviados por upload, seguindo a separação entre frontend e backend demonstrada no material da disciplina.[2]

## Arquivos importantes

### Frontend existente no projeto

- `Home.jsx`: página inicial da loja, com destaque de produtos e apresentação da aplicação.[query]
- `Products.jsx`: catálogo com filtros, busca e ordenação.[4]
- `ProductDetails.jsx`: página de detalhes de produto.[7]
- `Login.jsx`: tela de login, atualizada para autenticação real.[8]
- `About.jsx`: apresentação da proposta e da empresa/projeto.[query]
- `global.css`: estilos globais da aplicação, incluindo catálogo, login, admin e upload.[9]
- `productService.js`: service de acesso aos produtos, inicialmente mockado e depois adaptado para API.[5]

### Arquivos adicionados ou adaptados para o RA3

- `backend/server.js`: servidor Express com autenticação, cadastro, produtos e upload.[2]
- `backend/db.json`: persistência local de usuários e produtos.[2]
- `src/services/api.js`: função base de requisição HTTP com suporte a token.[2]
- `src/context/AuthContext.jsx`: gerenciamento de autenticação no frontend.[2]
- `src/context/ProductsContext.jsx`: carregamento e gerenciamento dos produtos via backend.[2]
- `src/pages/Register.jsx`: cadastro de novos usuários.[2]
- `src/components/ProductForm.jsx`: formulário ajustado para envio de `FormData`.[2]
- `src/App.jsx`: layout, header, footer, rotas públicas e protegidas.[2]

## Funcionamento da autenticação

O backend expõe rotas de autenticação para cadastro, login e recuperação do usuário autenticado, utilizando token JWT enviado no cabeçalho `Authorization`. O frontend armazena esse token e consulta o backend ao iniciar a aplicação para restaurar a sessão do usuário.[2]

O admin padrão pode ser criado automaticamente pelo backend ao inicializar o banco local, dependendo da configuração usada no `server.js`. Durante os testes, foi identificado que, se o `db.json` já existir vazio, o admin padrão não é recriado automaticamente, exigindo reinicialização do arquivo ou ajuste na lógica de criação do usuário inicial.[2]

## Persistência de dados

A persistência foi implementada no backend através de leitura e escrita em `db.json`, que armazena arrays de usuários e produtos. Com isso, os dados cadastrados continuam disponíveis após recarregar a aplicação, atendendo ao requisito de persistência destacado no RA3.[1][2]

Embora a solução use arquivo JSON em vez de banco relacional, ela é suficiente para fins acadêmicos e demonstra integração entre frontend e backend, além de evidenciar domínio dos fluxos básicos de CRUD e armazenamento.[1][2]

## Interface e estilos

O arquivo `global.css` organiza o visual da aplicação, cobrindo layout geral, cabeçalho, grids de produtos, formulários, feedbacks visuais, login, painel administrativo e upload de imagens. Ele também inclui regras responsivas para melhorar usabilidade em telas menores.[9]

A interface foi refinada para manter consistência entre páginas e componentes, acompanhando o critério de qualidade de interface e usabilidade presente na avaliação do RA3.[1][9]

## Como executar o projeto

### 1. Frontend

Na raiz do projeto, onde estão `package.json`, `index.html`, `vite.config.js` e `src/`, instale as dependências e inicie o Vite:

```bash
npm install
npm run dev
```

O frontend normalmente ficará disponível em `http://localhost:5173`.[2]

### 2. Backend

Na pasta `backend/`, instale as dependências e inicie o servidor:

```bash
cd backend
npm install
npm run dev
```

O backend normalmente ficará disponível em `http://localhost:3001`.[2]

### 3. Teste da aplicação

Com os dois servidores rodando:

- acesse o frontend pelo navegador;
- navegue pelo catálogo;
- faça login com o admin;
- abra a área administrativa;
- cadastre um novo produto;
- teste o upload de imagem;
- confirme se o item aparece no catálogo e persiste após recarregar.[2]

## Credenciais

Quando o admin padrão estiver corretamente criado pelo backend, as credenciais de teste são:

- **Admin**: `admin@techstore.com`
- **Senha**: `admin123`[2]

Usuários comuns podem ser cadastrados pela tela de registro adicionada ao frontend.[2]

## Observações importantes

- O backend deve ficar fora da pasta `src`, em um diretório próprio, lado a lado com a estrutura do frontend.[2]
- O projeto passa a ter dois `package.json`: um na raiz do frontend e outro dentro de `backend/`, cada um com suas dependências específicas.[2]
- O erro `Cannot GET /` ao abrir `localhost:3001` não indica falha do backend; apenas mostra que o servidor da API não possui rota visual na raiz `/`.[2]
- O frontend deve ser aberto pela porta do Vite, não pela porta do backend.[2]
- Caso o login admin não funcione, é necessário verificar o `db.json` e a lógica de criação do admin inicial no `server.js`.[2]

## Possíveis melhorias futuras

- Persistência em banco de dados relacional, como MySQL ou SQLite.
- Edição de produtos já cadastrados.
- Upload com preview mais avançado.
- Controle de permissões mais detalhado.
- Validação mais robusta de formulários.
- Melhorias adicionais de responsividade e tema visual.

## Conclusão

TechStore evoluiu de uma vitrine simples em React para uma aplicação acadêmica mais completa, com frontend, backend, autenticação, upload e persistência, atendendo ao foco do RA3 em segurança, persistência e finalização do sistema. O projeto demonstra aplicação prática dos conceitos trabalhados na disciplina e oferece uma base clara para apresentação, defesa de autoria e futuras evoluções.[1][2]
