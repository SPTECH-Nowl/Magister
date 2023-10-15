var maquinaModel = require("../models/maquinaModel");

var sessoes = [];



function capturaIndividual(req, res) {
    var id = req.body.idServer;
    
    if (id == undefined) {
        res.status(400).send("Seu id está undefined!");
    }  else {
        
        maquinaModel.capturaIndividual(id)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("id e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}



module.exports = {
    capturaIndividual
}