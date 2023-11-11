
var idInstituicao = localStorage.getItem("instituicao")

function handleChartBtn(btnId) {
    if (!document.getElementById(btnId).classList.contains('chart-btn-active')) {

        document.getElementsByClassName('chart-btn-active')[0].classList.remove('chart-btn-active');
        document.getElementById(btnId).classList.add('chart-btn-active');

    }
}

google.charts.load("current", { packages: ["corechart", "bar"] });

google.charts.setOnLoadCallback(() => {
    drawPieAlertaDisco();
    drawColumnCPURAM();
});



function drawPieAlertaDisco() {
    var data = google.visualization.arrayToDataTable([
        ['Categoria', 'Quantidade de Alerta'],
        ['Acima de 80%', 8],
        ['Abaixo de 80%', 2]
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

function drawColumnCPURAM() {
    var data = google.visualization.arrayToDataTable([
        ['Máquina', 'CPU', 'RAM', { role: 'style' }],
        ['Máquina 01', 80, 40, '#BF80FF'],
        ['Máquina 02', 95, 45, '#BF80FF'],
        ['Máquina 03', 60, 95, '#BF80FF'],
        ['Máquina 04', 82, 65, '#BF80FF'],
        ['Máquina 05', 80, 40, '#BF80FF'],
        ['Máquina 06', 95, 45, '#BF80FF'],
        ['Máquina 07', 60, 95, '#BF80FF'],
        ['Máquina 08', 82, 65, '#BF80FF'],
    ]);

    var options = {
        chart: {
            title: '',
            subtitle: '',
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


document.addEventListener("DOMContentLoaded", ()=>{
    getStrikesSemana(idInstituicao),
    getInstInfos(idInstituicao),
    getAlertasSemana(idInstituicao),
    porcentagemStrikes(idInstituicao),
    strikeNoMes(idInstituicao, 1)
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

function getStrikesSemana(idInstituicao){
    var spanStrike = document.getElementById("qtd_strike_semana");

    fetch(`/strikes/getStrikes/${idInstituicao}`)
    .then((qtdStrikesSemana) => {
        qtdStrikesSemana.json().then((qtdStrikesSemana)=>{

            spanStrike.innerHTML = qtdStrikesSemana[0].total_strikes;
        })
        
    })
}



function getAlertasSemana(idInstituicao){
    var spanAlertas = document.getElementById("qtd_alertas_semana");

    fetch(`/strikes/getAlertas/${idInstituicao}`)
    .then((qtdAlertasSemana) => {
        qtdAlertasSemana.json().then((qtdAlertasSemana)=>{  
            spanAlertas.innerHTML = qtdAlertasSemana[0].total_alertas;
        })
        
    })
}


function porcentagemStrikes(idInstituicao){
    fetch(`/maquinas/porcentagemStrikesMaquina/${idInstituicao}`)
    .then((porcentagemStrikes) => {
        var porcentagemStrike = document.getElementById("porcentagem_strikes")

        porcentagemStrikes.json().then((porcentagemStrikes)=>{
            
            porcentagemStrike.innerHTML = `${porcentagemStrikes[0].porcentagem_maquinas_com_strikes}%`

            google.charts.setOnLoadCallback(() => {
                drawPieStrike();
            });

            function drawPieStrike() {

                var data = google.visualization.arrayToDataTable([
                    ['Categoria', 'Quantidade de Strikes'],
                    ['Com Strike', porcentagemStrikes[0].maquinas_com_strikes],
                    ['Sem Stike', porcentagemStrikes[0].total_maquinas]
                ]);

                console.log(porcentagemStrikes[0].maquinas_com_strikes, porcentagemStrikes[0].total_maquinas, porcentagemStrikes[0].porcentagem_maquinas_com_strikes);
            
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

        })
    })
}


//Rever, banco de dados tem bo nesse select
function porcentagemMaquinasAcima(idInstituicao){
    fetch(`/maquinas/porcentagemMaquinasAcima/${idInstituicao}`)
    .then((porcentagemMaquina)=>{
        var porcentagem = document.getElementById("porcentagem_disco")
        
        porcentagemMaquina.json().then((porcentagemMaquina)=>{
            porcentagem.innerHTML = `${porcentagemMaquina[0].maquinas_acima_limite}%`
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

function strikeNoMes(opcao, idInstituicao){
    fetch(`/strikes/strikePMes/${opcao}/${idInstituicao}`)
    .then(response => {
        document.getElementById("qtd_mais_strikes").innerHTML = ""

        response.json().then(response=>{
            document.getElementById("qtd_mais_strikes").innerHTML = response[0].strikes_semana
        })
    })
}