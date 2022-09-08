const db = require("../models");
const Personas = db.personas;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a usuarios
    const persona = {
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        type_document: req.body.type_document,
        document_number: req.body.document_number,
        address: req.body.address,
        sex: req.body.sex,
        date_birth: req.body.date_birth,
        age:  req.body.age
    };
    // Save usuarios in the database
    Personas.create(persona).then(data => {
      res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the persona."
        });
    });
};
// Retrieve all Personas from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    const document_number = req.query.document_number;
    var condition = null;
    if (name != null) {
        condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
    }else if(document_number != null){
        condition = document_number ? { document_number: { [Op.iLike]: `%${document_number}%` } } : null;
    }
    
    Personas.findAll({ where: condition }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving persona."
        });
    });
};
// Find a single Persona with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    const document_number = req.params.document_number;
    if (id != null) {
        Personas.findByPk(id).then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Personas with id=${id}.`
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Error retrieving Personas with id=" + id
            });
        });
    }else if(document_number != null) {
        Personas.findOne({where:{'document_number':document_number}}).then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Personas with id=${id}.`
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Error retrieving Personas with id=" + id
            });
        });
    }
};
// Update a Persona by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Personas.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
            message: "Personas was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update Personas with id=${id}. Maybe Personas was not found or req.body is empty!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error updating Personas with id=" + id
        });
    });
};
// Delete a Persona with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Personas.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
            message: "Personas was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Personas with id=${id}. Maybe Personas was not found!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Could not delete Personas with id=" + id
        });
    });
};
// Delete all Personas from the database.
exports.deleteAll = (req, res) => {
    Personas.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.send({ message: `${nums} Personas were deleted successfully!` });
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all Personas."
        });
    });
};