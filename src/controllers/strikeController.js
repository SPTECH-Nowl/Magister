var strikeModel = require("../models/strikeModel");

var sessoes = [];

function listar(req, res) {
    console.log('no controller');
    var codInstituicao = req.params.codInstituicao;

    strikeModel.listar(codInstituicao)
    .then(function (resultado) {
        console.log('no then do controller');
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os strikes: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listarSituacao(req, res) {
    console.log('no controller');
    var codInstituicao = req.params.codInstituicao;
    var situacao = req.params.situacao;

    strikeModel.listarSituacao(codInstituicao, situacao)
    .then(function (resultado) {
        console.log('no then do controller');
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os strikes com situação: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function contadores(req, res) {
    console.log('no controller');
    var codInstituicao = req.params.codInstituicao;

    strikeModel.contadores(codInstituicao)
    .then(function (resultado) {
        console.log('no then do controller');
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os contadores dos strikes: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    listar,
    listarSituacao,
    contadores
}