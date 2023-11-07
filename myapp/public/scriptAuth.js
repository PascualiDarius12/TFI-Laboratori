let btnLogin = document.getElementById("btnLogin");

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  let user = {
    email: document.getElementById("email").value,
    key: document.getElementById("key").value,
  };
  fetch("/getinto", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((response) => {
    if (response.status === 200) {
      response.json().then((data) => {
        const token = data.token;

        localStorage.setItem("token", token); // Almacenamos el token en localStorage
        redirigirMain();
      });
    } else {
      response.json().then((data) => {
        let messageError = document.getElementById("messageError");
        messageError.classList.remove("d-none");
        messageError.textContent = "Email or Key incorrect";
      });
    }
  });
});

// function redirigirMain() {
//   const token = localStorage.getItem("token");
//   console.log("token hecho");
//   console.log(token);
//   fetch("/main", {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`, // Envía el token en el encabezado de autorización.
//     },
//   }).then((response) => {
//     if (response.status === 200) {
//       window.location.href = "/main"; // Redirige al usuario a la página principal si la respuesta es exitosa
//     } else {
//       // Aquí puedes manejar casos de respuesta no exitosa, como 401 (No autorizado) u otros errores
//     }
//   });
// }

function redirigirMain() {
  const token = localStorage.getItem("token");

  fetch("/main", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // Envía el token en el encabezado de autorización.
    },
  })
    .then((response) => response.text())
    .then((data) => {
      document.open();
      document.write(data);
      document.close();
    });
}
