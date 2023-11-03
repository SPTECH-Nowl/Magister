document.addEventListener("DOMContentLoaded", ()=>{
    carregarFeedEscola()
})

function buscarInstituicao() {
    var nomeDigitado = input_busca.value

 
       if (nomeDigitado.length < 3){
          carregarFeedEscola()
       } else {
          fetch(`/instituicoes/pesquisarInstituicao/${nomeDigitado}`)
             .then((escolaBuscado =>{
                if(escolaBuscado.status == 204){
                   var tableEscolas = document.getElementById("listaDeEscola");
                   tableEscolas.innerHTML = "<tr><td colspan='4'>Nenhum resultado encontrado.</td></tr>";
                }else {
                     escolaBuscado.json().then(function (escolaBuscado) {
                         var tableEscolas = document.getElementById("listaDeEscola");
                         tableEscolas.innerHTML = ""; // Limpar a tabela antes de preencher com os novos dados
 
                         
                         for (var i = 0; i < escolaBuscado.length; i++) {
                            var escola = escolaBuscado[i];

                            var linhaTable = document.createElement("tr");
                            linhaTable.setAttribute('id', `Escola_${escola.idInstituicao}`)

                            var celulaNomeEscola = document.createElement("td");
                            var celulaSigla = document.createElement("td");
                            var celulaCodigo = document.createElement("td");
                            var celulaBotoes = document.createElement("td");

                            celulaNomeEscola.textContent = escola.nome;
                            celulaSigla.textContent = escola.sigla;
                            celulaCodigo.textContent = escola.codigoHex;

                            // Adicione os botões com base no ID do usuário
                     celulaBotoes.innerHTML = `
    <img src="../assets/img/Icone/deleteIcon.svg" class="tooltip delete-action" title="Excluir Escola" onclick="deletarEscola(${escola.idInstituicao}, ${localStorage.getItem("nivPerm")})">
    <img src="../assets/img/Icone/editIcon.svg" class="tooltip edit-action" title="Editar Escola" onclick="alterar(${escola.idInstituicao})">
    <img src="../assets/img/Icone/moreInfoIcon.svg" class="tooltip info-action" title="Mais Informações" onclick="dadosInstituicao(${escola.idInstituicao})">
`;



                            linhaTable.appendChild(celulaNomeEscola);
                            linhaTable.appendChild(celulaSigla);
                            linhaTable.appendChild(celulaCodigo);
                            linhaTable.appendChild(celulaBotoes)

                            tableEscolas.appendChild(linhaTable);
                         }
                     });
                 }
 
    }))
       }
 
 }

document.addEventListener('DOMContentLoaded', function() {
    const adicionarEscolaButton = document.getElementById('adicionarEscola');

    adicionarEscolaButton.addEventListener('click', function() {
        Swal.fire({
            title: 'Adicionar Escola',
            titleClass: 'custom-title',
            html:
                '<input type="text" id="nomeEscolaInput" placeholder="Nome da Escola" class="swal2-input" style="border-radius: 15px;">' +
                '<input type="text" id="siglaInput" placeholder="Sigla" class="swal2-input" style="border-radius: 15px;">' +
                '<div style="display: flex; gap: 1rem; align-items: center">' +
                '<input type="text" id="codigoInput" placeholder="Código Hexadecimal" disabled class="swal2-input" style="border-radius: 15px;">' +
                '<button onclick="gerarCodigoHexadecimal()" class="btn primario" style="width: fit-content;"><img src="../assets/img/icone/dice-six.svg"></button>' +
                '</div>',
            
            confirmButtonText: 'Adicionar Escola',
            showLoaderOnConfirm: true,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonClass: 'custom-cancel-button',
            customClass: {
                container: 'custom-modal',
            },
            onOpen: () => {
                const customModal = Swal.getPopup();
                customModal.style.backgroundColor = 'white';
                customModal.style.width = '800px';
                customModal.style.borderRadius = '15px';
            },
            onBeforeOpen: () => {
                const confirmButton = Swal.getConfirmButton();
                const cancelButton = Swal.getCancelButton();
                if (confirmButton && cancelButton) {
                    confirmButton.style.backgroundColor = '#6D499D';
                    confirmButton.style.borderRadius = '15px';

                    cancelButton.style.backgroundColor = '#6D499D';
                    cancelButton.style.borderRadius = '15px';
                    cancelButton.style.marginRight = '15px';
                }
            },
            preConfirm: () => {
                // Validação dos campos
                const nomeEscolaInput = document.getElementById('nomeEscolaInput');
                const siglaInput = document.getElementById('siglaInput');
                const codigoInput = document.getElementById('codigoInput');

                const nomeEscola = nomeEscolaInput.value;
                const sigla = siglaInput.value;
                const codigo = codigoInput.value;

                // Função para definir o estilo dos inputs
                function setFieldStyle(input, isValid) {
                    if (isValid) {
                        input.style.borderColor = '#4CAF50'; // Borda verde para campos válidos
                    } else {
                        input.style.borderColor = '#FF5555'; // Borda vermelha para campos inválidos
                    }
                }

                // Validação do campo Nome
                if (nomeEscola.length < 3) {
                    setFieldStyle(nomeEscolaInput, false);
                    Swal.showValidationMessage('O nome deve ter pelo menos 3 caracteres.');
                    return false;
                } else {
                    setFieldStyle(nomeEscolaInput, true);
                }

                // Validação do campo Sigla
                if (sigla.length < 2) {
                    setFieldStyle(siglaInput, false);
                    Swal.showValidationMessage('A sigla deve ter pelo menos 2 caracteres.');
                    return false;
                } else {
                    setFieldStyle(siglaInput, true);
                }

                // Validação do campo Código Hexadecimal
                if (codigo.length > 6) {
                    setFieldStyle(codigoInput, false);
                    Swal.showValidationMessage('O código deve ser hexadecimal.');
                    return false;
                } else {
                    setFieldStyle(codigoInput, true);
                }

return new Promise((resolve) => {
    fetch("/instituicoes/cadastrarDashEscola", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            nomeEscola: nomeEscola,
            sigla: sigla,
            codigo: codigo,
        })
    }).then((response)=>{
        if(response.ok){
            location.reload();
        }
    })
});
},
})
        .then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Sucesso!', 'A escola foi cadastrada com sucesso.', 'success');
                location.reload();
            }
        });
    });
});


