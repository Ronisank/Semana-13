const { Router } = require("express");
const Student = require('../models/Student');
const ControllerStudent = require("../controllers/ControllerStudent");
const auth = require('../middleware/auth');

const studentRoute = new Router();


studentRoute.get('/', auth, ControllerStudent.listAll);

studentRoute.get('/:id',auth, ControllerStudent.listOne);

studentRoute.post('/', ControllerStudent.register);

studentRoute.put('/:id',auth, ControllerStudent.update);

studentRoute.delete('/:id',auth, ControllerStudent.delete);

module.exports = studentRoute;