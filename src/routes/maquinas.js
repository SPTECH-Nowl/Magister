var express = require("express");
var router = express.Router();
    
var maquinaController = require("../controllers/maquinaController");

router.post("/autenticar", function (req, res) {
    maquinaController.capturaIndividual(req, res);
   
});

router.get("/capturarConsumoRAM/:idInstituicao/:idMaquina", function (req, res) {
    maquinaController.capturarConsumoRAM(req, res);
})

module.exports = router;