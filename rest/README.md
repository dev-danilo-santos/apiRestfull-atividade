# REST

## Sumário
- [Introdução](#introdução)
- [Organização do projeto](#organização-do-projeto)
- [Testes](#testes)
- [Exercício](#exercício)
- [Comandos](#comandos)

## Introdução

Este projeto possui o desenvolvimento de uma Application Programming Interface (API) RESTful.

Foi utilizado um estilo arquitetônico Model View Controller (MVC) para a organização do projeto. Além disso, o repositório de dados consiste em um arquivo JSON.

Os testes foram implementados utilizando a biblioteca [Jest](https://jestjs.io/).

## Organização do projeto

A aplicação é iniciada a partir dos arquivos [server.js](./server.js) e [app.js](./app.js).

Este projeto utiliza o estilo arquitetônico de aplicação em camadas. As camadas estão organizadas de acordo com a seguinte estrutura:

- Controlador: [/routes](./src/routes/) e [/controllers](./src/controllers/). Em algumas situações foi utilizada a biblioteca [Ajv](https://ajv.js.org/) para realizar a validação das informações de entrada.
- Modelo: [/models](./src/models/). Os caminhos dos arquivos de dados estão em [paths.js](./src/models/paths.js) e os esquemas para validação de dados em [/models/schemas](./src/models/schemas/).
- Visão: não foi necessário criar uma camada de visão pois este projeto utiliza a função [res.json()](https://expressjs.com/en/api.html#res.json) para transformar a saída de dados em um conteúdo do tipo JSON.

O banco de dados deste projeto é representado em um arquivo do tipo JSON. Esses arquivos estão localizados na pasta [/data](./data/).

## Testes

Os testes foram implementados utilizando a biblioteca [Jest](https://jestjs.io/). Foi necessário utilizar o recurso de Mock para utilizar um outro caminho para os arquivos de dados.

Além disso, foi utilizada a biblioteca [Faker-js](https://fakerjs.dev/) com a finalidade de minimazar o esforço na criação de informações de teste. As fábricas de elementos aleatórios estão na pasta [/factories](./tests/factories/).

## Exercício

`Obs.: Utilize este projeto como base para a resolução do exercício proposto.`

Neste exercícios criaremos um novo recurso chamado `proprietario` e modificaremos algumas operações existentes. 

### Arquivo de dados

Defina um esquema contendo os atributos que você ache pertinente e crie um arquivo de dados contendo a informação de 50 proprietários gerados de forma aleatória.

### Criação das operações básicas para o recurso /proprietario
A API deve ter suporte para realizar as seguintes operações básicas:

- Recuperar todos os proprietários;
- Recuperar um proprietário pelo atributo identificador;
- Adicionar um novo proprietário;
- Editar um proprietário
- Excluir um proprietário

### Novas funcionalidades

- Crie um recurso `POST /imoveis/:imovelId/proprietarios/:proprietarioId` que associa um proprietário a um imóvel.
- As ações de recuperar imóvel devem ser alteradas para mostrar os proprietários associados quando houver.
- Crie um recurso `DELETE /imoveis/:imovelId/proprietarios/:proprietarioId` que remove uma associação entre imóvel e proprietário.

### Testes

Elabore casos de teste para todas as funcionalidades extras. Crie uma fábrica de `proprietario` pra agilizar o processo de inserção de dados. Os testes devem estar escritos a nível de modelo e controlador.

Busque cobrir todas as situaçõres possíveis.

## Comandos

### Instalar as dependências

```bash
npm install
```

### Executar a aplicação

```bash
npm run start
```

### Executar os testes unitários

```bash
npm run test
```

### Executar os testes unitários e gerar o relatório de cobertura

```bash
npm run test-coverage
```

## Referências
- [Representational State Transfer (REST)](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)
- [Express](https://expressjs.com/)
- [Ajv JSON schema validator](https://ajv.js.org/)
- [Jest](https://jestjs.io/)
- [Faker.js JSON Generator](https://faker-generator.netlify.app/)
- [Faker-js](https://fakerjs.dev/)