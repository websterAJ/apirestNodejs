const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
const Role = db.roles;
const User = db.usuarios;
const Person = db.personas;
const app = express();

db.sequelize.sync({ force: true })
  .then(() => {
    console.log("Synced db.");
    initial();
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
});

function initial() {
  var bcrypt = require("bcryptjs");
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "moderator"
  });

  Role.create({
    id: 3,
    name: "admin"
  });
  /*Person.create({
    name: "admin",
    lastname: "admin",
    email:"admin@admin.com",
    type_document: "V",
    document_number: "12345678",
    address: "caracas",
    sex: "M",
    date_birth: new Date("1997-01-17"),
    age:  25
  });*/
  User.create({
    id: 1,
    username:"admin",
    password:bcrypt.hashSync("admin123", 8),
    enabled: true
  });
}

var corsOptions = {
  //origin: "http://localhost:8080",
  credentials: true
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to servitec application." });
});
require("./app/routes/")(app);
//require("./app/routes/usuarios.route")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
