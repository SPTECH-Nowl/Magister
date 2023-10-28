var express = require("express");
var router = express.Router();

var instituicaoController = require("../controllers/instituicaoController");

router.get("/buscarIdInst/:codigoVar", function (req, res) {
    instituicaoController.buscarIdInst(req, res);
})

router.get("/listarInstituicoes", function (req, res) {
    instituicaoController.listarInstituicoes(req, res);
})

router.post("/cadastrarDashEscola", function (req, res) {
    instituicaoController.cadastrarDashEscola(req, res);
 })

module.exports = router;