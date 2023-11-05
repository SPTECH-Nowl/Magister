document.addEventListener('DOMContentLoaded', function() {
    carregarFeed(),
    filtrosTipo()
   });


function buscarUsuario() {
   var nomeDigitado = input_busca.value
   var instituicao = localStorage.getItem("instituicao")

      if (nomeDigitado.length < 3){
         carregarFeed()
      } else {
         fetch(`/usuarios/pesquisarUsuario/${nomeDigitado}/${instituicao}`)
            .then((usuarioBuscado =>{
               if(usuarioBuscado.status == 204){
                  var tableUsuarios = document.getElementById("listaDeUsuarios");
                  tableUsuarios.innerHTML = "<tr><td colspan='4'>Nenhum resultado encontrado.</td></tr>";
               }else {
                    usuarioBuscado.json().then(function (usuarioBuscado) {
                        var tableUsuarios = document.getElementById("listaDeUsuarios");
                        tableUsuarios.innerHTML = ""; // Limpar a tabela antes de preencher com os novos dados

                        console.log(usuarioBuscado)
                        
                        for (var i = 0; i < usuarioBuscado.length; i++) {
                            var usuario = usuarioBuscado[i];
                            
                            var linhaTable = document.createElement("tr");
                            var celulaNome = document.createElement("td");
                            var celulaEmail = document.createElement("td");
                            var celulaTipo = document.createElement("td");
                            var celulaBotoes = document.createElement("td");

                            celulaNome.textContent = usuario.nomeUsuario;
                            celulaEmail.textContent = usuario.email;
                            celulaTipo.textContent = usuario.nivPermissao;

                            // Adicione os botões com base no ID do usuário
                            celulaBotoes.innerHTML = `
                            <img src="../assets/img/Icone/deleteIcon.svg" class="tooltip" title="Excluir Escola">
                            <img src="../assets/img/Icone/editIcon.svg" class="tooltip" title="Editar Escola">
                            <img src="../assets/img/Icone/moreInfoIcon.svg" class="tooltip" title="Mais Informações">
                        `;
                                                

                            linhaTable.appendChild(celulaNome);
                            linhaTable.appendChild(celulaEmail);
                            linhaTable.appendChild(celulaTipo);
                            linhaTable.appendChild(celulaBotoes);

                            tableUsuarios.appendChild(linhaTable);
                        }
                    });
                }

   }))
      }

}


