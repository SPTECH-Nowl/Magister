document.addEventListener('DOMContentLoaded', function() {
    const adicionarEscolaButton = document.getElementById('adicionarEscola');
     adicionarEscolaButton.addEventListener('click', function() {
        Swal.fire({
            title: 'Adicionar Escola',
            titleClass: 'custom-title',
            html:
                '<input type="nome" id="nomeEscola" placeholder="NomeEscola" class="swal2-input" style="border-radius: 15px;">' +
                '<input type="sigla" id="siglaInput" placeholder="sigla" class="swal2-input" style="border-radius: 15px;">' +
                '<input type="codigo" id="codigoInput" placeholder="codigo" class="swal2-input" style="border-radius: 15px;">' +
                '<input type="responsavel" id="responsavelInput" placeholder="responsavel" class="swal2-input" style="border-radius: 15px;">' ,
            
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

              

                const nomeEscola =  nomeEscolaInput.value;
                const sigla =  siglaInput.value;
                const codigo =  codigoInput.value;
                const responsavel =  responsavelInput.value;
               

                // Função para definir o estilo dos inputs
                function setFieldStyle(input, isValid) {
                    if (isValid) {
                        input.style.borderColor = '#4CAF50'; // Borda verde para campos válidos
                    } else {
                        input.style.borderColor = '#FF5555'; // Borda vermelha para campos inválidos
                    }
                }

                // Validação do campo Nome
                if (nomePrograma.length < 3) {
                    setFieldStyle(nomeInput, false);
                    Swal.showValidationMessage('O nome deve ter pelo menos 3 caracteres.');
                    return false;
                } else {
                    setFieldStyle(nomeInput, true);
                }

                // Validação do campo Email
                if (nomeProcesso.length < 3) {
                    setFieldStyle(nomeInput, false);
                    Swal.showValidationMessage('O nome deve ter pelo menos 3 caracteres.');
                    return false;
                } else {
                    setFieldStyle(nomeInput, true);
                }

                // Simule a adição de um usuário (substitua isso com sua lógica real)
                return new Promise((resolve) => {
                        fetch("/usuarios/cadastrarDashEscola", {
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
                Swal.fire('Sucesso!', 'A escola foi cadastrado com sucesso.', 'success');
                location.reload();
            }
        });
    });
});