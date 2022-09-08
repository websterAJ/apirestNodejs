const db = require("../models");
const Usuarios = db.usuarios;
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
    // Create a usuarios
    const usuario = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        enabled: req.body.enabled ? req.body.enabled : false
    };
    // Save usuarios in the database
    Usuarios.create(usuario).then(data => {
      res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the usuarios."
        });
    });
};
// Retrieve all Usuarios from the database.
exports.findAll = (req, res) => {
    const username = req.query.username;
    var condition = username ? { username: { [Op.iLike]: `%${username}%` } } : null;
    Usuarios.findAll({ where: condition }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving usuarios."
        });
    });
};
// Find a single Usuario with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    const email = req.params.email;
    const username = req.params.username;
    if (id != null) {
        Usuarios.findByPk(id).then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Usuarios with id=${id}.`
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Error retrieving Usuarios with id=" + id
            });
        });
    }else if(email != null) {
        Usuarios.findOne({where:{'email':email}}).then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Usuarios with id=${id}.`
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Error retrieving Usuarios with id=" + id
            });
        });
    }
    else if(username != null) {
        Usuarios.findOne({where:{'username':username}}).then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Usuarios with id=${id}.`
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Error retrieving Usuarios with id=" + id
            });
        });
    }
    
};
// Update a Usuario by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Usuarios.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
            message: "Usuarios was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update Usuarios with id=${id}. Maybe Usuarios was not found or req.body is empty!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error updating Usuarios with id=" + id
        });
    });
};
// Delete a Usuario with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Usuarios.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
            message: "Usuarios was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Usuarios with id=${id}. Maybe Usuarios was not found!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Could not delete Usuarios with id=" + id
        });
    });
};
// Delete all Usuarios from the database.
exports.deleteAll = (req, res) => {
    Usuarios.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.send({ message: `${nums} Usuarios were deleted successfully!` });
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all Usuarios."
        });
    });
};
// Find all enabled Usuarios
exports.findAllenabled = (req, res) => {
    Tutorial.findAll({ where: { enabled: true } }).then(data => {
      res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Usuarios."
        });
    });
};

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};
