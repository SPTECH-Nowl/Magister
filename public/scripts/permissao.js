
var idUsuario = localStorage.getItem("idUsuario");

document.addEventListener('DOMContentLoaded', function () {
    carregarFeed(idUsuario);

    const adicionarPermissaoButton = document.getElementById('adicionarPermissao');
    adicionarPermissaoButton.addEventListener('click', adicionarPermissao);
});


function buscarAcoes() {
    return new Promise((resolve, reject) => {
        fetch(`/atuacoes/buscarAcoes/`)
            .then((response) => {
                if (response.ok) {
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


function carregarFeed(idUsuario) {

    fetch(`/permissoes/listarPorUsuario/${idUsuario}`)
        .then(function (listaPermissoes) {
            if (listaPermissoes.ok) {
                if (listaPermissoes.status == 204) {
                    var tablePermissoes = document.getElementById("listaDePermissao");
                    tablePermissoes.innerHTML = "<tr><td colspan='4'>Nenhum resultado encontrado.</td></tr>";
                } else {
                    listaPermissoes.json().then(function (listaPermissoes) {

                        var tablePermissoes = document.getElementById("listaDePermissao");
                        tablePermissoes.innerHTML = "";
                        console.log(listaPermissoes)

                        for (var i = 0; i < listaPermissoes.length; i++) {



                            var permissao = listaPermissoes[i];

                            let duracaoBrutaEmMinutos = permissao.duracaoStrikePadrao;

                            let horas = Math.floor(duracaoBrutaEmMinutos / 60);
                            let minutos = duracaoBrutaEmMinutos % 60;

                            horas = horas < 10 ? "0" + horas : horas;
                            minutos = minutos < 10 ? "0" + minutos : minutos;

                            let duracaoFormatada = `${horas}:${minutos}`;

                            var linhaTable = document.createElement("tr");
                            linhaTable.setAttribute('id', `permissao_${permissao.idPermissao}`)

                            var celulaNome = document.createElement("td");
                            var celulaDuracaoStrike = document.createElement("td");
                            var celulaAtuacao = document.createElement("td");
                            var celulaBotoes = document.createElement("td");

                            celulaNome.textContent = permissao.nome;
                            celulaDuracaoStrike.textContent = duracaoFormatada;
                            celulaAtuacao.textContent = permissao.Atuacao;

                            // Adicione os botões com base no ID do usuário
                            celulaBotoes.innerHTML = `
                            <img src="../assets/img/Icone/deleteIcon.svg" class="tooltip" title="Excluir Permissao" id="btn_delete${permissao.idPermissao}" onclick="deletar(${permissao.idPermissao}, ${localStorage.getItem("nivPerm")})">
                            <img src="../assets/img/Icone/editIcon.svg" class="tooltip" title="Editar Permissao" id="btn_update${permissao.idPermissao}" onclick="alterar(${permissao.idPermissao})">
                         `;


                            document.addEventListener("DOMContentLoaded", function () {
                                carregarFeed(); // Chame a função para carregar a tabela de usuários
                                tippy(".tooltip", {
                                    placement: "top",
                                });
                            });


                            linhaTable.appendChild(celulaNome);
                            linhaTable.appendChild(celulaAtuacao);
                            linhaTable.appendChild(celulaDuracaoStrike);
                            linhaTable.appendChild(celulaBotoes);

                            tablePermissoes.appendChild(linhaTable);
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

function isValidTimeFormat(timeString) {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(timeString);
}

document.addEventListener('DOMContentLoaded', function () {
    const adicionarPermissaoButton = document.getElementById('adicionarPermissao');

    adicionarPermissaoButton.addEventListener('click', function () {
        Swal.fire({
            title: 'Adicionar permissão',
            html:
                `<input type="text" id="nomeListaInput" placeholder="Nome da permissão" class="swal2-input" style="border-radius: 15px;">
            
                <select type="text" id="atuacaoInput" placeholder="Atuação" class="swal2-input custom-select" style="border-radius: 15px; max-height: 150px; overflow-y: auto;">
                    <option value="0" selected disabled>Escolha uma ação</option>
                </select>
            
                <input type="text" id="duracaoStrikePadraoInput" value="00:00" placeholder="00:00" class="swal2-input" style="border-radius: 15px;">`,
            confirmButtonText: 'Adicionar permissão',
            showLoaderOnConfirm: true,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonClass: 'custom-cancel-button',
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#d33',
            customClass: {
                container: 'custom-modal',
                popup: 'custom-popup',
                closeButton: 'custom-close-button',
                confirmButton: 'custom-confirm-button',
                cancelButton: 'custom-cancel-button',
            },
            onOpen: () => {
                const customModal = Swal.getPopup();
                customModal.style.backgroundColor = 'white';
                customModal.style.width = '500px';
                customModal.style.borderRadius = '15px';

                // Adicione o evento de clique ao botão de geração de código apenas se algum campo estiver preenchido
                const gerarCodigoBtn = document.getElementById('gerarCodigoBtn');
                if (gerarCodigoBtn) {
                    gerarCodigoBtn.addEventListener('click', gerarCodigoHexadecimal);
                }

                const atuacaoInput = document.getElementById('atuacaoInput');
                if (atuacaoInput) {
                    buscarAcoes().then(dados => {
                        // Remova as opções existentes
                        atuacaoInput.innerHTML = '<option value="0" selected disabled>Escolha uma ação</option>';

                        dados.forEach(acao => {
                            // Adicione cada opção
                            atuacaoInput.innerHTML += `<option value="${acao.idAtuacao}">${acao.nome}</option>`;
                        });
                    });
                }
            },
            preConfirm: async () => {
                // Validação dos campos
                const nomePermissaoInput = document.getElementById('nomeListaInput');
                const idAtuacaoInput = document.getElementById('atuacaoInput');
                const tempoPadraoInput = document.getElementById('duracaoStrikePadraoInput');

                const nomePermissao = nomePermissaoInput.value.trim();
                const atuacao = idAtuacaoInput.value;
                const tempoPadraoStrike = tempoPadraoInput.value.trim();

                // Verificar se pelo menos um campo está preenchido
                if (nomePermissao === '' || atuacao === '0' || tempoPadraoStrike === '') {
                    setFieldStyle(nomePermissaoInput, false); // Adiciona a borda vermelha
                    setFieldStyle(idAtuacaoInput, false); // Adiciona a borda vermelha
                    setFieldStyle(tempoPadraoInput, false); // Adiciona a borda vermelha
                    Swal.showValidationMessage('Preencha todos os campos.');
                    return false;
                }

                function setFieldStyle(input, isValid) {
                    if (isValid) {
                        input.style.borderColor = '#4CAF50'; // Borda verde para campos válidos
                    } else {
                        input.style.borderColor = '#FF5555'; // Borda vermelha para campos inválidos
                    }
                }

                // Verificação do formato do tempo
                if (tempoPadraoStrike !== '' && !isValidTimeFormat(tempoPadraoStrike)) {
                    setFieldStyle(tempoPadraoInput, false); // Adiciona a borda vermelha
                    Swal.showValidationMessage('Formato de tempo inválido. Use o formato HH:mm.');
                    return false;
                }

                const partesTempo = tempoPadraoStrike.split(':');
                const horas = parseInt(partesTempo[0], 10);
                const minutos = parseInt(partesTempo[1], 10);

                // Validar formato de hora mais detalhadamente
                if (horas < 0 || horas > 23 || minutos < 0 || minutos > 59) {
                    setFieldStyle(tempoPadraoInput, false); // Adiciona a borda vermelha
                    Swal.showValidationMessage('Formato de tempo inválido. As horas devem ser entre 00 e 23, e os minutos entre 00 e 59.');
                    return false;
                }

                // Validar que o campo de minutos não seja "00:00"
                if (horas === 0 && minutos === 0) {
                    setFieldStyle(tempoPadraoInput, false); // Adiciona a borda vermelha
                    Swal.showValidationMessage('Os minutos devem ser maiores que 00:00.');
                    return false;
                }

                setFieldStyle(tempoPadraoInput, true); // Remove a borda vermelha

                // Validar que o campo do nome da permissão seja preenchido
                if (nomePermissao === '') {
                    setFieldStyle(nomePermissaoInput, false); // Adiciona a borda vermelha
                    Swal.showValidationMessage('Preencha o nome da permissão.');
                    return false;
                }

                setFieldStyle(nomePermissaoInput, true); // Remove a borda vermelha

                // Validar que uma ação foi selecionada
                if (atuacao === '0') {
                    setFieldStyle(idAtuacaoInput, false); // Adiciona a borda vermelha
                    Swal.showValidationMessage('Selecione uma ação.');
                    return false;
                }

                setFieldStyle(idAtuacaoInput, true); // Remove a borda vermelha

                const usuario = idUsuario;

                return new Promise((resolve) => {
                    fetch("/permissoes/cadastrarPermissao", {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({
                            nome: nomePermissao,
                            fkAtuacao: atuacao,
                            duracaoStrikePadrao: horas * 60 + minutos,
                            fkUsuario: usuario
                        })
                    }).then((response) => {
                        if (response.ok) {
                            resolve();
                        } else {
                            Swal.showValidationMessage(`Erro na solicitação: ${response.statusText}`);
                        }
                    }).catch(error => {
                        console.error("Erro na solicitação:", error);
                        Swal.showValidationMessage('Erro na solicitação. Por favor, tente novamente.');
                    });
                });
            },
        })
            .then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        icon: 'success',
                        title: 'A Permissão foi cadastrada com sucesso!',
                        showConfirmButton: false,
                        timer: 2500
                    });

                    setTimeout(() => {
                        location.reload();
                    }, 2500);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro!',
                        text: 'Erro ao cadastrar permissão. Por favor, tente novamente.',
                        showConfirmButton: true
                    });
                }
            }).catch(error => {
                console.error("Erro na solicitação:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: 'Erro na solicitação. Por favor, tente novamente.',
                    showConfirmButton: true
                });
            });
    });
});



function deletar(idPermissao, tipoPermissao) {
    if (tipoPermissao === "0") {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Você não possui permissão para deletar',
            customClass: {
                confirmButton: 'swal2-button-custom'
            }
        });
        return false;
    } else {
        Swal.fire({
            title: 'Você tem certeza que deseja deletar?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Deletar',
            denyButtonText: 'Cancelar',
            confirmButtonColor: '#d33',
            denyButtonColor: '#3085d6',
            icon: 'warning',
            customClass: {
                confirmButton: 'swal2-button-custom',
                popup: 'swal2-popup-custom'
            },
            width: '500px',  // Aumentei a largura 
            heightAuto: false,
            customHeight: '700px' // Aumento a altura
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`/permissoes/deletar/${idPermissao}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        idPermissaoPE: idPermissao
                    })
                }).then(function (resposta) {
                    if (resposta.ok) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Permissao deletada com sucesso!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        //  recarrega a página 
                        setTimeout(() => {
                            location.reload();
                        }, 1500);
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Falha ao deletar a permissão',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                }).catch(function (resposta) {
                    console.log(resposta);
                });
            }
        });
    }
}

function alterar(idPermissao) {
    fetch(`/permissoes/buscarPermicao/${idPermissao}`)
        .then((dadosPermissao) => {
            if (dadosPermissao.ok) {
                dadosPermissao.json().then((dadosPermissao) => {

                    let duracaoBrutaEmMinutos = dadosPermissao[0].duracaoStrikePadrao;

                    let horas = Math.floor(duracaoBrutaEmMinutos / 60);
                    let minutos = duracaoBrutaEmMinutos % 60;

                    horas = horas < 10 ? "0" + horas : horas;
                    minutos = minutos < 10 ? "0" + minutos : minutos;

                    let duracaoFormatada = `${horas}:${minutos}`;


                    // Verifique se todos os campos estão vazios
                    if (
                        dadosPermissao[0].permissao_nome === "" &&
                        dadosPermissao[0].atuacao_nome === "" &&
                        dadosPermissao[0].duracaoStrikePadrao === ""
                    ) {
                        Swal.fire("Atenção", "Todos os campos estão vazios. Não é possível editar.", "warning");
                        return;
                    }


                    Swal.fire({
                        title: 'Editar Permissão',
                        html:
                            `<input type="text" id="nomeListaInput" placeholder="Nome da lista" value="${dadosPermissao[0].permissao_nome}" class="swal2-input" style="border-radius: 15px;">
                            <select type="text" id="atuacaoInput" placeholder="Atuação" value="" class="swal2-input" style="border-radius: 15px;">
                                  <option value="0" disabled> Escolha uma ação</option>
                            </select>
                            
                            <input type="text" id="duracaoStrikePadraoInput" placeholder="00:00" value="${duracaoFormatada}" class="swal2-input" style="border-radius: 15px;">`,
                        showCancelButton: true,
                        cancelButtonText: 'Cancelar',
                        confirmButtonText: 'Salvar alterações',
                        cancelButtonColor: '#d33', // Cor do botão "Cancelar" 
                        confirmButtonColor: '#28a745', // Cor do botão "Salvar Usuário" 
                        showCloseButton: true, // botão de fechar
                        customClass: {
                            container: 'custom-modal',
                            popup: 'custom-popup',
                            closeButton: 'custom-close-button',
                            confirmButton: 'custom-confirm-button',
                            cancelButton: 'custom-cancel-button',
                        },
                        onOpen: () => {
                            const customModal = Swal.getPopup();
                            customModal.style.backgroundColor = 'white';
                            customModal.style.width = '500px';
                            customModal.style.borderRadius = '15px';
                        },
                        onBeforeOpen: () => {
                            const confirmButton = Swal.getConfirmButton();
                            const cancelButton = Swal.getCancelButton();
                            if (confirmButton && cancelButton) {
                                confirmButton.style.borderRadius = '15px';

                                cancelButton.style.borderRadius = '15px';
                            }

                            buscarAcoes().then(dados => {
                                dados.forEach(acao => {
                                    document.getElementById("atuacaoInput").innerHTML += `<option value="${acao.idAtuacao}"> ${acao.nome}</option>`
                                });
                            })
                        },

                        preConfirm: () =>{
                                const nomeInput = document.getElementById('nomeListaInput').value;
                                var atuacaoInput = document.getElementById('atuacaoInput').value;
                                var tempoPadrao = document.getElementById('duracaoStrikePadraoInput').value;

                                var partesTempo = tempoPadrao.split(':');
                                var horas = parseInt(partesTempo[0], 10);
                                var minutos = parseInt(partesTempo[1], 10);

                                var tempoTotalEmMinutos = horas * 60 + minutos;

                                function setFieldStyle(input, isValid) {
                                    if (isValid) {
                                        input.style.borderColor = '#4CAF50'; 
                                    } else {
                                        input.style.borderColor = '#FF5555'; 
                                    }
                                }

                                // Validação dos campos
                                if (nomeInput.length < 3) {
                                    setFieldStyle(document.getElementById('nomeListaInput'), false);
                                    Swal.showValidationMessage('O nome deve ter pelo menos 3 caracteres.');
                                    return false;
                                } else {
                                    setFieldStyle(document.getElementById('nomeListaInput'), true);
                                }

                                if (atuacaoInput == 0) {
                                    setFieldStyle(document.getElementById('atuacaoInput'), false);
                                    Swal.showValidationMessage('A atuação deve ter pelo menos 3 caracteres.');
                                    return false;
                                } else {
                                    setFieldStyle(document.getElementById('atuacaoInput'), true);
                                }

                                if (tempoTotalEmMinutos <= 0) {
                                    setFieldStyle(document.getElementById('duracaoStrikePadraoInput'), false);
                                    Swal.showValidationMessage('A duração do Strike deve ser de, no mínimo, cinco minutos.')
                                    return false;
                                } else {
                                    setFieldStyle(document.getElementById('duracaoStrikePadraoInput'), true);
                                }

                                fetch(`/permissoes/editar`, {
                                    method: "put",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        nome: nomeInput,
                                        atuacao: atuacaoInput,
                                        duracaoStrikePadrao: tempoTotalEmMinutos,
                                        idPermissao: idPermissao
                                    })
                                })
                                    .then(response => {
                                        if (response) {
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Sucesso!',
                                                text: 'Lista atualizada com sucesso!',
                                                showConfirmButton: false,
                                                timer: 1500 // Fecha o pop-up após 1,5 segundos
                                            });

                                            setTimeout(() => {
                                                window.location.reload();
                                            }, 1500);

                                        } else {
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'Falha!',
                                                text: 'Falha ao editar Lista',
                                            });
                                        }
                                    })
                        }
                    });
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Falha!',
                    text: 'Falha ao editar lista',
                });
            }
        });
}

function buscarPermissao() {
    var nomeDigitado = input_busca.value
    var instituicao = localStorage.getItem("instituicao")

    if (nomeDigitado.length < 3) {
        carregarFeed()
    } else {
        fetch(`/permissoes/pesquisarUsuario/${nomeDigitado}/${instituicao}`)
            .then((permissaoBuscada => {
                if (permissaoBuscada.status == 204) {
                    var tablePermissoes = document.getElementById("listaDePermissoes");
                    tablePermissoes.innerHTML = "<tr><td colspan='4'>Nenhum resultado encontrado.</td></tr>";
                } else {
                    permissaoBuscada.json().then(function (permissaoBuscada) {
                        var tablePermissoes = document.getElementById("listaDePermissoes");
                        tablePermissoes.innerHTML = ""; // Limpar a tabela antes de preencher com os novos dados

                        console.log(permissaoBuscada)

                        for (var i = 0; i < permissaoBuscada.length; i++) {
                            var permissao = permissaoBuscada[i];

                            var linhaTable = document.createElement("tr");
                            var celulaNome = document.createElement("td");
                            var celulaDuracaoStrike = document.createElement("td");
                            var celulaAtuacao = document.createElement("td");
                            var celulaBotoes = document.createElement("td");

                            celulaNome.textContent = permissao.nome;
                            celulaDuracaoStrike.textContent = permissao.duracaoStrikePadrao;
                            celulaAtuacao.textContent = permissao.Atuacao;

                            // Adicione os botões com base no ID do usuário
                            celulaBotoes.innerHTML = `
                                 <img src="../assets/img/Icone/deleteIcon.svg" class="tooltip" title="Excluir Permissao">
                                 <img src="../assets/img/Icone/editIcon.svg" class="tooltip" title="Editar Permissao">
                             `;


                            linhaTable.appendChild(celulaNome);
                            linhaTable.appendChild(celulaAtuacao);
                            linhaTable.appendChild(celulaDuracaoStrike);
                            linhaTable.appendChild(celulaBotoes);

                            tablePermissoes.appendChild(linhaTable);
                        }
                    });
                }

            }))
    }
}