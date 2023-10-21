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
    capturarConsumoRAM,
    capturarConsumoCPU,
    capturarConsumoDisco, 
    capturarNovoDadoRAM,
    capturarNovoDadoDisco,
    capturarNovoDadoCPU
}