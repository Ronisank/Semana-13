const { Router } = require('express');
const studentRoute = require('./student.route');
const courseRoute = require('./course.route');
const loginRoute = require('./login');
const registrationRoute = require('./registration.routes');
const teacherRoute = require('./professor.route');

const routes = new Router();

routes.use('/students',studentRoute);
routes.use('/courses',courseRoute);
routes.use('/teachers',teacherRoute);
routes.use('/login',loginRoute)
routes.use('/registrations', registrationRoute)


module.exports = routes;
