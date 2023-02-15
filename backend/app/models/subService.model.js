module.exports = (sequelize, Sequelize) => {
    const SubService = sequelize.define("SubService", {
        cat_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        sub_service_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        short_name: {
            type: Sequelize.STRING
        },
        sub_service_name: {
            type: Sequelize.TEXT('tiny'), // CHAR(256)
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT('medium') // VARCHAR(16777216)
        }, 
        price: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    return SubService;
}