# Boas vindas ao repositório para o Front End do desafio técnico da ROIT Bank!

A aplicação simula a manipulação de uma lista de usuários. Onde é possível realizar as 4 operações básicas de CRUD (Criar, Ler, Atualizar e Deletar) para cada usuário cadastrado. Para criar o Front End foi utilizado o ReactJS. Para o Back End, o banco de dados é não relacional e foi feito com o MongoDB. A API foi feita usando NodeJS e Express. Para ter acesso à API é necessário token gerado por autentificação JWT.

Este é o repositório para o Front End. O repositório do Back End se encontra no seguinte link: https://github.com/Vitor8/roit-back-end

## Instruções para executar o projeto

1. Primeiramente, para o pleno funcionamento da aplicação, devemos iniciar o back end da aplicação. Para isso:

    1.1 Clone o repositório do Back End: `git clone git@github.com:Vitor8/roit-back-end.git`

    1.2 Entra na pasta do repositório que você acabou de clonar: `cd roit-back-end`

    1.3 Instale as dependências: `npm install`

    1.4 Inicie a aplicação: `node index.js`

    1.5 A aplicação irá rodar na porta `3001`
  
2. Feito o primeiro passo, agora podemos iniciar o Front End. Para isso:

    2.1 Clone o repositório do Front End: `git clone git@github.com:Vitor8/roit-front-end.git`
    
    2.2 Entra na pasta do repositório que você acabou de clonar: `cd roit-front-end`
    
    2.3 Instale as dependências: `npm install`
    
    2.4 Inicie a aplicação: `npm start`
    
    2.5 A aplicação irá rodar na porta `3000`
   
## Estrutura do código

Na raiz do projeto, a pasta src possui o código fonte do projeto. Cada pasta possui os arquivos de acordo com a funcionalidade referente ao nome da pasta.

![estruta-front-end](https://user-images.githubusercontent.com/24492328/145204288-29d4540d-aaff-4125-bcb8-0f5ae808abda.png)

## Overview das telas
---

### 1. Tela de Login

A tela inicial é a de Login. O botão `Login` só fica enable quando email e senha são digitados. Após clicar no botão, as informações são enviadas ao Back End, que retorna um token gerado via autenficação JWT. Então, o Front End armazena esse token no local storage do browser, para ser usado em futuras requisições.

![login-tela](https://user-images.githubusercontent.com/24492328/145198464-ba27a532-b926-4740-b694-66b862ef1796.png)

### 2. Tela de Visualização usuários cadastrados (Home Page)

Após feito o Login, é renderizado a home page. Nela é possível visualzar todos os usuários já cadastrados. As seguintes ações podem ser realziadas:

  - Ao clicar no header da tabela, nos campos `ID`, `Nome`, `Idade` e `GitHub User`, os usuários serão ordenados de acordo com o campo que foi clicado.
  - Também é possível buscar um usuário por `Nome` ou `GitHub User` no botão de busca.
  - Na linha da tabela de cada usuário 3 ícones são renderizados. Ao clicar no ícone da lixeira, o usuário pode ser deletado. Ao clicar no ícone do olho, é renderizado uma página com os detalhes daquele usuário. Ao clicar no ícone do lápis é renderizada a página de Edição.
  - Ao clicar no botão de `Cadastrar`, a página de Cadastro será renderizada.

![visualização-tela](https://user-images.githubusercontent.com/24492328/145199206-077e3b05-f11e-470f-a565-c291dead8cf3.png)

### 3. Tela de Cadastro de usuários

Na paǵina de Cadastro é possível adicionar um novo usuário. Para o botão `Salvar` ficar enable, é necessário preencher com dados válidos os campos do formulário. O único campo não obrigatório é o de Complemento. No preenchimento dos campos, as seguintes verificações são feitas: 

  - Ao preencher o campo `CEP`, é feito uma requisição a API da ViaCEP (https://viacep.com.br/), caso o CEP seja válido, os dados do endereço são preenchidos automaticamente. Caso o CEP seja inválido, uma mensagem irá aparecer no formulário requisitando um CEP válido.
  - Para o campo de `GitHub User`, é feito uma requisição ao WebService do GitHub e os dados retornados serão armazendados no Back End da aplicação. Caso nenhum usuário seja retornado pela API do GitHub, uma mensagem irá aparecer na tela pedindo um usuário válido.
  - Além disso, também será feito uma verificação ao nosso banco para confirmar se aquele usuário do GitHub já está cadastrado. Caso já esteja, uma nova mensagem será renderizada requisitando um novo usuário válido.
  - Se todos os dados forem válidos, o botão de `Salvar` fica enable, e será possível cadastrar com sucesso aquele novo usuário.

![cadastro-tela](https://user-images.githubusercontent.com/24492328/145199762-da143154-8c93-494f-9811-c0d93ce4df3a.png)

### 4. Tela de Edição

Na Home Page, quando clicamos no ícone do olho de algum usuário, a tela de Edição será renderizada. O formulário será preenchido automaticamente com os dados atuais. E todas as verificações feitas na página de Cadastro também são realizadas aqui.

![editar-tela](https://user-images.githubusercontent.com/24492328/145201517-4074731e-0e2a-4a29-9a31-0ababa67418b.png)

### 5. Tela de Detalhes

Na nossa Home Page, ao clicarmos no ícone do olho de algum determinado usuário, a página de detalhes será renderizada. Nela é possível verificar o Nome completo do usuário, sua idade, GitHub User, Id, Endereço e Avatar do GitHub. 

![detalhes-tela](https://user-images.githubusercontent.com/24492328/145202006-06697fb0-2f1b-47fb-8bbb-178f22c0e1cb.png)

## Teste unitários

Foi utilizado a [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) e o Jest para criação dos testes unitários. Para rodar os testes digite no terminal `npm test`. O arquivo com os teste se encontra no seguinte caminho -> Na raiz da aplicação abra a pasta `src`, depois a pasta `test`, e o arquivo `roit.test.js`.
