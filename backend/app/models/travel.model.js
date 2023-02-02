module.exports = (sequelize, Sequelize) => {
    const Travel = sequelize.define("Travel", {
        country_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        path: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    return Travel;
}