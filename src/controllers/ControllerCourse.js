const Course = require("../models/Course");

class ControllerCourse {

    async listAll(req, res) {
        let params = {}

        if (req.query.name) {
            params = { ...params, name: req.query.name }
        }
        if (req.query.duration_hours) {
            params = { ...params, duration_hours: req.query.duration_hours }
        }
        const courses = await Course.findAll({ where: params })
        res.json(courses);
    };

    async register(req, res) {
        try {
            const name = req.body.name;
            const duration_hours = parseInt(req.body.duration_hours);

            if (!name) {
                return res.status(400).json(
                    { message: 'Mandatory name field not filled in' });
            }
            if (!(duration_hours >= 40 && duration_hours <= 700)) {
                return res.status(400).json(
                    { message: 'Mandatory duration_hours field between 40 and 700 Hs.' });
            }
            const course = await Course.create({
                name: name,
                duration_hours: duration_hours
            });
            res.status(201).json({ message: 'Course created successfully!', course: course });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }

    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const name = req.body.name;
            const duration_hours = parseInt(req.body.duration_hours);
            const course = await Course.findByPk(id);

            if (!course) {
                return res.status(404).json({ message: 'Course not found!' });
            }
            if (!nome) {
                return res.status(400).json({ message: 'Mandatory name field not filled in!' });
            }
            if (!(duration_hours >= 40 && duration_hours <= 700)) {
                return res.status(400).json({ message: 'Mandatory duration_hours field between 40 and 700 Hs.' });
            }
            course.update(req.body);
            await course.save();
            res.status(200).json({ message: 'Course updated successfully!', course: course });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            const course = await Course.findByPk(id);
            if (!course) {
                return res.status(404).json({ message: 'Course not found!' });
            }
            await course.destroy({ where: { id: id } });
            res.status(204).json({ message: 'Course deleted successfully!' });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ControllerCourse();