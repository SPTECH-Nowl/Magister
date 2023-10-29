var idUser = 3;

divBotoes.innerHTML = `
<div class="botao nUsar" onclick="atualizarProcessos(${idUser})" ><ion-icon class="seta" name="chevron-back-outline"></ion-icon></div>

<div class="botao usar" onclick="atualizarProcessos(${idUser})" ><ion-icon class="seta" name="chevron-forward-outline"></ion-icon></div>

<div class="botoesActions">
   <button class="botaoAction desativado" id="btnAtualizar"
      onclick="atualizarProcessos(${idUser})">Atualizar</button>
   <button class="botaoAction ativo" id="btnSair">Sair</button>
</div>
`;



let listaProcessoDisp = [];
let listaProcessoUsado = [];




function alterarLista(id) {
    var elemento = document.getElementById(`boxProcessoDisp${id}`);
    elemento.addEventListener("click", function () {
        if (elemento.classList.contains("boxProcessoActive")) {
            elemento.classList.remove('boxProcessoActive')
            var itemParaRemover = id;
            listaProcessoDisp = listaProcessoDisp.filter(item => item !== itemParaRemover);
            console.log("lista" + listaProcessoDisp);


        } else {
            elemento.classList.add('boxProcessoActive')
            listaProcessoDisp.push(id);
            console.log("lista" + listaProcessoDisp);

        }
        mudarbtn()
    })
}



function alterarListaUsados(id) {
    var elemento = document.getElementById(`boxProcessoActive${id}`);
    elemento.addEventListener("click", function () {
        if (elemento.classList.contains("boxProcessoActive")) {
            elemento.classList.remove('boxProcessoActive')
            var itemParaRemover = id;
            listaProcessoUsado = listaProcessoUsado.filter(item => item !== itemParaRemover);
            console.log("lista" + listaProcessoUsado);


        } else {
            elemento.classList.add('boxProcessoActive')
            listaProcessoUsado.push(id);
            console.log("lista" + listaProcessoUsado);

        }
        mudarbtn()
    })
}


function mudarbtn() {
    var btn = document.getElementById("btnAtualizar")

    if (listaProcessoDisp.length > 0 || listaProcessoUsado.length > 0) {
        btn.classList.remove('desativado')
        btn.classList.add('ativo')

    } else {
        btn.classList.remove('ativo')
        btn.classList.add('desativado')

    }
}


function atualizarProcessos(id) {
    if (listaProcessoDisp.length > 0 || listaProcessoUsado.length > 0) {
        console.log("atualizar");
    } else {
        console.log("Listas sem itens");
    }
}

listaAppUsados(idUser);

function listaAppUsados(idUsuario) {

    fetch(`/processo/listaAppUsados/${idUsuario}`)
        .then((listaAppUsados => {
            if (listaAppUsados.status == 204) {
                console.log("deu erro");
            } else {
                listaAppUsados.json().then(function (listaAppUsados) {
                    var aplicativosPermitidos = document.getElementById("aplicativospermitidosUsados");
                    aplicativosPermitidos.innerHTML = ""; // Limpar a tabela antes de preencher com os novos dados
                    console.log(listaAppUsados)
                    
                    aplicativospermitidosUsados.innerHTML = "   <h2>Ativados pelo professor</h2>"

                    for (var i = 0; i < listaAppUsados.length; i++) {
                        var processo = listaAppUsados[i];
                    
                            aplicativospermitidosUsados.innerHTML += `
                                <div class="boxProcesso" id="boxProcessoActive${processo.idProcesso}" onclick="alterarListaUsados(${processo.idProcesso})">
                                   <div class="imagem"><img src="../assets/img/iconsProcesso/icon_sql_workbench.png" alt=""></div>
                                   <div class="nomeProcesso">${processo.nomeAplicativo}</div>
                                </div>
                        `
                    }
                });
            }

        }))


}



listaAppNaoUsados(idUser);

function listaAppNaoUsados(idUsuario) {

    fetch(`/processo/listaAppNaoUsados/${idUsuario}`)
        .then((listaAppNaoUsados => {
            if (listaAppNaoUsados.status == 204) {
                console.log("deu erro");
            } else {
                listaAppNaoUsados.json().then(function (listaAppNaoUsados) {
                    var aplicativosPermitidos = document.getElementById("aplicativosPermitidos");
                    aplicativosPermitidos.innerHTML = ""; // Limpar a tabela antes de preencher com os novos dados
                    console.log(listaAppNaoUsados)
                    
                    aplicativosPermitidos.innerHTML = "<h2>Disponiveis para uso</h2>"

                    for (var i = 0; i < listaAppNaoUsados.length; i++) {
                        var processo = listaAppNaoUsados[i];
                    
                            aplicativosPermitidos.innerHTML += `
                            <div class="boxProcesso" id="boxProcessoDisp${processo.idProcesso}" onclick="alterarLista(${processo.idProcesso})">
                            <div class="imagem"><img src="../assets/img/iconsProcesso/icon_sql_workbench.png" alt=""></div>
                            <div class="nomeProcesso">${processo.nomeAplicativo}</div>
                         </div>
                        `
                    }
                });
            }

        }))


}
