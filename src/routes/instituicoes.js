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

 router.delete("/deletarEscola", function (req, res) {
    instituicaoController.deletarInstituicao(req, res);
 });

 router.get("/listarInstituicaoEsp/:idEscola", function (req, res) {
    instituicaoController.listarInstituicaoEsp(req, res);
 });

 router.put("/editarInstituicao", function (req, res) {
    instituicaoController.editarInstituicao(req, res);
 });

 router.get("/dadosInstituicao/:idEscola", function (req, res) {
    instituicaoController.dadosInstituicao(req, res);
 });

 router.get("/pesquisarInstituicao/:nomeEscola", function (req, res) {
    instituicaoController.pesquisarInstituicao(req, res);
  });


module.exports = router;