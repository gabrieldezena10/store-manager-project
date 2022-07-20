# Projeto Store Manager

Desenvolver uma API utilizando a estrutura MSC (model-service-controller), utilizando o banco de dados MySQL além de seguir os princípios de uma API RESTful.

A API a ser construída é um sistema de gerenciamento de vendas no formato dropshipping em que será possível criar, visualizar, deletar e atualizar produtos e vendas.

Os testes unitários feitos utilizando as bibliotecas Mocha, Chai e Sinon tem 100% de cobertura nas camadas MSC (Models, Services e Controllers).

<hr></hr>

## Habilidades
Node.js, MySQL, Arquitetura MSC, Mocha, Chai, Sinon.

<hr></hr>

## Utilização

- Já existe um arquivo `docker-compose.yml` (Disponibilizado pela Trybe). Bastando usar o comando `docker-compose up` para rodar o MySQL e o Node pelo docker.

- Os arquivos para criação das tabelas e de seed se encontram nos arquivos `migration.sql` e `seed.sql` respectivamente. E podem ser utilizados em alguma ferramenta de gerenciamento de bancos de dados (como DBeaver ou MySQL Workbench).

- `npm start` para rodar a aplicação usando o node.

- Utilizar alguma Plataforma de API para utilizar os endpoints. Exemplos: Postman, Insomnia, Thunder Client...

<hr></hr>

## Diagramas

![Diagrama de relacionamentos das tabelas](diagramas-store-manager.png)

<i> Imagem disponibilizada pela Trybe </i>

<hr></hr>

## Endpoints

- GET `/products` para listar todos os produtos.
- GET `/products/:id` para listar um produto pelo id.
- POST `/products/:id` para cadastrar um novo produto. (Deve receber no body a propriedade `name`).
- POST `/sales` para cadastrar vendas. (Deve receber um array de objetos, contendo as propriedades `productId` e `quantity`).
- GET `/sales` para listar todas as vendas.
- GET `/sales/:id` para listar vendas por id.
- PUT `/products/:id` para atualizar o nome de um produto por id. (Deve receber no body a propriedade `name`).
- DELETE `/products/:id` para deletar um produto, buscando por id.
- DELETE `/sales/:id` para deletar uma venda, buscando por id.
- PUT `/sales/:id` para atualizar uma venda, buscando por id. (Deve receber no body um array de objetos contendo `productId` e `quantity`).
- GET `/products/search?q=query` (substituindo `query` pelo termo que deve ser pesquisado) para pesquisar produtos pelo nome.

<hr></hr>
