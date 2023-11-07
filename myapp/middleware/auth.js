var jwt = require("jsonwebtoken");
var express = require("express");

function authToken(req, res, next) {
  let token = req.headers.authorization;
  console.log(token);
  if (token) {
    token = token.startsWith("Bearer ") ? token.slice(7) : token;
  }

  if (!token) {
    console.log('No hay token')
    return res.redirect("/login");
  }

  // Verificar el token JWT
  jwt.verify(token, "laboratoryDario", (error, decoded) => {
    if (error) {
      console.log("Token inválido");
      res.redirect("/login");
    }else{

      
      // El token es válido, y los datos del usuario están en `decoded`
      req.usuario = decoded; // Almacenar los datos del usuario en el objeto "req" para su uso posterior
      next();
    }
  });
}

module.exports = authToken;
