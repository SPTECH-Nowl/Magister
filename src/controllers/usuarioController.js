var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function listar(req, res) {
    var codInstituicao = req.params.codInstituicao;
    
    usuarioModel.listar(codInstituicao).then(function (resultado) {
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
    var idUsuario = req.params.idUsuario;

    usuarioModel.mostrar_dados(idUsuario)
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

function cadastrarNaDash(req, res) {
    var nomeVar = req.body.nomeUsuario;
    var emailVar = req.body.emailUsuario;
    var senhaVar = req.body.senhaUsuario;
    var nivPerm = req.body.nivPermissao;
    var instituicaoVar = req.body.instituicao;

    console.log(nomeVar, emailVar, senhaVar, nivPerm, instituicaoVar)
    

    if (nomeVar == undefined) {
        res.status(400).send("Seu nome está indefinido");
    } else if (emailVar == undefined) {
        res.status(400).send("Seu email está indefinido");
    } else if (senhaVar == undefined) {
        res.status(400).send("Sua senha está indefinido");
    } else if (instituicaoVar == undefined) {
        res.status(400).send("Seu codigo hexadecimal está indefinido");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarNaDash(nomeVar, emailVar, senhaVar, nivPerm, instituicaoVar)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function editar(req, res) {
    var nome = req.body.novoNomeUsuario
    var email = req.body.novoEmailUsuario
    var senha = req.body.novaSenhaUsuario
    var nivPermissao= req.body.novoNivPerm
    var idUsuario = req.body.idUsuarioPM

    usuarioModel.editar(nome, email , senha ,nivPermissao, idUsuario)
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
    var idUsuario = req.body.idUsuarioPE;

    usuarioModel.deletar(idUsuario)
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

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function entrar(req, res) {
    var emailVar = req.params.emailVar;
    var senhaVar = req.params.senhaVar;

    if (emailVar == undefined) {
        res.status(400).send("Seu email está indefinida");
    } else if (senhaVar == undefined) {
        res.status(400).send("Sua senha está indefinida");
    } else {        
        usuarioModel.entrar(emailVar, senhaVar)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}


function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nomeVar = req.body.nomeServer;
    var emailVar = req.body.emailServer;
    var senhaVar = req.body.senhaServer;
    var codigoVar = req.body.codigoServer;

    // Faça as validações dos valores
    if (nomeVar == undefined) {
        res.status(400).send("Seu nome está indefinido");
    } else if (emailVar == undefined) {
        res.status(400).send("Seu email está indefinido");
    } else if (senhaVar == undefined) {
        res.status(400).send("Sua senha está indefinido");
    } else if (codigoVar == undefined) {
        res.status(400).send("Seu codigo hexadecimal está indefinido");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nomeVar, emailVar, senhaVar, codigoVar)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {  
    entrar,
    cadastrar,
    listar,
    listarPorUsuario,
    cadastrarNaDash,
    editar,
    deletar,
    mostrar_dados
}