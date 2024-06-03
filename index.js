const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Books = require("./database/Books");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set("view engine", "ejs");

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

app.get("/books/:id", async (req, res) => {
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


app.listen(8000, () => {
    console.log("O servidor está rodando");
});