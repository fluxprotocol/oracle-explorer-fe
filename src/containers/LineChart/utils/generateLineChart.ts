import { ChartConfiguration } from 'chart.js'
import Chart from 'chart.js/auto';
import { ChartItem } from '../ChartItem';

function createChartDatasets(chartItems: ChartItem[]) {
    return chartItems.map((chartItem) => ({
        label: chartItem.label,
        data: chartItem.points,
        borderColor: chartItem.lineColor,
        backgroundColor: chartItem.lineColor,
        pointBorderWidth: '0',
        fill: chartItem.fill,
    }));
}

export function updateLineChart(chart: Chart, labels: string[], chartItems: ChartItem[]) {
    chart.data.labels = labels;
    chart.data.datasets = createChartDatasets(chartItems);

    Chart.defaults.plugins.tooltip.callbacks.label = (context) => {
        const label = context.dataset.label ?? '';
        const afterTextLabel = chartItems[context.datasetIndex]?.afterText ?? '';
        return `${label}: ${context.parsed.y} ${afterTextLabel}`;
    }

    chart.update();
}

export default function generateLineChart(canvas: HTMLCanvasElement, labels: string[], chartItems: ChartItem[]): Chart | null {
    const context = canvas.getContext('2d');
    if (!context) return null;

    Chart.defaults.plugins.tooltip.mode = 'index';
    Chart.defaults.plugins.tooltip.intersect = false;
    Chart.defaults.plugins.tooltip.callbacks.label = (context) => {
        const label = context.dataset.label ?? '';
        const afterTextLabel = chartItems[context.datasetIndex]?.afterText ?? '';
        return `${label} ${context.parsed.y} ${afterTextLabel}`;
    }

    const chartConfig: ChartConfiguration = {
        type: 'line',
        options: {
            responsive: true,
            animation: {
                duration: 0,
            },
        },
        data: {
            labels,
            datasets: createChartDatasets(chartItems),

            // [{
            //     label: 'payout',
            //     data: [1, 8, 10],
            //     barThickness: 1,
            //     showLine: true,
            //     fill: true,
            //     borderColor: '#f1f244',
            //     backgroundColor: '#f1f244',
            // }, {
            //     label: 'payout in usd',
            //     data: [10, 80, 100],
            // }],
        },
    };

    return new Chart(context, chartConfig);
}
