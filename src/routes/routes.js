const { Router } = require('express');
const alunoRoute = require('./aluno.route');
const cursoRoute = require('./curso.route');
const profeRoute = require('./professor.route');

const routes = new Router();

routes.use('/alunos',alunoRoute);
routes.use('/cursos',cursoRoute);
routes.use('/professores',profeRoute);


module.exports = routes;
