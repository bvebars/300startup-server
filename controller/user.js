const User = require('../models').User;
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = {

    async getAllUsers(req, res) {
        try {
            const userCollection = await User.findAll({});
            res.status(201).send(userCollection);
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },

    async create(req, res) {
        try {
            const {phone, password} = req.body;
            const thereIsPhone = await User.findAll({
                where: {
                    phone: phone
                }
            });

            // const thereIsPhone = await User.findOne({phone});
            if (Object.keys(thereIsPhone).length > 0) { //Костыль !! thereIsPhone возвращает пустой обьект
                res.status(400).json({message: `такой пользователь уже существует`});
                return
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 12);

            const userCollection = await User.create({
                phone: req.body.phone,
                password: hashedPassword,
            });

            res.status(201).send(userCollection);
        } catch (e) {
            const errors = validationResult(req);
            res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные'
            })
        }
    },

    async update(req, res) {
        try {
            const userCollection = await User.findOne({
                id: req.params.userId
            });
            if (userCollection) {
                const updatedUser = await User.update({
                    id: req.body.phone
                });
                res.status(201).send(updatedUser)
            } else {
                res.status(404).send("User Not Found");
            }
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },

    async login (req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при входе в систему'
                })
            }

            const {phone, password} = req.body;

            const user = await User.findOne({
                where: {
                    phone: phone
                }});

            if (!user) {
                return res.status(400).json({message: 'Пользователь не найден'})
            }

            const isMatch = await bcrypt.compare(password, user.password);


            if(!isMatch) {
                return res.status(400).json({message: 'Пароль не верный'})
            }

            const token = jwt.sign(
                {userId: user.id},
                "123", // Ошибка доступа к файлу конфиг, исправить
                {expiresIn: '1h'}
            );

            await res.json({token, userId: user.id})

        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    }

};