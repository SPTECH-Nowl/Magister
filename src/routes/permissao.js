var express = require("express");
var router = express.Router();

var permissaoController = require("../controllers/permissaoController");

router.get("/listar/", function (req, res) {
    permissaoController.listar(req, res);
});

router.get("/listarPorUsuario/:idUsuario", function (req, res) {
    permissaoController.listarPorUsuario(req, res);
});

router.get("/buscarPermissoesFunc/:idFuncionario", function (req, res) {
    permissaoController.buscarPermissoesFunc(req, res);
});

router.get("/buscarPermicao/:idPermicao", function (req, res) {
    permissaoController.buscarPermicao(req, res);
});

router.delete("/deletar/:idPermissao", function (req, res) {
    permissaoController.deletar(req, res);
});

router.put("/editar", function (req, res) {
    permissaoController.editar(req, res);
});

router.post("/cadastrarPermissao", function (req, res) {
    permissaoController.cadastrarPermissao(req, res);
});

router.put("/editarConfig", function (req, res) {
    permissaoController.editarConfig(req, res);
});


module.exports = router;