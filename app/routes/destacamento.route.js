const { authJwt } = require("../middleware");
const destacamento = require("../controllers/destacamento.controllers");
module.exports = function(app){
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    app.get("/api/destacamentos/all",[authJwt.verifyToken, authJwt.isAdmin], destacamento.findAll);
};