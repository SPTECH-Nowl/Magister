
var idInstituicao = localStorage.getItem("instituicao")

function handleChartBtn(btnId) {
    if (!document.getElementById(btnId).classList.contains('chart-btn-active')) {

        document.getElementsByClassName('chart-btn-active')[0].classList.remove('chart-btn-active');
        document.getElementById(btnId).classList.add('chart-btn-active');

    }
}

google.charts.load("current", { packages: ["corechart", "bar"] });

function maisUsoCpuRamKpi(idInstituicao){
    fetch(`/maquinas/maisUsoCpuRamKpi/${idInstituicao}`)
    .then(listaMaquinasMaisUso=>{
        if(listaMaquinasMaisUso.status == 204){
                document.getElementById("maisUsoKpi").innerHTML = "Nenhum registro encontrado"
        } else {
            listaMaquinasMaisUso.json().then(listaMaquinasMaisUso =>{
                
                if(listaMaquinasMaisUso.length === 0){
                    document.getElementById("maisUsoKpi").innerHTML = "Nenhum registro encontrado"
                }else{
                var arrayMaquinas = [
                    ['Máquina', 'CPU', 'RAM', { role: 'style' }],
                ]

                for(i = 0; i < listaMaquinasMaisUso.length; i++){
                    var maquinaAtual = listaMaquinasMaisUso[i]

                    arrayMaquinas.push(
                        [`Máquina ${maquinaAtual.fkMaquina}`, maquinaAtual.maxConsumoProcessador, maquinaAtual.maxConsumoRam, '#BF80FF'],
                        )
                }


                function drawColumnCPURAM() {
                    var data = google.visualization.arrayToDataTable(
                        arrayMaquinas
                    );

                    var options = {
                        chart: {
                            title: ' ',
                            subtitle: ' ',
                        },
                        colors: ['#4E2F78', '#BF80FF'],
                        chartArea: {
                            backgroundColor: '#f5f5f5',
                        },
                        backgroundColor: {
                            fill: '#f5f5f5',
                        },
                    };

                    var chart = new google.charts.Bar(document.getElementById('cpuramcolumn'));

                    chart.draw(data, google.charts.Bar.convertOptions(options));
                }

                
                    google.charts.setOnLoadCallback(() => {
                        drawColumnCPURAM();
                    });

                }
            })
        }
    })
}

function maquinasComMaisDefeitos(idInstituicao){
    fetch(`/maquinas/maquinasMaisDefeitos/${idInstituicao}`)
    .then(listaMaquinasMaisDefeitos =>{
        if (listaMaquinasMaisDefeitos.status == 204){
            document.getElementById("chart_ranking").innerHTML = "Nenhum registro encontrado"
        }else{
            listaMaquinasMaisDefeitos.json().then(listaMaquinasMaisDefeitos => {
                if(listaMaquinasMaisDefeitos.length === 0){
                    document.getElementById("chart_ranking").innerHTML = "Nenhum registro encontrado"
                } else {
                    tableMaquinas = document.getElementById("chart_ranking")

                    listaMaquinasMaisDefeitos.forEach(maquinaAtual => {
                        
    
                        var linhaTable = document.createElement("tr");
                        var celulaNome = document.createElement("td");
                        var celulaNStrike = document.createElement("td");
                        var celulaNAlerta = document.createElement("td");                    
                        
                        celulaNome.textContent = ` ${maquinaAtual.nomeMaquina}`;
                        celulaNStrike.textContent = maquinaAtual.quantidadeStrikes;
                        celulaNAlerta.textContent = maquinaAtual.quantidadeAlertas;
                        
                        
                        linhaTable.appendChild(celulaNome);
                        linhaTable.appendChild(celulaNStrike);
                        linhaTable.appendChild(celulaNAlerta);
    
                        tableMaquinas.appendChild(linhaTable);
                    });
                }

            })
        }
    })
}


document.addEventListener("DOMContentLoaded", ()=>{
    getInstInfos(idInstituicao);
    kpiInfos(idInstituicao);
    strikeNoMes(1, idInstituicao);
    maisUsoCpuRamKpi(idInstituicao);
    maquinasComMaisDefeitos(idInstituicao);
})

