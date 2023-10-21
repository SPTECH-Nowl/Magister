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
                  console.log(registro)
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
      let dadosRAM = [];

      fetch(`/maquinas/capturarConsumoCPU/${idInstituicao}/${idMaquina}`)
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

function capturarDadosDisco(idInstituicao, idMaquina) {
   return new Promise((resolve, reject) => {
      let dadosRAM = [];

      fetch(`/maquinas/capturarConsumoDisco/${idInstituicao}/${idMaquina}`)
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

function capturarNovoDadoRAM(idInstituicao, idMaquina) {
   return new Promise((resolve, reject) => {
      fetch(`/maquinas/capturarNovoDadoRAM/${idInstituicao}/${idMaquina}`)
         .then((response) => {
            if (response.ok) {
               response.json().then((data) => {
                  let [obj] = data;
                  let novoRegistro = [obj.dataHora, obj.consumo];
                  resolve(novoRegistro);
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
                  let [obj] = data;
                  let novoRegistro = [obj.dataHora, obj.consumo];
                  resolve(novoRegistro);
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
                  let [obj] = data;
                  let novoRegistro = [obj.dataHora, obj.consumo];
                  resolve(novoRegistro);
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
   capturarDadosCPU(1, 2).then((dados) => {
      drawCPU(dados);
      verifConsumo(dados, null, "A máquina X registrou um alto consumo de RAM.");
   });

   capturarDadosRAM(1, 2).then((dados) => {
      drawRAM(dados);
      verifConsumo(dados, null, "A máquina X registrou um alto consumo de RAM.");
   });

   capturarDadosDisco(1, 2).then((dados) => {
      drawDisco(dados)
      verifConsumo(dados, null, "A máquina X registrou um alto consumo de Disco.")
   });

   capturarDadosMaquina(1, 2).then((dados) => {
      const nomeMaquina = document.getElementById("nome_maquina");
      const soMaquina = document.getElementById("so");
      const ramMaquina = document.getElementById("ram");
      const discoMaquina = document.getElementById("disco");
      const uso = document.getElementById("statusUso")
      const nucleos = document.getElementById("nucleos");

      nomeMaquina.innerHTML = dados.nome;
      soMaquina.innerHTML = dados.so;
      uso.innerHTML = dados.emUso = 0 ? `OFF` : `ON`;
      ramMaquina.innerHTML = dados.capacidadeRAM;
      discoMaquina.innerHTML = dados.capacidadeDisco >= 1000 ? `${(dados.capacidadeDisco / 1024)}tb` : `${dados.capacidadeDisco}GB`;
      nucleos.innerHTML = dados.capacidadeCPU;
   })

   drawWindow();
});

// const atualizarGraficos = setInterval(() => {
//    capturarDadosRAM(1, 2). then((dados) => {
//       let matriz = dados;
//       capturarNovoDadoRAM(1, 2).then((novoRegistro) => {
//          matriz.pop();
//          matriz.unshift(novoRegistro);
//          drawRAM(matriz);
//       })
//    });

//    capturarDadosCPU(1, 2).then((dados) => {
//       let matriz = dados;
//       capturarNovoDadoCPU(1, 2).then((novoRegistro) => {
//          matriz.shift();
//          matriz.push(novoRegistro);
//          drawCPU(matriz);
//       })
//    });

//    capturarDadosDisco(1, 2).then((dados) => {
//       let matriz = dados;
//       capturarNovoDadoDisco(1, 2).then((novoRegistro) => {
//          matriz.shift();
//          matriz.push(novoRegistro);
//          drawDisco(matriz);
//       })
//    });
// }, 3000);

