var idFuncionario = localStorage.getItem("idUsuario") 

document.addEventListener("DOMContentLoaded", () =>{
buscarDadosFuncionario(idFuncionario);
})

function buscarDadosFuncionario(idFuncionario){
    fetch(`/usuarios/listarPorUsuario/${idFuncionario}`)
    .then(response => {
        if(response.ok){
            response.json().then(funcionario =>{
                var funcionarioInfo = funcionario[0]

                document.getElementById("nomeFuncionario").value = funcionarioInfo.nome
                document.getElementById("emailFuncionario").value = funcionarioInfo.email
                document.getElementById("senhaFuncionario").value = funcionarioInfo.senha
                document.getElementById("permissaoFuncionario").value = 
                (funcionarioInfo.nivPermissao === 1) ? "Administrador nowl" :
                (funcionarioInfo.nivPermissao === 2) ? "Administrador instituicao" :
                (funcionarioInfo.nivPermissao === 3) ? "Instrutor" : "Outro";
            })
        }
    })
}

function atualizarDados(idFuncionario){

    var regexSenha = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/
    
    var nomeInput = document.getElementById("nomeFuncionario").value
    var emailInput = document.getElementById("emailFuncionario").value
    var senhaInput = document.getElementById("senhaFuncionario").value

    var tipoInput = document.getElementById("permissaoFuncionario").value

    var tipo = 
        (tipoInput === "Administrador nowl") ? 1 :
        (tipoInput === "Administrador instituicao") ? 2 :
        (tipoInput === "Instrutor") ? 3 : 0;
    

    if (regexSenha.test(senhaInput)) {
            fetch("/usuarios/editar", {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nomeUsuario: nomeInput,
                    emailUsuario: emailInput,
                    senhaUsuario: senhaInput,
                    nivPermissao: tipo,
                    idUsuario: idFuncionario
                })
            }).then(response =>{
                if(response.ok){
                    alert("Sucesso ao modificar o usuário")
                    window.location.reload();
                }
            })
    } else {
            document.getElementById("senhaFuncionario").setAttribute("help-text", "Sua senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula e um símbolo.")
    }





}




function buscarAcoes(){
    return new Promise((resolve, reject) => {
        fetch(`/atuacoes/buscarAcoes/`)
           .then((response) => {
              if(response.ok) {
                 response.json().then((response) => {
                    let registro = response;
                    resolve(registro);
                 })
              }
           })
           .catch((error) => {
              console.log("Erro na requisição", error);
              reject(error);
           })
     })
}


function acaoETempoUsuarioEspecifico(idFuncionario){
    return new Promise((resolve, reject) => {
        fetch(`/strikes/acaoETempoUsuarioEspecifico/${idFuncionario}`)
           .then((response) => {
              if(response.ok) {
                 response.json().then((response) => {
                    let registro = response;
                    resolve(registro);
                 })
              }
           })
           .catch((error) => {
              console.log("Erro na requisição", error);
              reject(error);
           })
     })
}


    buscarAcoes().then(dados => {
        dados.forEach( acao => {
            document.getElementById("acoesSelect").innerHTML += `<sl-option value="${acao.idAtuacao}">${acao.nome}</sl-option>`
        });
    })


    acaoETempoUsuarioEspecifico(idFuncionario).then(dados =>{
        document.getElementById("acoesSelect").setAttribute("value", dados[0].idAtuacao)
        
        let duracaoBrutaEmMinutos = dados[0].duracaoStrikePadrao;

        let horas = Math.floor(duracaoBrutaEmMinutos / 60);
        let minutos = duracaoBrutaEmMinutos % 60;
    
        horas = horas < 10 ? "0" + horas : horas;
        minutos = minutos < 10 ? "0" + minutos : minutos;
    
        let duracaoFormatada = `${horas}:${minutos}`;
    
        document.getElementById("tempoPadraoInput").value = duracaoFormatada
    })