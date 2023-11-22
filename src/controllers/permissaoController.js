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

function listarPorUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    permissaoModel.listarPorUsuario(idUsuario)
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

function buscarPermissoesFunc(req, res) {
    var idFuncionario = req.params.idFuncionario;

    permissaoModel.buscarPermissoesFunc(idFuncionario)
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

function cadastrarPermissao(req, res) {
    var nome = req.body.nome
    var fkAtuacao = req.body.fkAtuacao
    var tempoPadrao = req.body.duracaoStrikePadrao
    var fkUsuario = req.body.fkUsuario

    if(nome == undefined){
        console.log("Nome indefinido")
    } else if (fkAtuacao == null || fkAtuacao == 0){
        console.log("Selecione uma ação padrão")
    } else if(tempoPadrao == undefined){
        console.log("tempo padrão não definido")
    } else{
    permissaoModel.cadastrarPermissao(nome, fkAtuacao, tempoPadrao, fkUsuario)
    .then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log( erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
  }
}


function buscarPermicao(req, res) {
    var idPermicao = req.params.idPermicao;

    permissaoModel.buscarPermicao(idPermicao)
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
    var nome = req.body.nome;
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

function editarConfig(req, res) {
    var idPermicao = req.body.idPermicao;
    var idAtuacao = req.body.acaoPadrao;
    var duracaoStrikePadrao = req.body.duracaoStrikePadrao;
    

    permissaoModel.editarConfig(idAtuacao, idPermicao, duracaoStrikePadrao)
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
    editar,
    buscarPermissoesFunc,
    editarConfig,
    buscarPermicao,
    cadastrarPermissao,
    listarPorUsuario
}