document.addEventListener('DOMContentLoaded', function() {
    const adicionarUsuarioButton = document.getElementById('adicionarUsuario');
    adicionarUsuarioButton.addEventListener('click', function() {
        Swal.fire({
            title: 'Adicionar Usuário',
            titleClass: 'custom-title',
            html:
                '<input type="text" id="nomeInput" placeholder="Nome" class="swal2-input" style="border-radius: 15px;">' +
                '<input type="email" id="emailInput" placeholder="Email" class="swal2-input" style="border-radius: 15px;">' +
                '<input type="password" id="senhaInput" placeholder="Senha" class="swal2-input" style="border-radius: 15px;">' +
                '<input type="text" id="tipoInput" placeholder="Tipo" class="swal2-input" style="border-radius: 15px;">',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonClass: 'custom-cancel-button',
            confirmButtonText: 'Adicionar Usuário',
            showLoaderOnConfirm: true,
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
                const nomeInput = document.getElementById('nomeInput');
                const emailInput = document.getElementById('emailInput');
                const senhaInput = document.getElementById('senhaInput');
                const tipoInput = document.getElementById('tipoInput');

                const nome = nomeInput.value;
                const email = emailInput.value;
                const senha = senhaInput.value;
                const tipo = tipoInput.value;

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
                    setFieldStyle(nomeInput, false);
                    Swal.showValidationMessage('O nome deve ter pelo menos 3 caracteres.');
                    return false;
                } else {
                    setFieldStyle(nomeInput, true);
                }

                // Validação do campo Email
                if (!email.includes('@')) {
                    setFieldStyle(emailInput, false);
                    Swal.showValidationMessage('O email deve conter o símbolo "@".');
                    return false;
                } else {
                    setFieldStyle(emailInput, true);
                }

                // Validação do campo Senha
                if (senha.length < 5) {
                    setFieldStyle(senhaInput, false);
                    Swal.showValidationMessage('A senha deve ter pelo menos 5 caracteres.');
                    return false;
                } else {
                    setFieldStyle(senhaInput, true);
                }

                // Validação do campo Tipo
                if (tipo !== '1' && tipo !== '2' && tipo !== '3') {
                    setFieldStyle(tipoInput, false);
                    Swal.showValidationMessage('O tipo só pode ser 1, 2 ou 3.');
                    return false;
                } else {
                    setFieldStyle(tipoInput, true);
                }

                // Simule a adição de um usuário (substitua isso com sua lógica real)
                return new Promise((resolve) => {
                        fetch("/usuarios/cadastrarNaDash", {
                            method: "POST",
                            headers: {
                                "Content-type": "application/json"
                            },
                            body: JSON.stringify({
                                nomeUsuario: nome,
                                emailUsuario: email,
                                senhaUsuario: senha,
                                nivPermissao: tipo,
                                instituicao: localStorage.getItem("instituicao")
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
                Swal.fire('Sucesso!', 'O usuário foi cadastrado com sucesso.', 'success');
                location.reload();
            }
        });
    });
});

            



function filtrosTipo(){
   fetch(`/usuarios/qtdTotal/${localStorage.getItem("instituicao")}`)
   .then((qtdTotal) => {
      if (qtdTotal.ok){
         fetch(`/usuarios/qtdAdministrador/${localStorage.getItem("instituicao")}`)
         .then((qtdTotalAdm) => {
            fetch(`/usuarios/qtdInstrutor/${localStorage.getItem("instituicao")}`)
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


function carregarFeed() {
    var codInstituicao = localStorage.getItem("instituicao");
    fetch(`/usuarios/listar/${codInstituicao}`)
        .then(function (listaUsuarios) {
            if (listaUsuarios.ok) {
                if (listaUsuarios.status == 204) {
                    var tableUsuarios = document.getElementById("listaDeUsuarios");
                    tableUsuarios.innerHTML = "<tr><td colspan='4'>Nenhum resultado encontrado.</td></tr>";
                } else {
                    listaUsuarios.json().then(function (listaUsuarios) {
                        var tableUsuarios = document.getElementById("listaDeUsuarios");
                        tableUsuarios.innerHTML = ""; // Limpar a tabela antes de preencher com os novos dados

                        console.log(listaUsuarios)
                        
                        for (var i = 0; i < listaUsuarios.length; i++) {
                            var usuario = listaUsuarios[i];

                            var linhaTable = document.createElement("tr");
                            linhaTable.setAttribute('id', `usuario_${usuario.idUsuario}`)

                            var celulaNome = document.createElement("td");
                            var celulaEmail = document.createElement("td");
                            var celulaTipo = document.createElement("td");
                            var celulaBotoes = document.createElement("td");

                            celulaNome.textContent = usuario.nomeUsuario;
                            celulaEmail.textContent = usuario.email;
                            celulaTipo.textContent = usuario.nivPermissao;

                            // Adicione os botões com base no ID do usuário
                            celulaBotoes.innerHTML = `
                            <img src="../assets/img/Icone/deleteIcon.svg" class="tooltip" title="Excluir Usuário" id="btn_delete${usuario.idUsuario}" onclick="deletar(${usuario.idUsuario}, ${localStorage.getItem("nivPerm")})">
                            <img src="../assets/img/Icone/editIcon.svg" class="tooltip" title="Editar Usuário" id="btn_update${usuario.idUsuario}" onclick="alterar(${usuario.idUsuario})">
                            <img src="../assets/img/Icone/moreInfoIcon.svg" class="tooltip" title="Mais Informações" id="btn_get${usuario.idUsuario}" onclick="mostrar_dados(${usuario.idUsuario})">
                        `;
                     
                        
                        document.addEventListener("DOMContentLoaded", function () {
                            carregarFeed(); // Chame a função para carregar a tabela de usuários
                            tippy(".tooltip", {
                                placement: "top",
                            });
                        });


                            
                            linhaTable.appendChild(celulaNome);
                            linhaTable.appendChild(celulaEmail);
                            linhaTable.appendChild(celulaTipo);
                            linhaTable.appendChild(celulaBotoes);

                            tableUsuarios.appendChild(linhaTable);
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

function carregarFeedAdm() {
    var codInstituicao = localStorage.getItem("instituicao");

    fetch(`/usuarios/listarAdm/${codInstituicao}`)
        .then(function (listaUsuarios) {
            if (listaUsuarios.ok) {
                if (listaUsuarios.status == 204) {
                    var tableUsuarios = document.getElementById("listaDeUsuarios");
                    tableUsuarios.innerHTML = "<tr><td colspan='4'>Nenhum resultado encontrado.</td></tr>";
                } else {
                    listaUsuarios.json().then(function (listaUsuarios) {
                        var tableUsuarios = document.getElementById("listaDeUsuarios");
                        tableUsuarios.innerHTML = ""; 

                        console.log(listaUsuarios)
                        
                        for (var i = 0; i < listaUsuarios.length; i++) {
                            var usuario = listaUsuarios[i];
                            
                            var linhaTable = document.createElement("tr");
                            var celulaNome = document.createElement("td");
                            var celulaEmail = document.createElement("td");
                            var celulaTipo = document.createElement("td");
                            var celulaBotoes = document.createElement("td");

                            celulaNome.textContent = usuario.nomeUsuario;
                            celulaEmail.textContent = usuario.email;
                            celulaTipo.textContent = usuario.nivPermissao;

                            // Adicione os botões com base no ID do usuário

                            celulaBotoes.innerHTML = `
                            <img src="../assets/img/Icone/deleteIcon.svg" class="tooltip" title="Excluir Usuário" id="btn_delete${usuario.idUsuario}" onclick="deletar(${usuario.idUsuario}, ${localStorage.getItem("nivPerm")})">
                            <img src="../assets/img/Icone/editIcon.svg" class="tooltip" title="Editar Usuário" id="btn_update${usuario.idUsuario}" onclick="alterar(${usuario.idUsuario})">
                            <img src="../assets/img/Icone/moreInfoIcon.svg" class="tooltip" title="Mais Informações" id="btn_get${usuario.idUsuario}" onclick="mostrar_dados(${usuario.idUsuario})">
                        `;
                     
                        
                        document.addEventListener("DOMContentLoaded", function () {
                            carregarFeed(); // Chame a função para carregar a tabela de usuários
                            tippy(".tooltip", {
                                placement: "top",
                            });
                        });


                            linhaTable.appendChild(celulaNome);
                            linhaTable.appendChild(celulaEmail);
                            linhaTable.appendChild(celulaTipo);
                            linhaTable.appendChild(celulaBotoes);

                            tableUsuarios.appendChild(linhaTable);
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

function carregarFeedInstrutor() {
    var codInstituicao = localStorage.getItem("instituicao");

    fetch(`/usuarios/listarInstrutor/${codInstituicao}`)
        .then(function (listaUsuarios) {
            if (listaUsuarios.ok) {
                if (listaUsuarios.status == 204) {
                    var tableUsuarios = document.getElementById("listaDeUsuarios");
                    tableUsuarios.innerHTML = "<tr><td colspan='4'>Nenhum resultado encontrado.</td></tr>";
                } else {
                    listaUsuarios.json().then(function (listaUsuarios) {
                        var tableUsuarios = document.getElementById("listaDeUsuarios");
                        tableUsuarios.innerHTML = ""; 

                        console.log(listaUsuarios)
                        
                        for (var i = 0; i < listaUsuarios.length; i++) {
                            var usuario = listaUsuarios[i];
                            
                            var linhaTable = document.createElement("tr");
                            var celulaNome = document.createElement("td");
                            var celulaEmail = document.createElement("td");
                            var celulaTipo = document.createElement("td");
                            var celulaBotoes = document.createElement("td");

                            celulaNome.textContent = usuario.nomeUsuario;
                            celulaEmail.textContent = usuario.email;
                            celulaTipo.textContent = usuario.nivPermissao;

                            // Adicione os botões com base no ID do usuário
                          celulaBotoes.innerHTML = `
                            <img src="../assets/img/Icone/deleteIcon.svg" class="tooltip delete-action" title="Excluir Usúario"  id="btn_delete${usuario.idUsuario}" onclick="deletar(${usuario.idUsuario}, ${localStorage.getItem("nivPerm")})">
                            <img src="../assets/img/Icone/editIcon.svg"  class="tooltip edit-action" title="Editar Usúario"  id="btn_update${usuario.idUsuario}" onclick="alterar(${usuario.idUsuario})">
                            <img src="../assets/img/Icone/moreInfoIcon.svg"  class="tooltip info-action" title="Mais Informações"  id="btn_get${usuario.idUsuario}" onclick="mostrar_dados(${usuario.idUsuario})">
                            `;
                

                            linhaTable.appendChild(celulaNome);
                            linhaTable.appendChild(celulaEmail);
                            linhaTable.appendChild(celulaTipo);
                            linhaTable.appendChild(celulaBotoes);

                            tableUsuarios.appendChild(linhaTable);
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

function limparFormulario() {
    document.getElementById("form_postagem").reset();
}


function mostrar_dados(idUsuario) {
    fetch(`/usuarios/mostrar_dados/${idUsuario}`)
        .then(function (response) {
            if (!response.ok) {
                console.error('Erro na resposta da API:', response.status);
                return;
            }
            return response.json();
        })
        .then(function (dadosUsuario) {
            if (dadosUsuario && dadosUsuario.length > 0) {
                const usuario = dadosUsuario[0];
                console.log("Dados recebidos dos usuários: ", JSON.stringify(usuario));
                Swal.fire({
                    title: 'Dados do Cliente',
                    titleClass: 'custom-title',
                    width: '700px', // Reduza a largura para 700px (ajuste conforme necessário)
                    html: `<div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
                        <span><b>Nome</b>: ${usuario.nome}</span>
                        <span><b>Email</b>: ${usuario.email}</span>
                        <span><b>Senha:</b> ${usuario.senha}</span>
                        <span><b>nivPermissao:</b> ${usuario.fkTipoUsuario}</span>
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

function deletar(idUsuario, tipoPermissao) {
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
                fetch(`/usuarios/deletar/`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        idUsuarioPE: idUsuario
                    })
                }).then(function (resposta) {
                    if (resposta.ok) {
                        Swal.fire('Usuário deletado com sucesso', '', 'success');
                        location.reload();
                    } else {
                        Swal.fire('Falha ao deletar o usuário', '', 'error');
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
function alterar(idUsuario) {
    fetch(`/usuarios/listarPorUsuario/${idUsuario}`)
        .then((dadosUsuario) => {
            if (dadosUsuario.ok) {
                dadosUsuario.json().then((dadosUsuario) => {
                    // Verifique se todos os campos estão vazios
                    if (
                        dadosUsuario[0].nome === "" &&
                        dadosUsuario[0].email === "" &&
                        dadosUsuario[0].senha === "" &&
                        dadosUsuario[0].nivPermissao === ""
                    ) {
                        Swal.fire("Atenção", "Todos os campos estão vazios. Não é possível editar.", "warning");
                        return;
                    }

                    Swal.fire({
                        title: 'Editar Usuário',
                        titleClass: 'custom-title',
                        html:
                            '<input type="text" id="nomeInput" placeholder="Nome" value="' + dadosUsuario[0].nome + '" class="swal2-input" style="border-radius: 15px;">' +
                            '<input type="email" id="emailInput" placeholder="Email" value="' + dadosUsuario[0].email + '" class="swal2-input" style="border-radius: 15px;">' +
                            '<input type="password" id="senhaInput" placeholder="Senha" value="' + dadosUsuario[0].senha + '" class="swal2-input" style="border-radius: 15px;">' +
                            '<input type="text" id="tipoInput" placeholder="Tipo" value="' + dadosUsuario[0].nivPermissao + '" class="swal2-input" style="border-radius: 15px;">',
                        showCancelButton: true,
                        cancelButtonText: 'Cancelar',
                        confirmButtonText: 'Salvar Usuario',
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
                                const nomeInput = document.getElementById('nomeInput').value;
                                const emailInput = document.getElementById('emailInput').value;
                                const senhaInput = document.getElementById('senhaInput').value;
                                const tipoInput = document.getElementById('tipoInput').value;

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
                                    setFieldStyle(document.getElementById('nomeInput'), false);
                                    Swal.showValidationMessage('O nome deve ter pelo menos 3 caracteres.');
                                    return false;
                                } else {
                                    setFieldStyle(document.getElementById('nomeInput'), true);
                                }

                                if (!emailInput.includes('@')) {
                                    setFieldStyle(document.getElementById('emailInput'), false);
                                    Swal.showValidationMessage('O email deve conter o símbolo "@".');
                                    return false;
                                } else {
                                    setFieldStyle(document.getElementById('emailInput'), true);
                                }

                                if (senhaInput.length < 5) {
                                    setFieldStyle(document.getElementById('senhaInput'), false);
                                    Swal.showValidationMessage('A senha deve ter pelo menos 5 caracteres.');
                                    return false;
                                } else {
                                    setFieldStyle(document.getElementById('senhaInput'), true);
                                }

                                if (tipoInput !== '1' && tipoInput !== '2' && tipoInput !== '3') {
                                    setFieldStyle(document.getElementById('tipoInput'), false);
                                    Swal.showValidationMessage('O tipo só pode ser 1, 2 ou 3.');
                                    return false;
                                } else {
                                    setFieldStyle(document.getElementById('tipoInput'), true);
                                }

                                fetch("/usuarios/editar", {
                                    method: "put",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        nomeUsuario: nomeInput,
                                        emailUsuario: emailInput,
                                        senhaUsuario: senhaInput,
                                        nivPermissao: tipoInput,
                                        idUsuario: idUsuario
                                    })
                                })
                                .then(response => {
                                    if (response.ok) {
                                        return response.json();
                                    }
                                })
                                .then(result => {
                                    if (result) {
                                        Swal.fire('Sucesso!', 'Usuário atualizado com sucesso!', 'success');
                                        location.reload();
                                    } else {
                                        Swal.fire("error", "Falha ao editar usuário", "error");
                                    }
                                });
                            });
                        },
                    });
                });
            } else {
                Swal.fire("error", "Falha ao editar usuário", "error");
            }
        });
}