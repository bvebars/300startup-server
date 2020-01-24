const userController = require('../controller/user');
const {check} = require('express-validator');

module.exports = (app) => {

    app.get('/api', (req, res) => {
        res.status(200).send({
            data: "Welcome Node Sequlize API v1"
        })
    });

    app.get('/users', userController.getAllUsers);

    app.post('/user/create',
        [
            check('phone', 'Некорректный телефон').isLength({min: 10}),
            check('password', 'Пароль слишком короткий').isLength({min: 5})
        ],
        userController.create);

    app.put('/user/:userId', userController.update);

    app.post('/user/login',[
        check('phone', 'Некорректный телефон').isLength({min: 10}),
    ], userController.login);

};
