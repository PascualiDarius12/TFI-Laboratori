var express = require("express");
var router = express.Router();
const { User } = require("../models");
const { Order } = require("../models");
const bodyParser = require("body-parser");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const authToken = require("../middleware/auth");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Laboratorio" });
});

// Ruta para renderizar la otra plantilla cuando se hace click en una opción del menú
router.get("/main/:id", authToken, async (req, res) => {
  const id = req.params.id;
  //lógica para determinar qué plantilla renderizar según el 'id'
  switch (id) {
    case "patient":
      res.render("menus/mainPatient.pug");
      break;
    case "order":
      // console.log(req.usuario) puedo ver los datos del token ahi
      let orders = await Order.findAll({
        include: User,
      });
      if (orders) {
        res.render("menus/mainOrder.pug", { orders: orders });
      }
      break;
    case "exam":
      res.render("menus/mainExam.pug");
      break;
    case "user":
      let users = await User.findAll({
        where:{
            rol: { [Op.ne]: "patient" }
        }
      })
      res.render("menus/mainUser.pug", {users: users});
      break;
    case "audit":
      res.render("menus/mainAudit.pug");
      break;

    default:
      res.render("error.pug");
      break;
  }
});

module.exports = router;
