const db = require("../models");
const destacamento = db.destacamento;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "El contenido no puede estar vacío."
        });
        return;
    }
    // Create a usuarios
    const Resquestdata = {
        name: req.body.name
    };
    destacamento.create(Resquestdata).then(data => {
      res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Se ha producido algún error al crear el destacamento."
        });
    });
}
exports.findAll = (req, res) => {
};
// Find a single destacamento with an id
exports.findOne = (req, res) => {
};
// Update a destacamento by the id in the request
exports.update = (req, res) => {
   
};
// Delete a destacamento with the specified id in the request
exports.delete = (req, res) => {
  
};
// Delete all destacamentos from the database.
exports.deleteAll = (req, res) => {
  
};