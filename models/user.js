module.exports = (sequelize,DataTypes) => {
    let User = sequelize.define('User',{
        phone : DataTypes.BIGINT,
        password : DataTypes.STRING,
    }, {});

    User.associate = function(models) {
        User.hasMany(models.Product,{
            foreignKey : 'userId',
            as : 'product'
        });
    };
    return User;
};
