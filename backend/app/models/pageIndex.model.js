module.exports = (sequelize, Sequelize) => {
    const PageIndex = sequelize.define("PageIndex", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        page_title: {
            type: Sequelize.STRING, 
            allowNull: false
        },
        url: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    return PageIndex;
}