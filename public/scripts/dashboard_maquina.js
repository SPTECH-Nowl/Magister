function verifEdit() {
   if(sessionStorage.editClicked) {
      const dialogInfo = document.getElementById("dialog_info");
      dialogInfo.show();
      sessionStorage.removeItem("editClicked");
   }
}

// funções e variáveis relacionadas aos modais
const dialog = document.querySelector('.dialog-overview');
const openButton = dialog.nextElementSibling;
const closeButton = dialog.querySelector('button');

openButton.addEventListener('click', () => dialog.show());
closeButton.addEventListener('click', () => dialog.hide());
dialog.addEventListener('sl-show', () => {
   let idInstituicao = localStorage.getItem("instituicao");
   let idMaquina = sessionStorage.idMaquina;

   capturarTodosDadosMaquina(idInstituicao, idMaquina).then((dados) => {
      const nome = document.getElementById("modal_nome"),
            so = document.getElementById("modal_so"),
            cpu = document.getElementById("modal_cpu"),
            procss = document.getElementById("modal_procss"),
            ram = document.getElementById("modal_ram"),
            capcddRAM = document.getElementById("modal_capcdd_ram"),
            disco = document.getElementById("modal_disco"),
            capcddDisco = document.getElementById("modal_capcdd_disco"),
            statusUso = document.getElementById("modal_uso");


      nome.innerHTML = dados.nome;
      so.innerHTML = dados.so;
      cpu.innerHTML = dados.componenteCPU;
      procss.innerHTML = `${dados.capacidadeCPU}GHz`;
      ram.innerHTML = dados.componenteRAM;
      capcddRAM.innerHTML = `${dados.capacidadeRAM}gb`;
      disco.innerHTML = dados.componenteDisco;
      capcddDisco.innerHTML = `${dados.capacidadeDisco}gb`;
      statusUso.innerHTML = dados.emUso ==  0 ? "OFF" : "ON";
      
      if(dados.emUso == 1) statusUso.style.color = "#BF80FF"

      const strikes = document.querySelectorAll(".strikes");

      strikes.forEach((strike, index) => {
         if (index < dados.qtdStrikes) {
            strike.style.color = "red";
         }
      });
   })
})

//funções relacionadas a gerar alertas
const container = document.querySelector('.alert-toast-wrapper');

function escapeHtml(html) {
   const div = document.createElement('div');
   div.textContent = html;
   return div.innerHTML;
}

function notify(message, variant, icon, duration = 10000) {
   const alert = Object.assign(document.createElement('sl-alert'), {
      variant,
      closable: true,
      duration: duration,
      innerHTML: `
      <sl-icon name="${icon}" slot="icon"></sl-icon>
      ${escapeHtml(message)}
    `
   });

   document.body.append(alert);
   return alert.toast();
}

function verifConsumo(dadosMonitorados, limiteConsumo = 85, mensagem) {
   var qtdAcima = 0;
   dadosMonitorados.forEach(dado => {
      if (dado[1] >= limiteConsumo) {
         qtdAcima++;
      }
   });

   if (qtdAcima == 1) {
      notify(mensagem, 'warning', 'exclamation-triangle');
   } else if (qtdAcima >= 2) {
      notify(mensagem, 'danger', 'exclamation-octagon');
   }
}

//Google Chart functions
google.charts.load('current', { packages: ['corechart'] });

function drawCPU(dados) {
   var data = new google.visualization.DataTable();
   data.addColumn("string", "Data/Hora");
   data.addColumn("number", "% de uso");
   data.addRows(dados);

   var options = {
      title: null,
      legend: 'none',
      chartArea: { 'width': '90%' },
      backgroundColor: '#f5f5f5',
      colors: ['#9747FF']
   };

   var chart = new google.visualization.AreaChart(document.getElementById("cpu_chart"));
   chart.draw(data, options);
}

function drawRAM(dados) {
   var data = new google.visualization.DataTable();
   data.addColumn("string", "Data/Hora");
   data.addColumn("number", "% de uso");
   data.addRows(dados);

   var options = {
      title: null,
      legend: 'none',
      chartArea: { 'width': '90%' },
      backgroundColor: '#f5f5f5',
      colors: ['#9747FF']
   };

   var chart = new google.visualization.AreaChart(document.getElementById("ram_chart"));
   chart.draw(data, options);
}

function drawDisco(dados) {
   var data = new google.visualization.DataTable();
   data.addColumn("string", "Data/Hora");
   data.addColumn("number", "% de uso");
   data.addRows(dados);

   var options = {
      title: null,
      legend: 'none',
      chartArea: { 'width': '90%' },
      backgroundColor: '#f5f5f5',
      colors: ['#9747FF']
   };

   var chart = new google.visualization.AreaChart(document.getElementById("disc_chart"));
   chart.draw(data, options);
}

