// & js - avisoModal -- avisoController
// * verificar nomes = publicar == insert -> aviso/publicar
// * verificar nomes = editar == update -> aviso/editar
// * verificar nomes = deletar == delete -> aviso/deletar
// * verificar nomes = mostrar_dados == select -> aviso/mostrar_dados

function publicar() {
    var nomeVar = nome_input_cadastro.value;
    var emailVar = email_input_cadastro.value;
    var senhaVar = senha_input_cadastro.value;
    var codigoVar = codigo_input.value;
    var fkInstituicaoVar = fkInstituicao_input.value;

    if (nomeVar ==""||emailVar == "" || senhaVar == ""|| codigoVar =="" || fkInstituicaoVar == "") {
      
        swal("error","Preencha todos os campos ou nivel de permição invalido","error");
        return false;
} 

    fetch("/aviso/publicar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: nomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar,
            codigoServer: codigoVar,
            fkInstituicaoServer:fkInstituicaoVar
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            toggleLogin()
            swal("Parábens","Cadastro concluido com êxito!","sucess")
        } else {
            console.log("erro no cadastro")
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);

    });

    return false;



}

function editar() {
    var nomeVar = nome_input_cadastro.value;
    var emailVar = email_input_cadastro.value;
    var senhaVar = senha_input_cadastro.value;
    var idUsuarioVar = idUsuario.value;
    var fkInstituicaoVar = fkInstituicao_input.value;

    if (nomeVar ==""||emailVar == "" || senhaVar == ""|| idUsuarioVar =="" || fkInstituicaoVar == "") {
      
        swal("error","Preencha todos os campos ou nivel de permição invalido","error");
        return false;
} 

    fetch("/aviso/editar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: nomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar,
            idUsuarioServer: idUsuarioVar,
            fkInstituicao:fkInstituicaoVar
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            toggleLogin()
            swal("Parábens","Update concluido com êxito!","sucess")
        } else {
            console.log("erro no Update")
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);

    });

    return false;



}

function deletar() {
    var idUsuarioVar = idUsuario.value;


    if ( idUsuarioVar == "") {
      
        swal("error","Preencha todos os campos ou nivel de permição invalido","error");
        return false;
} 

    fetch("/aviso/deletar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuario: idUsuarioVar,
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            toggleLogin()
            swal("Parábens","Update concluido com êxito!","sucess")
        } else {
            console.log("erro no Update")
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);

    });

    return false;



}

function mostrar_dados() {
    var idUsuarioVar = idUsuario.value;


    if ( idUsuarioVar == "") {
      
        swal("error","Preencha todos os campos ou nivel de permição invalido","error");
        return false;
} 

    fetch("/aviso/mostrar_dados", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuario: idUsuarioVar,
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            toggleLogin()
            swal("Parábens","Update concluido com êxito!","sucess")
        } else {
            console.log("erro no Update")
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);

    });

    return false;



}