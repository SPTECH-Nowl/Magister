var instituicaoModel = require("../models/instituicaoModel");

var sessoes = [];

function buscarIdInst(req, res) {
    var codInst = req.params.codigoVar;

    instituicaoModel.buscarIdInst(codInst)
    .then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log(erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listarInstituicoes(req, res) {

instituicaoModel.listarInstituicoes()
.then(function (resultado) {
    if (resultado.length > 0) {
        res.status(200).json(resultado);
    } else {
        res.status(204).send("Nenhum resultado encontrado!");
    }
}).catch(function (erro) {
    console.log(erro);
    console.log(erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
});
}

function cadastrarDashEscola(req, res) {
    var nomeEscolaVar = req.body.nomeEscola;
    var siglaVar  = req.body.sigla;
    var codigoVar  = req.body.codigo;
    
    if (nomeEscolaVar == undefined) {
        res.status(400).send("Seu nome está indefinido");
    } else if (siglaVar == undefined) {
        res.status(400).send("Sua sigla está indefinido");
    } else if (codigoVar == undefined) {
        res.status(400).send("Seu codigo está indefinido");
    } else {

    instituicaoModel.cadastrarDashEscola(nomeEscolaVar,siglaVar,codigoVar)
    .then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log(erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
}

function deletarInstituicao(req, res) {
    var idEscola = req.body.idEscolaPE;

    instituicaoModel.deletarInstituicao(idEscola)
    .then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log(erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function listarInstituicaoEsp(req, res) {
    var idEscola = req.params.idEscola;

    instituicaoModel.listarInstituicaoEsp(idEscola)
    .then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log(erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function editarInstituicao(req, res) {
    var nomeEscolaVar = req.body.nomeEscola;
    var siglaVar  = req.body.sigla;
    var idEscola  = req.body.idEscola;


   instituicaoModel.editarInstituicao(nomeEscolaVar, siglaVar, idEscola)
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


function dadosInstituicao(req, res) {
    var idEscola = req.params.idEscola;

   instituicaoModel.dadosInstituicao(idEscola)
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


function pesquisarInstituicao(req, res) {
    var nomeEscola = req.params.nomeEscola;

      instituicaoModel.pesquisarInstituicao(nomeEscola)
      .then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log(erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
buscarIdInst,
listarInstituicoes,
cadastrarDashEscola,
deletarInstituicao,
listarInstituicaoEsp,
editarInstituicao,
dadosInstituicao,
pesquisarInstituicao
};