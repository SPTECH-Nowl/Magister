var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function listar(req, res) {
    var codInstituicao = req.params.codInstituicao;

    usuarioModel.listar(codInstituicao).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listarAdm(req, res) {
    var codInstituicao = req.params.codInstituicao;

    usuarioModel.listarAdm(codInstituicao).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function pesquisarUsuario(req, res) {
    var instituicao = req.params.instituicao;
    var nomeUsuario = req.params.nomeUsuario

    usuarioModel.pesquisarUsuario(nomeUsuario, instituicao).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listarInstrutor(req, res) {
    var codInstituicao = req.params.codInstituicao;

    usuarioModel.listarInstrutor(codInstituicao).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listarPorUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    usuarioModel.listarPorUsuario(idUsuario)
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
    console.log("tamo no controller")
    
    if (nomeVar == undefined) {
        res.status(400).send("Seu nome está indefinido");
    } else if (emailVar == undefined) {
        res.status(400).send("Seu email está indefinido");
    } else if (senhaVar == undefined) {
        res.status(400).send("Sua senha está indefinida");
    } else if (instituicaoVar == undefined) {
        res.status(400).send("Seu código hexadecimal está indefinido");
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
    var nome = req.body.nomeUsuario;
    var email = req.body.emailUsuario;
    var senha = req.body.senhaUsuario;
    var nivPermissao = req.body.nivPermissao;
    var idUsuario = req.body.idUsuario;

    usuarioModel.editar(nome, email, senha, nivPermissao, idUsuario)
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
        res.status(400).send("Seu email está indefinido");
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
        res.status(400).send("Sua senha está indefinida");
    } else if (codigoVar == undefined) {
        res.status(400).send("Seu código hexadecimal está indefinido");
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

function qtdTotal(req, res){
    var instituicao = req.params.instituicao
    
    if (instituicao == undefined) {
        res.status(400).send("A instituicao não foi capturada!")
    } else {
        usuarioModel.qtdTotal(instituicao)            
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

function qtdAdministrador(req, res){
    var instituicao = req.params.instituicao
    
    if (instituicao == undefined) {
        res.status(400).send("A instituicao não foi capturada!")
    } else {
        usuarioModel.qtdAdministrador(instituicao)            
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

function qtdInstrutor(req, res){
    var instituicao = req.params.instituicao
    
    if (instituicao == undefined) {
        res.status(400).send("A instituicao não foi capturada!")
    } else {
        usuarioModel.qtdInstrutor(instituicao)            
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
    listarAdm,
    listarInstrutor,

    listarPorUsuario,
    cadastrarNaDash,
    editar,
    deletar,
    mostrar_dados,

    qtdTotal,
    qtdAdministrador,
    qtdInstrutor,

    pesquisarUsuario,
}
