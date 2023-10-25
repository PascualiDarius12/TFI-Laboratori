const opcionesMenu = document.querySelectorAll("a.enlace");

opcionesMenu.forEach((opcion) => {
  opcion.addEventListener("click", (e) => {
    e.preventDefault();
    const id = opcion.getAttribute("id");
    fetch(`/main/${id}`)
      .then((response) => response.text())
      .then((data) => {
        document.querySelector("#contenido-derecho").innerHTML = data;
        if (id == "patient") {
          nuevosEnlacesPatient();
        } else if (id == "exam") {
          enlacesExam();
        }
      });
  });
});

function enlacesExam() {
  const linksExams = document.querySelectorAll(".btnExams");
  linksExams.forEach((enlace) => {
    enlace.addEventListener("click", (e) => {
      e.preventDefault();
      const id = enlace.getAttribute("id");
      fetch(`/main/exam/${id}`)
        .then((response) => response.text())
        .then((data) => {
          document.querySelector("#contenido-derecho").innerHTML = data;
          if (id == "add") {
            enlacesAddExam();
          } else {
            enlacesSearchExam();
          }
        });
    });
  });

  function enlacesAddExam() {
    let btnAddExam = document.getElementById("btnAddExam");
    btnAddExam.addEventListener("click", (e) => {
      e.preventDefault();

      let nameExam = document.getElementById("nameExam");
      let detailExam = document.getElementById("detailExam");
      const exam = {
        name: nameExam.value,
        detail: detailExam.value,
      };

      fetch("/addExam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exam),
      })
        .then((response) => response.text())
        .then((data) => {
          document.querySelector("#contenido-exam").innerHTML = data;
          enlacesGroupAndDeterminant();

        });
    });
    function enlacesGroupAndDeterminant() {
     
      document
        .querySelector("#contenido-examSubGroup")
        .classList.remove("invisible");


      let btnAddSubGroup = document.getElementById("btnAddSubGroup");
      let btnAddDeterminant = document.getElementById("btnAddDeterminant");
      let divInvisible = document.getElementById("invisible");

      btnAddSubGroup.addEventListener("click", (e) => {
        e.preventDefault();

        divInvisible.classList.remove("invisible");

        fetch("/addExamSubGroup")
          .then((response) => response.text())
          .then((data) => {
            document.querySelector("#contenedor-flotante").innerHTML = data;
            enlacesAddExamSubGroup();
          });
      });

      btnAddDeterminant.addEventListener("click", (e) => {
        e.preventDefault();
        divInvisible.classList.remove("invisible");
        fetch("/addDeterminant")
          .then((response) => response.text())
          .then((data) => {
            document.querySelector("#contenedor-flotante").innerHTML = data;
            enlacesAddDeterminant();
          });
      });

      let btnViewDeterminants = document.querySelectorAll(".viewDeterminants");
      btnViewDeterminants.forEach((opcion) => {
        opcion.addEventListener("click", (e) => {
          e.preventDefault();

          console.log("entro");
          let contenidoDeterminant = document.getElementById(
            "contenido-determinant"
          );
          contenidoDeterminant.classList.remove("invisible");

          const id = opcion.getAttribute("id");
          const examSubGroup = {
            id: id,
          };

          fetch("/viewDeterminants", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(examSubGroup),
          })
            .then((response) => response.text())
            .then((data) => {
              document.querySelector("#contenido-determinant").innerHTML = data;
              enlacesGroupAndDeterminant();
            });
        });
      });

      let btnDeleteEsg = document.querySelectorAll(".btnDeleteEsg");
      btnDeleteEsg.forEach((opcion) => {
        opcion.addEventListener("click", (e) => {
          e.preventDefault();
          const id = opcion.getAttribute("id");
          const examSubGroup = {
            id: id,
          };
          fetch("/deleteExamSubGroup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(examSubGroup),
          })
            .then((response) => response.text())
            .then((data) => {
              document.querySelector("#contenido-examSubGroup").innerHTML = data;
              document.querySelector('#contenido-determinant').classList.add('invisible')
              enlacesGroupAndDeterminant();
            });
        });
      });

      function enlacesAddExamSubGroup() {
        let btnRegisterSubGroup = document.getElementById(
          "btnRegisterSubGroup"
        );
        let nameExamSubGroup = document.getElementById("nameExamSubGroup");
        let detailExamSubGroup = document.getElementById("detailExamSubGroup");
        let idExam = document.getElementById("idExam");

        btnRegisterSubGroup.addEventListener("click", (e) => {
          e.preventDefault();
          const examSubGroup = {
            name: nameExamSubGroup.value,
            detail: detailExamSubGroup.value,
            examId: idExam.value,
          };
          fetch("/registerExamSubGroup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(examSubGroup),
          })
            .then((response) => response.text())
            .then((data) => {
              document.querySelector("#contenido-examSubGroup").innerHTML =
                data;
              divInvisible.classList.add("invisible");

              enlacesGroupAndDeterminant();
            });
        });
      }
      //aca estoy
      function enlacesAddDeterminant() {
        let btnRegisterDeterminant = document.getElementById(
          "btnRegisterDeterminant"
        );
        let nameDeterminant = document.getElementById("nameDeterminant");
        let abbreviationDeterminant = document.getElementById(
          "abbreviationDeterminant"
        );
        let measurementDeterminant = document.getElementById(
          "measurementDeterminant"
        );
        let maxValueMan = document.getElementById("maxValueMan");
        let minValueMan = document.getElementById("minValueMan");
        let maxValueFemale = document.getElementById("maxValueFemale");
        let minValueFemale = document.getElementById("minValueFemale");
        let examSubGroupId = document.getElementById("examSubGroupId");

        btnRegisterDeterminant.addEventListener("click", (e) => {
          e.preventDefault();
          const determinant = {
            name: nameDeterminant.value,
            abbreviation: abbreviationDeterminant.value,
            measurement: measurementDeterminant.value,
            maxValueMan: maxValueMan.value,
            minValueMan: minValueMan.value,
            maxValueFemale: maxValueFemale.value,
            minValueFemale: minValueFemale.value,
            exam_Sub_GroupId: examSubGroupId.value,
          };
          fetch("/registerDeterminant", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(determinant),
          })
            .then((response) => response.text())
            .then((data) => {
              document.querySelector("#contenido-determinant").innerHTML = data;
              divInvisible.classList.add("invisible");

              enlacesGroupAndDeterminant();
            });
        });
      }

      let btnDeleteDeterminant = document.querySelectorAll(".btnDeleteDeterminant");
      btnDeleteDeterminant.forEach((opcion) => {
        opcion.addEventListener("click", (e) => {
          e.preventDefault();
          const id = opcion.getAttribute("id");
          const examSubGroupId = document.getElementById('examSubGroupId').value
          const determinant = {
            id: id,
            examSubGroupId:examSubGroupId

          };
          fetch("/deleteDeterminant", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(determinant),
          })
            .then((response) => response.text())
            .then((data) => {
              document.querySelector("#contenido-determinant").innerHTML = data;
              enlacesGroupAndDeterminant();
            });
        });
      });
    }
  }
}

