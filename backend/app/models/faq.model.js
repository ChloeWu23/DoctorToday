module.exports = (sequelize, Sequelize) => {
    const FAQ = sequelize.define("FAQ", {
        faq_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        question: {
            type: Sequelize.TEXT('tiny'), // CHAR(256)
            allowNull: false
        },
        answer: {
            type: Sequelize.TEXT('medium') // VARCHAR(16777216)
        }
    })

    return FAQ;
}