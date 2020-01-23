const userController = require('../controller/user');
const productController = require('../controller/product');

module.exports = (app) => {

    app.get('/api', (req, res) => {
        res.status(200).send({
            data: "Welcome Node Sequlize API v1"
        })
    });

    app.get('/api/:userId/product',productController.getAllProductsOfUser);

    app.post('/api/product/create',productController.createProduct);

    app.put('/api/:productId',productController.update);

};
