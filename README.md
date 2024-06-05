<h1 align="center">Book API Project</h1>
Este projeto é uma API Rest para gerenciamento de livros, criada utilizando Node.js, Express e Sequelize para manipulação de um banco de dados MySQL. A API permite realizar operações CRUD (Create, Read, Update, Delete) em registros de livros, que contêm um ID único, título, nome do autor, imagem, preço e sinopse. De início, foi feito um upload de imagens através dos meus arquivos, mas após a criação de novos livros, as imagens foram carregadas através de links. <br>

### English

This project is a Rest API for managing books, created using Node.js, Express, and Sequelize to manipulate a MySQL database. The API allows CRUD operations (Create, Read, Update, Delete) on book records, which contain a unique ID, title, author's name, image, price, and synopsis. Initially, images were uploaded through files, but after creating new books, the images were uploaded via links.
![book-api](https://github.com/Isis-gsantos/Bookstore-APIRest/assets/142533840/17c0019c-5b22-4014-b5ed-d5b9bd93e35d)


## Funcionalidades
- Criar livros: Possibilidade de adicionar novos livros ao banco de dados através de um formulário ou utilizando o Postman.
- Listar livros: Exibição de todos os livros cadastrados.
- Buscar livro por ID: Recuperar informações detalhadas de um livro específico utilizando seu ID.
- Atualizar livros: Editar informações de um livro existente.
- Deletar livros: Remover livros do banco de dados.
- Integração com Frontend: Conexão da API com uma interface frontend simples utilizando Axios e CORS.
<br>

### English version
## Features
- Create books: Add new books to the database through a form or using Postman.
- List books: Display all registered books.
- Get book by ID: Retrieve detailed information about a specific book using its ID.
- Update books: Edit information about an existing book.
- Delete books: Remove books from the database.
- Frontend Integration: Connect the API with a simple frontend interface using Axios and CORS.
![api](https://github.com/Isis-gsantos/Bookstore-APIRest/assets/142533840/f8c7a4f4-1a45-4cc3-8edb-2547c72f94a7)


## Technologies Used
- Node.js
- Express
- Sequelize
- MySQL
- Multer (para upload de imagens | images upload)
- Axios
- CORS
- SASS/scss


## API with Postman:
![postman](https://github.com/Isis-gsantos/Bookstore-APIRest/assets/142533840/5604290d-8beb-48c1-9482-e1d66179b670)

### Criar Livro | Create Book:
- Método: POST
- URL: http://localhost:8000/book
- Body: form-data com os campos title, author, price, synopsis, e image

### Listar Livros | List Books:
- Método: GET
- URL: http://localhost:8000/books

### Buscar Livro por ID | Get Book By ID:
- Método: GET
- URL: http://localhost:8000/books/:id

### Atualizar Livro | Update/Edit Book:
- Método: PUT
- URL: http://localhost:8000/book/:id
- Body: form-data com os campos que deseja atualizar

### Deletar Livro | Delete Book:
- Método: DELETE
- URL: http://localhost:8000/book/:id
