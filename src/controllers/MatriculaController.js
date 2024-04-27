const Aluno = require("../models/Aluno");
const Curso = require("../models/Curso");
const Matricula = require("../models/Matricula");


class MatriculaController {

    async cadastrarMatricula(req, res) {
        try {
            // Lógica para cadastrar matrícula
            const aluno_id = req.body.aluno_id;
            const curso_id = req.body.curso_id;

            if (!aluno_id || !curso_id) {
                return res.status(400).json(
                    { messagem: 'Campos aluno_id e curso_id são obrigatórios!' });
            }
            const aluno = await Aluno.findByPk(aluno_id);
            if (!aluno){
                return res.status(404).json({ messagem: 'Aluno não encontrado!' });
            }
            const curso = await Curso.findByPk(curso_id);
            if (!curso){
                return res.status(404).json({ messagem: 'Curso não encontrado!' });
            }
            const matriculaExistente = await Matricula.findOne({
                where: {
                    aluno_id: aluno_id,
                    curso_id: curso_id
                }
            });
            if (matriculaExistente){
                return res.status(400).json({ messagem: 'Matrícula já realizada!' });
            }
            /* Validar se já existe o mesmo curso para o mesmo aluno */

            const cursosMatriculados = await Matricula.findOne({
                where: {
                    aluno_id: aluno_id,
                    }
            });
            if (cursosMatriculados === curso_id){
                return res.status(400).json({ messagem: 'Aluno já matriculado em um curso!' });
            }

            const matricula = await Matricula.create({
                aluno_id: aluno_id,
                curso_id: curso_id
            })
            res.status(201).json({ messagem: 'Matrícula realizada com sucesso!', matricula: matricula});

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
    async listarMatriculas(req, res) {
        try {
            const matriculas = await Matricula.findAll();
            res.json(matriculas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new MatriculaController();