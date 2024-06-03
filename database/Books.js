const Sequelize = require("sequelize");
const connection = require("../database/database");

const Books = connection.define('books', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    synopsis: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    imagePath: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Books;