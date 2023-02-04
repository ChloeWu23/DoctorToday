module.exports = (sequelize, Sequelize) => {
    const OpeningHours = sequelize.define("OpeningHours", {
        day: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        start_time: {
            type: Sequelize.TIME
        },
        end_time: {
            type: Sequelize.TIME
        },
        disable_time_start: {
            type: Sequelize.TIME
        },
        disable_time_end: {
            type: Sequelize.TIME
        }
    })

    return OpeningHours;
}