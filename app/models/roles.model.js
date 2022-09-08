module.exports = (sequelize, Sequelize) => {
    const roles = sequelize.define("roles", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        enabled: {
            type: Sequelize.BOOLEAN
        }
    });
    return roles;
};