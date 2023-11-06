var express = require("express");
var router = express.Router();

var strikeController = require("../controllers/strikeController");

router.get("/listar/:codInstituicao", function (req, res) {
    strikeController.listar(req, res);
});

router.get("/listar/situacao/:codInstituicao/:situacao", function (req, res) {
    strikeController.listarSituacao(req, res);
});

router.get("/contadores/:codInstituicao", function (req, res) {
    strikeController.contadores(req, res);
});

router.get("/getStrikes/:idInstituicao", function (req, res) {
    strikeController.getStrikes(req, res);
})

router.get("/getAlertas/:idInstituicao", function (req, res) {
    strikeController.getAlertas(req, res);
})

router.get("/strikePMes/:opcao/:idInstituicao", function (req, res) {
    strikeController.strikePMes(req, res);
})

module.exports = router;