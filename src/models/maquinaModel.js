    var database = require("../database/config")



    function capturarDadosMaquina(idMaquina, idInstituicao) {
        var instrucao = `
        SELECT 
            m.idMaquina as id,
            m.nome as nome,
            m.so as so,
            m.emUso as emUso,
            (SELECT capacidade FROM hardware JOIN componente ON fkHardware = idHardware JOIN maquina ON fkMaquina = idMaquina WHERE fkTipoHardware = 3 AND idMaquina = ${idMaquina}) 
            as capacidadeRAM,
            (SELECT especificidade FROM hardware JOIN componente ON fkHardware = idHardware JOIN maquina ON fkMaquina = idMaquina WHERE fkTipoHardware = 2 AND idMaquina = ${idMaquina}) 
            as capacidadeCPU,
            (SELECT capacidade FROM hardware JOIN componente ON fkHardware = idHardware JOIN maquina ON fkMaquina = idMaquina WHERE fkTipoHardware = 1 AND idMaquina = ${idMaquina}) 
            as capacidadeDisco
        FROM maquina m
        JOIN componente c ON c.fkMaquina = m.idMaquina
        JOIN hardware ram ON c.fkHardware = ram.idHardware
        JOIN hardware cpu ON c.fkHardware = cpu.idHardware
        JOIN hardware disco ON c.fkHardware = disco.idHardware
        WHERE
            m.idMaquina = ${idMaquina}
        LIMIT 1;
        `;

        return database.executar(instrucao);
    }

    function capturarTodosDadosMaquina(idMaquina, idInstituicao) {
        var instrucao = `
        SELECT 
            m.idMaquina as id,
            m.nome as nome,
            m.so as so,
            m.emUso as emUso,
            (SELECT concat(fabricante, ' ', modelo, ' ', especificidade) FROM hardware JOIN componente ON fkHardware = idHardware JOIN maquina ON fkMaquina = idMaquina WHERE fkTipoHardware = 3 AND idMaquina = ${idMaquina}) 
            as componenteRAM,
            (SELECT capacidade FROM hardware JOIN componente ON fkHardware = idHardware JOIN maquina ON fkMaquina = idMaquina WHERE fkTipoHardware = 3 AND idMaquina = ${idMaquina}) 
            as capacidadeRAM,
            (SELECT concat(fabricante, ' ', modelo, ' ', especificidade) FROM hardware JOIN componente ON fkHardware = idHardware JOIN maquina ON fkMaquina = idMaquina WHERE fkTipoHardware = 2 AND idMaquina = ${idMaquina}) 
            as componenteCPU,
            (SELECT capacidade FROM hardware JOIN componente ON fkHardware = idHardware JOIN maquina ON fkMaquina = idMaquina WHERE fkTipoHardware = 2 AND idMaquina = ${idMaquina}) 
            as capacidadeCPU,
            (SELECT concat(fabricante, ' ', modelo, ' ', especificidade) FROM hardware JOIN componente ON fkHardware = idHardware JOIN maquina ON fkMaquina = idMaquina WHERE fkTipoHardware = 1 AND idMaquina = ${idMaquina}) 
            as componenteDisco,
            (SELECT capacidade FROM hardware JOIN componente ON fkHardware = idHardware JOIN maquina ON fkMaquina = idMaquina WHERE fkTipoHardware = 1 AND idMaquina = ${idMaquina}) 
            as capacidadeDisco,
            (SELECT COUNT(*) FROM strike JOIN maquina ON fkMaquina = idMaquina WHERE fkMaquina = ${idMaquina}) as qtdStrikes
        FROM maquina m
        JOIN componente c ON c.fkMaquina = m.idMaquina
        JOIN hardware ram ON c.fkHardware = ram.idHardware
        JOIN hardware cpu ON c.fkHardware = cpu.idHardware
        JOIN hardware disco ON c.fkHardware = disco.idHardware
        WHERE
            m.idMaquina = ${idMaquina}
        LIMIT 1;
        `

        return database.executar(instrucao);
    }

    function capturarTodasMaquinas(idInstituicao, ordAlfabetica = '', qtdStrikes = '', emUso = '', estado = '') {
        var instrucao = `
        SELECT
            m.idMaquina as id,
            m.nome AS nome,
            m.emUso AS emUso,
            (SELECT COUNT(*) FROM strike WHERE fkMaquina = m.idMaquina) AS qtdStrikes,
            CASE
                WHEN MAX(h.consumo) >= 85 THEN 'Crítico'
                WHEN MAX(h.consumo) >= 70 THEN 'Alerta'
                ELSE 'Normal'
            END AS status
        FROM maquina m
        LEFT JOIN historico h ON m.idMaquina = h.fkMaquina
        JOIN instituicao inst ON inst.idInstituicao = m.fkInstituicao
        WHERE idInstituicao = ${idInstituicao} ${qtdStrikes} ${emUso} ${estado}
        GROUP BY m.idMaquina
        ${ordAlfabetica}
        ;
        `
        console.log(instrucao);

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


    function editarMaquina(idMaquina, nomeMaquina, SistemaOperacional, idInstituicao) {
        var instrução = `
        UPDATE maquina
        SET nome = '${nomeMaquina}', SO = '${SistemaOperacional}'
        WHERE idMaquina = ${idMaquina};
        `;
        return database.executar(instrução);
    }

    

    function deletarMaquina(idMaquina,idInstituicao) {
        var instrução = `
        DELETE FROM maquina WHERE idMaquina = ${idMaquina};
        `;
        console.log("Executando a instrução SQL: \n" + instrução);
        return database.executar(instrução);
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
        capturarNovoDadoCPU,
        editarMaquina,
        deletarMaquina
    };
