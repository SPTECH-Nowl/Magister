var express = require("express");
var router = express.Router();

var strikeController = require("../controllers/strikeController");

router.get("/listar/:codInstituicao/:dataHora/:ativo/:valido/:invalido/:inativo/:textoBusca", function (req, res) {
    strikeController.listar(req, res);
});

router.put('/excluirStrike', (req, res) => {
    strikeController.excluirStrike(req, res);
});

router.get("/listar/situacao/:codInstituicao/:situacao", function (req, res) {
    strikeController.listarSituacao(req, res);
});

router.get("/contadores/:codInstituicao", function (req, res) {
    strikeController.contadores(req, res);
});


router.get("/kpiInfos/:idInstituicao", function(req, res) {
    strikeController.kpiInfos(req, res);
})

router.get("/strikePMes/:opcao/:idInstituicao", function (req, res) {
    strikeController.strikePMes(req, res);
})

module.exports = router;