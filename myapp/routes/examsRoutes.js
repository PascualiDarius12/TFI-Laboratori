var express = require("express");
var router = express.Router();
const { Exam } = require("../models");
const { Determinant } = require("../models");
const { Value_reference } = require("../models");
const { Sample} = require("../models");
const { Op } = require("sequelize");

/* GET Exams listing. */
router.get("/main/exam/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  switch (id) {
    case "exam":
      let exams = await Exam.findAll();
      res.render("menus/mainsExam/viewExam.pug",{exams: exams});
      break;
    case "determinant":
      let determinants = await Determinant.findAll();
      res.render("menus/mainsExam/viewDeterminant.pug", {
        determinants: determinants,
      });

      break;
    case "sample":
      let samples = await Sample.findAll();
      res.render("menus/mainsExam/viewSamples.pug", {
        samples: samples,
      });

      break;
    default:
      console.log("error");
      break;
  }
});

//ROUTES OF DETERMINANTS

//Add determinant

router.get("/addDeterminant", (req, res) => {
  try {
    res.render("menus/mainsExam/flotantes/flotanteAddDeterminant.pug");
  } catch {
    console.log(error);
  }
});

//register determinant

router.post("/registerDeterminant", async (req, res) => {
  await Determinant.create({
    name: req.body.name,
    abbreviation: req.body.abbreviation,
    measurement: req.body.measurement,
    detail: req.body.detail,
    active: true,
  });

  let determinants = await Determinant.findAll();
  res.render("menus/mainsExam/viewDeterminant.pug", {
    determinants: determinants,
  });
});

//search determinant

router.post("/searchDeterminant", async (req, res) => {
  try {
    let determinants = await Determinant.findAll({
      where: {
        name: {
          [Op.like]: "%" + req.body.name + "%",
        },
      },
    });
    res.render("menus/mainsExam/tablaDeterminants.pug", {
      determinants: determinants,
    });
  } catch {
    console.log("error search determinant");
  }
});

//update determinant
router.post("/updateDeterminant", async (req, res) => {
  try {
    let determinant = await Determinant.findOne({
      where: {
        id: req.body.id,
      },
    });
    res.render("menus/mainsExam/flotantes/flotanteUpdateDeterminant.pug", {
      determinant: determinant,
    });
  } catch {
    console.log(error);
  }
});

//register Update Determinant
router.post("/regUpdateDeterminant", async (req, res) => {
  try {
    const id = req.body.id;
    const determinant = await Determinant.findOne({
      where: {
        id: id,
      },
    });
    if (determinant) {
      determinant.name = req.body.name;
      determinant.abbreviation = req.body.abbreviation;
      determinant.measurement = req.body.measurement;
      determinant.detail = req.body.detail;
      determinant.active = req.body.active;

      await determinant.save();
      let determinants = await Determinant.findAll();
      res.render("menus/mainsExam/viewDeterminant.pug", {
        determinants: determinants,
      });
    }
  } catch (error) {
    // Manejar errores aquí
    console.error(error);
    res.status(500).send("ERROR in determinant update.");
  }
});

//delete determinant

router.post("/deleteDeterminant", async (req, res) => {
  try {
    let determinant = await Determinant.findOne({
      where: {
        id: req.body.id,
      },
    });

    if (determinant) {
      (determinant.active = false), await determinant.save();
      let determinants = await Determinant.findAll();
      res.render("menus/mainsExam/viewDeterminant.pug", {
        determinants: determinants,
      });
    }
  } catch {
    res.status(500).send("Error al borrar el usuario.");
  }
});

//view reference_values

router.post("/viewValues", async (req, res) => {
  try {
    let determinant = await Determinant.findOne({
      where: {
        id: req.body.id,
      },
    });

    let reference_values = await determinant.getValue_references();

    res.render("menus/mainsExam/viewValues.pug", {
      reference_values: reference_values,
      determinant: determinant,
    });
  } catch {
    console.log("error view values");
  }
});

