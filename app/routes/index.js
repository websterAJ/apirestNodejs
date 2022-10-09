module.exports = function(app){
    require("./destacamento.route.js")(app)
    require("./oficiales.route.js")(app)
    require("./tropa.route.js")(app)
    require("./roles.route.js")(app)
    require("./usuarios.route.js")(app)
    require("./auth.routes.js")(app)
};