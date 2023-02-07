const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.ServiceOverviews = require("./service.model.js")(sequelize, Sequelize);
db.SubService = require("./subService.model.js")(sequelize, Sequelize);
db.DisableTime = require("./disableTime.model.js")(sequelize, Sequelize);
db.Holiday = require("./holiday.model.js")(sequelize, Sequelize);
db.OpeningHours = require("./openingHours.model.js")(sequelize, Sequelize);
db.FAQ = require("./faq.model.js")(sequelize, Sequelize);
db.People = require("./people.model.js")(sequelize, Sequelize);
db.Travel = require("./travel.model.js")(sequelize, Sequelize);
db.OtherInfo = require("./otherInfo.model")(sequelize, Sequelize);

module.exports = db;