module.exports = (sequelize, Sequelize) => {
    const personas = sequelize.define("personas", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name:{
            type: Sequelize.STRING
        },
        lastname:{
            type: Sequelize.STRING
        },
        email:{
            type: Sequelize.STRING
        },
        type_document:{
            type: Sequelize.STRING
        },
        document_number:{
            type: Sequelize.STRING
        },
        address:{
            type: Sequelize.STRING
        },
        sex:{
            type: Sequelize.STRING
        },
        date_birth:{
            type: Sequelize.DATE
        },
        age:{
            type: Sequelize.INTEGER
        }
    });
    return personas;
};