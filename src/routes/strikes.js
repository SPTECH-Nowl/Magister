var express = require("express");
var router = express.Router();

var strikeController = require("../controllers/strikeController");

router.get("/listar/:codInstituicao", function (req, res) {
    strikeController.listar(req, res);
})

module.exports = router;