function getInstInfos(idInstituicao){
    var nomeInstituicao = document.getElementById("nomeInst")
    fetch(`/instituicoes/listarInstituicaoEsp/${idInstituicao}`)
    .then((dadosInstituicao)=>{
        dadosInstituicao.json().then((dadosInstituicao)=>{
            
            nomeInstituicao.innerHTML = dadosInstituicao[0].nome
        })
    })
}

function kpiInfos(idInstituicao){
    fetch(`/strikes/kpiInfos/${idInstituicao}`)
    .then(dadosKpi => {
        if(dadosKpi.ok){
            dadosKpi.json().then(dadosKpi =>{

            var valoresKpi = dadosKpi[0]

            document.getElementById("qtd_strike_semana").innerHTML = valoresKpi.strikesNaSemana
            document.getElementById("qtd_alertas_semana").innerHTML = valoresKpi.alertasNaSemana


                // ------------------------------

            google.charts.setOnLoadCallback(() => {
                drawPieStrike();
                drawPieAlertaDisco();
            });

            var porcentagemComStrike = (valoresKpi.maquinasComStrike / valoresKpi.totalMaquinas * 100).toFixed(2);
            document.getElementById("porcentagem_strikes").innerHTML = `${porcentagemComStrike}%`;
            
            function drawPieStrike() {

                var maquinasSemStrike =  valoresKpi.totalMaquinas - valoresKpi.maquinasComStrike

                var data = google.visualization.arrayToDataTable([
                    ['Categoria', 'Quantidade de Strikes'],
                    ['Com Strike', valoresKpi.maquinasComStrike],
                    ['Sem Stike', maquinasSemStrike ]
                ]);

                var options = {
                    legend: 'none',
                    pieSliceText: 'none',
                    title: '',
                    pieHole: 0.5,
                    backgroundColor: {
                        fill: "#f5f5f5"
                    },
                    slices: {
                        0: { color: '#4E2F78' },
                        1: { color: '#BF80FF' },
                    },
                    width: '150',
                    height: '150'
                };
            
                var chart = new google.visualization.PieChart(document.getElementById('strikepie'));
                chart.draw(data, options);
                
            }

            
            var porcentagemComAlerta = (valoresKpi.maquinasComAlerta / valoresKpi.totalMaquinas * 100).toFixed(2);
            
            document.getElementById("porcentagem_disco").innerHTML = `${porcentagemComAlerta}%`

            function drawPieAlertaDisco() {
                var maquinasSemAlerta = valoresKpi.totalMaquinas - valoresKpi.maquinasComAlerta;

                var data = google.visualization.arrayToDataTable([
                    ['Categoria', 'Quantidade de Alerta'],
                    ['Com alerta', valoresKpi.maquinasComAlerta],
                    ['Sem alerta', maquinasSemAlerta]
                ]);
            
                var options = {
                    legend: 'none',
                    pieSliceText: 'none',
                    title: '',
                    pieHole: 0.5,
                    backgroundColor: {
                        fill: "#f5f5f5"
                    },
                    slices: {
                        0: { color: '#4E2F78' },
                        1: { color: '#BF80FF' },
                    },
                    width: '150',
                    height: '150'
                };
            
                var chart = new google.visualization.PieChart(document.getElementById('alertadiscopie'));
                chart.draw(data, options);
            
            }

            })
        }
    })
}


function strikeNoMes(opcao, idInstituicao){
    fetch(`/strikes/strikePMes/${opcao}/${idInstituicao}`)
    .then(response => {

        response.json().then(response=>{
            document.getElementById("qtd_mais_strikes").innerHTML = response[0].strikes
        })
    })
}

document.getElementById("1_mes").addEventListener("click", function() {
    strikeNoMes(1, idInstituicao);
  });

  document.getElementById("3_meses").addEventListener("click", function() {
    strikeNoMes(2, idInstituicao);
  });

  document.getElementById("6_meses").addEventListener("click", function() {
    strikeNoMes(3, idInstituicao);
  });