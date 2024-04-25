const {Router} = require("express");
const CursoController = require("../controllers/CursoController");

const cursoRoute = new Router();

cursoRoute.get('/', CursoController.listarTodos);

cursoRoute.post('/', CursoController.cadastrar);

cursoRoute.put('/:id', CursoController.atualizar);

cursoRoute.delete('/:id', CursoController.excluir);


module.exports = cursoRoute;