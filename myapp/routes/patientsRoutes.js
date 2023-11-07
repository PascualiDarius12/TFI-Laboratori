var express = require("express");
var router = express.Router();
const { User } = require("../models");
const { Order } = require("../models");
const bodyParser = require("body-parser");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const authToken = require('../middleware/auth')

router.use(express.static("public"));
router.use(bodyParser.urlencoded({ extended: true }));






router.get("/main/patient/:id", async (req, res) => {
  const id = req.params.id;
  let users = [];
  //lógica para determinar qué plantilla renderizar según el 'id'
  switch (id) {
    case "add":
      res.render("menus/mainsPatient/addPatient.pug");
      break;
    case "search":
      try {
        users = await User.findAll();
        res.render("menus/mainsPatient/searchPatient.pug", { users: users });
      } catch {
        console.error(error);
        res.status(500).send("ERROR in patient search.");
      }
      break;
    default:
      res.render("error.pug");
      break;
  }
});
router.post("/registerUser", async (req, res) => {
  try {
    //hacer validar que no exista
    // validar que los campos sean correctos

    const newUser = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      active: true,
      dni: req.body.dni,
      phone: req.body.phone,
      email: req.body.email,
      adress: req.body.adress,
      key: req.body.clave,
      location: req.body.location,
      birthdate: req.body.birthdate,
      rol: "patient",
    });
    
    //una vez creado generamos un salt con bcrypt
    const salt = await bcrypt.genSalt(10);
    //ahora hasheamos el salt con la clave del usuario
    newUser.key = await bcrypt.hash(newUser.key,salt)
    //guardamos en DB
    newUser.save()


    res.render("messages/messPatient/messAddPatient.pug");
  } catch {
    console.error(error);
    res.status(500).send("Error al registrar el usuario.");
  }
});

router.post("/searchUser", async (req, res) => {
  let dni = req.body.dni;
  let last_name = req.body.last_name;
  let email = req.body.email;

  // let users = await User.findAll({
  //   where: {
  //     dni: dni,
  //   },
  // });

  let users = await User.findAll({
    where: {
      [Op.or]: [{ dni: dni }, { email: email }, { last_name: last_name }],
    },
  });

  let marcador = 1;
  res.render("menus/mainsPatient/searchPatient.pug", {
    users: users,
    marcador: marcador,
  });
});

router.post("/main/patient/updateUser", async (req, res) => {
  let id = req.body.id;
  let users = await User.findAll({
    where: {
      id: id,
    },
  });
  res.render("menus/mainsPatient/updatePatient.pug", { users: users });
});

router.post("/main/patient/deleteUser", async (req, res) => {
  try {
    let id = req.body.id;
    let users = await User.findOne({
      where: {
        id: id,
      },
    });
    if (users) {
      users.active = false;
      await users.save();
    }

    res.render("messages/messPatient/messDeletePatient.pug");
  } catch (error) {
    // Manejar errores aquí
    console.error(error);
    res.status(500).send("Error en la actualización del usuario.");
  }
});

router.post("/main/patient/updateUser/newUser", async (req, res) => {
  try {
    const id = req.body.id;
    const patient = await User.findOne({
      where: {
        id: id,
      },
    });
    if (patient) {
      patient.first_name = req.body.first_name;
      patient.last_name = req.body.last_name;
      patient.gender = req.body.gender;
      patient.dni = req.body.dni;
      patient.phone = req.body.phone;
      patient.email = req.body.email;
      patient.clave = req.body.clave;
      patient.location = req.body.location;
      patient.birthdate = req.body.birthdate;
      if (req.body.active) {
        patient.active = true;
      }

      await patient.save(); // Guardar los cambios en la base de datos
    }

    res.render("messages/messPatient/messUpdatePatient.pug");
  } catch (error) {
    // Manejar errores aquí
    console.error(error);
    res.status(500).send("ERROR in patient update.");
  }
});

module.exports = router;
