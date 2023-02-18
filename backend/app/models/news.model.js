module.exports = (sequelize, Sequelize) => {
    const News = sequelize.define("News", {
        news_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        content: {
            type: Sequelize.TEXT("medium")
        }
    });
  
    return News;
  };