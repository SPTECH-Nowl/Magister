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

function atualizarDadosPermissao(){
    var idPermicao = document.getElementById("permissoesSelect").value
    var idAcaoPadrao = document.getElementById("acoesSelect").value

    var tempoPadrao = document.getElementById("tempoPadraoInput").value

    var partesTempo = tempoPadrao.split(':');

    var horas = parseInt(partesTempo[0], 10);
    var minutos = parseInt(partesTempo[1], 10);

    var tempoTotalEmMinutos = horas * 60 + minutos;

    fetch("/permissoes/editarConfig", {
        method: "put",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idPermicao: idPermicao,
            acaoPadrao: idAcaoPadrao,
            duracaoStrikePadrao: tempoTotalEmMinutos
        })
    }).then(response =>{
        if(response.ok){
            alert("Sucesso ao modificar a permissao")
            window.location.reload();
        }
    })

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

function buscarPermicao(idAcao){
    return new Promise((resolve, reject) => {
        fetch(`/permissoes/buscarPermicao/${idAcao}`)
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

function buscarPermissoesUsuario(idFuncionario){
    return new Promise((resolve, reject) => {
        fetch(`/permissoes/buscarPermissoesFunc/${idFuncionario}`)
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

function getSelectedValues(){
        const nodeList = document.querySelectorAll("sl-select");
        const selects = [...nodeList, nodeList];
        return {
           permissoes: selects[0],
           acoesAdd: selects[1],
           acoes: selects[2]
        }
}

function dadosAcaoEspecifica(idAcao){
    return new Promise((resolve, reject) => {
        fetch(`/atuacoes/buscarAcao/${idAcao}`)
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


function criarPermissao(){
    var nomePermissao = document.getElementById("nomePermissao").value
    var acaoPadrao = document.getElementById("acoesSelectAdd").value
    var tempoPadrao = document.getElementById("tempoPadraoPermissao").value
    
    var partesTempo = tempoPadrao.split(':');

    var horas = parseInt(partesTempo[0], 10);
    var minutos = parseInt(partesTempo[1], 10);

    var tempoTotalEmMinutos = horas * 60 + minutos;
    
    var usuario = idFuncionario;

    fetch("/permissoes/adicionar", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            nome: nomePermissao,
            fkAtuacao: acaoPadrao,
            duracaoStrikePadrao: tempoTotalEmMinutos,
            fkUsuario: usuario
        })
    }).then(response=>{
        if(response.ok){
            alert("permissao cadastrada com sucesso")
            window.location.reload()
        }
    })
}


function criarAcao(){
    var nomeAcao = document.getElementById("nomeAcao").value
    var descricaoAcao = document.getElementById("descricaoAcao").value

    fetch("/atuacoes/adicionar", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            nome: nomeAcao,
            descricao: descricaoAcao 
        })
    }).then(response=>{
        if(response.ok){
            alert("Ação cadastrada com sucesso")
            window.location.reload()
        }
    })
}


buscarAcoes().then(dados => {
    dados.forEach( acao => {
        document.getElementById("acoesSelect").innerHTML += `<sl-option value="${acao.idAtuacao}">${acao.nome}</sl-option>`
        document.getElementById("acoesSelectAdd").innerHTML += `<sl-option value="${acao.idAtuacao}">${acao.nome}</sl-option>`
    });


    
})

document.addEventListener("DOMContentLoaded", ()=>{
    var selectPermissoes = getSelectedValues().permissoes

    selectPermissoes.addEventListener('sl-change', (event) => {
        buscarPermicao(event.target.value).then(dados =>{
            
            document.getElementById("acoesSelect").setAttribute("value", dados[0].fkAtuacao)

            document.getElementById("acoesSelect").setAttribute("help-text", `Descrição: ${dados[0].atuacao_descricao}`)
            
            let duracaoBrutaEmMinutos = dados[0].duracaoStrikePadrao;
    
            let horas = Math.floor(duracaoBrutaEmMinutos / 60);
            let minutos = duracaoBrutaEmMinutos % 60;
        
            horas = horas < 10 ? "0" + horas : horas;
            minutos = minutos < 10 ? "0" + minutos : minutos;
        
            let duracaoFormatada = `${horas}:${minutos}`;
        
            document.getElementById("tempoPadraoInput").value = duracaoFormatada
    })

    });

    var selectAcoes = getSelectedValues().acoes 
    
    selectAcoes.addEventListener('sl-change', (event) => {
        dadosAcaoEspecifica(event.target.value).then(dados=>{

            document.getElementById("acoesSelect").setAttribute("help-text", `Descrição: ${dados[0].descricao}`)
        })
    });


    
acaoETempoUsuarioEspecifico(idFuncionario).then(dados =>{
    document.getElementById("acoesSelect").setAttribute("value", dados[0].idAtuacao)
    document.getElementById("acoesSelect").setAttribute("help-text", `Descrição: ${dados[0].descricao}`)
    
    let duracaoBrutaEmMinutos = dados[0].duracaoStrikePadrao;

    let horas = Math.floor(duracaoBrutaEmMinutos / 60);
    let minutos = duracaoBrutaEmMinutos % 60;

    horas = horas < 10 ? "0" + horas : horas;
    minutos = minutos < 10 ? "0" + minutos : minutos;

    let duracaoFormatada = `${horas}:${minutos}`;

    document.getElementById("tempoPadraoInput").value = duracaoFormatada
})




buscarPermissoesUsuario(idFuncionario).then(permissoesFuncionario => {
    console.log(permissoesFuncionario)
    permissoesFuncionario.forEach(permissao => {
        if(permissao.permissao_emUso == 1){
           document.getElementById("permissoesSelect").setAttribute("value", permissao.idPermissao)
           document.getElementById("permissoesSelect").innerHTML += `  <sl-option value="${permissao.idPermissao}">${permissao.permissao_nome}</sl-option>`
        } else{        
            document.getElementById("permissoesSelect").innerHTML += `  <sl-option value="${permissao.idPermissao}">${permissao.permissao_nome}</sl-option>`
        }
    });
})

})
