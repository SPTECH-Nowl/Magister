function handleChartBtn(btnId) {
    if (!document.getElementById(btnId).classList.contains('chart-btn-active')) {

        document.getElementsByClassName('chart-btn-active')[0].classList.remove('chart-btn-active');
        document.getElementById(btnId).classList.add('chart-btn-active');

    }
}

google.charts.load("current", { packages: ["corechart", "bar"] });

google.charts.setOnLoadCallback(() => {
    drawPieStrike();
    drawPieAlertaDisco();
    drawColumnCPURAM();
});

function drawPieStrike() {
    var data = google.visualization.arrayToDataTable([
        ['Categoria', 'Quantidade de Strikes'],
        ['Com Strike', 7],
        ['Sem Stike', 2]
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
            1: { color: 'transparent' },
        },
        width: '150',
        height: '150'
    };

    var chart = new google.visualization.PieChart(document.getElementById('strikepie'));
    chart.draw(data, options);

}

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
            1: { color: 'transparent' },
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