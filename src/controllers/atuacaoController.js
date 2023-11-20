var usuarioModel = require("../models/usuarioModel");

var sessoes = [];


var atuacaoModel = require("../models/atuacaoModel");

function buscarAcoes(req, res) {

    atuacaoModel.buscarAcoes()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}










module.exports = {
    buscarAcoes
}   