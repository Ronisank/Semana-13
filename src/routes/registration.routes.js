const { Router } = require("express");
const auth = require("../middleware/auth");
const ControllerRegistration = require("../controllers/ControllerRegistration");


const registrationRoute = new Router();

registrationRoute.post('/', auth, ControllerRegistration.register);
registrationRoute.get('/',  ControllerRegistration.listRegistration);

module.exports = registrationRoute;