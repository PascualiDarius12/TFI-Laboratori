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
        } else if (id == "order") {
        enlacesOrder();
      }
      });
  });
});

//ENLACES PARA ORDENES
function enlacesOrder(){
  let divInvisible = document.getElementById("invisible")
  let btnAddOrder = document.getElementById('btnAddOrder')
  let btnViewExam = document.querySelectorAll('.btnViewExam')
  let btnAddExam = document.getElementById('btnAddExam')
  let btnViewSamples = document.querySelectorAll('.btnViewSamples')
  let btnDeliverSamples = document.querySelectorAll('.btnDeliverSamples')

  btnAddOrder.addEventListener("click", (e) => {
    e.preventDefault();
    divInvisible.classList.remove("invisible");
    fetch("/order/addPatient")
      .then((response) => response.text())
      .then((data) => {
        document.querySelector("#contenedor-flotante").innerHTML = data;
        document
          .querySelector("#viewOrder")
          .classList.add("opacity-50");

        let btnCerrarFlot = document.getElementById("btnCerrarFlot");
        btnCerrarFlot.addEventListener("click", (e) => {
          e.preventDefault();
          divInvisible.classList.add("invisible");
          document
            .querySelector("#viewOrder")
            .classList.remove("opacity-50");
            enlacesOrder()
        });
        
        let btnAddPatient = document.querySelectorAll('.btnAddPatient')
        
        btnAddPatient.forEach(option =>{

          option.addEventListener("click", (e) => {
            e.preventDefault();
            const patient = {
              id: option.getAttribute('id')
            };
            fetch("/order/addOrder", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(patient),
            })
            .then((response) => response.text())
            .then((data) => {
              document
              .querySelector("#viewOrder")
              .classList.remove("opacity-50");
              document.querySelector("#contenido-derecho").innerHTML = data;
              divInvisible.classList.add("invisible");
              enlacesOrder();
            });
          });
        })
      });
  });

  btnViewExam.forEach((opcion) => {
    opcion.addEventListener("click", (e) => {
      e.preventDefault();
      let id = opcion.getAttribute("id");
      let order = {
        id: id,
      };
      fetch("/order/viewExams", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(order),
      })
        .then((response) => response.text())
        .then((data) => {
          document
            .querySelector("#contenido-exam")
            .classList.remove("d-none");
          document
            .querySelector("#contenido-sample")
            .classList.add("d-none");
          document.querySelector("#contenido-exam").innerHTML = data;
          enlacesOrder();
        });
    });
  });

  btnAddExam.addEventListener("click", (e) => {
    e.preventDefault();
    divInvisible.classList.remove("invisible");
    let orderId= document.getElementById('orderId').value
    let order ={
      id: orderId
    }
    fetch("/order/addExam",{
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((response) => response.text())
      .then((data) => {
        document
          .querySelector("#viewOrder")
          .classList.add("opacity-50");
        document.querySelector("#contenedor-flotante").innerHTML = data;
        regExams()

        let btnCerrarFlot = document.getElementById("btnCerrarFlot");
        btnCerrarFlot.addEventListener("click", (e) => {
          e.preventDefault();
          divInvisible.classList.add("invisible");
          document
            .querySelector("#viewOrder")
            .classList.remove("opacity-50");
            enlacesOrder()
           
        });
        function regExams(){
          let orderId= document.getElementById('orderId').value
          let btnRegExam = document.querySelectorAll('.btnRegExam')
          
          btnRegExam.forEach((opcion) => {
            opcion.addEventListener("click", (e) => {
              e.preventDefault();
              let id = opcion.getAttribute("id");
              let exam = {
                id: id,
                orderId:orderId
              };

              console.log(exam)
              fetch("/order/regExams", {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify(exam),
              })
              .then((response) => response.text())
              .then((data) => {
                document
                .querySelector("#viewOrder")
                .classList.add("opacity-50");
                document.querySelector("#contenedor-flotante").innerHTML = data;
                
                let btnCerrarFlot = document.getElementById("btnCerrarFlot");
                btnCerrarFlot.addEventListener("click", (e) => {
                  e.preventDefault();
                  divInvisible.classList.add("invisible");
                  document
                  .querySelector("#viewOrder")
                  .classList.remove("opacity-50");
                  enlacesOrder();

                });
                regExams()
              });
            });
          });
          
        }
        
        
      });
  });

  btnViewSamples.forEach((opcion) => {
    opcion.addEventListener("click", (e) => {
      e.preventDefault();
      let id = opcion.getAttribute("id");
      let order = {
        id: id,
      };
      fetch("/order/viewSamples", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(order),
      })
        .then((response) => response.text())
        .then((data) => {
          
          document
            .querySelector("#contenido-sample")
            .classList.remove("d-none");
          document.querySelector("#contenido-exam")
            .classList.add("d-none");
          document.querySelector("#contenido-sample").innerHTML = data;
          enlacesOrder();
        });
    });
  });

  btnDeliverSamples.forEach((opcion) => {
    opcion.addEventListener("click", (e) => {
      e.preventDefault();
      let id = opcion.getAttribute("id");
      console.log(id)
      let datos = {
        sampleId: id,
        orderId: document.getElementById('orderId').value,
        userId: document.getElementById('userId').value
      };
      console.log(datos)
      fetch("/order/deliverSamples", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(datos),
      })
        .then((response) => response.text())
        .then((data) => {
          
          document
          .querySelector("#viewOrder")
          .classList.add("opacity-50");
        document.querySelector("#contenedor-flotante").innerHTML = data;
        divInvisible.classList.remove("invisible");
         
        let btnCerrarFlot = document.getElementById("btnCerrarFlot");
        btnCerrarFlot.addEventListener("click", (e) => {
          e.preventDefault();
          divInvisible.classList.add("invisible");
          document
          .querySelector("#viewOrder")
          .classList.remove("opacity-50");
          enlacesOrder();

        });
        
        });
    });
  });

  

}

