var express = require("express");
var router = express.Router();

var escolaController = require("../controllers/escolaController");



router.get("/listar", function (req, res) {
  escolaController.listar(req, res);
});

router.get("/listarAdm/:codInstituicao", function (req, res) {
  escolaController.listarAdm(req, res);
});

router.get("/listarInstrutor/:codInstituicao", function (req, res) {
  escolaController.listarInstrutor(req, res);
});


router.get("/listarPorEscola/:idEscola", function (req, res) {
    escolaController.listarPorEscola(req, res);
 });

router.get("/pesquisarEscola/:nomeEscola/:instituicao", function (req, res) {
  escolaController.pesquisarEscola(req, res);
});



router.get("/mostrar_dadosEscola/:idEscola", function (req, res) {
    escolaController.mostrar_dadosEscola(req, res);
 });
 
 router.post("/cadastrarDashEscola", function (req, res) {
    escolaController.cadastrarDashEscola(req, res);
 })

router.get("/pesquisar/:descricao", function (req, res) {
  escolaController.pesquisarDescricao(req, res);
});






router.post("/publicar/:idEscola", function (req, res) {
    escolaController.publicar(req, res);
 });
 
 router.put("/editarEscola", function (req, res) {
    escolaController.editar(req, res);
 });
 
 router.delete("/deletarEscola/", function (req, res) {
    escolaController.deletar(req, res);
 });
 
 router.put("/editarEscola", function (req, res) {
    escolaController.editar(req, res);
 });
 
 router.get("/mostrar_dadosEscola", function (req, res) {
    escolaController.mostrar_dados(req, res);
 });
 
 router.delete("/deletarEscola", function (req, res) {
    escolaController.deletar(req, res);
 });
 
router.get("/qtdTotal/:instituicao", function (req, res) {
  escolaController.qtdTotal(req, res)
})


router.get("/qtdAdministrador/:instituicao", function (req, res) {
  escolaController.qtdAdministrador(req, res)
})

router.get("/qtdInstrutor/:instituicao", function (req, res) {
  escolaController.qtdInstrutor(req, res)
})
module.exports = router;