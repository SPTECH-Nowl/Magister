var express = require("express");
var router = express.Router();

var atuacaoController = require("../controllers/atuacaoController");

router.get("/buscarAcoes/", function (req, res) {
    atuacaoController.buscarAcoes(req, res);
});


module.exports = router;