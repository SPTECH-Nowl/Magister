var idUser = sessionStorage.idUsuario;

divBotoes.innerHTML = `
<div class="botao nUsar" onclick="removerProcessoLista(${idUser})" ><ion-icon class="seta" name="chevron-back-outline"></ion-icon></div>

<div class="botao usar" onclick="adicionarProcessoLista(${idUser})" ><ion-icon class="seta" name="chevron-forward-outline"></ion-icon></div>

<div class="botoesActions">
   <button class="botaoAction desativado" id="btnAtualizar"
      onclick="atualizarProcessos(${idUser})">Atualizar</button>
   <button class="botaoAction ativo" id="btnSair" onclick="fecharTela()">Sair</button>
</div>
`;








let listaProcessoDisp = [];
let listaProcessoUsado = [];

var adicionarProcesso = document.getElementById(`adicionarProcesso`);
var listaApp = document.getElementById(`listaApp`);
adicionarProcesso.addEventListener('click', function () {
    listaApp.classList.remove('dfNone')
    listaApp.classList.add('dfActive')
})

function fecharTela() {
    listaApp.classList.remove('dfActive')
    listaApp.classList.add('dfNone')
}

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


function atualizarProcessos() {
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

listarProcessos(idUser)
function listarProcessos(idUsuario) {
    fetch(`/processo/listaAppUsados/${idUsuario}`)
        .then(function (listaAppUsados) {
            if (listaAppUsados.ok) {
                if (listaAppUsados.status == 204) {
                    var tebleProcesso = document.getElementById("listaDeProcesso");
                    tebleProcesso.innerHTML = "<tr><td colspan='4'>Nenhum processo sendo monitorado.</td></tr>";
                } else {
                    listaAppUsados.json().then(function (listaAppUsados) {

                        if (listaAppUsados.length > 0) {

                            var tebleProcesso = document.getElementById("listaDeProcesso");
                            tebleProcesso.innerHTML = ""; // Limpar a tabela antes de preencher com os novos dados

                            console.log(listaAppUsados)

                            for (var i = 0; i < listaAppUsados.length; i++) {
                                var processo = listaAppUsados[i];



                                var linhaTable = document.createElement("tr");
                                linhaTable.setAttribute('id', `processo_${processo.idProcesso}`)

                                var celulaNomeApp = document.createElement("td");
                                var celulaNomeProcesso = document.createElement("td");
                                var celulaStatus = document.createElement("td");

                                celulaNomeApp.textContent = processo.nomeAplicativo;
                                celulaNomeProcesso.textContent = processo.nomeProcesso;
                                celulaStatus.textContent = "Ativo";

                                document.addEventListener("DOMContentLoaded", function () {
                                    carregarFeed(); // Chame a função para carregar a tabela de usuários
                                    tippy(".tooltip", {
                                        placement: "top",
                                    });
                                });
                                linhaTable.appendChild(celulaNomeApp);
                                linhaTable.appendChild(celulaNomeProcesso);
                                linhaTable.appendChild(celulaStatus);

                                tebleProcesso.appendChild(linhaTable);
                            }
                        }

                    });

                }
            } else {
                throw ('Houve um erro na API!');
            }
        })
        .catch(function (resposta) {
            console.error(resposta);
        });
}


function atualizarProcessos(idUsuario) {
    adicionarProcessoLista(idUsuario)
    removerProcessoLista(idUsuario)
}

function adicionarProcessoLista(idUsuario) {
    if (listaProcessoDisp.length > 0) {

        for (var i = 0; i < listaProcessoDisp.length; i++) {
            console.log(listaProcessoDisp.length);
            var idProcesso = listaProcessoDisp[i]
            fetch(`/processo/publicar/${idProcesso}/${idUsuario}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },

            }).then(function (resposta) {
                if (resposta.ok) {
                    listaAppNaoUsados(idUser)
                    listaAppUsados(idUser)
                    listaApp(idUser)
                } else {
                    console.log("erro no cadastro")
                }
            }).catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });

        }
    }
}





function testar() {
    aguardar();

    var formulario = new URLSearchParams(new FormData(document.getElementById("form_postagem")));

    var divResultado = document.getElementById("div_feed");

    divResultado.appendChild(document.createTextNode(formulario.get("descricao")));
    divResultado.innerHTML = formulario.get("descricao");



    return false;
}
function alterar(idProcesso) {
    fetch(`/processo/listarPorProcesso/${idProcesso}`)
        .then((dadosProcesso) => {
            if (dadosProcesso.ok) {
                dadosProcesso.json().then((dadosProcesso) => {
                    // Verifique se todos os campos estão vazios
                    if (
                      dadosProcesso[0].nomePrograma === "" &&
                      dadosProcesso[0].nomeProcesso === "" 
                    ) {
                        Swal.fire("Atenção", "Todos os campos estão vazios. Não é possível editar.", "warning");
                        return;
                    }

                    Swal.fire({
                        title: 'Editar Programa',
                        titleClass: 'custom-title',
                        html:
                            '<input type="nomePrograma" id="nomeProgramaInput" placeholder="nomePrograma" value="' + dadosProcesso[0].nomePrograma + '" class="swal2-input" style="border-radius: 15px;">' +
                            '<input type="nomeProcesso" id="nomeProcessoInput" placeholder="nomeProcesso" value="' + dadosProcesso[0].nomeProcesso + '" class="swal2-input" style="border-radius: 15px;">' ,
                        showCancelButton: true,
                        cancelButtonText: 'Cancelar',
                        confirmButtonText: 'Salvar Programa',
                        showLoaderOnConfirm: true,
                        customClass: {
                            container: 'custom-modal',
                        },
                        onOpen: () => {
                            const customModal = Swal.getPopup();
                            customModal.style.backgroundColor = 'white';
                            customModal.style.width = '800px';
                            customModal.style.height = '600px';
                            customModal.style.borderRadius = '15px';
                        },
                        onBeforeOpen: () => {
                            const confirmButton = Swal.getConfirmButton();
                            const cancelButton = Swal.getCancelButton();
                            if (confirmButton && cancelButton) {
                                confirmButton.style.backgroundColor = '#6D499D';
                                confirmButton.style.borderRadius = '15px';
                                confirmButton.style.marginRight = '15px';

                                cancelButton.style.backgroundColor = '#6D499D';
                                cancelButton.style.borderRadius = '15px';
                            }

                            confirmButton.addEventListener('click', () => {
                                const nomeProgramaInput = document.getElementById('nomeProgramaInput');
                                const nomeProcessoInput = document.getElementById('nomeProcessoInput');
                                
                                // Função para definir o estilo dos inputs
                                function setFieldStyle(input, isValid) {
                                    if (isValid) {
                                        input.style.borderColor = '#4CAF50'; 
                                    } else {
                                        input.style.borderColor = '#FF5555'; 
                                    }
                                }

                                // Validação do campo programa
                if (nomePrograma.length < 3) {
                    setFieldStyle(nomeProgramaInput, false);
                    Swal.showValidationMessage('O nome do programa deve ter pelo menos 3 caracteres.');
                    return false; 
                } else {
                    setFieldStyle(nomePogramaInput, true);
                }

                // Validação do campo processo
                if (nomeProcesso.length < 2) {
                    setFieldStyle(nomeProcessoInput, false);
                    Swal.showValidationMessage('O nome do processo deve ter pelo menos 2 caracteres.');
                    return false;
                } else {
                    setFieldStyle(nomeProcessoInput, true);
                }

                                fetch("/processo/editarProcesso", {
                                    method: "put",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        nomePrograma: nomePrograma,
                                        nomeProcesso: nomeProcesso,
                                        idProcesso : idProcesso,
                                        instituicao: sessionStorage.instituicao
                                    })
                                })
                                .then(response => {
                                    if (response.ok) {
                                        return response.json();
                                    }
                                })
                                .then(result => {
                                    if (result) {
                                        Swal.fire('Sucesso!', 'Programa atualizado com sucesso!', 'success');
                                        location.reload();
                                    } else {
                                        Swal.fire("error", "Falha ao editar Programa", "error");
                                    }
                                });
                            });
                        },
                    });
                });
            } else {
                Swal.fire("error", "Falha ao editar Programa", "error");
            }
        });
}