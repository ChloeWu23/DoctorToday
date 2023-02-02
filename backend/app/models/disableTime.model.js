module.exports = (sequelize, Sequelize) => {
    const disableTime = sequelize.define("DisableTime", {
        start_time: {
            type: Sequelize.DATE,
            allowNull: false
        },
        end_time: {
            type: Sequelize.DATE,
            allowNull: false
        }   
    })

    return disableTime;
}