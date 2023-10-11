var express = require("express");
var router = express.Router();

var avisoController = require("../controllers/avisoController");

router.get("/", function (req, res) {
    avisoController.testar(req, res);
});

router.get("/listar/:idUsuario", function (req, res) {
    avisoController.listar(req, res);
});


router.get("/mostrar_dados/:idAviso", function (req, res) {
    avisoController.mostrar_dados(req, res);
});

router.post("/publicar", function (req, res) {
    avisoController.publicar(req, res);
})

router.get("/pesquisar/:descricao", function (req, res) {
    avisoController.pesquisarDescricao(req, res);
});

router.post("/publicar/:idUsuario", function (req, res) {
    avisoController.publicar(req, res);
});

router.put("/editar/:idAviso", function (req, res) {
    avisoController.editar(req, res);
});

router.delete("/deletar/:idAviso", function (req, res) {
    avisoController.deletar(req, res);
});

router.put("/editar", function (req, res) {
    avisoController.editar(req, res);
});

router.get("/mostrar_dados", function (req, res) {
    avisoController.mostrar_dados(req, res);
});

router.delete("/deletar", function (req, res) {
    avisoController.deletar(req, res);
});

module.exports = router;