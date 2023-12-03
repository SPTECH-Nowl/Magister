function getFiltrosSelecionados() {
    const nodeList = document.querySelectorAll("sl-select");
    const selects = [...nodeList, nodeList];

    console.log(nodeList);

    return {
        dt_hr: selects[0].value,
        situacao: selects[1].value,
        elementos: selects[2]
    }
}

function getCheckbox() {
    const nodeList = document.querySelectorAll("sl-checkbox");
    const checkboxes = [...nodeList];
    let checkBool = [];

    checkboxes.forEach((check) => checkBool.push(check.checked))

    console.log(nodeList, checkBool);

    return checkboxes;
}

function carregarFeed() {
    var selects = getFiltrosSelecionados();
    var codInstituicao = localStorage.getItem("instituicao");
    var dataHora = selects.dt_hr == '' ? 'mais_recente' : selects.dt_hr == 'mais_antigo' ? 'mais_antigo' : 'mais_recente';
    var ativo = selects.situacao.includes('ativo');
    var valido = selects.situacao.includes('valido');
    var invalido = selects.situacao.includes('invalido');
    var inativo = selects.situacao.includes('inativo');
    var textoBusca = document.getElementById('input_busca').value == '' ? 'false' : document.getElementById('input_busca').value;

    console.log(textoBusca);
    console.log(selects.dt_hr);

    console.log(`/strikes/listar/${codInstituicao}/${dataHora}/${ativo}/${valido}/${invalido}/${inativo}/${textoBusca}`);

    fetch(`/strikes/listar/${codInstituicao}/${dataHora}/${ativo}/${valido}/${invalido}/${inativo}/${textoBusca}`)
        .then(function (listaStrikes) {
            console.log(listaStrikes);
            if (listaStrikes.ok) {
                if (listaStrikes.status == 204) {
                    var tableStrikes = document.getElementById("listaDeStrikes");
                    tableStrikes.innerHTML = "<tr><td colspan='7'>Nenhum resultado encontrado.</td></tr>";
                } else {
                    listaStrikes.json().then(function (listaStrikes) {

                        var tableStrikes = document.getElementById("listaDeStrikes");
                        tableStrikes.innerHTML = ""; // Limpar a tabela antes de preencher com os novos dados

                        console.log(listaStrikes)

                        for (var i = 0; i < listaStrikes.length; i++) {
                            var strike = listaStrikes[i];
                            console.log('no for, idStrike = ' + strike.idStrike)
                            console.log(strike);

                            var linhaTable = document.createElement("tr");
                            linhaTable.setAttribute('id', `strike_${strike.idStrike}`)

                            var celulaCheckbox = document.createElement("td");
                            var celulaMaquina = document.createElement("td");
                            var celulaDataHora = document.createElement("td");
                            var celulaMotivo = document.createElement("td");
                            var celulaDuracao = document.createElement("td");
                            var celulaSituacao = document.createElement("td");
                            var celulaBotoes = document.createElement("td");

                            var dtH = new Date(strike.dataHora);

                            var endDtH = dtH;
                            endDtH.setMinutes(endDtH.getMinutes() + strike.duracao)

                            console.log(strike.motivo);

                            celulaCheckbox.innerHTML = `<sl-checkbox size="large" id="${strike.idStrike}"> </sl-checkbox>`;
                            celulaMaquina.textContent = strike.nome;
                            celulaDataHora.textContent = dtH.toLocaleString('pt-BR');
                            celulaMotivo.textContent = strike.motivo == null ? 'Sem motivo' : strike.motivo;
                            celulaDuracao.textContent = `${strike.duracao}min (${endDtH.toLocaleTimeString('pt-BR')})`;
                            celulaSituacao.textContent = strike.situacao;

                            strike.situacao == 'Ativo'
                                ? celulaSituacao.style.color = 'var(--color-blue-500)'
                                : strike.situacao == 'Válido'
                                    ? celulaSituacao.style.color = 'var(--color-green-500)'
                                    : strike.situacao == 'Inválido'
                                        ? celulaSituacao.style.color = 'var(--color-coral)'
                                        : celulaSituacao.style.color = 'var(--color-gray-600)'

                            if (strike.situacao == 'Inativo') {
                                celulaBotoes.innerHTML = `
                                    <img src="../assets/img/Icone/editIcon.svg" class="tooltip" title="Editar Strikes" id="btn_update" onclick="editarStrike(${strike.idStrike})">
                                `;

                            } else {
                                celulaBotoes.innerHTML = `
                                    <img src="../assets/img/Icone/deleteIcon.svg" class="tooltip" title="Excluir Strikes" id="btn_delete" onclick="deletar(${strike.idStrike})">
                                    <img src="../assets/img/Icone/editIcon.svg" class="tooltip" title="Editar Strikes" id="btn_update" onclick="editarStrike(${strike.idStrike})">
                                `;
                            }

                            document.addEventListener("DOMContentLoaded", function () {
                                carregarFeed();
                                tippy(".tooltip", {
                                    placement: "top",
                                });
                            });

                            linhaTable.appendChild(celulaCheckbox);
                            linhaTable.appendChild(celulaMaquina);
                            linhaTable.appendChild(celulaDataHora);
                            linhaTable.appendChild(celulaMotivo);
                            linhaTable.appendChild(celulaDuracao);
                            linhaTable.appendChild(celulaSituacao);
                            linhaTable.appendChild(celulaBotoes);

                            tableStrikes.appendChild(linhaTable);
                        }
                    })
                }
            } else {
                throw ('Houve um erro na API!');
            }
        })
        .catch(function (resposta) {
            console.error(resposta);
        });
}

