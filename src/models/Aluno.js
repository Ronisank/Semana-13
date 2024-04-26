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
Aluno.beforeSave(async (user) => {
    user.password = await hash(user.password, 8)
    return user
})

module.exports = Aluno;

