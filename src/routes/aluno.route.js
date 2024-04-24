const { Router } = require("express");
const Aluno = require('../models/Aluno');
const AlunoControllers = require("../controllers/AlunoControllers");

const alunoRoute = new Router();


alunoRoute.get('/', AlunoControllers.listarTodos);

alunoRoute.get('/:id', AlunoControllers.listarUm);

alunoRoute.post('/', AlunoControllers.cadastrar);

alunoRoute.put('/:id', AlunoControllers.atualizar);

alunoRoute.delete('/alunos/:id', async (req, res) => {
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