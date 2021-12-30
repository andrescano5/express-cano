const { Op, DataTypes } = require("sequelize");

//Traer la DB
const db = require('../models');

//SELECT * FROM libro
//Esto es una función anónima de tipo "arrow function" guardada en una variable llamada getBooks.. por lo tanto es una función llamada getBooks
const getBooks = async () => {
    //llamo a la DB
const books = await db.libro.findAll({
    include: db.autor
}).then( result => {
    return result;
});

    return books
}

const getBookById = async (id) => {
    console.log('**/*/*/**/*/****/');
    console.log('El ID que llegó a /api es ' + id);
    console.log('**/*/*/**/*/****/');
    //SELECT * FROM libro WHERE id_libro = 3
    //findByPk = Find by Primary key
    const book = await db.libro.findByPk(id, {
        include: db.autor 
    }).then(result => {
        return result;
    });

    return book;
}

const searchByTitle = async (titulo) => {
    //Op.substring toma una cadena y le agrega %
    //SELECT * FROM libros
    //WHERE columna OPERADOR valor
    const results = await db.libro.findAll({
        where: {
           titulo: {
               [Op.substring]: titulo
         }
        },
        include: db.autor
        }).then(result => {
            return result;
        });

    return results;
}

const getAutor = async () => {
    //SELECT * FROM autor
    const authors = await db.autor.findAll().then(result => {
        return result;
    });

    return authors;
}

const addBook = async (titulo, precio, portada, autorId) => {
    //Acá vamos a agregar un libro
    console.log('Llegó: ', titulo, precio, portada, autorId);

    //Tengo que armar el INSERT INTO libro...
    const nuevoLibro = await db.libro.create({
        titulo,
        precio,
        portada,
        autorIdAutor: autorId
    });

    return nuevoLibro;
}

const addAuthor = async (nombreCompleto) => {
    console.log('Recibí: ', nombreCompleto);
    //Armar el INSERT INTO autor
    const newAuthor = await db.autor.create({
        nombreCompleto
    });

    return newAuthor;
}

module.exports = {
    getBooks,
    getBookById,
    searchByTitle,
    getAutor,
    addBook,
    addAuthor
}