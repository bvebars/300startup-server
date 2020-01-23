const User = require('../models').User;
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
            const userCollection = await User.create({
                    phone: req.body.phone,
                    password: req.body.password,
                });

            res.status(201).send(userCollection);
        } catch (e) {
            console.log(e);
            res.status(400).send(e);
        }

    },

    async update(req, res) {
        try {
            const userCollection = await User.find({
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
    }
};