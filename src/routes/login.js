const {Router} = require('express');
const {sign} = require('jsonwebtoken');
const Login = require('../models/Login');

const loginRoute = new Router();

loginRoute.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    const login = await Login.findOne({ where: { email: email, senha: senha } });

    if (!login) {
        return res.status(401).json({ messagem: 'Email ou senha inválidos!' });
    }
    res.status(200).json({ messagem: 'Login efetuado com sucesso!', login: login });

});

