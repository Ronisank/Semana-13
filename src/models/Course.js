const { connection } = require('../database/connection');
const { DataTypes } = require('sequelize');

const Course = connection.define('cursos', {
    nome: {
        type: DataTypes.STRING,
    },
    duracao_horas: {
        type: DataTypes.INTEGER,
    },
});

module.exports = Course;