//FUNCIONES DE ENLACES PARA USERS

function nuevosEnlacesPatient() {
  const linksUsuarios = document.querySelectorAll(".enlace-usuario");
  linksUsuarios.forEach((enlace) => {
    enlace.addEventListener("click", (e) => {
      e.preventDefault();
      const id = enlace.getAttribute("id");
      fetch(`/main/patient/${id}`)
        .then((response) => response.text())
        .then((data) => {
          document.querySelector("#contenido-derecho").innerHTML = data;
          if (id == "add") {
            enlaceAgregar();
          } else {
            nuevosEnlacesUpdate();
          }
        });
    });
  });

  function enlaceAgregar() {
    let btnagregar = document.getElementById("btnagregar");
    btnagregar.addEventListener("click", (e) => {
      e.preventDefault();
      let dni = document.getElementById("dni").value;
      let first_name = document.getElementById("first_name").value;
      let last_name = document.getElementById("last_name").value;
      let phone = document.getElementById("phone").value;
      let email = document.getElementById("email").value;
      let clave = document.getElementById("clave".value);
      let gender = document.getElementById("gender").value;
      let location = document.getElementById("location").value;
      let birthdate = document.getElementById("birthdate").value;

      let patient = {
        dni: dni,
        first_name: first_name,
        last_name: last_name,
        phone: phone,
        email: email,
        clave: clave,
        gender: gender,
        location: location,
        birthdate: birthdate,
      };

      fetch("/registerUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patient),
      })
        .then((response) => response.text())
        .then((data) => {
          document.querySelector("#contenido-derecho").innerHTML = data;
        });
    });
  }

  function nuevosEnlacesUpdate() {
    const updates = document.querySelectorAll("a.update2");
    updates.forEach((opcion) => {
      opcion.addEventListener("click", (e) => {
        e.preventDefault();
        const id = opcion.getAttribute("id");
        const patient = { id: id };

        fetch("/main/patient/updateUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(patient),
        })
          .then((response) => response.text())
          .then((data) => {
            document.querySelector("#contenido-derecho").innerHTML = data;
            enlaceUpdate();
          });
      });
    });

    function enlaceUpdate() {
      let btnupdate = document.getElementById("btnupdate");
      btnupdate.addEventListener("click", (e) => {
        e.preventDefault();
        let id = document.getElementById("id").value;
        let dni = document.getElementById("dni").value;
        let first_name = document.getElementById("first_name").value;
        let last_name = document.getElementById("last_name").value;
        let phone = document.getElementById("phone").value;
        let email = document.getElementById("email").value;
        let clave = document.getElementById("clave".value);
        let gender = document.getElementById("gender").value;
        let location = document.getElementById("location").value;
        let active = document.getElementById("active").value;
        let birthdate = document.getElementById("birthdate").value;

        let patient = {
          id: id,
          dni: dni,
          first_name: first_name,
          last_name: last_name,
          phone: phone,
          email: email,
          clave: clave,
          gender: gender,
          location: location,
          active: active,
          birthdate: birthdate,
        };

        fetch("/main/patient/updateUser/newUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(patient),
        })
          .then((response) => response.text())
          .then((data) => {
            document.querySelector("#contenido-derecho").innerHTML = data;
          });
      });
    }

    const deletes = document.querySelectorAll("a.delete");
    deletes.forEach((opcion) => {
      opcion.addEventListener("click", (e) => {
        e.preventDefault();
        const id = opcion.getAttribute("id");
        const patient = { id: id };
        fetch("/main/patient/deleteUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(patient),
        })
          .then((response) => response.text())
          .then((data) => {
            document.querySelector("#contenido-derecho").innerHTML = data;
          });
      });
    });

    const search = document.getElementById("search");
    search.addEventListener("click", (e) => {
      e.preventDefault();
      let usuario = {};
      let inputDni = document.getElementById("dni");
      let inputlastName = document.getElementById("last_name");
      let inputemail = document.getElementById("email");
      usuario.dni = inputDni.value;
      usuario.last_name = inputlastName.value;
      usuario.email = inputemail.value;

      fetch("/searchUser", {
        //cabecera de tipo json
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        //convertimos el objeto js a string para poder mostrarlo
        body: JSON.stringify(usuario),
      })
        .then((response) => response.text())
        .then((data) => {
          document.querySelector("#contenido-derecho").innerHTML = data;
          nuevosEnlacesUpdate();
        });
    });
  }
}
