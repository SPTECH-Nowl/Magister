var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/avisoController");

//Recebendo os dados do html e direcionando para a função cadastrar de avisoController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.publicar(req, res);
})

router.put("/editar", function (req, res) {
    usuarioController.editar(req, res);
});

router.get("/mostrar_dados", function (req, res) {
    usuarioController.mostrar_dados(req, res);
});

router.delete("/deletar", function (req, res) {
    usuarioController.deletar(req, res);
});

module.exports = router;