function drawWindow() {
   var data = new google.visualization.DataTable();
   data.addColumn("string", "Data/Hora");
   data.addColumn("number", "% de uso");
   data.addRows([
      ['12:30', 80],
      ['12:31', 81],
      ['12:32', 85],
      ['12:33', 85],
      ['12:34', 80],
      ['12:35', 78],
      ['12:36', 59],
      ['12:37', 80],
      ['12:38', 91],
      ['12:39', 99],
      ['12:40', 70],
      ['12:41', 80],
   ]);

   var options = {
      title: null,
      legend: 'none',
      chartArea: { 'width': '100%' },
      backgroundColor: '#f5f5f5',
      colors: ['#9747FF']
   };

   var chart = new google.visualization.AreaChart(document.getElementById("window_chart"));
   chart.draw(data, options);
}

// capturando dados do banco
function capturarDadosMaquina(idInstituicao, idMaquina) {
   return new Promise((resolve, reject) => {
      fetch(`/maquinas/capturarDadosMaquina/${idInstituicao}/${idMaquina}`)
         .then((response) => {
            if(response.ok) {
               response.json().then((response) => {
                  let registro = response[0];
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

function capturarTodosDadosMaquina(idInstituicao, idMaquina) {
   return new Promise((resolve, reject) => {
      fetch(`/maquinas/capturarTodosDadosMaquina/${idInstituicao}/${idMaquina}`)
         .then((response) => {
            if(response.ok) {
               response.json().then((response) => {
                  let registro = response[0];
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



function capturarDadosRAM(idInstituicao, idMaquina) {
   return new Promise((resolve, reject) => {
      let dadosRAM = [];

      fetch(`/maquinas/capturarConsumoRAM/${idInstituicao}/${idMaquina}`)
         .then((response) => {
            if (response.ok) {
               response.json().then((response) => {
                  response.forEach(dado => {
                     let dados = [dado.dataHora, dado.consumo]
                     dadosRAM.push(dados);
                  });

                  resolve(dadosRAM);
               });
            } else {
               reject("Erro na requisição.");
            }
         })
         .catch((error) => {
            console.log("Não foram encontrados dados vindos do banco de dados.");
            reject(error);
         });
   });
}

function capturarDadosCPU(idInstituicao, idMaquina) {
   return new Promise((resolve, reject) => {
      let dadosCPU = [];

      fetch(`/maquinas/capturarConsumoCPU/${idInstituicao}/${idMaquina}`)
         .then((response) => {
            if (response.ok) {
               response.json().then((response) => {
                  response.forEach(dado => {
                     let dados = [dado.dataHora, dado.consumo]
                     dadosCPU.push(dados);
                  });

                  resolve(dadosCPU);
               });
            } else {
               reject("Erro na requisição.");
            }
         })
         .catch((error) => {
            console.log("Não foram encontrados dados vindos do banco de dados.");
            reject(error);
         });
   });
}

function capturarDadosDisco(idInstituicao, idMaquina) {
   return new Promise((resolve, reject) => {
      let dadosDisco = [];

      fetch(`/maquinas/capturarConsumoDisco/${idInstituicao}/${idMaquina}`)
         .then((response) => {
            if (response.ok) {
               response.json().then((response) => {
                  response.forEach(dado => {
                     let dados = [dado.dataHora, dado.consumo]
                     dadosDisco.push(dados);
                  });

                  resolve(dadosDisco);
               });
            } else {
               reject("Erro na requisição.");
            }
         })
         .catch((error) => {
            console.log("Não foram encontrados dados vindos do banco de dados.");
            reject(error);
         });
   });
}

function capturarNovoDadoRAM(idInstituicao, idMaquina) {
   return new Promise((resolve, reject) => {
      fetch(`/maquinas/capturarNovoDadoRAM/${idInstituicao}/${idMaquina}`)
         .then((response) => {
            if (response.ok) {
               response.json().then((data) => {
                  if (data && data.length > 0) {
                     let [obj] = data;
                     if (obj && obj.dataHora && obj.consumo) {
                        let novoRegistro = [obj.dataHora, obj.consumo];
                        resolve(novoRegistro);
                     } else {
                        reject("Dados inválidos no objeto retornado");
                     }
                  } else {
                     reject("Nenhum dado retornado");
                  }
               });
            } else {
               reject("Erro de requisição");
            }
         })
         .catch((error) => {
            console.log("Erro de requisição:", error);
            reject(error);
         });
   });
}

function capturarNovoDadoCPU(idInstituicao, idMaquina) {
   return new Promise((resolve, reject) => {
      fetch(`/maquinas/capturarNovoDadoCPU/${idInstituicao}/${idMaquina}`)
         .then((response) => {
            if (response.ok) {
               response.json().then((data) => {
                  if (data && data.length > 0) {
                     let [obj] = data;
                     if (obj && obj.dataHora && obj.consumo) {
                        let novoRegistro = [obj.dataHora, obj.consumo];
                        resolve(novoRegistro);
                     } else {
                        reject("Dados inválidos no objeto retornado");
                     }
                  } else {
                     reject("Nenhum dado retornado");
                  }
               });
            } else {
               reject("Erro de requisição");
            }
         })
         .catch((error) => {
            console.log("Erro de requisição:", error);
            reject(error);
         });
   });
}

function capturarNovoDadoDisco(idInstituicao, idMaquina) {
   return new Promise((resolve, reject) => {
      fetch(`/maquinas/capturarNovoDadoDisco/${idInstituicao}/${idMaquina}`)
         .then((response) => {
            if (response.ok) {
               response.json().then((data) => {
                  if (data && data.length > 0) {
                     let [obj] = data;
                     if (obj && obj.dataHora && obj.consumo) {
                        let novoRegistro = [obj.dataHora, obj.consumo];
                        resolve(novoRegistro);
                     } else {
                        reject("Dados inválidos no objeto retornado");
                     }
                  } else {
                     reject("Nenhum dado retornado");
                  }
               });
            } else {
               reject("Erro de requisição");
            }
         })
         .catch((error) => {
            console.log("Erro de requisição:", error);
            reject(error);
         });
   });
}

google.charts.setOnLoadCallback(() => {
   let idInstituicao = localStorage.getItem("instituicao");
   let idMaquina = sessionStorage.idMaquina;

   capturarDadosCPU(idInstituicao, idMaquina).then((dados) => {
      dados = dados.reverse();
      drawCPU(dados);
      verifConsumo(dados, null, `A máquina ${sessionStorage.nomeMaquina} registrou um alto consumo de CPU.`);
   });

   capturarDadosRAM(idInstituicao, idMaquina).then((dados) => {
      dados = dados.reverse();
      drawRAM(dados);
      verifConsumo(dados, null, `A máquina ${sessionStorage.nomeMaquina} registrou um alto consumo de RAM.`);
   });

   capturarDadosDisco(idInstituicao, idMaquina).then((dados) => {
      dados = dados.reverse();
      drawDisco(dados)
      verifConsumo(dados, null, `A máquina ${sessionStorage.nomeMaquina} registrou um alto consumo de Disco.`)
   });

   capturarDadosMaquina(idInstituicao, idMaquina).then((dados) => {
      const nomeMaquina = document.getElementById("nome_maquina");
      const soMaquina = document.getElementById("so");
      const ramMaquina = document.getElementById("ram");
      const discoMaquina = document.getElementById("disco");
      const uso = document.getElementById("statusUso")
      const nucleos = document.getElementById("nucleos");
      const strikes = document.getElementById("qtdStrikes")
      const alertas = document.getElementById("qtdAlertas")

      nomeMaquina.innerHTML = dados.nome;
      soMaquina.innerHTML = dados.so;
      uso.innerHTML = dados.emUso == 0 ? `OFF` : `ON`;
      ramMaquina.innerHTML = dados.capacidadeRam;
      discoMaquina.innerHTML = dados.capacidadeDisco >= 1000 ? `${(dados.capacidadeDisco / 1024)}tb` : `${dados.capacidadeDisco}GB`;
      nucleos.innerHTML = dados.capacidadeCPU;
      strikes.innerHTML = dados.quantidadeStrikes;
      alertas.innerHTML = dados.quantidadeAlertas;
   })

   drawWindow();
});


document.addEventListener("DOMContentLoaded", ()=>{
      capturarDadosRAM(localStorage.getItem("instituicao"), sessionStorage.idMaquina). then((dados) => {
         dados = dados.reverse();
         let matriz = dados;
            setInterval(() => {
               capturarNovoDadoRAM(localStorage.getItem("instituicao"), sessionStorage.idMaquina).then((novoRegistro) => {
                  matriz.push(novoRegistro);
                  matriz.shift();
                  drawRAM(matriz);
               })
            }, 3000);
         });

      capturarDadosCPU(localStorage.getItem("instituicao"), sessionStorage.idMaquina).then((dados) => {
         dados = dados.reverse();
         let matriz = dados;
            setInterval(() => {
              capturarNovoDadoCPU(localStorage.getItem("instituicao"), sessionStorage.idMaquina).then((novoRegistro) => {
               matriz.push(novoRegistro);
               matriz.shift();
               drawCPU(matriz);
            })
         }, 3000);
      });

      capturarDadosDisco(localStorage.getItem("instituicao"), sessionStorage.idMaquina).then((dados) => {
         dados = dados.reverse();
         let matriz = dados;
            setInterval(() => {
               capturarNovoDadoDisco(localStorage.getItem("instituicao"), sessionStorage.idMaquina).then((novoRegistro) => {
                  matriz.push(novoRegistro);
                  matriz.shift();
                  drawDisco(matriz);
               })
         }, 3000);
      });

})










function deletarMaquina(idMaquina, tipoPermissao) {
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
               fetch(`/maquinas/deletarMaquina/`, {
                   method: "DELETE",
                   headers: {
                       "Content-Type": "application/json"
                   },
                   body: JSON.stringify({
                       idMaquinaPE: idMaquina
                   })
               }).then(function (resposta) {
                   if (resposta.ok) {
                       Swal.fire('Máquina deletado com sucesso', '', 'success');
                       location.reload();
                   } else {
                       Swal.fire('Falha ao deletar o máquina', '', 'error');
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
function alterar(idMaquina) {
   fetch(`/maquinas/editarMaquina/${idMaquina}`)
       .then((dadosUsuario) => {
           if (dadosUsuario.ok) {
               dadosUsuario.json().then((dadosUsuario) => {
                   // Verifique se todos os campos estão vazios
                   if (
                       dadosMaquinas[0].nomeMaquina === "" &&
                       dadosMaquinas[0].SistemaOperacional === ""
                   ) {
                       Swal.fire("Atenção", "Todos os campos estão vazios. Não é possível editar.", "warning");
                       return;
                   }

                   Swal.fire({
                       title: 'Editar Máquina',
                       titleClass: 'custom-title',
                       html:
                           '<input type="text" id="nomeMaquinaInput" placeholder="Nome da sua maquina" value="' + dadosMaquinas[0].nomeMaquina + '" class="swal2-input" style="border-radius: 15px;">' +
                           '<input type="text" id="SistemaOperacionalInput" placeholder="Sistema operacional da maquina" value="' + dadosMaquinas[0].SistemaOperacional + '" class="swal2-input" style="border-radius: 15px;">' ,
                       showCancelButton: true,
                       cancelButtonText: 'Cancelar',
                       confirmButtonText: 'Salvar Máquina',
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
                               const nomeMaquina = document.getElementById('nomeMaquinaInput').value;
                               const SistemaOperacional = document.getElementById('SistemaOperacionalInput').value;
                               

                               // Função para definir o estilo dos inputs
                               function setFieldStyle(input, isValid) {
                                   if (isValid) {
                                       input.style.borderColor = '#4CAF50'; 
                                   } else {
                                       input.style.borderColor = '#FF5555'; 
                                   }
                               }

                               // Validação dos campos
                               if (nomeMaquina.length < 3) {
                                   setFieldStyle(document.getElementById('nomeMaquinaInput'), false);
                                   Swal.showValidationMessage('O nome deve ter pelo menos 3 caracteres.');
                                   return false;
                               } else {
                                   setFieldStyle(document.getElementById('nomeMaquinaInput'), true);
                               }

                               // Validação dos campos
                               if (SistemaOperacional.length < 3) {
                                 setFieldStyle(document.getElementById('SistemaOperacionalInput'), false);
                                 Swal.showValidationMessage('O sistema operacional deve ter pelo menos 3 caracteres.');
                                 return false;
                             } else {
                                 setFieldStyle(document.getElementById('SistemaOperacionalInput'), true);
                             }

                               fetch("/maquinas/editarMaquina", {
                                   method: "put",
                                   headers: {
                                       "Content-Type": "application/json"
                                   },
                                   body: JSON.stringify({
                                       nomeMaquina: nomeMaquina,
                                       SistemaOperacional: SistemaOperacional,
                                       idMaquina: idMaquina
                                   })
                               })
                               .then(response => {
                                   if (response.ok) {
                                       return response.json();
                                   }
                               })
                               .then(result => {
                                   if (result) {
                                       Swal.fire('Sucesso!', 'Máquina atualizado com sucesso!', 'success');
                                       location.reload();
                                   } else {
                                       Swal.fire("error", "Falha ao editar máquina", "error");
                                   }
                               });
                           });
                       },
                   });
               });
           } else {
               Swal.fire("error", "Falha ao editar máquina", "error");
           }
       });
}

window.onload = () => {
   verifEdit();
}