const {Router} = require("express");
const ControllerCourse = require("../controllers/ControllerCourse");

const courseRoute = new Router();

courseRoute.get('/', ControllerCourse.listAll);

courseRoute.post('/', ControllerCourse.register);

courseRoute.put('/:id', ControllerCourse.update);

courseRoute.delete('/:id', ControllerCourse.delete);


module.exports = courseRoute;