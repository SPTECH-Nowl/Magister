var  escolaModel = require("../models/escolaModel");

var sessoes = [];

function listar(req, res) {
   escolaModel.listar().then(function (resultado) {
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

   escolaModel.listarAdm(codInstituicao).then(function (resultado) {
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

function pesquisarEscola(req, res) {
    var instituicao = req.params.instituicao;
    var nomeEscola = req.params.nomeEscola;


      escolaModel.pesquisarEscola(nomeEscola, instituicao).then(function (resultado) {
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

        escolaModel.listarInstrutor(codInstituicao).then(function (resultado) {
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

function listarPorEscola(req, res) {
    var idEscola = req.params.idEscola;

    escolaModel.listarPorEscola(idEscola)
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



function mostrar_dadosEscola(req, res) {
    var idEscola = req.params.idEscola;

   escolaModel.mostrar_dadosEscola(idEscola)
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

function cadastrarDashEscola(req, res) {
    var nomeEscolaVar = req.body.nomeEscola;
    var siglaVar  = req.body.sigla;
    var codigoVar  = req.body.codigo;
    var responsavelVar  = req.body.responsavel;

    console.log(nomeProgramaVar, nomeEscolaVar)
    console.log("tamo no controller")
    
    if (nomeEscolaVar == undefined) {
        res.status(400).send("Seu nome está indefinido");
    } else if (siglaVar == undefined) {
        res.status(400).send("Sua sigla está indefinido");
    } else if (codigoVar == undefined) {
        res.status(400).send("Seu codigo está indefinido");
    } else if (responsavelVar == undefined) {
        res.status(400).send("Seu responsavel está indefinido");
    } else if (instituicaoVar == undefined) {
        res.status(400).send("Seu código hexadecimal está indefinido");
    } else {

        // Passe os valores como parâmetro e vá para o arquivoEscolaModel.js
    escolaModel.cadastrarDashEscola(nomeEscolaVar,siglaVar,codigoVar,responsavelVar, instituicaoVar)
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

function editarEscola(req, res) {
    var nomeEscolaVar = req.body.nomeEscola;
    var  siglaVar  = req.body.sigla;
    var codigoVar  = req.body.codigo;
    var  idEscola = req.body.idEscola;


   escolaModel.editarEscola(nomeEscolaVar,siglaVar,codigoVar,responsavelVar, idEscola)
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

function deletarEscola(req, res) {
    var idEscola= req.body.idEscolaPE;

    escolaModel.deletarEscola(idEscola)
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
    console.log("ENTRAMOS NA EscolaController");
    res.json("ESTAMOS FUNCIONANDO!");
}


function qtdTotal(req, res){
    var instituicao = req.params.instituicao
    
    if (instituicao == undefined) {
        res.status(400).send("A instituicao não foi capturada!")
    } else {
       EscolaModel.qtdTotal(instituicao)            
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
        EscolaModel.qtdAdministrador(instituicao)            
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
        EscolaModelModel.qtdInstrutor(instituicao)            
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

    listarPorEscola,
    cadastrarDashEscola,
    editarEscola,
    deletarEscola,
    mostrar_dadosEscola,
    pesquisarEscola,

    qtdTotal,
    qtdAdministrador,
    qtdInstrutor,

   
}