function deletar(idDaLinha) {
    var checkboxes = getCheckbox();
    var checkboxMarcadas = checkboxes.filter((check) => check.checked);
    var checkboxIds = checkboxMarcadas.map((check) => check.id).toString();
    var rota;

    if (checkboxIds == '') {
        checkboxIds = idDaLinha;
    }

    // Exibir o pop-up Sweet Alert
    Swal.fire({
        title: 'Tem certeza?',
        text: 'Você não será capaz de desfazer esta ação!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
        if (result.isConfirmed) {
            // Se o usuário confirmar, enviar a solicitação de exclusão
            fetch(`/strikes/excluirStrike`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    checkboxIdsServer: checkboxIds,
                    usarIdMaquina: false
                })
            })
                .then(function (resultado) {
                    console.log(resultado);
                    if (resultado.ok) {
                        if (resultado.status == 204) {
                           
                            Swal.fire('Erro!', 'Algo deu errado.', 'error');
                        } else {
                           
                            Swal.fire('Sucesso!', 'Atualizado e excluído com sucesso.', 'success');
                            carregarFeed();
                            contadoresStrike();
                        }
                    } else {
                        throw ('Houve um erro na API!');
                    }
                })
                .catch(function (resposta) {
                  
                    Swal.fire('Erro!', 'Houve um erro na API!', 'error');
                    console.error(resposta);
                });
        }
    });
}


function editarStrike(idDaLinha) {
    let strikeEditado = false;

    Swal.fire({
        title: 'Editar Strike',
        html:
            '<input type="text" id="motivoInput" placeholder="Motivo" class="swal2-input" style="border-radius: 15px;">' +
            '<input type="number" min="1" id="duracaoInput" placeholder="Duração (em minutos)" class="swal2-input" style="border-radius: 15px; width: 100%; max-width: none;">' +
            '<select id="situacaoInput" class="swal2-input" style="border-radius: 15px;">' +
            '<option value="1">Ativo</option>' +
            '<option value="2">Inativo</option>' +
            '<option value="3">Válido</option>' +
            '<option value="4">Inválido</option>' +
            '</select>',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#F05D5E',
        confirmButtonText: 'Editar Strike',
        confirmButtonColor: '#4CAF50',
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
            const motivoInput = document.getElementById('motivoInput');
            const duracaoInput = document.getElementById('duracaoInput');
            const situacaoInput = document.getElementById('situacaoInput');

            const motivo = motivoInput.value;
            const duracao = duracaoInput.value;
            const situacao = situacaoInput.value;

            // Função para definir o estilo dos inputs
            function setFieldStyle(input, isValid) {
                if (isValid) {
                    input.style.borderColor = '#4CAF50'; // Borda verde para campos válidos
                } else {
                    input.style.borderColor = '#FF5555'; // Borda vermelha para campos inválidos
                }
            }

            // Validação do campo Motivo
            if (motivo.length < 10) {
                setFieldStyle(motivoInput, false);
                Swal.showValidationMessage('O nome deve ter pelo menos 10 caracteres.');
                return false;
            } else {
                setFieldStyle(motivoInput, true);
            }

            // // Validação do campo duracao
            if (duracao <= 0) {
                setFieldStyle(duracaoInput, false);
                Swal.showValidationMessage('A duração deve ser um número positivo.');
                return false;
            } else {
                setFieldStyle(duracaoInput, true);
            }

            // Validação do campo Situacao
            if (situacao !== '1' && situacao !== '2' && situacao !== '3' && situacao !== '4') {
                setFieldStyle(situacaoInput, false);
                Swal.showValidationMessage('A situação só pode ser 1, 2, 3 ou 4.');
                return false;
            } else {
                setFieldStyle(situacaoInput, true);
            }

            return new Promise((resolve) => {
                console.log('indo pro fetch do editarStrike');

                var checkboxes = getCheckbox();
                var checkboxMarcadas = checkboxes.filter((check) => check.checked);
                var checkboxIds = checkboxMarcadas.map((check) => check.id).toString();

                if (checkboxIds == '') {
                    checkboxIds = idDaLinha;
                }

                console.log(checkboxMarcadas);

                fetch("/strikes/editarStrike", {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        motivo: motivo,
                        duracao: duracao,
                        situacao: situacao,
                        checkboxIdsServer: checkboxIds,
                        idStrike: idDaLinha,
                    })
                })
                    .then(() => {
                        console.log('no then mudando o boolean, depois do fetch');
                        strikeEditado = true; // Define a variável como true quando o usuário é adicionado
                        resolve(); // Resolve a Promise após a adição do usuário
                    })
                    .catch((error) => {
                        console.log(error);
                        console.log("Houve um erro ao tentar editar o strike");
                    });
            });
        },
    })
        .then((result) => {
            if (result.isConfirmed && strikeEditado) {
                sessionStorage.clear();

                Swal.fire({
                    icon: 'success',
                    title: 'O strike foi editado com sucesso!',
                    showConfirmButton: false,
                    timer: 1500
                });

                setTimeout(() => {
                    location.reload();
                }, 1500);
            }
        })
        .catch(() => {

        });
}

