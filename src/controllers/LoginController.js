const { sign } = require("jsonwebtoken")
const { compare } = require("bcryptjs")
const Student = require("../models/Student")


class LoginController {

    async login(req, res) {
        try {
            const email = req.body.email
            const password = req.body.password

            if (!email) {
                return res.status(400).json({ message: 'Email required' })
            }

            if (!password) {
                return res.status(400).json({ message: 'Password required' })
            }

            const student = await Student.findOne({
                where: { email: email }
            })
            if (!student) {

                return res.status(404).json({ message: 'No student matches the email and password provided!' })
            }

            const hashSenha = await compare(password, student.password)
            console.log(hashSenha)

            if (hashSenha === false) {
                return res.status(403).json({ message: 'Student not found' })
            }

            const payload = { sub: student.id, email: student.email, nome: student.nome }

            const token = sign(payload, process.env.SECRET, {
                expiresIn: '24h'
            })

            res.status(200).json({ Token: token })

        } catch (error) {
            return res.status(500).json({ error: error.message, message: 'Something is wrong!' })
        }
    };
}

module.exports = new LoginController();