const usuarios = require("../controllers/roles.controller.js");
var router = require("express").Router();

module.exports = function(app) {
    // Create a new Usuarios
    router.post("/", usuarios.create);
    // Retrieve all usuarios
    router.get("/", usuarios.findAll);
    // Retrieve all enabled usuarios
    router.get("/enabled", usuarios.findAllenabled);
    // Retrieve a single usuarios with id
    router.get("/:id", usuarios.findOne);
    // Update a usuarios with id
    router.put("/:id", usuarios.update);
    // Delete a usuarios with id
    router.delete("/:id", usuarios.delete);
    // Create a new usuarios
    router.delete("/", usuarios.deleteAll);
    app.use('/api/roles', router);
  };