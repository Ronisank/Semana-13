const { Router } = require('express');
const alunoRoute = require('./aluno.route');
const courseRoute = require('./course.route');
const profeRoute = require('./professor.route');
const loginRoute = require('./login');
const matriculaRoute = require('./matricula.routes');

const routes = new Router();

routes.use('/alunos',alunoRoute);
routes.use('/courses',courseRoute);
routes.use('/professores',profeRoute);
routes.use('/login',loginRoute)
routes.use('/matricula', matriculaRoute)


module.exports = routes;
