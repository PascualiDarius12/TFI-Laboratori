var express = require("express");
var router = express.Router();
const { Exam } = require("../models");
const { Sample } = require("../models");
const { User } = require("../models");
const { Order } = require("../models");
const { OrderExam } = require("../models");
const { OrderSample } = require("../models");
const { Op } = require("sequelize");

//route add patient

router.get("/order/addPatient", async (req, res) => {
  let patients = await User.findAll({
    where: {
      rol: "patient",
      active: true,
    },
  });
  res.render("menus/mainsOrder/flotantes/flotanteAddOrder.pug", {
    patients: patients,
  });
});

//route add order

router.post("/order/addOrder", async (req, res) => {
  let patient = await User.findOne({
    where: {
      id: req.body.id,
    },
  });

  let newOrder = await Order.create({
    state: "Esperando toma de muestra",
    active: true,
  });

  await patient.addOrder(newOrder);

  let patients = await User.findAll({
    where: {
      rol: "patient",
      active: true,
    },
  });
  let orders = await Order.findAll({
    include: User,
  });
  res.render("menus/mainOrder.pug", { orders: orders });
});

//view exams of order

router.post("/order/viewExams", async (req, res) => {
  try {
    let order = await Order.findOne({
      where: {
        id: req.body.id,
      },
      include: User,
    });

    let exams = await order.getExams();

    res.render("menus/mainsOrder/viewExams.pug", {
      order: order,
      exams: exams,
    });
  } catch {
    console.log("error view values");
  }
});

//route add exam

router.post("/order/addExam", async (req, res) => {
  let orderId = req.body.id;
  let exams = await Exam.findAll({
    where: {
      [Op.or]: [
        {
          "$Orders.id$": null, // Exámenes no asociados a ninguna orden
        },
        {
          "$Orders.id$": { [Op.ne]: orderId }, // Exámenes no asociados a la orden con id de la order
        },
      ],
    },
    include: {
      model: Order,
      required: false,
    },
  });
  res.render("menus/mainsOrder/flotantes/flotanteAddExam.pug", {
    exams: exams,
  });
});

//route add exams of order

router.post("/order/regExams", async (req, res) => {
    console.log(req.body)
  try {
    let asociacion = await OrderExam.create({
      OrderId: req.body.orderId,
      ExamId: req.body.id,
    });

    console.log(asociacion)

    let orderId = req.body.orderId;
    let exams = await Exam.findAll({
      where: {
        [Op.or]: [
          {
            "$Orders.id$": null, // Exámenes no asociados a ninguna orden
          },
          {
            "$Orders.id$": { [Op.ne]: orderId }, // Exámenes no asociados a la orden con id de la order
          },
        ],
      },
      include: {
        model: Order,
        required: false,
      },
    });
    res.render("menus/mainsOrder/flotantes/flotanteAddExam.pug", {
      exams: exams,
    });
  } catch {
    console.log("error generate asociation exam and order");
  }
});

//view samples of order

router.post("/order/viewSamples", async (req, res) => {
  try {
    
    let order = await Order.findOne({
      where: {
        id: req.body.id,
      },
      include: User,
    });

    let exams = await order.getExams();

    let samples = [];
    for (const exam of exams) {
      const examSamples = await exam.getSamples();
      samples = samples.concat(examSamples);
    }

    res.render("menus/mainsOrder/viewSamples.pug", {
      order: order,
      exams: exams,
      samples: samples,
    });
  } catch {
    console.log("error view values");
  }
});

//route deliver sample
router.post("/order/deliverSamples", async (req,res) => {
  let order = await Order.findOne({
    where:{
        id: req.body.orderId
    }
  })

  let user = await User.findOne({
    where:{
      id: req.body.userId 
    }
  })

  let sample = await Sample.findAll({
    where:{
      id: req.body.sampleId
    }
  })

  let orderSample = await OrderSample.create({
    OrderId: req.body.orderId,
    SampleId: req.body.sampleId,
  })

  res.render('menus/mainsOrder/etiquetaSample.pug',{
    orderSample: orderSample,
    order: order,
    user: user
  })


})


module.exports = router;
