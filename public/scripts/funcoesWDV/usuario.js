function cadastrar() {
    var nomeVar = nome_input_cadastro.value;
    var emailVar = email_input_cadastro.value;
    var senhaVar = senha_input_cadastro.value;
    var codigoVar = codigo_input.value;

    if (nomeVar ==""||emailVar == "" || senhaVar == ""|| codigoVar =="") {
      

        return false;
} 

    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: nomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar,
            codigoServer: codigoVar
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            toggleLogin()
            swal("sucess","Cadastro concluido com êxito!","sucess")
        } else {
            console.log("erro no cadastro")
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);

    });

    return false;



}

function entrar() {
    var emailVar = email_input.value;
    var senhaVar = senha_input.value;

    if (emailVar == "" || senhaVar == "") {
        return false;
    }
    else {
     
        fetch(`${window.location.origin}/usuarios/entrar/${emailVar}/${senhaVar}`, 
             {cache: "no-cache"}).then( resposta =>{
                if(resposta.ok){
                        resposta.json().then(json => {
                            sessionStorage.emailUsuario = json.email;
                            sessionStorage.nomeUsuario = json.nome;
                            sessionStorage.idUsuario = json.idUsuario;
                        })

                        window.location = "./dashboard/dashboard_maquina.html"
                } else {
                    swal('Email e/ou senha invalido!')
                }
             }).catch(function (erro) {
                console.log(erro);
            })
        return false
    }
}
        /* fetch("/usuarios/entrar/", {cache: "no-cache"}).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")

            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));

                    sessionStorage.EMAIL_USUARIO = json.email;
                    sessionStorage.NOME_USUARIO = json.nome;
                    sessionStorage.ID_USUARIO = json.idUsuario;

                    setTimeout(function () {
                        window.location = "dashboard.html";
                    }, 3000); 

                });

            } else {
                    swal('sucess', 'Email e/ou senha invalido!')

            }

        }).catch(function (erro) {
            console.log(erro);
        })

        return false;
    } 
}*/