function carregarFeedEscola() {
    fetch(`/instituicoes/listarInstituicoes`)
        .then(function (listaDeEscolas) {
            if (listaDeEscolas.ok) {


                if (listaDeEscolas.status == 204) {
                    var tableEscola = document.getElementById("listaDeEscola");
                    tableEscola.innerHTML = "<tr><td colspan='4'>Nenhum resultado encontrado.</td></tr>";
                } else {
                    listaDeEscolas.json().then(function (listaDeEscolas) {
                        var tableEscola = document.getElementById("listaDeEscola");
                        tableEscola.innerHTML = ""; // Limpar a tabela antes de preencher com os novos dados

        
                        
                        for (var i = 0; i < listaDeEscolas.length; i++) {
                            var escola = listaDeEscolas[i];

                            var linhaTable = document.createElement("tr");
                            linhaTable.setAttribute('id', `Escola_${escola.idInstituicao}`)

                            var celulaNomeEscola = document.createElement("td");
                            var celulaSigla = document.createElement("td");
                            var celulaCodigo = document.createElement("td");
                            var celulaBotoes = document.createElement("td");

                            celulaNomeEscola.textContent = escola.nome;
                            celulaSigla.textContent = escola.sigla;
                            celulaCodigo.textContent = escola.codigoHex;

                            // Adicione os botões com base no ID do usuário
                     celulaBotoes.innerHTML = `
    <img src="../assets/img/Icone/deleteIcon.svg" class="tooltip delete-action" title="Excluir Escola" onclick="deletarEscola(${escola.idInstituicao}, ${localStorage.getItem(nivPerm)})">
    <img src="../assets/img/Icone/editIcon.svg" class="tooltip edit-action" title="Editar Escola" onclick="alterar(${escola.idInstituicao})">
    <img src="../assets/img/Icone/moreInfoIcon.svg" class="tooltip info-action" title="Mais Informações" onclick="dadosInstituicao(${escola.idInstituicao})">
`;


                        

                            linhaTable.appendChild(celulaNomeEscola);
                            linhaTable.appendChild(celulaSigla);
                            linhaTable.appendChild(celulaCodigo);
                            linhaTable.appendChild(celulaBotoes)

                            tableEscola.appendChild(linhaTable);
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

function dadosInstituicao(idEscola) {
    fetch(`/instituicoes/dadosInstituicao/${idEscola}`)
        .then(function (response) {
            if (!response.ok) {
                console.error('Erro na resposta da API:', response.status);
                return;
            }
            return response.json();
        })
        .then(function (dadosEscola) {
            if (dadosEscola && dadosEscola.length > 0) {
                const escola = dadosEscola[0];

                console.log("Dados recebidos da escola: ", JSON.stringify(escola));
                Swal.fire({
                    title: 'Dados da escola',
                    titleClass: 'custom-title',
                    width: '700px', // Reduza a largura para 700px (ajuste conforme necessário)
                    html: `<div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
                        <span><b>Escola</b>: ${escola.nome}</span>
                        <span><b>Sigla</b>: ${escola.sigla}</span>
                        <span><b>Código hexadecimal:</b> ${escola.codigoHex}</span>
                    </div>`,
                    confirmButtonColor: '#6D499D', // Cor do botão "OK"
                    confirmButtonText: 'OK',
                    customClass: {
                        container: 'custom-modal', // Classe personalizada para o modal
                        confirmButton: 'custom-confirm-button', // Classe personalizada para o botão "OK"
                    },
                });
            } else {
                console.error('Dados do usuário não encontrados na resposta da API.');
            }
        })
        .catch(function (erro) {
            console.error('Erro na requisição:', erro);
        });
}

function deletarEscola(idEscola, tipoPermissao) {
    if (tipoPermissao === "3") {
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
            customClass: {
                confirmButton: 'swal2-button-custom',
                popup: 'swal2-popup-custom'
            },
            width: '400px',
            heightAuto: false,
            customHeight: '700px' // Aumento maior na altura
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`/instituicoes/deletarEscola`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        idEscolaPE: idEscola
                    })
                }).then(function (resposta) {
                    if (resposta.ok) {
                        Swal.fire('Escola deletado com sucesso', '', 'success');
                        location.reload();
                    } else {
                        Swal.fire('Falha ao deletar o Escola', '', 'error');
                    }
                }).catch(function (resposta) {
                    console.log(resposta);
                });
            }
        });
    }
}
 

function alterar(idEscola) {
    fetch(`/instituicoes/listarInstituicaoEsp/${idEscola}`)
        .then((dadosEscola) => {
            if (dadosEscola.ok) {
                dadosEscola.json().then((dadosEscola) => {
                    
                    if (
                        dadosEscola[0].nome === "" &&
                        dadosEscola[0].sigla === "" &&
                        dadosEscola[0].codigo === "" &&
                        dadosEscola[0].responsavel === ""
                    ) {
                        Swal.fire("Atenção", "Todos os campos estão vazios. Não é possível editar.", "warning");
                        return;
                    }

                    Swal.fire({
                        title: 'Editar escola',
                        titleClass: 'custom-title',
                        html:
                            '<input type="nomeEscola" id="nomeEscolaInput" placeholder="NomeEscola" value="' + dadosEscola[0].nome + '" class="swal2-input" style="border-radius: 15px;">' +
                            '<input type="sigla" id="siglaInput" placeholder="sigla" value="' + dadosEscola[0].sigla + '" class="swal2-input" style="border-radius: 15px;">' +
                            '<input type="codigo" disabled id="codigoInput" placeholder="codigo" value="' + dadosEscola[0].codigoHex + '" class="swal2-input" style="border-radius: 15px;">',
                        showCancelButton: true,
                        cancelButtonText: 'Cancelar',
                        confirmButtonText: 'Salvar Escola',
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
                                const nomeEscolaInput = document.getElementById('nomeEscolaInput');
                                const siglaInput = document.getElementById('siglaInput');

                                // Função para definir o estilo dos inputs
                                function setFieldStyle(input, isValid) {
                                    if (isValid) {
                                        input.style.borderColor = '#4CAF50'; 
                                    } else {
                                        input.style.borderColor = '#FF5555'; 
                                    }
                                }

                                // Validação do campo Nome
                if (dadosEscola[0].nome.length < 3) {
                    setFieldStyle(nomeEscolaInput, false);
                    Swal.showValidationMessage('O nome deve ter pelo menos 3 caracteres.');
                    return false;
                } else {
                    setFieldStyle(nomeEscolaInput, true);
                }

                // Validação do campo Sigla
                if (dadosEscola[0].sigla.length < 2) {
                    setFieldStyle(siglaInput, false);
                    Swal.showValidationMessage('A sigla deve ter pelo menos 2 caracteres.');
                    return false;
                } else {
                    setFieldStyle(siglaInput, true);
                }



                                fetch("/instituicoes/editarInstituicao", {
                                    method: "put",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        nomeEscola: nomeEscolaInput.value,
                                        sigla: siglaInput.value,
                                        idEscola : dadosEscola[0].idInstituicao,
                                    })
                                })
                                .then(response => {
                                    if (response.ok) {
                                        return response.json();
                                    }
                                })
                                .then(result => {
                                    if (result) {
                                        Swal.fire('Sucesso!', 'Escola atualizado com sucesso!', 'success');
                                        location.reload();
                                    } else {
                                        Swal.fire("error", "Falha ao editar escola", "error");
                                    }
                                });
                            });
                        },
                    });
                });
            } else {
                Swal.fire("error", "Falha ao editar escola", "error");
            }
        });
}

function gerarCodigoHexadecimal() {
    const caracteres = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let codigo = '';
  
    for (let i = 0; i < 6; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres.charAt(indice);
    }
  
    var inputCodigo = document.getElementById("codigoInput")
    inputCodigo.value = codigo
}

  