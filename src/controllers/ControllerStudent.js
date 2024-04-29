const Student = require("../models/Student");

class ControllerStudent {

    async listAll(req, res) {
        try {
            const students = await Student.findAll()
            res.status(201).json(students);

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async listOne(req, res) {
        try {
            const id = req.params.id;

            const student = await Student.findByPk(id);

            if (!student) {
                return res.status(404).json({ message: 'Student not found!' });
            }

            res.json(student);

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async register(req, res) {
        const { name, email, password, birth_date, mobile } = req.body;
        console.log(req.body)
        const student = await Student.create({
            nome: name,
            email: email,
            password: password,
            data_nascimento: birth_date,
            celular: mobile
        });
        res.status(201).json({ message: 'Student created successfully!', student: student });
    }
    async update(req, res) {
        try {
            const id = req.params.id;
            const name = req.body.nome;
            const email = req.body.email;
            const password = req.body.password;
            const birth_date = req.body.data_nascimento;
            const mobile = req.body.celular;

            const student = await Student.findByPk(id);

            if (!student) {
                return res.status(404).json({ message: 'Student not found!' });
            }
            if (!name) {
                return res.status(400).json({ message: 'Name required!' });
            }
            if (!email) {
                return res.status(400).json({ message: 'Email required!' });
            }
            if (!password) {
                return res.status(400).json({ message: 'password required!!' });
            }
            if (!birth_date) {
                return res.status(400).json({ message: 'birth_date required!' });
            }
            student.update(req.body);
            await student.save();
            res.status(200).json({ message: 'Student created successfully!', student: student });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async delete(req, res) {
        try {
            const id = req.params.id;
            const student = await Student.findByPk(id);
            if (!student) {
                return res.status(404).json({ message: 'Student not found!' });
            }
            await student.destroy({ where: { id: id } });
            res.status(204).json({ message: 'Successfully deleted student!' });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ControllerStudent();