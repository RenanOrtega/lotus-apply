google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawCharts);

async function drawCharts() {
    const positionsResponse = await fetch('https://lotus-apply-backend.vercel.app/positions');
    const positionsData = await positionsResponse.json();

    const elosResponse = await fetch('https://lotus-apply-backend.vercel.app/elos');
    const elosData = await elosResponse.json();

    const positionsChartData = new google.visualization.DataTable();
    positionsChartData.addColumn('string', 'Lane');
    positionsChartData.addColumn('number', 'Quantidade');
    for (const [key, value] of Object.entries(positionsData)) {
        positionsChartData.addRow([key.charAt(0).toUpperCase() + key.slice(1), value]);
    }

    const positionsChartOptions = {
        title: 'Distribuição de Lanes',
        backgroundColor: 'transparent',
        width: 500,
        is3D: true
    };

    const positionsChart = new google.visualization.PieChart(document.getElementById('positions-chart'));
    positionsChart.draw(positionsChartData, positionsChartOptions);

    const elosChartData = new google.visualization.DataTable();
    elosChartData.addColumn('string', 'Elo');
    elosChartData.addColumn('number', 'Quantidade');
    for (const [key, value] of Object.entries(elosData)) {
        elosChartData.addRow([key.charAt(0).toUpperCase() + key.slice(1), value]);
    }

    const elosChartOptions = {
        title: 'Distribuição de Elo',
        backgroundColor: 'transparent',
        width: 500,
        is3D: true
    };

    const elosChart = new google.visualization.PieChart(document.getElementById('elos-chart'));
    elosChart.draw(elosChartData, elosChartOptions);
}