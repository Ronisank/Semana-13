const Course = require("../models/Course");
const Registration = require("../models/Registration");
const Student = require("../models/Student");


class ControllerRegistration {

    async register(req, res) {
        try {
            // Lógica para cadastrar matrícula
            const student_id = req.body.aluno_id;
            const course_id = req.body.curso_id;

            if (!student_id || !course_id) {
                return res.status(400).json(
                    { message: 'Student_id and course_id fields are required!'});
            }
            const student = await Student.findByPk(student_id);
            if (!student){
                return res.status(404).json({ messagem: 'Student not found!' });
            }
            const course = await Course.findByPk(course_id);
            if (!course){
                return res.status(404).json({ message: 'Course not found!' });
            }
            const existingRegistration = await Registration.findOne({
                where: {
                    aluno_id: student_id,
                    curso_id: course_id
                }
            });
            if (existingRegistration){
                return res.status(400).json({ message: 'Enrollment already done!'});
            }
            /* Validar se já existe o mesmo course para o mesmo student */

            const registeredCourses = await Registration.findOne({
                where: {
                    aluno_id: student_id,
                    }
            });
            if (registeredCourses === course_id){
                return res.status(400).json({ message: ' Students already enrolled on a course!' });
            }

            const registration = await Registration.create({
                aluno_id: student_id,
                curso_id: course_id
            })
            res.status(201).json({ message: 'Registration successful!', registration: registration});

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
    async listRegistration(req, res) {
        try {
            const registration = await Registration.findAll();
            res.json(registration);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ControllerRegistration();