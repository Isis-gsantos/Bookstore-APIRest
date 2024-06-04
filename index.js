const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Books = require("./database/Books");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set("view engine", "ejs");
app.use(cors());

const upload = require("./middleware/imageUpload");

connection.authenticate().then(() => {
    console.log("Conexão feita com sucesso");
}).catch((err) => {
    console.log(err);
});

app.get("/books/register", (req, res) => {
    res.render("booksRegister");
});

app.post("/books/save", upload.single('image'), async (req, res) => {
    const { title, author, price, synopsis } = req.body;
    const imagePath = req.file ? req.file.path : null;

    try {
        await Books.create({
            title,
            author,
            price,
            synopsis,
            imagePath
        });
        res.status(201).send('Livro cadastrado com sucesso');
    } catch (error) {
        console.error('Erro ao cadastrar livro:', error);
        res.status(500).send('Erro ao cadastrar livro');
    }
});

app.get("/books", async (req, res) => {
    try {
        const books = await Books.findAll();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).send('Erro ao listar livros');
    }
});

app.get("/book/:id", async (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        const id = parseInt(req.params.id);
        try {
            const book = await Books.findByPk(id); 

            if (book) { 
                res.statusCode = 200;
                res.json(book);
            } else {
                res.sendStatus(404); 
            }
        } catch (error) {
            res.sendStatus(404); 
        }
    }
});

app.post("/book", (req, res) => {
    const { title, author, price, synopsis, imagePath } = req.body;

    try {
        Books.create({
            title,
            author,
            price,
            synopsis,
            imagePath
        });
        res.sendStatus(200);
    } catch {
        res.status(500).send("Erro ao adicionar livro");
    }
});

app.delete("/book/:id", async (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        const id = parseInt(req.params.id);
        try {
            const book = await Books.findByPk(id); 

            if (book) { 
                await book.destroy(); 
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            res.status(500).send("Erro ao deletar livro");
        }
    }
});

app.put("/book/:id", async (req, res) => {
    if (isNaN(req.params.id)) {
      res.sendStatus(400);
      return;
    }
  
    const id = parseInt(req.params.id);
    const book = await Books.findByPk(id);
  
    if (!book) {
      res.sendStatus(404);
      return;
    }
  
    const { title, author, price, synopsis, imagePath } = req.body;
    book.title = title || book.title; 
    book.author = author || book.author;
    book.price = price || book.price;
    book.synopsis = synopsis || book.synopsis;
    book.imagePath = imagePath || book.imagePath;
  
    try {
      await book.save();
      res.sendStatus(200);
    } catch (error) {
      console.error("Erro ao atualizar livro:", error);
      res.status(500).send("Erro ao atualizar livro");
    }
  });
  

app.listen(8000, () => {
    console.log("O servidor está rodando");
});