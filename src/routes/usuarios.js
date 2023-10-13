var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");


router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.get("/entrar/:emailVar/:senhaVar", function (req, res) {
    usuarioController.entrar(req, res);
})


router.get("/listar/:codInstituicao", function (req, res) {
    usuarioController.listar(req, res);
});


router.get("/mostrar_dados/:idUsuario", function (req, res) {
    usuarioController.mostrar_dados(req, res);
});


router.post("/cadastrarInDash", function (req, res) {
    usuarioController.cadastrarInDash(req, res);
})

router.post("/cadastrarNaDash", function (req, res) {
    usuarioController.cadastrarNaDash(req, res);
})

router.get("/pesquisar/:descricao", function (req, res) {
    usuarioController.pesquisarDescricao(req, res);
});

/*Corrigir*/ 
router.post("/publicar/:idUsuario", function (req, res) {
    usuarioController.publicar(req, res);
});

router.put("/editar/:idAviso", function (req, res) {
    usuarioController.editar(req, res);
});

router.delete("/deletar/", function (req, res) {
    usuarioController.deletar(req, res);
});

router.put("/editar", function (req, res) {
    usuarioController.editar(req, res);
});

router.get("/mostrar_dados", function (req, res) {
    usuarioController.mostrar_dados(req, res);
});

router.delete("/deletar", function (req, res) {
    usuarioController.deletar(req, res);
});


module.exports = router;