//add Value
router.get("/addValue", (req, res) => {
  try {
    res.render("menus/mainsExam/flotantes/flotanteAddValue.pug");
  } catch {
    console.log(error);
  }
});
//register Value
router.post("/registerValue", async (req, res) => {
  try {
    let valueReference = await Value_reference.create({
      gender: req.body.gender,
      age: req.body.age,
      pregnant: req.body.pregnant,
      max_value: req.body.max_value,
      min_value: req.body.min_value,
      max_limit: req.body.max_limit,
      min_limit: req.body.min_limit,
      active: true,
    });

    let determinant = await Determinant.findOne({
      where: {
        id: req.body.determinantId,
      },
    });

    //asociation
    await determinant.addValue_reference(valueReference);
    //search children ('s')
    let reference_values = await determinant.getValue_references();
    res.render("menus/mainsExam/viewValues.pug", {
      reference_values: reference_values,
      determinant: determinant,
    });
  } catch {
    console.log("error register new value and view values of determinants");
  }
});

//update reference value
router.post("/updateValue", async (req, res) => {
  try {
    let referenceValue = await Value_reference.findOne({
      where: {
        id: req.body.id,
      },
    });
    res.render("menus/mainsExam/flotantes/flotanteUpdateValue.pug", {
      referenceValue: referenceValue,
    });
  } catch {
    console.log(error);
  }
});

//register Update reference value
router.post("/regUpdateValue", async (req, res) => {
  try {
    const id = req.body.id;
    const referenceValue = await Value_reference.findOne({
      where: {
        id: id,
      },
    });
    if (referenceValue) {
      (referenceValue.gender = req.body.gender),
        (referenceValue.age = req.body.age),
        (referenceValue.pregnant = req.body.pregnant),
        (referenceValue.max_value = req.body.max_value),
        (referenceValue.min_value = req.body.min_value),
        (referenceValue.max_limit = req.body.max_limit),
        (referenceValue.min_limit = req.body.min_limit),
        (referenceValue.active = req.body.active),
        await referenceValue.save();
      let determinant = await Determinant.findOne({
        where: {
          id: req.body.determinantId,
        },
      });
      let reference_values = await determinant.getValue_references();
      res.render("menus/mainsExam/viewValues.pug", {
        reference_values: reference_values,
        determinant: determinant,
      });
    }
  } catch (error) {
    // Manejar errores aquí
    console.error(error);
    res.status(500).send("ERROR in determinant update.");
  }
});

//delte reference value

router.post("/deleteValue", async (req, res) => {
  try {
    let valueReference = await Value_reference.findOne({
      where: {
        id: req.body.id,
      },
    });

    if (valueReference) {
      (valueReference.active = false), await valueReference.save();

      let determinant = await Determinant.findOne({
        where: {
          id: valueReference.DeterminantId,
        },
      });

      let reference_values = await determinant.getValue_references();
      console.log(reference_values);
      res.render("menus/mainsExam/viewValues.pug", {
        determinant: determinant,
        reference_values: reference_values,
      });
    }
  } catch {
    res.status(500).send("Error al borrar el usuario.");
  }
});

//ROUTES SAMPLES

//search Sample
router.post("/searchSample", async (req, res) => {
  try {
    let samples = await Sample.findAll({
      where: {
        type: {
          [Op.like]: "%" + req.body.name + "%",
        },
      },
    });

    res.render("menus/mainsExam/tablaSamples.pug", {
      samples: samples,
    });
  } catch {
    console.log("error search sample");
  }
});
//Add sample

router.get("/addSample", (req, res) => {
  try {
    res.render("menus/mainsExam/flotantes/flotanteAddSample.pug");
  } catch {
    console.log('error');
  }
});

//register sample

router.post("/registerSample", async (req, res) => {
  await Sample.create({
    type: req.body.type,
    detail: req.body.detail,
    active: true,
  });

  let samples = await Sample.findAll();
  res.render("menus/mainsExam/viewSamples.pug", {
    samples: samples,
  });
});

//update sample
router.post("/updateSample", async (req, res) => {
  try {
    let sample = await Sample.findOne({
      where: {
        id: req.body.id,
      },
    });
    res.render("menus/mainsExam/flotantes/flotanteUpdateSample.pug", {
      sample: sample,
    });
  } catch {
    console.log('error');
  }
});

//register Update sample
router.post("/regUpdateSample", async (req, res) => {
  try {
    const id = req.body.id;
    const sample = await Sample.findOne({
      where: {
        id: id,
      },
    });
    if (sample) {
      sample.type = req.body.type;
      sample.detail.abbreviation = req.body.detail;
      sample.active = req.body.active;

      await sample.save();
      let samples = await Sample.findAll();
      res.render("menus/mainsExam/viewSamples.pug", {
        samples: samples,
      });
    }
  } catch (error) {
    // Manejar errores aquí
    console.error(error);
    res.status(500).send("ERROR in sample update.");
  }
});
//delete sample
router.post("/deleteSample", async (req, res) => {
  try {
    let sample= await Sample.findOne({
      where: {
        id: req.body.id,
      },
    });

    if (sample) {
      (sample.active = false), await sample.save();
      let samples = await Sample.findAll();
      res.render("menus/mainsExam/tablaSamples.pug", {
        samples: samples,
      });
    }
  } catch {
    res.status(500).send("Error al borrar el usuario.");
  }
});

