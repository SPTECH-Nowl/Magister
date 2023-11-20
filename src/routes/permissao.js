var express = require("express");
var router = express.Router();

var permissaoController = require("../controllers/permissaoController");

router.get("/listar/", function (req, res) {
    permissaoController.listar(req, res);
});

router.delete("/deletar/:idPermissao", function (req, res) {
    permissaoController.deletar(req, res);
});

router.put("/editar/:idPermissao", function (req, res) {
    permissaoController.editar(req, res);
});

router.post("/adicionar/", function (req, res) {
    permissaoController.adicionar(req, res);
});

module.exports = router;