module.exports = (sequelize, Sequelize) => {
    const oficiales = sequelize.define("oficiales", {
        personasId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        destacamentoId:{
            type: Sequelize.INTEGER,
        },
    });
    const personas = require("./personas.model")(sequelize, Sequelize)
    const destacamento = require("./destacamento.model")(sequelize, Sequelize)
    oficiales.hasOne(personas, {
        foreignKey: 'id',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    });
    oficiales.hasMany(destacamento, {
        foreignKey: 'id',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    });
    return oficiales;
};