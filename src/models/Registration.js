const { connection } = require('../database/connection');
const { DataTypes } = require('sequelize');

const Registration = connection.define('matriculas', {
    aluno_id: {
        type: DataTypes.INTEGER,
    },
    curso_id: {
        type: DataTypes.INTEGER,
    },
});

module.exports = Registration;

