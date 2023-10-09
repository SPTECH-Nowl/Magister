var avisoModel = require("../models/avisoModel");

function listar(req, res) {
    var idAviso = req.params.idAviso;
    avisoModel.listar(idAviso).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listarPorUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    avisoModel.listarPorUsuario(idUsuario)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}


function mostrar_dados(req, res) {
    var idAviso = req.params.idAviso;
    avisoModel.mostrar_dados(idAviso)
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


function publicar(req, res) {
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha
    var nivPermissao= req.body.nivPermissao;
    var fkInstituicao= req.body.fkInstituicao;

    if (nome == undefined) {
        res.status(400).send("O nome está indefinido!");
    } else if (email == undefined) {
        res.status(400).send("O Email está indefinido!");
    } else if (senha == undefined) {
        res.status(403).send("O id do usuário está indefinido!");
    } else if (nivPermissao == undefined) {
        res.status(403).send("O id do usuário está indefinido!");
    } else if (fkInstituicao== undefined) {
        res.status(403).send("O id do usuário está indefinido!");
    } else {
        avisoModel.publicar(nome, email, senha , nivPermissao,fkInstituicao)
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
}


function editar(req, res) {
    var nome = req.body.nomeServer
    var email = req.body.emailServer
    var senha = req.body.senhaServer
    var nivPermissao= req.body.nivPermissao;
    var fkInstituicao= req.body.fkInstituicao;

    avisoModel.editar(nome,email , senha ,nivPermissao,fkInstituicao)
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


function deletar(req, res) {
    var idAviso = req.params.idAviso;
    avisoModel.deletar(idAviso)
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
    listar,
    listarPorUsuario,
    mostrar_dados,
    publicar,
    editar,
    deletar
}