
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

function adicionarPermissao() {
    let permissaoAdicionada = false;

    buscarAcoes().then(dados => {
        dados.forEach(acao => {
            document.getElementById("atuacaoInput").innerHTML += `<option value="${acao.idAtuacao}"> ${acao.nome}</option>`
        });
    })

    Swal.fire({
        title: 'Adicionar permissão',
        html:
            `<input type="text" id="nomeListaInput" placeholder="Nome da lista" class="swal2-input" style="border-radius: 15px;">
        <select type="text" id="atuacaoInput" placeholder="Atuação" value="" class="swal2-input" style="border-radius: 15px;">
              <option value="0" disabled> Escolha uma ação</option>
        </select>
        
        <input type="time" id="duracaoStrikePadraoInput" placeholder="Tempo de duração" class="swal2-input" style="border-radius: 15px;">`,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#d33', // Cor do botão "Cancelar"
        confirmButtonText: 'Adicionar permissão',
        confirmButtonColor: '#28a745', // Cor do botão "Adicionar Usuário"
        showLoaderOnConfirm: true,
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
            customModal.style.width = '550px';
            customModal.style.borderRadius = '15px';
        },
        preConfirm: () => {
            // Validação dos campos
            const nomeListaInput = document.getElementById('nomeListaInput');
            const atuacaoInput = document.getElementById('atuacaoInput')
            const duracaoInput = document.getElementById('duracaoStrikePadraoInput');

            const nome = nomeListaInput.value;
            const atuacao = atuacaoInput.value;
            const duracao = duracaoInput.value;

            const duracaoMinutos = convertParaMinutos(duracao)

            function convertParaMinutos(horaMinuto) {
                const [horas, minutos] = horaMinuto.split(":");
                return parseInt(horas) * 60 + parseInt(minutos);
            }

            // Função para definir o estilo dos inputs
            function setFieldStyle(input, isValid) {
                if (isValid) {
                    input.style.borderColor = '#4CAF50'; // Borda verde para campos válidos
                } else {
                    input.style.borderColor = '#FF5555'; // Borda vermelha para campos inválidos
                }
            }

            // Validação do campo Nome
            if (nome.length < 3) {
                setFieldStyle(nomeListaInput, false);
                Swal.showValidationMessage('O nome deve ter pelo menos 3 caracteres.');
                return false;
            } else {
                setFieldStyle(nomeListaInput, true);
            }

            if (atuacao == null) {
                setFieldStyle(atuacaoInput, false);
                Swal.showValidationMessage("Selecione uma ação padrão.")
            } else {
                setFieldStyle(atuacaoInput, true);
            }

            if (duracao <= 0) {
                setFieldStyle(duracaoInput, false);
                Swal.showValidationMessage("A duração do strike deve ser de, pelo menos, um minuto")
            } else {
                setFieldStyle(duracaoInput, true);
            }

            return new Promise((resolve) => {
                fetch("/permissoes/cadastrarPermissao", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        nome: nome,
                        duracaoStrikePadrao: duracaoMinutos,
                        fkAtuacao: atuacao,
                        fkUsuario: localStorage.getItem("idUsuario")
                    })
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Erro ao adicionar permissão'); // Lança um erro para cair no catch
                        }
                        return response.json(); // Retorna a resposta JSON se estiver tudo OK
                    })
                    .then(() => {
                        permissaoAdicionada = true; // Define a variável como true quando o usuário é adicionado
                        resolve(); // Resolve a Promise após a adição do usuário
                    })
                    .catch((error) => {
                        console.log(error);
                        console.log("Houve um erro ao tentar adicionar a permissão");
                    });
            });
        },
    })
        .then((result) => {
            if (result.isConfirmed && permissaoAdicionada) {
                sessionStorage.clear();

                Swal.fire({
                    icon: 'success',
                    title: 'A permissão foi adicionada com sucesso!',
                    showConfirmButton: false,
                    timer: 1500
                });

                setTimeout(() => {
                    location.reload();
                }, 1500);
            }
        })
        .catch(() => {
            // Não faça nada se o usuário fechar o modal ou se houver um erro
        });
}

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
                            
                            <input type="time" id="duracaoStrikePadraoInput" placeholder="Tempo de duração" value="${duracaoFormatada}" class="swal2-input" style="border-radius: 15px;">`,
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

                            confirmButton.addEventListener('click', () => {
                                const nomeInput = document.getElementById('nomeListaInput').value;
                                const duracaoInput = document.getElementById('duracaoStrikePadraoInput').value;

                                var atuacaoInput = document.getElementById('atuacaoInput').value;

                                var tempoPadrao = document.getElementById('duracaoStrikePadraoInput').value;

                                var partesTempo = tempoPadrao.split(':');

                                var horas = parseInt(partesTempo[0], 10);
                                var minutos = parseInt(partesTempo[1], 10);

                                var tempoTotalEmMinutos = horas * 60 + minutos;

                                // Função para definir o estilo dos inputs
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

                                if (atuacaoInput.length == 0) {
                                    setFieldStyle(document.getElementById('atuacaoInput'), false);
                                    Swal.showValidationMessage('A atuação deve ter pelo menos 3 caracteres.');
                                    return false;
                                } else {
                                    setFieldStyle(document.getElementById('atuacaoInput'), true);
                                }

                                if (duracaoInput <= 0) {
                                    setFieldStyle(document.getElementById('duracaoIStrikePadraoInput'), false);
                                    Swal.showValidationMessage('A duração do Strike deve ser de, no mínimo, cinco minutos.')
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
                                        if (response.ok) {
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

                            });
                        },
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