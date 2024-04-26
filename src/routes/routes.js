const { Router } = require('express');
const alunoRoute = require('./aluno.route');
const cursoRoute = require('./curso.route');
const profeRoute = require('./professor.route');
const loginRoute = require('./login');
const matriculaRoute = require('./matricula.routes');

const routes = new Router();

routes.use('/alunos',alunoRoute);
routes.use('/cursos',cursoRoute);
routes.use('/professores',profeRoute);
routes.use('/login',loginRoute)
routes.use('/matricula', matriculaRoute)


module.exports = routes;
