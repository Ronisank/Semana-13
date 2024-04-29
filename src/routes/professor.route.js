const { Router } = require('express');
const Teacher = require('../models/Teacher');

const teacherRoute = new Router();    

teacherRoute.get('/teachers', async (req, res) => {
    const params = {}
    if (req.query.name) {
        params = { ...params, name: req.query.name }
    }
    const teachers = await Teacher.findAll({ where: params })
    res.status(200).json({ teachers });
});

teacherRoute.post('/teachers', async (req, res) => {
    try {
        const { name, birth_date } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Name required!' });
        }
        if (!birth_date) {
            return res.status(400).json({ message: 'Birth date required!' });
        }
        const teacher = await Teacher.create({
            name: name,
            birth_date: birth_date
        });
        res.status(201).json({ message: 'Teacher created successfully', teacher: teacher });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

teacherRoute.put('/teachers/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const birth_date = req.body.birth_date;

        const teacher = await Teacher.findByPk(id);

        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found!' });
        }
        if (!name) {
            return res.status(400).json({ message: 'Name required!' });
        }
        if (!birth_date) {
            return res.status(400).json({ message: 'Birth_date required!' });
        }
        teacher.update(req.body);
        await teacher.save();
        res.status(200).json({ message: 'Teacher successfully upgraded!', teacher: teacher });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

teacherRoute.delete('/teachers/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const teacher = await Teacher.findByPk(id);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found!' });
        }
        await teacher.destroy({ where: { id: id } });
        res.status(204);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = teacherRoute;