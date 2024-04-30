const { connection } = require('../database/connection');
const { DataTypes } = require('sequelize');
const { hash } = require('bcryptjs');

const Student = connection.define('alunos', {
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
Student.beforeSave(async (student) => {
    student.password = await hash(student.password, 8)
    console.log(student.password)
    return student
})

module.exports = Student;

