document.addEventListener('DOMContentLoaded', function() {
    carregarFeedProcesso()
   });



   function buscarProcesso() {
    var nomeDigitado = input_busca.value
    var instituicao = sessionStorage.instituicao
 
       if (nomeDigitado.length < 3){
          carregarFeed()
       } else {
          fetch(`/processo/pesquisarProcesso/${nomeDigitado}/${instituicao}`)
             .then((processoBuscado =>{
                if(processoBuscado.status == 204){
                   var tableescolas = document.getElementById("listaDeProcesso");
                   tableescolas.innerHTML = "<tr><td colspan='4'>Nenhum resultado encontrado.</td></tr>";
                }else {
                     processoBuscado.json().then(function (processoBuscado) {
                         var tableescolas = document.getElementById("listaDeProcesso");
                         tableescolas.innerHTML = ""; // Limpar a tabela antes de preencher com os novos dados
 
                         console.log(processoBuscado)
                         
                         for (var i = 0; i < processoBuscado.length; i++) {
                             var processo = processoBuscado[i];
                             
                             var celulaNomePrograma = document.createElement("td");
                             var celulaNomeProcesso = document.createElement("td");
                             var celulaBotoes = document.createElement("td");
 
                             celulaNomePrograma.textContent = processo.nomePrograma;
                             celulaNomeProcesso.textContent = processo.nomeProcesso;
                            
 
                             // Adicione os botões com base no ID do usuário
                             celulaBotoes.innerHTML = `
                            
                             <img src="../assets/img/Icone/deleteIcon.svg" id="btn_delete${processo.idProcesso}" onclick="deletar(${processo.idProcesso}, ${sessionStorage.nivPerm})">
                             <img src="../assets/img/Icone/editIcon.svg" label ="btn_update" onclick="alterar(${processo.idProcesso})">
                             <img src="../assets/img/Icone/moreInfoIcon.svg" label ="btn_get" onclick="mostrar_dados(${processo.idProcesso})">
                             `;
 
                             linhaTable.appendChild(celulaNomePrograma);
                             linhaTable.appendChild(celulaNomeProcesso);
                 
 
                             tableProcesso.appendChild(linhaTable);
                         }
                     });
                 }
 
    }))
       }
 
 }











