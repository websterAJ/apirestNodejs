module.exports = function(app){
    require("./roles.route.js")(app)
    require("./usuarios.route.js")(app)
    require("./auth.routes.js")(app)
};