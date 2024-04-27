const {Router} = require('express');
const LoginController = require('../controllers/LoginController');


const loginRoute = new Router();

loginRoute.post('/', LoginController.login);

module.exports = loginRoute;

