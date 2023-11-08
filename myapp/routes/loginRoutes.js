var express = require("express");
var router = express.Router();
const { Op } = require("sequelize");
const { User } = require("../models");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const authToken = require("../middleware/auth");

router.get("/", function (req, res, next) {
  res.render("login");
});

router.post("/getinto", async (req, res, next) => {
  const body = req.body;
  console.log(body);
  let admin = await User.findOne({
    where: {
      email: body.email,
      rol: { [Op.ne]: "patient" },
    },
  });

  if (admin) {
    const validPassword = await bcrypt.compare(body.key, admin.key); //comparo la clave ingresada un la hasheada en ese usuario
    if (validPassword) {
      //validado el password creo un token de autenticacion para poder navegar por la pagina sin tener q estar logenadose en todo momento con jwt
      let token = jwt.sign(
        { id: admin.id, username: admin.last_name, rol: admin.rol },
        "laboratoryDario",
        { expiresIn: "24h" }
      );
      res.json({ token });
    } else {
      res.status(401).json({ mensaje: "Key/email incorrect" });
    }
  } else {
    res.redirect("/login");
  }
});

router.get("/main", authToken, async (req, res) => {
  let token = req.usuario;
  if (token) {
    let admin = await User.findOne({
      where: {
        id: token.id,
        rol: { [Op.ne]: "patient" },
      },
    });
    if(admin){

      res.render("menu.pug", { token: token, admin: admin });
    }
  }

  
});

module.exports = router;
