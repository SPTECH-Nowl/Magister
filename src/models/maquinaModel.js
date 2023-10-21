var database = require("../database/config")



function capturarDadosMaquina(idMaquina, idInstituicao) {
    var instrucao = `
    SELECT 
        m.idMaquina as id,
        m.nome as nome,
        m.so as so,
        m.emUso as emUso,
        (SELECT capacidade FROM hardware JOIN componente ON fkHardware = idHardware JOIN maquina ON fkMaquina = idMaquina WHERE fkTipoHardware = 3 AND idMaquina = 1) 
        as capacidadeRAM,
        (SELECT especificidade FROM hardware JOIN componente ON fkHardware = idHardware JOIN maquina ON fkMaquina = idMaquina WHERE fkTipoHardware = 2 AND idMaquina = 1) 
        as capacidadeCPU,
        (SELECT capacidade FROM hardware JOIN componente ON fkHardware = idHardware JOIN maquina ON fkMaquina = idMaquina WHERE fkTipoHardware = 1 AND idMaquina = 1) 
        as capacidadeDisco
    FROM maquina m
    JOIN componente c ON c.fkMaquina = m.idMaquina
    JOIN hardware ram ON c.fkHardware = ram.idHardware
    JOIN hardware cpu ON c.fkHardware = cpu.idHardware
    JOIN hardware disco ON c.fkHardware = disco.idHardware
    WHERE
        m.idMaquina = 1
    LIMIT 1;
    `;

    return database.executar(instrucao);
}

function capturarTodosDadosMaquina(idMaquina, idInstituicao) {
    var intrucao = `
    SELECT 
        m.idMaquina as id,
        m.nome as nome,
        m.so as so,
        m.emUso as emUso,
        (SELECT concat(fabricante, ' ', modelo, ' ', especificidade) FROM hardware JOIN componente ON fkHardware = idHardware JOIN maquina ON fkMaquina = idMaquina WHERE fkTipoHardware = 3 AND idMaquina = 1) 
        as componenteRAM,
        (SELECT capacidade FROM hardware JOIN componente ON fkHardware = idHardware JOIN maquina ON fkMaquina = idMaquina WHERE fkTipoHardware = 3 AND idMaquina = 1) 
        as capacidadeRAM,
        (SELECT concat(fabricante, ' ', modelo, ' ', especificidade) FROM hardware JOIN componente ON fkHardware = idHardware JOIN maquina ON fkMaquina = idMaquina WHERE fkTipoHardware = 2 AND idMaquina = 1) 
        as componenteCPU,
        (SELECT especificidade FROM hardware JOIN componente ON fkHardware = idHardware JOIN maquina ON fkMaquina = idMaquina WHERE fkTipoHardware = 2 AND idMaquina = 1) 
        as capacidadeCPU,
        (SELECT concat(fabricante, ' ', modelo, ' ', especificidade) FROM hardware JOIN componente ON fkHardware = idHardware JOIN maquina ON fkMaquina = idMaquina WHERE fkTipoHardware = 1 AND idMaquina = 1) 
        as componenteDisco,
        (SELECT capacidade FROM hardware JOIN componente ON fkHardware = idHardware JOIN maquina ON fkMaquina = idMaquina WHERE fkTipoHardware = 1 AND idMaquina = 1) 
        as capacidadeDisco,
        (SELECT COUNT(*) FROM strike JOIN maquina ON fkMaquina = idMaquina WHERE fkMaquina = 1) as qtdStrikes
    FROM maquina m
    JOIN componente c ON c.fkMaquina = m.idMaquina
    JOIN hardware ram ON c.fkHardware = ram.idHardware
    JOIN hardware cpu ON c.fkHardware = cpu.idHardware
    JOIN hardware disco ON c.fkHardware = disco.idHardware
    WHERE
        m.idMaquina = 1
    LIMIT 1;
    `

    return database.executar(instrucao);
}

