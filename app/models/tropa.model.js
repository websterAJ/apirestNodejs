module.exports = (sequelize, Sequelize) => {
    const tropa = sequelize.define("tropa", {
        personasId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        destacamentoId:{
            type: Sequelize.INTEGER,
        },
    });
    const personas = require("./personas.model")(sequelize, Sequelize)
    const destacamento = require("./destacamento.model")(sequelize, Sequelize)

    tropa.hasOne(personas, {
        foreignKey: 'id',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    });
      
    tropa.hasMany(destacamento, {
        foreignKey: 'id',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    });
    return tropa;
};