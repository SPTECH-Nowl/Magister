var processoModel = require("../models/processoModel");

var sessoes = [];

function listarProcessos(req, res) {
    var codInstituicao = req.params.codInstituicao;

    processoModel.listar(codInstituicao).then(function (resultado) {
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

    processoModel.listarAdm(codInstituicao).then(function (resultado) {
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

function listaAppUsados(req, res) {

    var idUsuario = req.params.idUsuario

    processoModel.listaAppUsados(idUsuario).then(function (resultado) {
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

function listaAppNaoUsados(req, res) {

    var idUsuario = req.params.idUsuario

    processoModel.listaAppNaoUsados(idUsuario).then(function (resultado) {
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

    processoModel.listarInstrutor(codInstituicao).then(function (resultado) {
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

function listarPorProcesso(req, res) {
    var idProcesso = req.params.idProcesso;

    processoModel.listarPorProcesso(idProcesso)
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



function mostrar_dadosProcesso(req, res) {
    var idProcesso = req.params.idProcesso;

    processoModel.mostrar_dadosProcesso(idProcesso)
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
    var idProcesso = req.params.idProcesso
    var idUsuario = req.params.idUsuario

    console.log("tamo no controller")


    // Passe os valores como parâmetro e vá para o arquivoprocessoModel.js
    processoModel.publicar(idProcesso, idUsuario)
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

function editarProcesso(req, res) {
    var nomePrograma = req.body.nomePrograma;
    var nomeProcesso = req.body.nomeProcesso;
    var idProcesso = req.body.idProcesso;

    processoModel.editarProcesso(nomePrograma, nomeProcesso, idProcesso)
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

function deletarProcesso(req, res) {
    console.log("tamo no controller")

    var idProcesso = req.body.idProcessoS;
    var idUsuario = req.body.idUsuarioS;


    // Passe os valores como parâmetro e vá para o arquivoprocessoModel.js
    processoModel.deletarProcesso(idProcesso, idUsuario)
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


function adicionarProcesso(req, res) {
    console.log("tamo no controller")

    var nomeApp = req.body.nomeApp;
    var nomeProcesso = req.body.nomeProcesso;


    // Passe os valores como parâmetro e vá para o arquivoprocessoModel.js
    processoModel.adicionarProcesso(nomeApp, nomeProcesso)
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
    console.log("ENTRAMOS NA processoController");
    res.json("ESTAMOS FUNCIONANDO!");
}


function qtdTotal(req, res) {
    var instituicao = req.params.instituicao

    if (instituicao == undefined) {
        res.status(400).send("A instituicao não foi capturada!")
    } else {
        processoModel.qtdTotal(instituicao)
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

function qtdAdministrador(req, res) {
    var instituicao = req.params.instituicao

    if (instituicao == undefined) {
        res.status(400).send("A instituicao não foi capturada!")
    } else {
        processoModel.qtdAdministrador(instituicao)
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

function qtdInstrutor(req, res) {
    var instituicao = req.params.instituicao

    if (instituicao == undefined) {
        res.status(400).send("A instituicao não foi capturada!")
    } else {
        processoModelModel.qtdInstrutor(instituicao)
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
    listarAdm,
    listarInstrutor,
    listaAppUsados,
    listaAppNaoUsados,
    editarProcesso,
    deletarProcesso,
    mostrar_dadosProcesso,
    publicar,
    qtdTotal,
    qtdAdministrador,
    qtdInstrutor,
    adicionarProcesso

}
