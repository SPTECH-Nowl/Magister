var express = require("express");
var router = express.Router();
    
var maquinaController = require("../controllers/maquinaController");

router.post("/autenticar", function (req, res) {
    maquinaController.capturaIndividual(req, res);
   
});

router.get("/capturarConsumoRAM/:idInstituicao/:idMaquina", function (req, res) {
    maquinaController.capturarConsumoRAM(req, res);
})

router.get("/capturarConsumoCPU/:idInstituicao/:idMaquina", function (req, res) {
    maquinaController.capturarConsumoCPU(req, res);
})

router.get("/capturarConsumoDisco/:idInstituicao/:idMaquina", function (req, res) {
    maquinaController.capturarConsumoDisco(req, res);
})

module.exports = router;