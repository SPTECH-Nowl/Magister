var maquinaModel = require("../models/maquinaModel");

var sessoes = [];

function capturarDadosMaquina(req, res) {
    let idInstituicao = req.params.idInstituicao;
    let idMaquina = req.params.idMaquina;

    if(idInstituicao == undefined) {
        console.log("idInstituicao está undefined");
    } else if(idMaquina == undefined) {
        console.log("idMaquina está undefined");
    }

    maquinaModel.capturarDadosMaquina(idMaquina, idInstituicao)
        .then((response) => {
            res.json(response);
        })
        .catch((erro) => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage)
        })
}

function capturarTodosDadosMaquina(req, res) {
    let idInstituicao = req.params.idInstituicao;
    let idMaquina = req.params.idMaquina;

    if(idInstituicao == undefined) {
        console.log("idInstituicao está undefined");
    } else if(idMaquina == undefined) {
        console.log("idMaquina está undefined");
    }

    maquinaModel.capturarTodosDadosMaquina(idMaquina, idMaquina)
        .then((response) => {
            res.json(response);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error.sqlMessage)
        })
}

function capturarTodasMaquinas(req, res) {
    let idInstituicao = req.body.idInstituicao;
    let ordAlfabetica = req.body.ordAlfabetica == 'ord_a_z' ? 'ORDER BY m.nome' : 'ORDER BY m.nome DESC';
    let qtdStrikes = req.body.qtdStrikes;
    let emUso = req.body.emUso;
    let estado = req.body.estado;

    if(emUso) emUso = req.body.emUso == 'true' ? 'AND m.emUso = 1' : 'AND m.emUso = 0';

    switch(qtdStrikes) {
        case 'zero_stk':
            qtdStrikes = 'AND (SELECT COUNT(*) FROM strike WHERE fkMaquina = idMaquina) = 0'
            break;
        case 'um_stk':
            qtdStrikes = 'AND (SELECT COUNT(*) FROM strike WHERE fkMaquina = idMaquina) = 1'
            break;
        case 'um_ou_mais_stk':
            qtdStrikes = 'AND (SELECT COUNT(*) FROM strike WHERE fkMaquina = idMaquina) >= 1'
            break;
        case 'dois_stk':
            qtdStrikes = 'AND (SELECT COUNT(*) FROM strike WHERE fkMaquina = idMaquina) = 2'
            break;
        case 'dois_ou_mais_stk':
            qtdStrikes = 'AND (SELECT COUNT(*) FROM strike WHERE fkMaquina = idMaquina) >= 2'
            break;
        case 'tres_stk':
            qtdStrikes = 'AND (SELECT COUNT(*) FROM strike WHERE fkMaquina = idMaquina) = 3'
            break;
        default:
            qtdStrikes = '';
            break;
    }

    switch(estado) {
        case 'critico':
           break;
        case 'alerta':
            estado = `AND (SELECT CASE WHEN MAX(h.consumo) >= 85 THEN 'Crítico' WHEN MAX(h.consumo) >= 70 THEN 'Alerta' ELSE 'Normal' END AS status FROM maquina ms LEFT JOIN historico h ON m.idMaquina = h.fkMaquina JOIN instituicao inst ON inst.idInstituicao = m.fkInstituicao WHERE idInstituicao = 1 AND ms.idMaquina = m.idMaquina GROUP BY m.idMaquina) LIKE 'Alerta'`;
            break;
        case 'normal':
            estado = `AND (SELECT CASE WHEN MAX(h.consumo) >= 85 THEN 'Crítico' WHEN MAX(h.consumo) >= 70 THEN 'Alerta' ELSE 'Normal' END AS status FROM maquina ms LEFT JOIN historico h ON m.idMaquina = h.fkMaquina JOIN instituicao inst ON inst.idInstituicao = m.fkInstituicao WHERE idInstituicao = 1 AND ms.idMaquina = m.idMaquina GROUP BY m.idMaquina) LIKE 'Normal'` 
            break;
        default:
            estado = '';
            break;
    }

    maquinaModel.capturarTodasMaquinas(idInstituicao, ordAlfabetica, qtdStrikes, emUso, estado)
        .then((response) => {
            res.json(response);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error.sqlMessage);
        })
}

function capturarConsumoRAM(req, res) {
    let idInstituicao = req.params.idInstituicao;
    let idMaquina = req.params.idMaquina;

    if(idInstituicao == undefined) {
        console.log("idInstituicao está undefined");
    } else if(idMaquina == undefined) {
        console.log("idMaquina está undefined");
    }

    maquinaModel.capturarConsumoRAM(idMaquina, idInstituicao)
        .then(function (response) {
            res.json(response);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage)
        })
}

function capturarConsumoCPU(req, res) {
    let idInstituicao = req.params.idInstituicao;
    let idMaquina = req.params.idMaquina;

    if(idInstituicao == undefined) {
        console.log("idInstituicao está undefined");
    } else if(idMaquina == undefined) {
        console.log("idMaquina está undefined");
    }

    maquinaModel.capturarConsumoCPU(idMaquina, idInstituicao)
        .then(function (response) {
            res.json(response);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage)
        })
}

function capturarConsumoDisco(req, res) {
    let idInstituicao = req.params.idInstituicao;
    let idMaquina = req.params.idMaquina;

    if(idInstituicao == undefined) {
        console.log("idInstituicao está undefined");
    } else if(idMaquina == undefined) {
        console.log("idMaquina está undefined");
    }

    maquinaModel.capturarConsumoDisco(idMaquina, idInstituicao)
        .then(function (response) {
            res.json(response);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage)
        })
}

function capturarNovoDadoRAM(req, res) {
    let idInstituicao = req.params.idInstituicao;
    let idMaquina = req.params.idMaquina;

    if(idInstituicao == undefined) {
        console.log("idInstituicao está undefined");
    } else if(idMaquina == undefined) {
        console.log("idMaquina está undefined");
    }

    maquinaModel.capturarNovoDadoRAM(idMaquina, idInstituicao)
        .then(function (response) {
            res.json(response);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage)
        })
}

function capturarNovoDadoCPU(req, res) {
    let idInstituicao = req.params.idInstituicao;
    let idMaquina = req.params.idMaquina;

    if(idInstituicao == undefined) {
        console.log("idInstituicao está undefined");
    } else if(idMaquina == undefined) {
        console.log("idMaquina está undefined");
    }

    maquinaModel.capturarNovoDadoCPU(idMaquina, idInstituicao)
        .then(function (response) {
            res.json(response);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage)
        })
}

function capturarNovoDadoDisco(req, res) {
    let idInstituicao = req.params.idInstituicao;
    let idMaquina = req.params.idMaquina;

    if(idInstituicao == undefined) {
        console.log("idInstituicao está undefined");
    } else if(idMaquina == undefined) {
        console.log("idMaquina está undefined");
    }

    maquinaModel.capturarNovoDadoDisco(idMaquina, idInstituicao)
        .then(function (response) {
            res.json(response);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage)
        })
}

module.exports = {
    capturarDadosMaquina,
    capturarTodosDadosMaquina,
    capturarTodasMaquinas,
    capturarConsumoRAM,
    capturarConsumoCPU,
    capturarConsumoDisco, 
    capturarNovoDadoRAM,
    capturarNovoDadoDisco,
    capturarNovoDadoCPU
}