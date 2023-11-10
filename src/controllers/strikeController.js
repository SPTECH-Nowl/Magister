const { text } = require("express");
var strikeModel = require("../models/strikeModel");

var sessoes = [];

function listar(req, res) {
    console.log('no controller');
    let codInstituicao = req.params.codInstituicao;
    let dataHora = req.params.dataHora;
    let ativo = req.params.ativo  == 'true' ? true : false;
    let valido = req.params.valido  == 'true' ? true : false;
    let invalido = req.params.invalido  == 'true' ? true : false;
    let inativo = req.params.inativo  == 'true' ? true : false;

    let situacoes = [ativo, valido, invalido, inativo];
    let texto = 'AND ';

    console.log(situacoes);

    if (situacoes.filter(Boolean).length >= 2) {
        if (ativo) {
            texto == 'AND ' ? texto += `situacao = 'Ativo'` : 
            texto += `OR situacao = 'Ativo'`;
        }
    
        if (valido) {
            texto == 'AND ' ? texto += `situacao = 'Válido'` : 
            texto += `OR situacao = 'Válido'`;
        }
    
        if (invalido) {
            texto == 'AND ' ? texto += `situacao = 'Inválido'` : 
            texto += `OR situacao = 'Inválido'`;
        }
    
        if (inativo) {
            texto == 'AND ' ? texto += `situacao = 'Inativo'` : 
            texto += `OR situacao = 'Inativo'`;
        }

    } else if(!ativo && !valido && !invalido && !inativo) {
        texto += `situacao != 'Inativo'`;

    } else {
        if (ativo) {
            texto += `situacao = 'Ativo'`;
        }
    
        if (valido) {
            texto += `situacao = 'Válido'`;
        }
    
        if (invalido) {
            texto += `situacao = 'Inválido'`;
        }
    
        if (inativo) {
            texto += `situacao = 'Inativo'`;
        }
    }

    if (dataHora == 'mais_recente') {
        texto += 'ORDER BY dataHora'
    } else if (dataHora == 'mais_antigo') {
        texto += 'ORDER BY dataHora DESC'
    }

    console.log('controller, texto = ' + texto);

    strikeModel.listar(codInstituicao, texto)
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


function getStrikes(req, res) {
    
    var idInstituicao = req.params.idInstituicao;

    strikeModel.getStrikes(idInstituicao)
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

function getAlertas(req, res) {
    
    var idInstituicao = req.params.idInstituicao;

    strikeModel.getAlertas(idInstituicao)
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

function strikePMes(req, res) {
    var idInstituicao = req.params.idInstituicao;
    var opcao = req.params.opcao;

    console.log("Cheguei no controler STRIKE")

    strikeModel.strikePMes(idInstituicao, opcao)
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
    contadores,
    getStrikes,
    getAlertas,
    strikePMes
}