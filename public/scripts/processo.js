document.addEventListener('DOMContentLoaded', function() {
    const adicionarEscolaButton = document.getElementById('adicionarProcesso');
    adicionarEscolaButton.addEventListener('click', function() {
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
                    setFieldStyle(nomeInput, true);
                }

                // Validação do campo Processo
                if (nomeProcesso.length < 3) {
                    setFieldStyle(nomeInput, false);
                    Swal.showValidationMessage('O processo deve ter pelo menos 3 caracteres.');
                    return false;
                } else {
                    setFieldStyle(nomeInput, true);
                }

                // Simule a adição de um usuário (substitua isso com sua lógica real)
                return new Promise((resolve) => {
                        fetch("/usuarios/cadastrarDashProcesso", {
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