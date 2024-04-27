const { connection } = require('../database/connection');
const { DataTypes } = require('sequelize');
const { hash } = require('bcryptjs');

const Aluno = connection.define('alunos', {
    nome: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    data_nascimento: {
        allowNull: false,
        type: DataTypes.DATEONLY,
    },
    celular: {
        allowNull: true,
        type: DataTypes.STRING,
    },
});
Aluno.beforeSave(async (aluno) => {
    aluno.password = await hash(aluno.password, 8)
    console.log(aluno.password)
    return aluno
})

module.exports = Aluno;

