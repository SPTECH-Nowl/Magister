

//Google Chart functions
google.charts.load('current', {packages: ['corechart']});

const drawCPU = () => {
   var data = new google.visualization.DataTable();
   data.addColumn("string", "Data/Hora");
   data.addColumn("number", "% de uso");
   data.addRows([
      ['12:30', 70],
      ['12:31', 71],
      ['12:32', 75],
      ['12:33', 75],
      ['12:34', 80],
      ['12:35', 88],
      ['12:36', 89],
      ['12:37', 90],
      ['12:38', 91],
      ['12:39', 88],
      ['12:40', 96],
      ['12:41', 80],
   ]);

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

const drawRAM = () => {
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

   var chart = new google.visualization.AreaChart(document.getElementById("ram_chart"));
   chart.draw(data, options);
}

const drawDisc = () => {
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

   var chart = new google.visualization.AreaChart(document.getElementById("disc_chart"));
   chart.draw(data, options);
}

const drawWindow = () => {
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

google.charts.setOnLoadCallback(() => {
   drawCPU();
   drawRAM();
   drawDisc();
   drawWindow();
});

b_usuario.innerHTML = sessionStorage.NOME_USUARIO;

//criando o toast
const container = document.querySelector('.alert-toast-wrapper');

// Always escape HTML for text arguments!
function escapeHtml(html) {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}

// Custom function to emit toast notifications
function notify(message, variant, icon, duration = 3000) {
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

const verifConsumo = (dadosMonitorados, limiteConsumo) => {
   var qtdAcima = 0;
   dadosMonitorados.forEach(dado => {
      if(dado[1] >= limiteConsumo) {
         qtdAcima++;
      }
   });

   if(qtdAcima == 1) {
      notify(`Texto do mensagem mensagem mensagem`, 'warning', 'exclamation-triangle');
   } else if(qtdAcima >= 2) {
      notify(`Texto do mensagem mensagem mensagem`, 'danger', 'exclamation-octagon');
   }
}
   dadosMonitorados = [
      [1, 10],
      [2, 15],
      [3, 40],
      [4, 50],
   ];
   limiteConsumo = 30;