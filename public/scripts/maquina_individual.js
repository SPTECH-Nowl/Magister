console.log("OI");


function entrar() {


    var idVar =2;

    fetch("/maquinas/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idServer: idVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                nome_maquina.innerHTML = json.nomeMaquina;
                so.innerHTML = json.sistema;
                ram.innerHTML = json.consumoRam;
                disco.innerHTML = json.consumoDisco;

                if(json.emUso=1){
                    statusUso.innerHTML = "ON";

                }else{
                statusUso.innerHTML = "OFF";

                }

            });

        } else {
            
            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);

            });
        }

    }).catch(function (erro) {
        console.log("qq");
        console.log(erro);
    })




    return false;


}

entrar();