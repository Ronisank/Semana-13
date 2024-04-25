const Aluno = require("../models/Aluno");

class AlunoController {

    async listarTodos(req, res) {
        try {
            const alunos = await Aluno.findAll()
            res.status(201).json(alunos);

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async listarUm(req, res) {
        try {
            const id = req.params.id;

            const aluno = await Aluno.findByPk(id);

            if (!aluno) {
                return res.status(404).json({ messagem: 'Aluno não encontrado!' });
            }

            res.json(aluno);

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async cadastrar(req, res) {
        const { nome, email, password, data_nascimento, celular } = req.body;

        const aluno = await Aluno.create({
            nome: nome,
            email: email,
            password: password,
            data_nascimento: data_nascimento,
            celular: celular
        });
        res.status(201).json({ messagem: 'Aluno criado com sucesso!', aluno: aluno });
    }
    async atualizar(req, res) {
        try {
            const id = req.params.id;
            const nome = req.body.nome;
            const email = req.body.email;
            const password = req.body.password;
            const data_nascimento = req.body.data_nascimento;
            const celular = req.body.celular;
            const aluno = await Aluno.findByPk(id);

            if (!aluno) {
                return res.status(404).json({ messagem: 'Aluno não encontrado!' });
            }
            if (!nome) {
                return res.status(400).json({ messagem: 'Campo nome obrigatório não preenchido!' });
            }
            if (!email) {
                return res.status(400).json({ messagem: 'Campo email obrigatório não preenchido!' });
            }
            if (!password) {
                return res.status(400).json({ messagem: 'Campo password obrigatório não preenchido!' });
            }
            if (!data_nascimento) {
                return res.status(400).json({ messagem: 'Campo data_nascimento obrigatório não preenchido!' });
            }
            aluno.update(req.body);
            await aluno.save();
            res.status(200).json({ messagem: 'Aluno atualizado com sucesso!', aluno: aluno });

        } catch (error) {
            res.status(500).json({ messagem: error.message });
        }
    }
}

module.exports = new AlunoController();