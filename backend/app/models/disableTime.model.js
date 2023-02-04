module.exports = (sequelize, Sequelize) => {
    const disableTime = sequelize.define("DisableTime", {
        date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        start_time: {
            type: Sequelize.TIME
        },
        end_time: {
            type: Sequelize.TIME
        }   
    })

    return disableTime;
}