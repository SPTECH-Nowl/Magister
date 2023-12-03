let database = require("../database/config")

    function capturarDadosMaquina(idMaquina, idInstituicao) {
        let instrucao = `
    SELECT 
        m.idMaquina as id,
        m.nome as nome,
        m.so as so,
        m.emUso as emUso,
        (SELECT capacidade FROM hardware JOIN componente ON fkHardware = idHardware WHERE fkTipoHardware = 3 AND idMaquina = m  .idMaquina LIMIT 1) 
        as capacidadeRam,
        (SELECT capacidade FROM hardware JOIN componente ON fkHardware = idHardware WHERE fkTipoHardware = 2 AND idMaquina = m.idMaquina LIMIT 1) 
        as capacidadeCPU,
        (SELECT capacidade FROM hardware JOIN componente ON fkHardware = idHardware WHERE fkTipoHardware = 1 AND idMaquina = m.idMaquina LIMIT 1) 
        as capacidadeDisco, 
        (SELECT COUNT(*) FROM strike WHERE fkMaquina = m.idMaquina AND DATE(dataHora) = CURDATE()) as quantidadeStrikes,
		
        (SELECT COUNT(*) FROM historico WHERE fkMaquina = m.idMaquina AND DATE(dataHora) = CURDATE() AND consumo > 70) as quantidadeAlertas
FROM maquina m
    WHERE
        m.idMaquina = ${idMaquina}
    LIMIT 1;
    
    
        `;

    console.log(instrucao);
    return database.executar(instrucao);
}

    function capturarTodosDadosMaquina(idMaquina, idInstituicao) {
        let instrucao = `
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

    function capturarTodasMaquinas(idInstituicao, ordAlfabetica = '', qtdStrikes = '', emUso = '', estado = '', pesquisa = '') {
        let instrucao = `
        SELECT
        m.idMaquina as id,
        m.nome AS nome,
        m.emUso AS emUso,
        m.SO AS so,
        (SELECT COUNT(*) FROM strike WHERE fkMaquina = m.idMaquina AND fkSituacao IN (1, 3)) AS qtdStrikes,
        CASE
        WHEN (
            SELECT consumo
            FROM historico h
            WHERE h.fkMaquina = m.idMaquina
              AND h.fkComponente IN (
                  SELECT idComponente
                  FROM componente
                  WHERE fkHardware IN (
                      SELECT idHardware
                      FROM hardware
                      WHERE fkTipoHardware IN (
                          SELECT idTipoHardware
                          FROM tipoHardware
                          WHERE tipo = 'RAM'
                      )
                  )
              )
            ORDER BY h.dataHora DESC
            LIMIT 1
        ) >= 85 THEN 'Crítico'
        WHEN (
            SELECT consumo
            FROM historico h
            WHERE h.fkMaquina = m.idMaquina
              AND h.fkComponente IN (
                  SELECT idComponente
                  FROM componente
                  WHERE fkHardware IN (
                      SELECT idHardware
                      FROM hardware
                      WHERE fkTipoHardware IN (
                          SELECT idTipoHardware
                          FROM tipoHardware
                          WHERE tipo = 'RAM'
                      )
                  )
              )
            ORDER BY h.dataHora DESC
            LIMIT 1
        ) >= 70 THEN 'Alerta'
        ELSE 'Normal'
    END AS status
    FROM maquina m
    JOIN instituicao inst ON inst.idInstituicao = m.fkInstituicao
    WHERE idInstituicao = ${idInstituicao} ${qtdStrikes} ${emUso} ${estado} ${pesquisa}
    GROUP BY m.idMaquina
    ${ordAlfabetica}
    ;`

    return database.executar(instrucao);
}

    function capturarConsumoRAM(idMaquina, idInstituicao) {
        let instrucao = `
        SELECT 
        h.idHistorico, 
        DATE_FORMAT(h.dataHora, "%H:%i:%s") as dataHora, 
        h.consumo, 
        c.max as maxConsumo, 
        th.tipo 
        FROM 
            historico h
        JOIN componente c ON h.fkComponente = c.idComponente
        JOIN hardware hw ON c.fkHardware = hw.idHardware
        JOIN tipoHardware th ON hw.fkTipoHardware = th.idTipoHardware
        WHERE
            th.tipo = 'RAM' AND h.fkMaquina = ${idMaquina}
            AND DATE(h.dataHora) = CURDATE() 
        ORDER BY h.dataHora DESC
        LIMIT 8;
        `
        return database.executar(instrucao);
    }

    function capturarConsumoCPU(idMaquina, idInstituicao) {
        let instrucao = `
        SELECT 
        h.idHistorico, 
        DATE_FORMAT(h.dataHora, "%H:%i:%s") as dataHora, 
        h.consumo, 
        c.max as maxConsumo, 
        th.tipo 
        FROM 
            historico h
        JOIN componente c ON h.fkComponente = c.idComponente
        JOIN hardware hw ON c.fkHardware = hw.idHardware
        JOIN tipoHardware th ON hw.fkTipoHardware = th.idTipoHardware
        WHERE
            th.tipo = 'Processador' AND h.fkMaquina = ${idMaquina}
            AND DATE(h.dataHora) = CURDATE() 
        ORDER BY h.dataHora DESC
        LIMIT 8;
        `

    return database.executar(instrucao);
}

    function capturarConsumoDisco(idMaquina, idInstituicao) {
        let instrucao = `
        SELECT 
        h.idHistorico, 
        DATE_FORMAT(h.dataHora, "%H:%i:%s") as dataHora, 
        h.consumo, 
        c.max as maxConsumo, 
        th.tipo 
        FROM 
            historico h
        JOIN componente c ON h.fkComponente = c.idComponente
        JOIN hardware hw ON c.fkHardware = hw.idHardware
        JOIN tipoHardware th ON hw.fkTipoHardware = th.idTipoHardware
        WHERE
            th.tipo = 'Disco' AND h.fkMaquina = ${idMaquina}
            AND DATE(h.dataHora) = CURDATE() 
        ORDER BY h.dataHora DESC
        LIMIT 8;
        `

    return database.executar(instrucao);
}

    function capturarNovoDadoRAM(idMaquina, idInstituicao) {
        let instrucao = `
        SELECT 
            h.idHistorico, DATE_FORMAT(h.dataHora, "%H:%i:%s") as dataHora, h.consumo, c.max as maxConsumo
        FROM 
            historico h
        JOIN componente c ON h.fkComponente = c.idComponente
        JOIN hardware hw ON c.fkHardware = hw.idHardware
        JOIN tipoHardware th ON hw.fkTipoHardware = th.idTipoHardware
        WHERE
            th.tipo = 'RAM' AND h.fkMaquina = ${idMaquina}
            AND DATE(h.dataHora) = CURDATE() 
        ORDER BY dataHora DESC
        LIMIT 1;
        `

    return database.executar(instrucao);
}

    function capturarNovoDadoCPU(idMaquina, idInstituicao) {
        let instrucao = `
        SELECT 
            h.idHistorico, DATE_FORMAT(h.dataHora, "%H:%i:%s") as dataHora, h.consumo, c.max as maxConsumo
        FROM 
            historico h
        JOIN componente c ON h.fkComponente = c.idComponente
        JOIN hardware hw ON c.fkHardware = hw.idHardware
        JOIN tipoHardware th ON hw.fkTipoHardware = th.idTipoHardware
        WHERE
            th.tipo = 'Processador' AND h.fkMaquina = ${idMaquina}
            AND DATE(h.dataHora) = CURDATE() 
        ORDER BY dataHora DESC
        LIMIT 1;
        `

    return database.executar(instrucao);
}

    function capturarNovoDadoDisco(idMaquina, idInstituicao) {
        let instrucao = `
        SELECT 
            h.idHistorico, DATE_FORMAT(h.dataHora, "%H:%i:%s") as dataHora, h.consumo, c.max as maxConsumo
        FROM 
            historico h
        JOIN componente c ON h.fkComponente = c.idComponente
        JOIN hardware hw ON c.fkHardware = hw.idHardware
        JOIN tipoHardware th ON hw.fkTipoHardware = th.idTipoHardware
        WHERE
            th.tipo = 'Disco' AND h.fkMaquina = ${idMaquina}
            AND DATE(h.dataHora) = CURDATE() 
        ORDER BY dataHora DESC
        LIMIT 1;
        `

    return database.executar(instrucao);
}


function editarMaquina(idMaquina, nomeMaquina, SistemaOperacional, idInstituicao) {
    let instrucao = `
    UPDATE maquina
    SET nome = '${nomeMaquina}', SO = '${SistemaOperacional}'
    WHERE idMaquina = ${idMaquina};
    `;
    return database.executar(instrucao);
}

function deletarMaquina(idMaquina) {
    let instrucao = `
        DELETE FROM maquina WHERE idMaquina = ${idMaquina};
    `;

    return database.executar(instrucao);
}


    
    function maisUsoCpuRamKpi(idInstituicao) {
        let instrucao = `
                SELECT 
                fkMaquina,
                ROUND(MAX(COALESCE(CASE WHEN tipo = 'RAM' THEN consumo END, 0)), 2) AS maxConsumoRam,
                ROUND(MAX(COALESCE(CASE WHEN tipo = 'Processador' THEN consumo END, 0)), 2) AS maxConsumoProcessador
            FROM (
                SELECT 
                    h.fkMaquina,
                    h.consumo, 
                    c.max AS maxConsumo, 
                    th.tipo,
                    RANK() OVER (PARTITION BY h.fkMaquina, th.tipo ORDER BY h.consumo DESC) AS rnk
                FROM 
                    historico h
                JOIN componente c ON h.fkComponente = c.idComponente
                JOIN hardware hw ON c.fkHardware = hw.idHardware
                JOIN tipoHardware th ON hw.fkTipoHardware = th.idTipoHardware
                JOIN maquina m ON h.fkMaquina = m.idMaquina
                WHERE
                    m.fkInstituicao = ${idInstituicao}
                    AND WEEK(h.dataHora) = WEEK(NOW())  -- Modificado para usar WEEK diretamente
            ) AS subconsulta
            WHERE rnk = 1
            GROUP BY fkMaquina
            LIMIT 8;
    
        `;
        console.log("Executando a instrucao SQL: \n" + instrucao);
        return database.executar(instrucao);
    }

    
    function maquinasMaisDefeitos(idInstituicao) {
        let instrucao = `
        SELECT
        m.idMaquina AS fkMaquina,
        m.nome AS nomeMaquina,
        COUNT(DISTINCT s.idStrike) AS quantidadeStrikes,
        COUNT(DISTINCT CASE WHEN h.consumo > 70 THEN h.idHistorico END) AS quantidadeAlertas,
        
        RANK() OVER (ORDER BY COUNT(DISTINCT CASE WHEN h.consumo > 80 THEN h.idHistorico END) DESC) AS ranking
    FROM
        maquina m
    LEFT JOIN strike s ON m.idMaquina = s.fkMaquina
    LEFT JOIN historico h ON m.idMaquina = h.fkMaquina AND h.consumo > 70
    WHERE
        m.fkInstituicao = ${idInstituicao}
        AND YEARWEEK(h.dataHora, 1) = YEARWEEK(CURDATE(), 1)  -- Filtrar pela semana atual
    GROUP BY
        m.idMaquina
    HAVING
        quantidadeStrikes > 0 OR quantidadeAlertas > 0
    ORDER BY
        ranking
    LIMIT 5;    
        `;
        console.log("Executando a instrucao SQL: \n" + instrucao);
        return database.executar(instrucao);
    }


function capturarStrikesPorMaquina(idInstituicao, idUsuario) {
    let instrucao = `
    SELECT
        m.idMaquina as id,
        m.nome AS nome,
        (SELECT COUNT(*) FROM strike WHERE fkMaquina = m.idMaquina AND fkSituacao IN (1, 3)) AS qtdStrikes
    FROM maquina m
    LEFT JOIN historico h ON m.idMaquina = h.fkMaquina
    JOIN instituicao inst ON inst.idInstituicao = m.fkInstituicao
    JOIN usuario us ON us.fkInstituicao = inst.idInstituicao
    WHERE idInstituicao = ${idInstituicao} AND idUsuario = ${idUsuario} AND (SELECT COUNT(*) FROM strike WHERE fkMaquina = m.idMaquina AND fkSituacao IN (1, 3)) >= 3
    GROUP BY m.idMaquina;
    `;
    console.log('strikes por maquina', instrucao)
    return database.executar(instrucao);
}

function capturarStrikesDaMaquina(idMaquina) {
    let instrucao = `SELECT DATE_FORMAT(dataHora, '%d/%m/%y') as data, DATE_FORMAT(dataHora, '%H:%s') as hora FROM strike WHERE fkMaquina = ${idMaquina} ORDER BY dataHora DESC LIMIT 1;`;
    console.log('strikes da maquina', instrucao)
    return database.executar(instrucao);
}

//trocar essa função para o model de permissoes quando tiver um 
function capturarPermissoes(idUsuario) {
    let instrucao  = `
    SELECT 
        atuacao.idAtuacao,
        atuacao.nome,
        atuacao.descricao,
        permissao.emUso
    FROM 
        permissao 
        JOIN usuario ON fkUsuario = idUsuario 
        JOIN atuacao ON fkAtuacao = idAtuacao
        WHERE idUsuario = ${idUsuario};
    `;

    return database.executar(instrucao);
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
        deletarMaquina,
        maisUsoCpuRamKpi,
        maquinasMaisDefeitos,
        capturarPermissoes,
        capturarStrikesDaMaquina,
        capturarStrikesPorMaquina
    };




//     let database = require("../database/config");

// function capturarDadosMaquina(idMaquina, idInstituicao) {
//     let instrucao = `
//     SELECT 
//         m.idMaquina as id,
//         m.nome as nome,
//         m.so as so,
//         m.emUso as emUso,
//         (SELECT capacidade FROM hardware JOIN componente ON fkHardware = idHardware WHERE fkTipoHardware = 3 AND idMaquina = m.idMaquina LIMIT 1) 
//         as capacidadeRam,
//         (SELECT capacidade FROM hardware JOIN componente ON fkHardware = idHardware WHERE fkTipoHardware = 2 AND idMaquina = m.idMaquina LIMIT 1) 
//         as capacidadeCPU,
//         (SELECT capacidade FROM hardware JOIN componente ON fkHardware = idHardware WHERE fkTipoHardware = 1 AND idMaquina = m.idMaquina LIMIT 1) 
//         as capacidadeDisco, 
//         (SELECT COUNT(*) FROM strike WHERE fkMaquina = m.idMaquina AND DATE(dataHora) = CURDATE()) as quantidadeStrikes,
//         (SELECT COUNT(*) FROM historico WHERE fkMaquina = m.idMaquina AND DATE(dataHora) = CURDATE() AND consumo > 70) as quantidadeAlertas
//     FROM maquina m
//     WHERE
//         m.idMaquina = ${idMaquina}
//     LIMIT 1;
//     `;

//     console.log(instrucao);
//     return database.executar(instrucao);
// }

// function capturarTodosDadosMaquina(idMaquina, idInstituicao) {
//     let instrucao = `
//     SELECT 
//         m.idMaquina as id,
//         m.nome as nome,
//         m.so as so,
//         m.emUso as emUso,
//         (SELECT concat(fabricante, ' ', modelo, ' ', especificidade) FROM hardware JOIN componente ON fkHardware = idHardware JOIN maquina ON fkMaquina = idMaquina WHERE fkTipoHardware = 3 AND idMaquina = ${idMaquina}) 
//         as componenteRAM,
//         (SELECT capacidade FROM hardware JOIN componente ON fkHardware = idHardware JOIN maquina ON fkMaquina = idMaquina WHERE fkTipoHardware = 3 AND idMaquina = ${idMaquina}) 
//         as capacidadeRAM,
//         (SELECT concat(fabricante, ' ', modelo, ' ', especificidade) FROM hardware JOIN componente ON fkHardware = idHardware JOIN maquina ON fkMaquina = idMaquina WHERE fkTipoHardware = 2 AND idMaquina = ${idMaquina}) 
//         as componenteCPU,
//         (SELECT capacidade FROM hardware JOIN componente ON fkHardware = idHardware JOIN maquina ON fkMaquina = idMaquina WHERE fkTipoHardware = 2 AND idMaquina = ${idMaquina}) 
//         as capacidadeCPU,
//         (SELECT concat(fabricante, ' ', modelo, ' ', especificidade) FROM hardware JOIN componente ON fkHardware = idHardware JOIN maquina ON fkMaquina = idMaquina WHERE fkTipoHardware = 1 AND idMaquina = ${idMaquina}) 
//         as componenteDisco,
//         (SELECT capacidade FROM hardware JOIN componente ON fkHardware = idHardware JOIN maquina ON fkMaquina = idMaquina WHERE fkTipoHardware = 1 AND idMaquina = ${idMaquina}) 
//         as capacidadeDisco,
//         (SELECT COUNT(*) FROM strike JOIN maquina ON fkMaquina = idMaquina WHERE fkMaquina = ${idMaquina}) as qtdStrikes
//     FROM maquina m
//     JOIN componente c ON c.fkMaquina = m.idMaquina
//     JOIN hardware ram ON c.fkHardware = ram.idHardware
//     JOIN hardware cpu ON c.fkHardware = cpu.idHardware
//     JOIN hardware disco ON c.fkHardware = disco.idHardware
//     WHERE
//         m.idMaquina = ${idMaquina}
//     LIMIT 1;
//     `;

//     return database.executar(instrucao);
// }

// function capturarTodasMaquinas(idInstituicao, ordAlfabetica = '', qtdStrikes = '', emUso = '', estado = '', pesquisa = '') {
//     let instrucao = `
//     SELECT
//         m.idMaquina as id,
//         m.nome AS nome,
//         m.emUso AS emUso,
//         m.SO AS so,
//         (SELECT COUNT(*) FROM strike WHERE fkMaquina = m.idMaquina AND fkSituacao IN (1, 3)) AS qtdStrikes,
//         CASE
//         WHEN (
//             SELECT consumo
//             FROM historico h
//             WHERE h.fkMaquina = m.idMaquina
//               AND h.fkComponente IN (
//                   SELECT idComponente
//                   FROM componente
//                   WHERE fkHardware IN (
//                       SELECT idHardware
//                       FROM hardware
//                       WHERE fkTipoHardware IN (
//                           SELECT idTipoHardware
//                           FROM tipoHardware
//                           WHERE tipo = 'RAM'
//                       )
//                   )
//               )
//             ORDER BY h.dataHora DESC
//             LIMIT 1
//         ) >= 85 THEN 'Crítico'
//         WHEN (
//             SELECT consumo
//             FROM historico h
//             WHERE h.fkMaquina = m.idMaquina
//               AND h.fkComponente IN (
//                   SELECT idComponente
//                   FROM componente
//                   WHERE fkHardware IN (
//                       SELECT idHardware
//                       FROM hardware
//                       WHERE fkTipoHardware IN (
//                           SELECT idTipoHardware
//                           FROM tipoHardware
//                           WHERE tipo = 'RAM'
//                       )
//                   )
//               )
//             ORDER BY h.dataHora DESC
//             LIMIT 1
//         ) >= 70 THEN 'Alerta'
//         ELSE 'Normal'
//         END AS status
//     FROM maquina m
//     JOIN instituicao inst ON inst.idInstituicao = m.fkInstituicao
//     WHERE idInstituicao = ${idInstituicao} ${qtdStrikes} ${emUso} ${estado} ${pesquisa}
//     GROUP BY m.idMaquina
//     ${ordAlfabetica};
//     `;

//     console.log(instrucao);

//     return database.executar(instrucao);
// }

// function capturarConsumoRAM(idMaquina, idInstituicao) {
//     let instrucao = `
//     SELECT 
//         h.idHistorico, 
//         DATE_FORMAT(h.dataHora, "%H:%i:%s") as dataHora, 
//         h.consumo, 
//         c.max as maxConsumo, 
//         th.tipo 
//     FROM 
//         historico h
//     JOIN componente c ON h.fkComponente = c.idComponente
//     JOIN hardware hw ON c.fkHardware = hw.idHardware
//     JOIN tipoHardware th ON hw.fkTipoHardware = th.idTipoHardware
//     WHERE
//         th.tipo = 'RAM' AND h.fkMaquina = ${idMaquina}
//         AND DATE(h.dataHora) = CURDATE() 
//     ORDER BY h.dataHora DESC
//     LIMIT 8;
//     `;

//     return database.executar(instrucao);
// }

// function capturarConsumoCPU(idMaquina, idInstituicao) {
//     let instrucao = `
//     SELECT 
//         h.idHistorico, 
//         DATE_FORMAT(h.dataHora, "%H:%i:%s") as dataHora, 
//         h.consumo, 
//         c.max as maxConsumo, 
//         th.tipo 
//     FROM 
//         historico h
//     JOIN componente c ON h.fkComponente = c.idComponente
//     JOIN hardware hw ON c.fkHardware = hw.idHardware
//     JOIN tipoHardware th ON hw.fkTipoHardware = th.idTipoHardware
//     WHERE
//         th.tipo = 'Processador' AND h.fkMaquina = ${idMaquina}
//         AND DATE(h.dataHora) = CURDATE() 
//     ORDER BY h.dataHora DESC
//     LIMIT 8;
//     `;

//     return database.executar(instrucao);
// }

// function capturarConsumoDisco(idMaquina, idInstituicao) {
//     let instrucao = `
//     SELECT 
//         h.idHistorico, 
//         DATE_FORMAT(h.dataHora, "%H:%i:%s") as dataHora, 
//         h.consumo, 
//         c.max as maxConsumo, 
//         th.tipo 
//     FROM 
//         historico h
//     JOIN componente c ON h.fkComponente = c.idComponente
//     JOIN hardware hw ON c.fkHardware = hw.idHardware
//     JOIN tipoHardware th ON hw.fkTipoHardware = th.idTipoHardware
//     WHERE
//         th.tipo = 'Disco' AND h.fkMaquina = ${idMaquina}
//         AND DATE(h.dataHora) = CURDATE() 
//     ORDER BY h.dataHora DESC
//     LIMIT 8;
//     `;

//     return database.executar(instrucao);
// }

// function capturarNovoDadoRAM(idMaquina, idInstituicao) {
//     let instrucao = `
//     SELECT 
//         h.idHistorico, DATE_FORMAT(h.dataHora, "%H:%i:%s") as dataHora, h.consumo, c.max as maxConsumo
//     FROM 
//         historico h
//     JOIN componente c ON h.fkComponente = c.idComponente
//     JOIN hardware hw ON c.fkHardware = hw.idHardware
//     JOIN tipoHardware th ON hw.fkTipoHardware = th.idTipoHardware
//     WHERE
//         th.tipo = 'RAM' AND h.fkMaquina = ${idMaquina}
//         AND DATE(h.dataHora) = CURDATE() 
//     ORDER BY dataHora DESC
//     LIMIT 1;
//     `;

//     return database.executar(instrucao);
// }

// function capturarNovoDadoCPU(idMaquina, idInstituicao) {
//     let instrucao = `
//     SELECT 
//         h.idHistorico, DATE_FORMAT(h.dataHora, "%H:%i:%s") as dataHora, h.consumo, c.max as maxConsumo
//     FROM 
//         historico h
//     JOIN componente c ON h.fkComponente = c.idComponente
//     JOIN hardware hw ON c.fkHardware = hw.idHardware
//     JOIN tipoHardware th ON hw.fkTipoHardware = th.idTipoHardware
//     WHERE
//         th.tipo = 'Processador' AND h.fkMaquina = ${idMaquina}
//         AND DATE(h.dataHora) = CURDATE() 
//     ORDER BY dataHora DESC
//     LIMIT 1;
//     `;

//     return database.executar(instrucao);
// }

// function capturarNovoDadoDisco(idMaquina, idInstituicao) {
//     let instrucao = `
//     SELECT 
//         h.idHistorico, DATE_FORMAT(h.dataHora, "%H:%i:%s") as dataHora, h.consumo, c.max as maxConsumo
//     FROM 
//         historico h
//     JOIN componente c ON h.fkComponente = c.idComponente
//     JOIN hardware hw ON c.fkHardware = hw.idHardware
//     JOIN tipoHardware th ON hw.fkTipoHardware = th.idTipoHardware
//     WHERE
//         th.tipo = 'Disco' AND h.fkMaquina = ${idMaquina}
//         AND DATE(h.dataHora) = CURDATE() 
//     ORDER BY dataHora DESC
//     LIMIT 1;
//     `;

//     return database.executar(instrucao);
// }

// function editarMaquina(idMaquina, nomeMaquina, SistemaOperacional, idInstituicao) {
//     let instrucao = `
//     UPDATE maquina
//     SET nome = '${nomeMaquina}', SO = '${SistemaOperacional}'
//     WHERE idMaquina = ${idMaquina};
//     `;
//     return database.executar(instrucao);
// }

// function deletarMaquina(idMaquina) {
//     let instrucao = `
//         DELETE FROM maquina WHERE idMaquina = ${idMaquina};
//     `;

//     return database.executar(instrucao);
// }

// function maisUsoCpuRamKpi(idInstituicao) {
//     let instrucao = `
//     SELECT 
//         fkMaquina,
//         ROUND(MAX(COALESCE(CASE WHEN tipo = 'RAM' THEN consumo END, 0)), 2) AS maxConsumoRam,
//         ROUND(MAX(COALESCE(CASE WHEN tipo = 'Processador' THEN consumo END, 0)), 2) AS maxConsumoProcessador
//     FROM (
//         SELECT 
//             h.fkMaquina,
//             h.consumo, 
//             c.max AS maxConsumo, 
//             th.tipo,
//             RANK() OVER (PARTITION BY h.fkMaquina, th.tipo ORDER BY h.consumo DESC) AS rnk
//         FROM 
//             historico h
//         JOIN componente c ON h.fkComponente = c.idComponente
//         JOIN hardware hw ON c.fkHardware = hw.idHardware
//         JOIN tipoHardware th ON hw.fkTipoHardware = th.idTipoHardware
//         JOIN maquina m ON h.fkMaquina = m.idMaquina
//         WHERE
//             m.fkInstituicao = ${idInstituicao}
//             AND WEEK(h.dataHora) = WEEK(NOW())  -- Modificado para usar WEEK diretamente
//     ) AS subconsulta
//     WHERE rnk = 1
//     GROUP BY fkMaquina
//     LIMIT 8;
//     `;

//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }
// function maquinasMaisDefeitos(idInstituicao) {
//     let instrucao = `
//         SELECT
//             m.idMaquina AS fkMaquina,
//             m.nome AS nomeMaquina,
//             COUNT(DISTINCT s.idStrike) AS quantidadeStrikes,
//             COUNT(DISTINCT CASE WHEN h.consumo > 70 THEN h.idHistorico END) AS quantidadeAlertas,
        
//             RANK() OVER (ORDER BY COUNT(DISTINCT CASE WHEN h.consumo > 80 THEN h.idHistorico END) DESC) AS ranking
//         FROM
//             maquina m
//         LEFT JOIN strike s ON m.idMaquina = s.fkMaquina
//         LEFT JOIN historico h ON m.idMaquina = h.fkMaquina AND h.consumo > 70
//         WHERE
//             m.fkInstituicao = ${idInstituicao}
//             AND YEARWEEK(h.dataHora, 1) = YEARWEEK(CURRENT_TIMESTAMP, 1)  -- Filtrar pela semana atual
//         GROUP BY
//             m.idMaquina
//         HAVING
//             quantidadeStrikes > 0 OR quantidadeAlertas > 0
//         ORDER BY
//             ranking
//         LIMIT 5;    
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }

// module.exports = {
//     capturarDadosMaquina,
//     capturarTodosDadosMaquina,
//     capturarTodasMaquinas,
//     capturarConsumoRAM,
//     capturarConsumoCPU,
//     capturarConsumoDisco,
//     capturarNovoDadoRAM,
//     capturarNovoDadoDisco,
//     capturarNovoDadoCPU,
//     editarMaquina,
//     deletarMaquina,
//     maisUsoCpuRamKpi,
//     maquinasMaisDefeitos
// };