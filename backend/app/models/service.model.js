module.exports = (sequelize, Sequelize) => {
    const ServiceOverviews = sequelize.define("ServiceOverview", {
        serviceName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        bind_id: {
            type: Sequelize.INTEGER
        },
        service_cat_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        description_1: {
            type: Sequelize.STRING
        },
        description_2: {
            type: Sequelize.STRING
        },
        description_3: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        },
        appointment_iframe: {
            type: Sequelize.STRING
        }
    });
  
    return ServiceOverviews;
  };