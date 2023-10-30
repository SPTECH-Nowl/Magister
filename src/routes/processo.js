var express = require("express");
var router = express.Router();

var processoController = require("../controllers/processoController");


router.get("/listar/:codInstituicao", function (req, res) {
   processoController.listar(req, res);
});


router.get("/listarPorProcesso/:idProcesso", function (req, res) {
   processoController.listarPorUsuario(req, res);
});

router.get("/pesquisarProcesso/:nomeProcesso/:instituicao", function (req, res) {
   processoController.pesquisarUsuario(req, res);
});


router.get("/mostrar_dadosProcesso/:idProcesso", function (req, res) {
   processoController.mostrar_dados(req, res);
});

router.post("/cadastrarNaDashProcesso", function (req, res) {
   processoController.cadastrarNaDashProcesso(req, res);
})

router.get("/pesquisar/:descricao", function (req, res) {
   processoController.pesquisarDescricao(req, res);
});




router.post("/publicar/:idProcesso", function (req, res) {
   processoController.publicar(req, res);
});

router.put("/editarProcesso", function (req, res) {
   processoController.editar(req, res);
});

router.delete("/deletarProcesso/", function (req, res) {
   processoController.deletar(req, res);
});

router.put("/editarProcesso", function (req, res) {
   processoController.editar(req, res);
});

router.get("/mostrar_dadosProcesso", function (req, res) {
   processoController.mostrar_dados(req, res);
});

router.delete("/deletarProcesso", function (req, res) {
   processoController.deletar(req, res);
});


router.get("/qtdTotal/:instituicao", function (req, res) {
   processoController.qtdTotal(req, res)
})


router.get("/qtdAdministrador/:instituicao", function (req, res) {
   processoController.qtdAdministrador(req, res)
})

router.get("/qtdInstrutor/:instituicao", function (req, res) {
   processoController.qtdInstrutor(req, res)
})


module.exports = router;