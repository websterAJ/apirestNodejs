module.exports = (sequelize, Sequelize) => {
    const destacamento = sequelize.define("destacamento", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre:{
            type: Sequelize.STRING
        }
    });
    return destacamento;
};