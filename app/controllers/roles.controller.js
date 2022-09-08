const db = require("../models");
const Roles = db.roles;
const Op = db.Sequelize.Op;
// Create and Save a new Usuario
exports.create = (req, res) => {
    // Validate request
    if (!req.body.username) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a roles
    const usuario = {
        username: req.body.username,
        password: req.body.password,
        enabled: req.body.enabled ? req.body.enabled : false
    };
    // Save roles in the database
    Roles.create(usuario).then(data => {
      res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the roles."
        });
    });
};
// Retrieve all Roles from the database.
exports.findAll = (req, res) => {
    const username = req.query.username;
    var condition = username ? { username: { [Op.iLike]: `%${username}%` } } : null;
    Roles.findAll({ where: condition }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving roles."
        });
    });
};
// Find a single Usuario with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Roles.findByPk(id).then(data => {
        if (data) {
        res.send(data);
        } else {
        res.status(404).send({
            message: `Cannot find Roles with id=${id}.`
        });
        }
    }).catch(err => {
        res.status(500).send({
        message: "Error retrieving Roles with id=" + id
        });
    });
};
// Update a Usuario by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Roles.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
            message: "Roles was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update Roles with id=${id}. Maybe Roles was not found or req.body is empty!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error updating Roles with id=" + id
        });
    });
};
// Delete a Usuario with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Roles.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
            message: "Roles was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Roles with id=${id}. Maybe Roles was not found!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Could not delete Roles with id=" + id
        });
    });
};
// Delete all Roles from the database.
exports.deleteAll = (req, res) => {
    Roles.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.send({ message: `${nums} Roles were deleted successfully!` });
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all Roles."
        });
    });
};
// Find all enabled Roles
exports.findAllenabled = (req, res) => {
    Tutorial.findAll({ where: { enabled: true } }).then(data => {
      res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Roles."
        });
    });
};