//RUTAS EXAMS

//search exam

router.post("/searchExam", async (req, res) => {
  try {
    let exams = await Exam.findAll({
      where: {
        name: {
          [Op.like]: "%" + req.body.name + "%",
        },
      },
    });
    res.render("menus/mainsExam/tablaExams.pug", {
      exams: exams,
    });
  } catch {
    console.log("error search exam");
  }
});

//Add Exam

router.get("/addExam", (req, res) => {
  try {
    res.render("menus/mainsExam/flotantes/flotanteAddExam.pug");
  } catch {
    console.log('error');
  }
});

//register exam

router.post("/registerExam", async (req, res) => {
  await Exam.create({
    name: req.body.name,
    abbreviation: req.body.abbreviation,
    detail: req.body.detail,
    active: true,
  });

  let exams = await Exam.findAll();
  res.render("menus/mainsExam/viewExam.pug", {
    exams: exams,
  });
});


// router.post("/addExam", async (req, res) => {
//   try {
//     const exam = await Exam.create({
//       name: req.body.name,
//       detail: req.body.detail,
//       active: true,
//     });
//     res.render("messages/messExam/messAddExam.pug", { exam: exam });
//   } catch {
//     console.error(error);
//     res.status(500).send("Error al registrar el usuario.");
//   }
// });

// router.get("/addExamSubGroup", function (req, res) {
//   res.render("menus/mainsExam/flotantes/flotanteAddExamSubGroup.pug");
// });

// router.post("/registerExamSubGroup", async (req, res) => {
//   //busco el padre
//   let exam = await Exam.findOne({
//     where: {
//       id: req.body.examId,
//     },
//   });
//   //creo el hijo
//   let examSubGroup = await Exam_sub_group.create({
//     name: req.body.name,
//     detail: req.body.detail,
//     active: true,
//   });
//   //relaciono hijo con padre
//   await exam.addExam_sub_group(examSubGroup);
//   //busco hijos de padre para que aparezan en la tabla del render acordarse de la 's'
//   let children = await exam.getExam_sub_groups();

//   res.render("menus/mainsExam/addExamSubGroup.pug", {
//     children: children,
//   });
// });

// router.post("/deleteExamSubGroup", async (req, res) => {
//   try {
//     //busco el examSubGroup
//     let examSubGroup = await Exam_sub_group.findOne({
//       where: {
//         id: req.body.id,
//       },
//     });
//     //busco el examen padre
//     let idExam = examSubGroup.ExamId;
//     let exam = await Exam.findOne({
//       where: {
//         id: idExam,
//       },
//     });
//     //borro el exam sub group pero antes sus determinantes asociados

//     let determinants = await examSubGroup.getDeterminants();
//     determinants.forEach((determinant) => {
//       determinant.destroy();
//     });
//     // await exam.removeExam_sub_group(examSubGroup)
//     await examSubGroup.destroy();
//     //busco hijos de padre para que aparezan en la tabla del render acordarse de la 's'
//     let children = await exam.getExam_sub_groups();

//     res.render("menus/mainsExam/addExamSubGroup.pug", {
//       children: children,
//     });
//   } catch {
//     res.status(500).send("Error al borrar el usuario.");
//   }
// });

// router.post("/viewDeterminants", async (req, res) => {
//   try {
//     let examSubGroup = await Exam_sub_group.findOne({
//       where: {
//         id: req.body.id,
//       },
//     });

//     if (examSubGroup) {
//       res.render("menus/mainsExam/viewDeterminant.pug", {
//         examSubGroup: examSubGroup,
//       });
//     } else {
//     }
//   } catch {
//     console.error(error);
//     res.status(500).send("Error al registrar el usuario.");
//   }
// });

// router.get("/addDeterminant", function (req, res) {
//   res.render("menus/mainsExam/flotantes/flotanteAddDeterminant.pug");
// });

// router.get("/determinant",(req,res) => {
//   res.render('menus/mainsExam/Determinant/viewDeterminant.pug')
// })
module.exports = router;