function capturarConsumoRAM(idMaquina, idInstituicao) {
    var instrucao = `
    SELECT 
	    h.idHistorico, DATE_FORMAT(h.dataHora, "%H:%i:%s") as dataHora, h.consumo, c.max as maxConsumo, th.tipo 
    FROM 
	    historico h
    JOIN componente c ON h.fkComponente = c.idComponente
    JOIN hardware hw ON c.fkHardware = hw.idHardware
    JOIN tipoHardware th ON hw.fkTipoHardware = th.idTipoHardware
    WHERE
	    th.tipo = 'RAM' AND h.fkMaquina = 2
    ORDER BY dataHora DESC
    LIMIT 8;
    `
    return database.executar(instrucao);
}

function capturarConsumoCPU(idMaquina, idInstituicao) {
    var instrucao = `
    SELECT 
	    h.idHistorico, DATE_FORMAT(h.dataHora, "%H:%i:%s") as dataHora, h.consumo, c.max as maxConsumo, th.tipo 
    FROM 
	    historico h
    JOIN componente c ON h.fkComponente = c.idComponente
    JOIN hardware hw ON c.fkHardware = hw.idHardware
    JOIN tipoHardware th ON hw.fkTipoHardware = th.idTipoHardware
    WHERE
	    th.tipo = 'Processador' AND h.fkMaquina = 2
    ORDER BY dataHora DESC
    LIMIT 8;
    `

    return database.executar(instrucao);
}

function capturarConsumoDisco(idMaquina, idInstituicao) {
    var instrucao = `
    SELECT 
	    h.idHistorico, DATE_FORMAT(h.dataHora, "%H:%i:%s") as dataHora, h.consumo, c.max as maxConsumo
    FROM 
	    historico h
    JOIN componente c ON h.fkComponente = c.idComponente
    JOIN hardware hw ON c.fkHardware = hw.idHardware
    JOIN tipoHardware th ON hw.fkTipoHardware = th.idTipoHardware
    WHERE
	    th.tipo = 'Disco' AND h.fkMaquina = 2
    ORDER BY dataHora DESC
    LIMIT 8;
    `

    return database.executar(instrucao);
}

function capturarNovoDadoRAM(idMaquina, idInstituicao) {
    var instrucao = `
    SELECT 
	    h.idHistorico, DATE_FORMAT(h.dataHora, "%H:%i") as dataHora, h.consumo, c.max as maxConsumo
    FROM 
	    historico h
    JOIN componente c ON h.fkComponente = c.idComponente
    JOIN hardware hw ON c.fkHardware = hw.idHardware
    JOIN tipoHardware th ON hw.fkTipoHardware = th.idTipoHardware
    WHERE
	    th.tipo = 'RAM' AND h.fkMaquina = 2
    ORDER BY dataHora DESC
    LIMIT 1;
    `

    return database.executar(instrucao);
}

function capturarNovoDadoCPU(idMaquina, idInstituicao) {
    var instrucao = `
    SELECT 
	    h.idHistorico, DATE_FORMAT(h.dataHora, "%H:%i") as dataHora, h.consumo, c.max as maxConsumo
    FROM 
	    historico h
    JOIN componente c ON h.fkComponente = c.idComponente
    JOIN hardware hw ON c.fkHardware = hw.idHardware
    JOIN tipoHardware th ON hw.fkTipoHardware = th.idTipoHardware
    WHERE
	    th.tipo = 'CPU' AND h.fkMaquina = 2
    ORDER BY dataHora DESC
    LIMIT 1;
    `

    return database.executar(instrucao);
}

function capturarNovoDadoDisco(idMaquina, idInstituicao) {
    var instrucao = `
    SELECT 
	    h.idHistorico, DATE_FORMAT(h.dataHora, "%H:%i") as dataHora, h.consumo, c.max as maxConsumo
    FROM 
	    historico h
    JOIN componente c ON h.fkComponente = c.idComponente
    JOIN hardware hw ON c.fkHardware = hw.idHardware
    JOIN tipoHardware th ON hw.fkTipoHardware = th.idTipoHardware
    WHERE
	    th.tipo = 'Disco' AND h.fkMaquina = 2
    ORDER BY dataHora DESC
    LIMIT 1;
    `

    return database.executar(instrucao);
}

module.exports = {
    capturarDadosMaquina,
    capturarConsumoRAM,
    capturarConsumoCPU,
    capturarConsumoDisco,
    capturarNovoDadoRAM,
    capturarNovoDadoDisco,
    capturarNovoDadoCPU
};
