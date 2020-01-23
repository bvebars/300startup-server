module.exports = (sequelize, DataTypes) => {
    let Product = sequelize.define('Product', {
        name: DataTypes.STRING,
        img: DataTypes.STRING,
        weight: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
    });

    Product.associate = function (models) {
        Product.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: 'userId'
        });
    };

    return Product;
};
