var database = require("../database/config")



function capturaIndividual(idMaquina ) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", idMaquina )
    var instrucao = `
    SELECT
    h.dataHora,
    m.nome AS nomeMaquina,
    m.SO as sistema,
    m.emUso as emUso,
    h.consumo as consumoRam,
    h2.consumo as consumoCpu,
    h3.consumo as consumoDisco,
    h4.consumo as consumoJanelas
FROM historico h
JOIN maquina m ON h.fkMaquina = m.idMaquina and h.fkComponente =1
left join historico h2 on h.fkMaquina = h2.fkMaquina and h2.fkComponente =2
left join historico h3 on h2.fkMaquina = h3.fkMaquina and h3.fkComponente =3
left join historico h4 on h3.fkMaquina = h4.fkMaquina and h4.fkComponente =4
where m.idMaquina =1
LIMIT 0, 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
module.exports = {
    capturaIndividual
};