function alterar(idDaLinha) {

    // puxar idDaLinha nos parametros

    // var checkboxes = getCheckbox();
    // var checkboxMarcadas = checkboxes.filter((check) => check.checked);
    // var checkboxIds = checkboxMarcadas.map((check) => check.id).toString();
    // var rota;

    // if (checkboxIds == '') {
    //     checkboxIds = idDaLinha;
    // }

    // console.log(checkboxMarcadas);

    // console.log(`/strikes/excluirStrike`);

    // fetch(`/strikes/excluirStrike`, {
    //     method: "PUT", 
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify({
    //         checkboxIdsServer: checkboxIds,
    //         usarIdMaquina: false
    //     })
    // })
    //     .then(function (resultado) {
    //         console.log(resultado);
    //         if (resultado.ok) {
    //             if (resultado.status == 204) {
    //                 alert('se fudeu');
    //             } else {
    //                 alert('updatou e excluiu hein');
    //                 carregarFeed()
    //                 contadoresStrike();
    //             }
    //         } else {
    //             throw ('Houve um erro na API!');
    //         }
    //     })
    //     .catch(function (resposta) {
    //         console.error(resposta);
    //     });
}

function contadoresStrike() {
    fetch(`/strikes/contadores/${localStorage.getItem("instituicao")}`)
        .then((contadores) => {
            if (contadores.ok) {
                contadores.json().then(function (contadores) {
                    var orderOptions = document.getElementById("orderOptions")
                    orderOptions.innerHTML = '';

                    var spanTotal = document.createElement("span")
                    var spanAtivos = document.createElement("span")
                    var spanValidos = document.createElement("span")
                    var spanInvalidos = document.createElement("span")
                    var spanInativos = document.createElement("span")

                    spanTotal.textContent = `Total(${contadores[0].total})`
                    spanAtivos.textContent = `Ativos(${contadores[0].ativos})`
                    spanValidos.textContent = `Válidos(${contadores[0].validos})`
                    spanInvalidos.textContent = `Inválidos(${contadores[0].invalidos})`
                    spanInativos.textContent = `Inativos(${contadores[0].inativos})`

                    spanTotal.onclick = () => carregarFeed()
                    spanAtivos.onclick = () => carregarFeedSituacao('Ativo')
                    spanValidos.onclick = () => carregarFeedSituacao('Válido')
                    spanInvalidos.onclick = () => carregarFeedSituacao('Inválido')
                    spanInativos.onclick = () => carregarFeedSituacao('Inativo')

                    orderOptions.appendChild(spanTotal)
                    orderOptions.appendChild(spanAtivos)
                    orderOptions.appendChild(spanValidos)
                    orderOptions.appendChild(spanInvalidos)
                    orderOptions.appendChild(spanInativos)

                })
            }
        })
}

function carregarFeedSituacao(situacao) {
    var codInstituicao = localStorage.getItem("instituicao");
    fetch(`/strikes/listar/situacao/${codInstituicao}/${situacao}`)
        .then(function (listaStrikes) {
            console.log(listaStrikes);
            if (listaStrikes.ok) {
                if (listaStrikes.status == 204) {
                    var tableStrikes = document.getElementById("listaDeStrikes");
                    tableStrikes.innerHTML = "<tr><td colspan='7'>Nenhum resultado encontrado.</td></tr>";
                } else {
                    listaStrikes.json().then(function (listaStrikes) {

                        var tableStrikes = document.getElementById("listaDeStrikes");
                        tableStrikes.innerHTML = ""; // Limpar a tabela antes de preencher com os novos dados

                        console.log(listaStrikes)

                        for (var i = 0; i < listaStrikes.length; i++) {
                            var strike = listaStrikes[i];
                            console.log('no for')
                            console.log(strike);

                            var linhaTable = document.createElement("tr");
                            linhaTable.setAttribute('id', `strike_${strike.idStrike}`)

                            var celulaCheckbox = document.createElement("td");
                            var celulaMaquina = document.createElement("td");
                            var celulaDataHora = document.createElement("td");
                            var celulaMotivo = document.createElement("td");
                            var celulaDuracao = document.createElement("td");
                            var celulaSituacao = document.createElement("td");
                            var celulaBotoes = document.createElement("td");

                            var dtH = new Date(strike.dataHora);

                            var endDtH = dtH;
                            endDtH.setMinutes(endDtH.getMinutes() + strike.duracao)

                            console.log(strike.motivo);

                            celulaCheckbox.innerHTML = `<sl-checkbox size="large" id="${strike.idStrike}"> </sl-checkbox>`;
                            celulaMaquina.textContent = strike.nome;
                            celulaDataHora.textContent = dtH.toLocaleString('pt-BR');
                            celulaMotivo.textContent = strike.motivo == null ? 'Sem motivo' : strike.motivo;
                            celulaDuracao.textContent = `${strike.duracao}min (${endDtH.toLocaleTimeString('pt-BR')})`;
                            celulaSituacao.textContent = strike.situacao;

                            strike.situacao == 'Ativo'
                                ? celulaSituacao.style.color = 'var(--color-blue-500)'
                                : strike.situacao == 'Válido'
                                    ? celulaSituacao.style.color = 'var(--color-green-500)'
                                    : strike.situacao == 'Inválido'
                                        ? celulaSituacao.style.color = 'var(--color-coral)'
                                        : celulaSituacao.style.color = 'var(--color-gray-600)'

                            if (strike.situacao == 'Inativo') {
                                celulaBotoes.innerHTML = `
                                    <img src="../assets/img/Icone/editIcon.svg" class="tooltip" title="Editar Strikes" id="btn_update" onclick="editarStrike(${strike.idStrike})">
                                `;

                            } else {
                                celulaBotoes.innerHTML = `
                                    <img src="../assets/img/Icone/deleteIcon.svg" class="tooltip" title="Excluir Strikes" id="btn_delete" onclick="deletar(${strike.idStrike})">
                                    <img src="../assets/img/Icone/editIcon.svg" class="tooltip" title="Editar Strikes" id="btn_update" onclick="editarStrike(${strike.idStrike})">
                                `;
                            }


                            document.addEventListener("DOMContentLoaded", function () {
                                carregarFeed(); // Chame a função para carregar a tabela de usuários
                                tippy(".tooltip", {
                                    placement: "top",
                                });
                            });

                            linhaTable.appendChild(celulaCheckbox);
                            linhaTable.appendChild(celulaMaquina);
                            linhaTable.appendChild(celulaDataHora);
                            linhaTable.appendChild(celulaMotivo);
                            linhaTable.appendChild(celulaDuracao);
                            linhaTable.appendChild(celulaSituacao);
                            linhaTable.appendChild(celulaBotoes);

                            tableStrikes.appendChild(linhaTable);
                        }
                    })
                }
            } else {
                throw ('Houve um erro na API!');
            }
        })
        .catch(function (resposta) {
            console.error(resposta);
        });
}




document.getElementById('input_busca').addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        e.preventDefault;
        carregarFeed();
    }
})

getFiltrosSelecionados().elementos.forEach((elemento) => {
    elemento.addEventListener('sl-change', event => {
        let strikes = document.getElementById('listaDeStrikes');
        strikes.innerHTML = '';
        carregarFeed();
    });
})

document.addEventListener('DOMContentLoaded', () => {
    console.log('carreguei');
    carregarFeed()
    contadoresStrike()
});