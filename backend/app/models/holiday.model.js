module.exports = (sequelize, Sequelize) => {
    const Holiday = sequelize.define("Holiday", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        }
    })

    return Holiday;
}