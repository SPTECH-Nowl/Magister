document.addEventListener('DOMContentLoaded', function() {
    carregarFeedEscola()
   });



   function buscarEscola() {
    var nomeDigitado = input_busca.value
    var instituicao = sessionStorage.instituicao
 
       if (nomeDigitado.length < 3){
          carregarFeed()
       } else {
          fetch(`/escola/pesquisarEscola/${nomeDigitado}/${instituicao}`)
             .then((escolaBuscado =>{
                if(escolaBuscado.status == 204){
                   var tableescolas = document.getElementById("listaDeEscolas");
                   tableescolas.innerHTML = "<tr><td colspan='4'>Nenhum resultado encontrado.</td></tr>";
                }else {
                     escolaBuscado.json().then(function (escolaBuscado) {
                         var tableescolas = document.getElementById("listaDeEscolas");
                         tableescolas.innerHTML = ""; // Limpar a tabela antes de preencher com os novos dados
 
                         console.log(escolaBuscado)
                         
                         for (var i = 0; i < escolaBuscadoBuscado.length; i++) {
                             var escola = escolaBuscado[i];
                             
                             var celulaNomeEscola = document.createElement("td");
                             var celulaSigla = document.createElement("td");
                             var celulaCodigo = document.createElement("td");
                             var celulaResponsavel = document.createElement("td");
                             var celulaBotoes = document.createElement("td");
                             var celulaBotoes = document.createElement("td");
 
                             celulaNomeEscola.textContent = escola.nomeEscola;
                             celulaSigla.textContent = escola.sigla;
                             celulaCodigo.textContent = escola.codigo;
                             celulaResponsavel.textContent = escola.responsavel;

                               // Adicione os botões com base no ID do usuário
                               celulaBotoes.innerHTML = `
                           
                               <img src="../assets/img/Icone/deleteIcon.svg" id="btn_delete${escola.idEscola}" onclick="deletar(${escola.idEscola}, ${sessionStorage.nivPerm})">
                               <img src="../assets/img/Icone/editIcon.svg" label ="btn_update" onclick="alterar(${escola.idEscola})">
                               <img src="../assets/img/Icone/moreInfoIcon.svg" label ="btn_get" onclick="mostrar_dados(${escola.idEscola})">
                               `;
   
                               linhaTable.appendChild(celulaNomeEscola);
                               linhaTable.appendChild(celulaSigla);
                               linhaTable.appendChild(celulaCodigo);
                               linhaTable.appendChild(celulaResponsavel);
   
                               tableescola.appendChild(linhaTable);
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
                '<input type="text" id="codigoInput" placeholder="Código Hexadecimal" class="swal2-input" style="border-radius: 15px;">' +
                '<input type="text" id="responsavelInput" placeholder="Responsável" class="swal2-input" style="border-radius: 15px;">' ,
            
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
                const responsavelInput = document.getElementById('responsavelInput');

                const nomeEscola = nomeEscolaInput.value;
                const sigla = siglaInput.value;
                const codigo = codigoInput.value;
                const responsavel = responsavelInput.value;

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
                if (!/^[0-9A-Fa-f]+$/.test(codigo)) {
                    setFieldStyle(codigoInput, false);
                    Swal.showValidationMessage('O código deve ser hexadecimal.');
                    return false;
                } else {
                    setFieldStyle(codigoInput, true);
                }

                // Validação do campo Responsável
                if (responsavel.length < 2) {
                    setFieldStyle(responsavelInput, false);
                    Swal.showValidationMessage('O responsável deve conter pelo menos 2 caracteres.');
                    return false;
                } else {
                    setFieldStyle(responsavelInput, true);
                }

    

return new Promise((resolve) => {
    fetch("/escola/cadastrarDashEscola", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            nomeEscola: nomeEscola,
            sigla: sigla,
            codigo: codigo,
            responsavel: responsavel,
            instituicao: sessionStorage.instituicao
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


function filtrosTipo(){
    fetch(`/escola/qtdTotal/${sessionStorage.instituicao}`)
    .then((qtdTotal) => {
       if (qtdTotal.ok){
          fetch(`/escola/qtdAdministrador/${sessionStorage.instituicao}`)
          .then((qtdTotalAdm) => {
             fetch(`/escola/qtdInstrutor/${sessionStorage.instituicao}`)
                .then((qtdTotalInstrutor) => {
                   if (qtdTotalInstrutor.ok){
                      qtdTotal.json().then((qtdTotal) => {
                         qtdTotalAdm.json().then((qtdTotalAdm) =>{
                            qtdTotalInstrutor.json().then((qtdTotalInstrutor) => {
                               var orderOptions = document.getElementById("orderOptions")
 
                                  var spanTotal = document.createElement("span")
                                  var spanTotalAdministrador = document.createElement("span")
                                  var spanTotalInstrutor = document.createElement("span")
 
                                  spanTotal.textContent = `Total (${qtdTotal[0].qtdTotal})`
                                  spanTotalAdministrador.textContent = `Administradores (${qtdTotalAdm[0].qtdTotal})`
                                  spanTotalInstrutor.textContent = `Instrutor (${qtdTotalInstrutor[0].qtdTotal})`
 
                                  spanTotal.onclick = carregarFeed
                                  spanTotalAdministrador.onclick = carregarFeedAdm
                                  spanTotalInstrutor.onclick = carregarFeedInstrutor
 
                                  orderOptions.appendChild(spanTotal)
                                  orderOptions.appendChild(spanTotalAdministrador)
                                  orderOptions.appendChild(spanTotalInstrutor)
 
 
                            })
                         })                        
                      })
 
                   }
                })
          })
       }
    })
 }
 











function carregarFeedEscola() {
    var codInstituicao = sessionStorage.instituicao;
    fetch(`/escola/listar/${codInstituicao}`)
        .then(function (listaEscola) {
            if (listaEscola.ok) {
                if (listaEscola.status == 204) {
                    var tableEscola = document.getElementById("listaDeEscola");
                    tableEscola.innerHTML = "<tr><td colspan='4'>Nenhum resultado encontrado.</td></tr>";
                } else {
                    listaEscola.json().then(function (listaEscola) {
                        var tableEscola = document.getElementById("listaDeEscola");
                        tableEscola.innerHTML = ""; // Limpar a tabela antes de preencher com os novos dados

                        console.log(listaEscola)
                        
                        for (var i = 0; i < listaEscola.length; i++) {
                            var escola = listaEscola[i];

                            
                            
                            var linhaTable = document.createElement("tr");
                            linhaTable.setAttribute('id', `Escola_${Escola.idEscola}`)

                            var celulaNomeEscola = document.createElement("td");
                            var celulaSigla = document.createElement("td");
                            var celulaCodigo = document.createElement("td");
                            var celulaResponsavel = document.createElement("td");
                            var celulaBotoes = document.createElement("td");

                            celulaNomeEscola.textContent = escola.nomeEscola;
                            celulaSigla.textContent = escola.sigla;
                            celulaCodigo.textContent = escola.codigo;
                            celulaResponsavel.textContent = escola.responsavel;

                            // Adicione os botões com base no ID do usuário
                            celulaBotoes.innerHTML = `
                           
                            <img src="../assets/img/Icone/deleteIcon.svg" id="btn_delete${escola.idEscola}" onclick="deletar(${escola.idEscola}, ${sessionStorage.nivPerm})">
                            <img src="../assets/img/Icone/editIcon.svg" label ="btn_update" onclick="alterar(${escola.idEscola})">
                            <img src="../assets/img/Icone/moreInfoIcon.svg" label ="btn_get" onclick="mostrar_dados(${escola.idEscola})">
                            `;

                            linhaTable.appendChild(celulaNomeEscola);
                            linhaTable.appendChild(celulaSigla);
                            linhaTable.appendChild(celulaCodigo);
                            linhaTable.appendChild(celulaResponsavel);

                            tableescola.appendChild(linhaTable);
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


function mostrar_dadosEscola(idEscola) {
    fetch(`/escola/mostrar_dadosEscola/${idEscola}`)
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
                        <span><b>Escola</b>: ${escola.nomeEscola}</span>
                        <span><b>Sigla</b>: ${escola.sigla}</span>
                        <span><b>Código:</b> ${escola.codigo}</span>
                        <span><b>responsavel:</b> ${escola.responsavel}</span>
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
            customClass: {
                confirmButton: 'swal2-button-custom',
                popup: 'swal2-popup-custom'
            },
            width: '400px',
            heightAuto: false,
            customHeight: '700px' // Aumento maior na altura
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`/escola/deletarEscola/`, {
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





function testar() {
    aguardar();

    var formulario = new URLSearchParams(new FormData(document.getElementById("form_postagem")));

    var divResultado = document.getElementById("div_feed");

    divResultado.appendChild(document.createTextNode(formulario.get("descricao")));
    divResultado.innerHTML = formulario.get("descricao");



    return false;
}
function alterar(idEscola) {
    fetch(`/escola/listarPorEscola/${idEscola}`)
        .then((dadosEscola) => {
            if (dadosEscola.ok) {
                dadosEscola.json().then((dadosEscola) => {
                    // Verifique se todos os campos estão vazios
                    if (
                        dadosEscola[0].nomeEscola === "" &&
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
                            '<input type="nomeEscola" id="nomeEscolaInput" placeholder="NomeEscola" value="' + dadosEscola[0].nomeEscola + '" class="swal2-input" style="border-radius: 15px;">' +
                            '<input type="sigla" id="siglaInput" placeholder="sigla" value="' + dadosEscola[0].sigla + '" class="swal2-input" style="border-radius: 15px;">' +
                            '<input type="codigo" id="codigoInput" placeholder="codigo" value="' + dadosEscola[0].codigo + '" class="swal2-input" style="border-radius: 15px;">' +
                            '<input type="responsavel" id="responsavelInput" placeholder="responsavel" value="' + dadosEscola[0].responsavel + '" class="swal2-input" style="border-radius: 15px;">',
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
                                const codigoInput = document.getElementById('codigoInput');
                                const responsavelInput = document.getElementById('responsavelInput');

                                // Função para definir o estilo dos inputs
                                function setFieldStyle(input, isValid) {
                                    if (isValid) {
                                        input.style.borderColor = '#4CAF50'; 
                                    } else {
                                        input.style.borderColor = '#FF5555'; 
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
                if (!/^[0-9A-Fa-f]+$/.test(codigo)) {
                    setFieldStyle(codigoInput, false);
                    Swal.showValidationMessage('O código deve ser hexadecimal.');
                    return false;
                } else {
                    setFieldStyle(codigoInput, true);
                }

                // Validação do campo Responsável
                if (responsavel.length < 2) {
                    setFieldStyle(responsavelInput, false);
                    Swal.showValidationMessage('O responsável deve conter pelo menos 2 caracteres.');
                    return false;
                } else {
                    setFieldStyle(responsavelInput, true);
                }

                                fetch("/escola/editarEscola", {
                                    method: "put",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        nomeEscola: nomeEscola,
                                        sigla: sigla,
                                        codigo: codigo,
                                        responsavel: responsavel,
                                        idEscola : idEscola,
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