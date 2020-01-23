module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('Product', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            img: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            weight: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            userId : {
                type : Sequelize.INTEGER,
                onDelete : 'CASCADE',
                references : {
                    model : 'Users',
                    key : 'id',
                    as : 'userId'
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        }),
    down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Product'),
};