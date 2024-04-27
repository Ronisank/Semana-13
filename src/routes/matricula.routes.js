const { Router } = require("express");
const MatriculaController = require("../controllers/MatriculaController");
const auth = require("../middleware/auth");


const matriculaRoute = new Router();

matriculaRoute.post('/', auth, MatriculaController.cadastrarMatricula);
matriculaRoute.get('/',  MatriculaController.listarMatriculas);

module.exports = matriculaRoute;