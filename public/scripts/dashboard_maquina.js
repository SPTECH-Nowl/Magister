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

function verifConsumo (dadosMonitorados, limiteConsumo = 85, mensagem) {
   var qtdAcima = 0;
   dadosMonitorados.forEach(dado => {
      if(dado[1] >= limiteConsumo) {
         qtdAcima++;
      }
   });

   if(qtdAcima == 1) {
      notify(mensagem, 'warning', 'exclamation-triangle');
   } else if(qtdAcima >= 2) {
      notify(mensagem, 'danger', 'exclamation-octagon');
   }
}

//Google Chart functions
google.charts.load('current', {packages: ['corechart']});

function drawCPU(dados) {
   var data = new google.visualization.DataTable();
   data.addColumn("string", "Data/Hora");
   data.addColumn("number", "% de uso");
   data.addRows(dados);

   var options = {
      title: null,
      legend: 'none',
      chartArea: {'width': '100%'},
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
      chartArea: {'width': '100%'},
      backgroundColor: '#f5f5f5',
      colors: ['#9747FF']
   };

   var chart = new google.visualization.AreaChart(document.getElementById("ram_chart"));
   chart.draw(data, options);
}

function drawDisco (dados) {
   var data = new google.visualization.DataTable();
   data.addColumn("string", "Data/Hora");
   data.addColumn("number", "% de uso");
   data.addRows(dados);

   var options = {
      title: null,
      legend: 'none',
      chartArea: {'width': '100%'},
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
      chartArea: {'width': '100%'},
      backgroundColor: '#f5f5f5',
      colors: ['#9747FF']
   };

   var chart = new google.visualization.AreaChart(document.getElementById("window_chart"));
   chart.draw(data, options);
}

function capturarDadosRAM(idInstituicao, idMaquina, callback) {
   let dadosRAM = [];

   fetch(`/maquinas/capturarConsumoRAM/${idInstituicao}/${idMaquina}`)
      .then((response) => {
         if(response.ok) {
            response.json().then((response) => {
               response.forEach(dado => {
                  let dados = [dado.dataHora, dado.consumo]
                  dadosRAM.push(dados);
               });

               callback(dadosRAM);
            })
         }
      })
      .catch((error) => {
         console.log("Não foram encontrados dados vindos do banco de dados.")
         dadosRAM = [];
      })
}

function capturarDadosCPU(idInstituicao, idMaquina, callback) {
   let dadosCPU = [];

   fetch(`/maquinas/capturarConsumoCPU/${idInstituicao}/${idMaquina}`)
      .then((response) => {
         if(response.ok) {
            response.json().then((response) => {
               response.forEach(dado => {
                  let dados = [dado.dataHora, dado.consumo]
                  dadosCPU.push(dados);
               });

               callback(dadosCPU);
            })
         }
      })
      .catch((error) => {
         console.log("Não foram encontrados dados vindos do banco de dados.")
         dadosCPU = [];
      })
}

function capturarDadosDisco(idInstituicao, idMaquina, callback) {
   let dadosDisco = [];

   fetch(`/maquinas/capturarConsumoDisco/${idInstituicao}/${idMaquina}`)
      .then((response) => {
         if(response.ok) {
            response.json().then((response) => {
               response.forEach(dado => {
                  let dados = [dado.dataHora, dado.consumo]
                  dadosDisco.push(dados);
               });

               callback(dadosDisco);
            });
         }
      })
      .catch((error) => {
         console.log("Não foram encontrados dados vindos do banco de dados.");
      })
}

google.charts.setOnLoadCallback(() => {
   capturarDadosRAM(1, 2, (dados) => {
      drawRAM(dados);
      verifConsumo(dados, null, "A máquina X registrou um alto consumo de RAM.");
   }); //futuramente é pra ser passado parâmetros da máquina (vindo de sessionStorage) e instituição (vindo de localStorage)
   capturarDadosCPU(1, 2, (dados) => {
      drawCPU(dados);
      verifConsumo(dados, null, "A máquina X registrou um alto consumo de CPU.");
   }); 

   capturarDadosDisco(1, 2, (dados) => {
      drawDisco(dados)
      verifConsumo(dados, null, "A máquina X registrou um alto consumo de Disco.")
   });   

   drawWindow();
});

/*
dadosMonitorados = [
   [1, 10],
   [2, 15],
   [3, 40],
   [4, 50],
];
limiteConsumo = 30;
*/

