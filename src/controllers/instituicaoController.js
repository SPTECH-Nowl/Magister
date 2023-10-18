var instituicaoModel = require("../models/instituicaoModel");

var sessoes = [];

function buscarIdInst(req, res) {
    var codInst = req.params.codigoVar;

    instituicaoModel.buscarIdInst(codInst)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
buscarIdInst,
};