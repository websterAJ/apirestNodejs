const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db      = {};
db.Sequelize  = Sequelize;
db.sequelize  = sequelize;
db.personas   = require("./personas.model.js")(sequelize, Sequelize);
db.usuarios   = require("./usuarios.model.js")(sequelize, Sequelize);
db.roles      = require("./roles.model.js")(sequelize, Sequelize);

db.oficiales      = require("./oficiales.model.js")(sequelize, Sequelize);
db.destacamento   = require("./destacamento.model.js")(sequelize, Sequelize);
db.tropa          = require("./tropa.model.js")(sequelize, Sequelize);

//relaciones de base de datos

db.personas.belongsToMany(db.usuarios, {
  through: "person_user",
  foreignKey: "personasId",
  otherKey: "userId"
});

db.usuarios.belongsToMany(db.personas, {
  through: "person_user",
  foreignKey: "userId",
  otherKey: "personasId"
});

db.roles.belongsToMany(db.usuarios, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.usuarios.belongsToMany(db.roles, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