document.addEventListener('DOMContentLoaded', function() {
    const adicionarProcessoButton = document.getElementById('adicionarProcesso');
    adicionarProcessoButton.addEventListener('click', function() {
        Swal.fire({
            title: 'Adicionar Programa',
            titleClass: 'custom-title',
            html:
                '<input type="programa" id="nomeProgramaInput" placeholder="NomePrograma" class="swal2-input" style="border-radius: 15px;">' +
                '<input type="processo" id="nomeProcessoInput" placeholder="NomeProcesso" class="swal2-input" style="border-radius: 15px;">' ,
            
            confirmButtonText: 'Adicionar Programa',
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
                const nomeProgramaInput = document.getElementById('nomeProgramaInput');
                const nomeProcessoInput = document.getElementById('nomeProcessoInput');
                

                const nomePrograma = nomeProgramaInput.value;
                const nomeProcesso = nomeProcessoInput.value;
               

                // Função para definir o estilo dos inputs
                function setFieldStyle(input, isValid) {
                    if (isValid) {
                        input.style.borderColor = '#4CAF50'; // Borda verde para campos válidos
                    } else {
                        input.style.borderColor = '#FF5555'; // Borda vermelha para campos inválidos
                    }
                }

                // Validação do campo Programa
                if (nomePrograma.length < 3) {
                    setFieldStyle(nomeInput, false);
                    Swal.showValidationMessage('O programa deve ter pelo menos 3 caracteres.');
                    return false;
                } else {
                    setFieldStyle(nomeProgramaInput, true);
                }

                // Validação do campo Processo
                if (nomeProcesso.length < 3) {
                    setFieldStyle(nomeInput, false);
                    Swal.showValidationMessage('O processo deve ter pelo menos 3 caracteres.');
                    return false;
                } else {
                    setFieldStyle(nomeProcessoInput, true);
                }

                // Simule a adição de um usuário (substitua isso com sua lógica real)
                return new Promise((resolve) => {
                        fetch("/processo/cadastrarDashProcesso", {
                            method: "POST",
                            headers: {
                                "Content-type": "application/json"
                            },
                            body: JSON.stringify({
                                nomePrograma: nomePrograma,
                                nomeProcesso: nomeProcesso,
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
                Swal.fire('Sucesso!', 'O PROGRAMA foi cadastrado com sucesso.', 'success');
                location.reload();
            }
        });
    });
});



function filtrosTipo(){
    fetch(`/processo/qtdTotal/${sessionStorage.instituicao}`)
    .then((qtdTotal) => {
       if (qtdTotal.ok){
          fetch(`/processo/qtdAdministrador/${sessionStorage.instituicao}`)
          .then((qtdTotalAdm) => {
             fetch(`/processo/qtdInstrutor/${sessionStorage.instituicao}`)
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
 






function carregarFeedProcesso() {
    var codInstituicao = sessionStorage.instituicao;
    fetch(`/processo/listar/${codInstituicao}`)
        .then(function (listaProcesso) {
            if (listaProcesso.ok) {
                if (listaProcesso.status == 204) {
                    var tableProcesso = document.getElementById("listaDeProcesso");
                    tableProcesso.innerHTML = "<tr><td colspan='4'>Nenhum resultado encontrado.</td></tr>";
                } else {
                    listaProcesso.json().then(function (listaProcesso) {
                        var tableProcesso = document.getElementById("listaDeProcesso");
                        tableProcesso.innerHTML = ""; // Limpar a tabela antes de preencher com os novos dados

                        console.log(listaProcesso)
                        
                        for (var i = 0; i < listaProcesso.length; i++) {
                            var processo = listaProcesso[i];

                            
                            
                            var linhaTable = document.createElement("tr");
                            linhaTable.setAttribute('id', `processo_${Processo.idProcesso}`)

                            var celulaNomePrograma = document.createElement("td");
                            var celulaNomeProcesso = document.createElement("td");
                            var celulaBotoes = document.createElement("td");

                            celulaNomePrograma.textContent = processo.nomePrograma;
                            celulaNomeProcesso.textContent = processo.nomeProcesso;
                           

                            // Adicione os botões com base no ID do usuário
                            celulaBotoes.innerHTML = `
                           
                            <img src="../assets/img/Icone/deleteIcon.svg" id="btn_delete${processo.idProcesso}" onclick="deletar(${processo.idProcesso}, ${sessionStorage.nivPerm})">
                            <img src="../assets/img/Icone/editIcon.svg" label ="btn_update" onclick="alterar(${processo.idProcesso})">
                            <img src="../assets/img/Icone/moreInfoIcon.svg" label ="btn_get" onclick="mostrar_dados(${processo.idProcesso})">
                            `;

                            linhaTable.appendChild(celulaNomePrograma);
                            linhaTable.appendChild(celulaNomeProcesso);
                

                            tableProcesso.appendChild(linhaTable);
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


function mostrar_dadosProcesso(idProcesso) {
    fetch(`/processo/mostrar_dadosProcesso/${idProcesso}`)
        .then(function (response) {
            if (!response.ok) {
                console.error('Erro na resposta da API:', response.status);
                return;
            }
            return response.json();
        })
        .then(function (dadosProcesso) {
            if (dadosProcesso && dadosProcesso.length > 0) {
                const processo = dadosProcesso[0];
                console.log("Dados recebidos do Processo: ", JSON.stringify(processo));
                Swal.fire({
                    title: 'Dados da Processo',
                    titleClass: 'custom-title',
                    width: '700px', // Reduza a largura para 700px (ajuste conforme necessário)
                    html: `<div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
                        <span><b>Nome Programa</b>: ${processo.nomePrograma}</span>
                        <span><b>Nome Processo</b>: ${processo.nomeProcesso}</span>
                    </div>`,
                    confirmButtonColor: '#6D499D', // Cor do botão "OK"
                    confirmButtonText: 'OK',
                    customClass: {
                        container: 'custom-modal', // Classe personalizada para o modal
                        confirmButton: 'custom-confirm-button', // Classe personalizada para o botão "OK"
                    },
                });
            } else {
                console.error('Dados do processo não encontrados na resposta da API.');
            }
        })
        .catch(function (erro) {
            console.error('Erro na requisição:', erro);
        });
}

function deletarProcesso(idProcesso, tipoPermissao) {
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
                fetch(`/processo/deletarProcesso/`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        idProcessoPE: idProcesso
                    })
                }).then(function (resposta) {
                    if (resposta.ok) {
                        Swal.fire('Processo deletado com sucesso', '', 'success');
                        location.reload();
                    } else {
                        Swal.fire('Falha ao deletar o Processo', '', 'error');
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