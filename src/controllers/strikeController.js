const { text } = require("express");
let strikeModel = require("../models/strikeModel");

let sessoes = [];

function listar(req, res) {
    console.log('no controller');
    let codInstituicao = req.params.codInstituicao;
    let dataHora = req.params.dataHora;
    let ativo = req.params.ativo  == 'true' ? true : false;
    let valido = req.params.valido  == 'true' ? true : false;
    let invalido = req.params.invalido  == 'true' ? true : false;
    let inativo = req.params.inativo  == 'true' ? true : false;
    let textoBusca = req.params.textoBusca;

    let situacoes = [ativo, valido, invalido, inativo];
    let texto = 'AND ';

    console.log('textoBusca = ' + textoBusca);

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
    
    if (textoBusca != 'false') {
        texto += ` AND nome LIKE '%${textoBusca}%' `;
    }

    if (dataHora == 'mais_recente') {
        texto += ' ORDER BY dataHora'
    } else if (dataHora == 'mais_antigo') {
        texto += ' ORDER BY dataHora DESC'
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
    let codInstituicao = req.params.codInstituicao;
    let situacao = req.params.situacao;

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
    let codInstituicao = req.params.codInstituicao;

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

function excluirStrike(req, res) {
    console.log('no controller', req.body);
    let checkboxIds = req.body.checkboxIdsServer;
    let usarIdMaquina = req.body.usarIdMaquina;
    let texto = '';

    if(checkboxIds != '') {
        if(usarIdMaquina) {
            texto = `WHERE fkMaquina IN(${checkboxIds})`;
        } else {
            texto = `WHERE idStrike IN(${checkboxIds})`;
        }
    }

    console.log('texto: ' + texto);

    strikeModel.excluirStrike(texto)
    .then(function (resultado) {
        console.log('no then do controller');

        res.status(200).json(resultado);
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao excluir o(s) strike(s): ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function strikePMes(req, res) {
    let idInstituicao = req.params.idInstituicao;
    let opcao = req.params.opcao;
    
    let qtdMes;

    switch(opcao){
        case "1":
             qtdMes = "dataHora >= DATE_SUB(NOW(), INTERVAL 1 MONTH) AND";
        break;

        case "2":
             qtdMes = "dataHora >= DATE_SUB(NOW(), INTERVAL 3 MONTH) AND";
        break;

        case "3":
             qtdMes = "dataHora >= DATE_SUB(NOW(), INTERVAL 6 MONTH) AND";
        break;

        default:
            qtdMes = "dataHora >= DATE_SUB(NOW(), INTERVAL 1 MONTH) AND";
        break;
    }

    strikeModel.strikePMes(idInstituicao, qtdMes)
    .then(function (resultado) {
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


function kpiInfos(req, res) {
    let idInstituicao = req.params.idInstituicao;

    strikeModel.kpiInfos(idInstituicao)
    .then(function (resultado) {
        console.log('no then do controller');
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Erro ao buscar informações de kpi: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function acaoETempoUsuarioEspecifico(req, res) {

    let idFuncionario = req.params.idFuncionario;

    strikeModel.acaoETempoUsuarioEspecifico(idFuncionario)
    .then(function (resultado) {
        console.log('no then do controller');
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
    listar,
    listarSituacao,
    contadores,
    strikePMes,
    kpiInfos,
    excluirStrike,
    acaoETempoUsuarioEspecifico
}