//ENLACES PARA EXAMENES
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
          if (id == "exam") {
            enlacesManagerExam();
          } else if (id == "determinant") {
            enlacesDeterminant();
          } else if (id == "sample") {
            enlacesSample();
          }
        });
    });
  });
  //enlaces para examenes/determinantes/valores de referencia
  function enlacesDeterminant() {
    let btnAddDeterminant = document.getElementById("btnAddDeterminant");
    let divInvisible = document.getElementById("invisible");
    let btnViewValueReference = document.querySelectorAll(
      ".btnViewValueReference"
    );
    let btnSearchDeterminant = document.getElementById("btnSearchDeterminant");
    let btnUpdateDeterminant = document.querySelectorAll(
      ".btnUpdateDeterminant"
    );
    let btnDeleteDeterminant = document.querySelectorAll(
      ".btnDeleteDeterminant"
    );
    let btnAddValueReference = document.getElementById("btnAddValueReference");
    let btnUpdateValue = document.querySelectorAll(".btnUpdateValue");
    let btnDeleteValue = document.querySelectorAll(".btnDeleteValue");

    btnSearchDeterminant.addEventListener("click", (e) => {
      let name = document.getElementById("nameDeterminantSearch").value;
      let determinant = {
        name: name,
      };
      fetch("/searchDeterminant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(determinant),
      })
        .then((respose) => respose.text())
        .then((data) => {
          document.querySelector("#tabla-determinants").innerHTML = data;
          document.querySelector("#contenido-value").classList.add("invisible");
          enlacesDeterminant();
        });
    });
    // let buscadorDeterminant = document.getElementById("nameDeterminantSearch")
    // buscadorDeterminant.addEventListener("keyup", searchDeterminant)

    // function searchDeterminant(){
    //     let name = document.getElementById("nameDeterminantSearch").value;
    //     let determinant = {
    //       name: name,
    //     };
    //     fetch("/searchDeterminant", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(determinant),
    //     })
    //       .then((respose) => respose.text())
    //       .then((data) => {
    //         document.querySelector("#tabla-determinants").innerHTML = data;
    //         enlacesDeterminant();
    //       });
    // }

    btnAddDeterminant.addEventListener("click", (e) => {
      e.preventDefault();
      divInvisible.classList.remove("invisible");
      fetch("/addDeterminant")
        .then((response) => response.text())
        .then((data) => {
          document.querySelector("#contenedor-flotante").innerHTML = data;
          document
            .querySelector("#viewDeterminant")
            .classList.add("opacity-50");

          let btnCerrarFlot = document.getElementById("btnCerrarFlot");
          btnCerrarFlot.addEventListener("click", (e) => {
            e.preventDefault();
            divInvisible.classList.add("invisible");
            document
              .querySelector("#viewDeterminant")
              .classList.remove("opacity-50");
          });

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
          let detailDeterminant = document.getElementById("detailDeterminant");

          btnRegisterDeterminant.addEventListener("click", (e) => {
            e.preventDefault();
            const determinant = {
              name: nameDeterminant.value,
              abbreviation: abbreviationDeterminant.value,
              measurement: measurementDeterminant.value,
              detail: detailDeterminant.value,
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
                document
                  .querySelector("#viewDeterminant")
                  .classList.remove("opacity-50");
                document.querySelector("#contenido-derecho").innerHTML = data;
                divInvisible.classList.add("invisible");
                enlacesDeterminant();
              });
          });
        });
    });

    btnViewValueReference.forEach((opcion) => {
      opcion.addEventListener("click", (e) => {
        e.preventDefault();
        let id = opcion.getAttribute("id");
        let determinant = {
          id: id,
        };
        fetch("/viewValues", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(determinant),
        })
          .then((response) => response.text())
          .then((data) => {
            document
              .querySelector("#contenido-value")
              .classList.remove("invisible");
            document.querySelector("#contenido-value").innerHTML = data;
            enlacesDeterminant();
          });
      });
    });
    btnUpdateDeterminant.forEach((opcion) => {
      opcion.addEventListener("click", (e) => {
        e.preventDefault();
        let id = opcion.getAttribute("id");
        let determinant = {
          id: id,
        };
        fetch("/updateDeterminant", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(determinant),
        })
          .then((response) => response.text())
          .then((data) => {
            divInvisible.classList.remove("invisible");
            document
              .querySelector("#viewDeterminant")
              .classList.add("opacity-50");
            document.querySelector("#contenedor-flotante").innerHTML = data;

            let btnCerrarFlot = document.getElementById("btnCerrarFlot");
            btnCerrarFlot.addEventListener("click", (e) => {
              e.preventDefault();
              divInvisible.classList.add("invisible");
              document
                .querySelector("#viewDeterminant")
                .classList.remove("opacity-50");
            });

            let btnRegNewDeterminant = document.getElementById(
              "btnRegNewDeterminant"
            );
            btnRegNewDeterminant.addEventListener("click", (e) => {
              e.preventDefault();
              let active = false;
              if (document.getElementById("active").checked) {
                active = true;
              }
              let newDeterminant = {
                id: document.querySelector("#idNewDeterminant").value,
                name: document.getElementById("nameDeterminant").value,
                abbreviation: document.getElementById("abbreviationDeterminant")
                  .value,
                measurement: document.getElementById("measurementDeterminant")
                  .value,
                detail: document.getElementById("detailDeterminant").value,
                active: active,
              };
              console.log(newDeterminant);
              fetch("/regUpdateDeterminant", {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify(newDeterminant),
              })
                .then((response) => response.text())
                .then((data) => {
                  document.querySelector("#contenido-derecho").innerHTML = data;
                  divInvisible.classList.add("invisible");
                  document
                    .querySelector("#viewDeterminant")
                    .classList.remove("opacity-50");
                  enlacesDeterminant();
                });
            });
          });
      });
    });

    btnDeleteDeterminant.forEach((opcion) => {
      opcion.addEventListener("click", (e) => {
        e.preventDefault();
        const determinant = {
          id: opcion.getAttribute("id"),
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
            enlacesDeterminant();
          });
      });
    });

    btnUpdateValue.forEach((opcion) => {
      opcion.addEventListener("click", (e) => {
        e.preventDefault();
        let id = opcion.getAttribute("id");
        let referenceValue = {
          id: id,
        };
        console.log(id);
        fetch("/updateValue", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(referenceValue),
        })
          .then((response) => response.text())
          .then((data) => {
            divInvisible.classList.remove("invisible");
            document
              .querySelector("#viewDeterminant")
              .classList.add("opacity-50");
            document.querySelector("#contenedor-flotante").innerHTML = data;

            let btnCerrarFlot = document.getElementById("btnCerrarFlot");
            btnCerrarFlot.addEventListener("click", (e) => {
              e.preventDefault();
              divInvisible.classList.add("invisible");
              document
                .querySelector("#viewDeterminant")
                .classList.remove("opacity-50");
            });

            let btnRegisterUpdateValue = document.getElementById(
              "btnRegisterUpdateValue"
            );
            btnRegisterUpdateValue.addEventListener("click", (e) => {
              e.preventDefault();
              let active = false;
              if (document.getElementById("active").checked) {
                active = true;
              }
              let newValue = {
                gender: document.getElementById("genderValue").value,
                age: document.getElementById("ageRange").value,
                pregnant: document.getElementById("pregnant").value,
                max_value: document.getElementById("maxValue").value,
                min_value: document.getElementById("minValue").value,
                max_limit: document.getElementById("maxLimit").value,
                min_limit: document.getElementById("minLimit").value,
                active: active,
                id: document.getElementById("idNewValue").value,
                determinantId: document.getElementById("determinantId").value,
              };

              fetch("/regUpdateValue", {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify(newValue),
              })
                .then((response) => response.text())
                .then((data) => {
                  document.querySelector("#contenido-value").innerHTML = data;
                  divInvisible.classList.add("invisible");
                  document
                    .querySelector("#viewDeterminant")
                    .classList.remove("opacity-50");
                  enlacesDeterminant();
                });
            });
          });
      });
    });

    btnAddValueReference.addEventListener("click", (e) => {
      e.preventDefault();
      divInvisible.classList.remove("invisible");
      fetch("/addValue")
        .then((response) => response.text())
        .then((data) => {
          document
            .querySelector("#viewDeterminant")
            .classList.add("opacity-50");
          document.querySelector("#contenedor-flotante").innerHTML = data;

          let btnCerrarFlot = document.getElementById("btnCerrarFlot");
          btnCerrarFlot.addEventListener("click", (e) => {
            e.preventDefault();
            divInvisible.classList.add("invisible");
            document
              .querySelector("#viewDeterminant")
              .classList.remove("opacity-50");
          });
          let btnRegisterValue = document.getElementById("btnRegisterValue");
          btnRegisterValue.addEventListener("click", (e) => {
            e.preventDefault();

            let reference_value = {
              gender: document.getElementById("genderValue").value,
              age: document.getElementById("ageRange").value,
              pregnant: document.getElementById("pregnant").value,
              max_value: document.getElementById("maxValue").value,
              min_value: document.getElementById("minValue").value,
              max_limit: document.getElementById("maxLimit").value,
              min_limit: document.getElementById("minLimit").value,
              determinantId: document.getElementById("determinantId").value,
            };

            console.log(reference_value);
            fetch("/registerValue", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(reference_value),
            })
              .then((response) => response.text())
              .then((data) => {
                divInvisible.classList.add("invisible");
                document
                  .querySelector("#viewDeterminant")
                  .classList.remove("opacity-50");
                document.querySelector("#contenido-value").innerHTML = data;
                enlacesDeterminant();
              });
          });
        });
    });

    btnDeleteValue.forEach((opcion) => {
      opcion.addEventListener("click", (e) => {
        e.preventDefault();
        const valueReference = {
          id: opcion.getAttribute("id"),
        };
        fetch("/deleteValue", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(valueReference),
        })
          .then((response) => response.text())
          .then((data) => {
            document.querySelector("#contenido-value").innerHTML = data;
            enlacesDeterminant();
          });
      });
    });
  }

  //enlaces para examenes/sample
  function enlacesSample() {
    let divInvisible = document.getElementById("invisible");
    let btnAddSample = document.getElementById("btnAddSample");
    let btnSearchSample = document.getElementById("btnSearchSample");
    let btnUpdateSample = document.querySelectorAll(".btnUpdateSample");
    let btnDeleteSample = document.querySelectorAll(".btnDeleteSample");

    btnSearchSample.addEventListener("click", (e) => {
      let name = document.getElementById("nameSampleSearch").value;
      let sample = {
        name: name,
      };
      fetch("/searchSample", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sample),
      })
        .then((respose) => respose.text())
        .then((data) => {
          document.querySelector("#tabla-samples").innerHTML = data;
          enlacesSample();
        });
    });

    btnAddSample.addEventListener("click", (e) => {
      e.preventDefault();
      divInvisible.classList.remove("invisible");
      fetch("/addSample")
        .then((response) => response.text())
        .then((data) => {
          document.querySelector("#contenedor-flotante").innerHTML = data;
          document
            .querySelector("#viewSample")
            .classList.add("opacity-50");

          let btnCerrarFlot = document.getElementById("btnCerrarFlot");
          btnCerrarFlot.addEventListener("click", (e) => {
            e.preventDefault();
            divInvisible.classList.add("invisible");
            document
              .querySelector("#viewSample")
              .classList.remove("opacity-50");
          });

          let btnRegisterSample = document.getElementById("btnRegisterSample");

          btnRegisterSample.addEventListener("click", (e) => {
            e.preventDefault();
            const sample = {
              type: document.getElementById("typeSample").value,
              detail: document.getElementById("detailSample").value,
            };
            fetch("/registerSample", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(sample),
            })
              .then((response) => response.text())
              .then((data) => {
                document
                  .querySelector("#viewSample")
                  .classList.remove("opacity-50");
                document.querySelector("#contenido-derecho").innerHTML = data;
                divInvisible.classList.add("invisible");
                enlacesSample();
              });
          });
        });
    });

    btnUpdateSample.forEach((opcion) => {
      opcion.addEventListener("click", (e) => {
        e.preventDefault();
        let id = opcion.getAttribute("id");
        let sample = {
          id: id,
        };
        console.log(id)
        fetch("/updateSample", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(sample),
        })
          .then((response) => response.text())
          .then((data) => {
            divInvisible.classList.remove("invisible");
            document
              .querySelector("#viewSample")
              .classList.add("opacity-50");
            document.querySelector("#contenedor-flotante").innerHTML = data;

            let btnCerrarFlot = document.getElementById("btnCerrarFlot");
            btnCerrarFlot.addEventListener("click", (e) => {
              e.preventDefault();
              divInvisible.classList.add("invisible");
              document
                .querySelector("#viewSample")
                .classList.remove("opacity-50");
            });

            let btnRegNewSample = document.getElementById(
              "btnRegNewSample"
            );
            btnRegNewSample.addEventListener("click", (e) => {
              e.preventDefault();
              let active = false;
              if (document.getElementById("active").checked) {
                active = true;
              }
              let newSample = {
                id: document.getElementById('idNewSample').value,
                type: document.getElementById("typeSample").value,
                detail: document.getElementById("detailSample").value,
                active: active,
              };
              fetch("/regUpdateSample", {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify(newSample),
              })
                .then((response) => response.text())
                .then((data) => {
                  document.querySelector("#contenido-derecho").innerHTML = data;
                  divInvisible.classList.add("invisible");
                  document
                    .querySelector("#viewSample")
                    .classList.remove("opacity-50");
                  enlacesSample();
                });
            });
          });
      });
    });

    btnDeleteSample.forEach((opcion) => {
      opcion.addEventListener("click", (e) => {
        e.preventDefault();
        const sample = {
          id: opcion.getAttribute("id"),
        };
        fetch("/deleteSample", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sample),
        })
          .then((response) => response.text())
          .then((data) => {
            document.querySelector("#tabla-samples").innerHTML = data;
            enlacesSample();
          });
      });
    });
  }

  //enlaces para examenes
  function enlacesManagerExam(){
    let divInvisible = document.getElementById("invisible");
    let btnSearchExam = document.getElementById('btnSearchExam')
    let btnAddExam = document.getElementById('btnAddExam')
    
    
    btnSearchExam.addEventListener("click", (e) => {
      let name = document.getElementById("nameExamSearch").value;
      let exam = {
        name: name,
      };
      fetch("/searchExam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exam),
      })
        .then((respose) => respose.text())
        .then((data) => {
          document.querySelector("#tabla-exams").innerHTML = data;
          // document.querySelector("#contenido-determinant").classList.add("invisible");
          enlacesDeterminant();
        });
    });


    btnAddExam.addEventListener("click", (e) => {
      e.preventDefault();
      divInvisible.classList.remove("invisible");
      fetch("/addExam")
        .then((response) => response.text())
        .then((data) => {
          document.querySelector("#contenedor-flotante").innerHTML = data;
          document
            .querySelector("#viewExam")
            .classList.add("opacity-50");

          let btnCerrarFlot = document.getElementById("btnCerrarFlot");
          btnCerrarFlot.addEventListener("click", (e) => {
            e.preventDefault();
            divInvisible.classList.add("invisible");
            document
              .querySelector("#viewExam")
              .classList.remove("opacity-50");
          });

          let btnRegisterExam = document.getElementById("btnRegisterExam");

          btnRegisterExam.addEventListener("click", (e) => {
            e.preventDefault();
            const exam = {
              name: document.getElementById("nameExam").value,
              abbreviation: document.getElementById('abbreviationExam').value,
              detail: document.getElementById("detailExam").value,
            };
            fetch("/registerExam", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(exam),
            })
              .then((response) => response.text())
              .then((data) => {
                document
                  .querySelector("#viewExam")
                  .classList.remove("opacity-50");
                document.querySelector("#contenido-derecho").innerHTML = data;
                divInvisible.classList.add("invisible");
                enlacesManagerExam();
              });
          });
        });
    });
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
