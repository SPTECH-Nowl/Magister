var express = require("express");
var router = express.Router();
console.log("cheguei aqui");


var processoController = require("../controllers/processoController");


router.get("/listar/:codInstituicao", function (req, res) {
   processoController.listar(req, res);
});


router.get("/listarPorProcesso/:idProcesso", function (req, res) {
   processoController.listarPorUsuario(req, res);
});

router.get("/listaAppUsados/:idUsuario", function (req, res) {
   processoController.listaAppUsados(req, res);
});

router.get("/listaAppNaoUsados/:idUsuario", function (req, res) {
   processoController.listaAppNaoUsados(req, res);
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


router.post("/adicionarProcesso", function (req, res) {
   processoController.adicionarProcesso(req, res);
})

router.post("/publicar/:idProcesso/:idUsuario", function (req, res) {
   processoController.publicar(req, res);
});

router.put("/editarProcesso", function (req, res) {
   processoController.editar(req, res);
});

router.delete("/deletarProcesso", function (req, res) {
   processoController.deletarProcesso(req, res);
});

router.put("/editarProcesso", function (req, res) {
   processoController.editar(req, res);
});



router.get("/mostrar_dadosProcesso", function (req, res) {
   processoController.mostrar_dados(req, res);
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