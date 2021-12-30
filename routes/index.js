var express = require("express");
const res = require("express/lib/response");
const { cls } = require("sequelize");
var router = express.Router();

//Traigo todas las funciones de la API
const api = require('../api');

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// GET resultados page
router.get("/resultados",async (req, res) => {
  // conseguir lo que el usuario tipee en el campo del titulo
  //console.log(req.query)
  const { titulo } = req.query;

  //Enviar titulo a la llamada de la API
  const results = await api.searchByTitle(titulo);

  res.send(results);
});

/*GET agregar page*/
router.get("/agregar", async (req, res ) => {
  const authors = await api.getAutor();
  console.log(authors);
//Le envío los autores al EJS
  res.render("pages/agregar", {authors});
});

/* POST agregar libro, proceso */
router.post("/agregar-libro", async (req, res)=> {
  //Levantar los datos del formulario de agregar
  console.log(req.body);
  const { titulo, precio, portada, autor } = req.body;
  await api.addBook(titulo, precio, portada, autor);
  res.send('vas bien');
});

router.get('/agregar-autor', (req, res) => {
  res.render('pages/agregar-autor');
});

router.post('/agregar-autor', async (req,res) => {
  //Mostrar en consola lo que tipeó el usuario
  // El usuario tipeó req.body.nombreCompleto
 
  console.log('El usuario tipeó: ', req.body.nombreCompleto);
  await api.addAuthor(req.body.nombreCompleto);
//Conexión a la DB, enviando el nombreCompletp y agregando el registro

  res.send('Estás en la versión post');
});
//GET nosotros page
router.get("/nosotros", (req, res) => {
  res.render("pages/nosotros", { title: "Nosotros" });
});

//GET nosotros page
router.get("/contacto", (req, res) => {
  res.render("pages/contacto", { title: "Contacto" });
});

//localhost:3000/libros
router.get("/libros", async (req,res) =>{
  //llamar a la función getBooks
  const books = await api.getBooks();
  //Devolcer el JSON con los libros recibidos
  res.render("pages/libros", { books });
});

router.get("/libro/:id", async (req,res) => {
  const book = await api.getBookById(req.params.id);
  res.render("pages/libro", { book });
});

module.exports = router;
