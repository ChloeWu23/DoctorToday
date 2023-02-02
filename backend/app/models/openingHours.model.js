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
        } 
    })

    return OpeningHours;
}