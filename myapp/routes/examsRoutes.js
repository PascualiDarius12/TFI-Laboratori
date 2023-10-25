var express = require("express");
var router = express.Router();
const { Exam } = require("../models");
const { Exam_sub_group } = require("../models");
const { Determinant } = require("../models");
const bodyParser = require("body-parser");
const { Op } = require("sequelize");

/* GET users listing. */
router.get("/main/exam/:id", function (req, res, next) {
  const id = req.body.id;
  if (id == "add") {
    res.render("menus/mainsExam/addExam.pug");
  } else if (id == "search") {
    res.render("menus/mainsExam/searchExam.pug");
  }
});

router.post("/addExam", async (req, res) => {
  try {
    const exam = await Exam.create({
      name: req.body.name,
      detail: req.body.detail,
      active: true,
    });
    res.render("messages/messExam/messAddExam.pug", { exam: exam });
  } catch {
    console.error(error);
    res.status(500).send("Error al registrar el usuario.");
  }
});

router.get("/addExamSubGroup", function (req, res) {
  res.render("menus/mainsExam/flotantes/flotanteAddExamSubGroup.pug");
});

router.post("/registerExamSubGroup", async (req, res) => {
  //busco el padre
  let exam = await Exam.findOne({
    where: {
      id: req.body.examId,
    },
  });
  //creo el hijo
  let examSubGroup = await Exam_sub_group.create({
    name: req.body.name,
    detail: req.body.detail,
    active: true,
  });
  //relaciono hijo con padre
  await exam.addExam_sub_group(examSubGroup);
  //busco hijos de padre para que aparezan en la tabla del render acordarse de la 's'
  let children = await exam.getExam_sub_groups();

  res.render("menus/mainsExam/addExamSubGroup.pug", {
    children: children,
  });
});

router.post("/deleteExamSubGroup", async (req, res) => {
  try {
    //busco el examSubGroup
    let examSubGroup = await Exam_sub_group.findOne({
      where: {
        id: req.body.id,
      },
    });
    //busco el examen padre
    let idExam = examSubGroup.ExamId;
    let exam = await Exam.findOne({
      where: {
        id: idExam,
      },
    });
    //borro el exam sub group pero antes sus determinantes asociados

    let determinants = await examSubGroup.getDeterminants();
    determinants.forEach((determinant) => {
      determinant.destroy();
    });
    // await exam.removeExam_sub_group(examSubGroup)
    await examSubGroup.destroy();
    //busco hijos de padre para que aparezan en la tabla del render acordarse de la 's'
    let children = await exam.getExam_sub_groups();

    res.render("menus/mainsExam/addExamSubGroup.pug", {
      children: children,
    });
  } catch {
    res.status(500).send("Error al borrar el usuario.");
  }
});

router.post("/viewDeterminants", async (req, res) => {
  try {
    let examSubGroup = await Exam_sub_group.findOne({
      where: {
        id: req.body.id,
      },
    });

    if (examSubGroup) {
      res.render("menus/mainsExam/viewDeterminant.pug", {
        examSubGroup: examSubGroup,
      });
    } else {
    }
  } catch {
    console.error(error);
    res.status(500).send("Error al registrar el usuario.");
  }
});

router.get("/addDeterminant", function (req, res) {
  res.render("menus/mainsExam/flotantes/flotanteAddDeterminant.pug");
});

router.post("/registerDeterminant", async (req, res) => {
  //busco el padre
  let examSubGroup = await Exam_sub_group.findOne({
    where: {
      id: req.body.exam_Sub_GroupId,
    },
  });
  //creo el hijo
  let determinant = await Determinant.create({
    name: req.body.name,
    abbreviation: req.body.abbreviation,
    measurement: req.body.measurement,
    value_max_male: req.body.maxValueMan,
    value_min_male: req.body.minValueMan,
    value_max_female: req.body.maxValueFemale,
    value_min_female: req.body.minValueFemale,
    active: true,
  });
  //relaciono hijo con padre
  await examSubGroup.addDeterminant(determinant);
  //busco hijos de padre para que aparezan en la tabla del render acordarse de la 's'
  let children = await examSubGroup.getDeterminants();

  res.render("menus/mainsExam/addDeterminant.pug", {
    children: children,
    examSubGroup: examSubGroup,
  });
});

router.post("/deleteDeterminant", async (req, res) => {
  try {
    //busco el determinant
    let determinant = await Determinant.findOne({
      where: {
        id: req.body.id,
      },
    });
    //busco el examSubGroup padre
    let examSubGroupId = req.body.examSubGroupId;
    let examSubGroup = await Exam_sub_group.findOne({
      where: {
        id: examSubGroupId,
      },
    });
    //borro el determinant

    await determinant.destroy();

    //busco hijos de padre para que aparezan en la tabla del render acordarse de la 's'
    let children = await examSubGroup.getDeterminants();

    res.render("menus/mainsExam/addDeterminant.pug", {
      children: children,
      examSubGroup: examSubGroup 
    });
  } catch {
    res.status(500).send("Error al borrar el usuario.");
  }
});
module.exports = router;
