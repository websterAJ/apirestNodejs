module.exports = (sequelize, Sequelize) => {
    const usuarios = sequelize.define("usuarios", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        enabled: {
            type: Sequelize.BOOLEAN
        }
    });
    return usuarios;
};