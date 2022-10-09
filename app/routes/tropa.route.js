const { authJwt } = require("../middleware");
const tropa = require("../controllers/tropa.controllers");
module.exports = function(app){
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    app.get("/api/tropas/all",[authJwt.verifyToken, authJwt.isAdmin], tropa.findAll);
};