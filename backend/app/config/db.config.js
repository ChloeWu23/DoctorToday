module.exports = {
    HOST: "127.0.0.1",
    USER: "root",
    PASSWORD: "karena_WD23",
    DB: "vue",
      port:3306,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };