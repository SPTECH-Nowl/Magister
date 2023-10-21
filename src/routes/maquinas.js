var express = require("express");
var router = express.Router();
    
var maquinaController = require("../controllers/maquinaController");

router.get("/capturarDadosMaquina/:idInstituicao/:idMaquina", (req, res) => {
    maquinaController.capturarDadosMaquina(req, res);
});

router.get("/capturarTodosDadosMaquina/:idInstituicao/:idMaquina", (req, res) => {
    maquinaController.capturarTodosDadosMaquina(req, res);
})

router.get("/capturarConsumoRAM/:idInstituicao/:idMaquina", (req, res) => {
    maquinaController.capturarConsumoRAM(req, res);
});

router.get("/capturarConsumoCPU/:idInstituicao/:idMaquina", (req, res) => {
    maquinaController.capturarConsumoCPU(req, res);
});

router.get("/capturarConsumoDisco/:idInstituicao/:idMaquina", (req, res) => {
    maquinaController.capturarConsumoDisco(req, res);
});

router.get("/capturarNovoDadoRAM/:idInstituicao/:idMaquina", (req, res) => {
    maquinaController.capturarNovoDadoRAM(req, res);
});

module.exports = router;