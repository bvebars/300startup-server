const Product = require('../models').Product;
const User = require('../models').User;

module.exports = {
    async getAllProductsOfUser(req,res) {
        try {
            const userCollection = await User.find({
                id : req.params.userId
            });

            if(userCollection){
                const productCollection = await Product.find({
                    userId : req.params.userId
                });

                res.status(201).send(productCollection);
            }
            else{
                re.status(404).send("User Not Found")
            }
        }
        catch(e){
            console.log(e);
            res.status(500).send(e);
        }
    },

    async createProduct(req,res) {
        try {
            const product = await Product.create({
                name : req.body.name,
                userId : req.body.userId
            });
            res.status(201).send(product)
        }
        catch(e){
            console.log(e);
            res.status(400).send(e);
        }
    },

    async update(req,res) {
        try{
            const productCollection = await Product.find({
                id : req.params.productId
            });
            if(productCollection){
                const updatedProduct = await productCollection.update({
                    title : req.body.title
                });

                res.status(201).send(updatedProduct);
            }
            else{
                res.status(404).send("Product Not Found");
            }
        }
        catch(e){
            console.log(e);
            res.status(400).send(e);
        }

    }
};