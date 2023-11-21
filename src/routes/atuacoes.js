var express = require("express");
var router = express.Router();

var atuacaoController = require("../controllers/atuacaoController");

router.get("/buscarAcoes/", function (req, res) {
    atuacaoController.buscarAcoes(req, res);
});

router.get("/buscarAcao/:idAcao", function (req, res) {
    atuacaoController.buscarAcao(req, res);
});

router.post("/adicionar", function (req, res) {
    atuacaoController.adicionar(req, res);
});


module.exports = router;