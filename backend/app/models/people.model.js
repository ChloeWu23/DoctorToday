module.exports = (sequelize, Sequelize) => {
    const People = sequelize.define("People", {
        staff_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        profile: {
            type: Sequelize.TEXT('tiny'), // CHAR(256)
        },
        description: {
            type: Sequelize.TEXT('medium') // VARCHAR(16777216)
        }, 
        image: {
            type: Sequelize.STRING
        }, 
        website: {
            type: Sequelize.STRING
        },
        is_independent: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    })

    return People;
}