const { Router } = require("express");
const Aluno = require('../models/Aluno');
const AlunoController = require("../controllers/AlunoController");
const auth = require('../middleware/auth');

const alunoRoute = new Router();


alunoRoute.get('/', auth, AlunoController.listarTodos);

alunoRoute.get('/:id',auth, AlunoController.listarUm);

alunoRoute.post('/', AlunoController.cadastrar);

alunoRoute.put('/:id',auth, AlunoController.atualizar);

alunoRoute.delete('/alunos/:id',auth, async (req, res) => {
    try {
        const id = req.params.id;
        const aluno = await Aluno.findByPk(id);
        if (!aluno) {
            return res.status(404).json({ messagem: 'Aluno não encontrado!' });
        }
        await aluno.destroy({ where: { id: id } });
        res.status(204).json({ messagem: 'Aluno deletado com sucesso!' });

    } catch (error) {
        res.status(500).json({ messagem: error.message });
    }
});

module.exports = alunoRoute;