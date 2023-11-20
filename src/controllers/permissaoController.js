var permissaoModel = require("../models/permissaoModel");

var sessoes = [];

function listar(req, res) {
    // var idUsuario = req.params.idUsuario;

    permissaoModel.listar()
    .then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar permissões: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function deletar(req, res) {
    var idPermissao = req.body.idPermissaoPE;

    permissaoModel.deletar(idPermissao)
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

function editar(req, res) {
    var nome = req.body.nomePermissao;
    var atuacao = req.body.atuacao;
    var duracaoStrikePadrao = req.body.duracaoStrikePadrao;
    var idPermissao = req.body.idPermissao;

    permissaoModel.editar(nome, atuacao, duracaoStrikePadrao, idPermissao)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    listar,
    deletar,
    editar
    // adicionar
}