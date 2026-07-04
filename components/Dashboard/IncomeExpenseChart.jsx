'use client';

import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default function IncomeExpenseChart({ dark }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    const gradientIncome = ctx.createLinearGradient(0, 0, 0, 400);
    gradientIncome.addColorStop(0, 'rgba(0, 80, 203, 0.1)');
    gradientIncome.addColorStop(1, 'rgba(0, 80, 203, 0)');

    const gradientExpenses = ctx.createLinearGradient(0, 0, 0, 400);
    gradientExpenses.addColorStop(0, 'rgba(163, 50, 0, 0.05)');
    gradientExpenses.addColorStop(1, 'rgba(163, 50, 0, 0)');

    function getChartOptions(isDark) {
      const textColor = isDark ? '#c2c6d8' : '#727687';
      const gridColor = isDark ? 'rgba(194, 198, 216, 0.08)' : 'rgba(114, 118, 135, 0.1)';
      return {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: 'index' },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(11, 28, 48, 0.95)',
            titleColor: '#eaf1ff',
            bodyColor: '#c2c6d8',
            borderColor: '#2a3a4e',
            borderWidth: 1,
            padding: 12,
            boxPadding: 6,
            usePointStyle: true,
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                if (label) label += ': ';
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(context.parsed.y);
                }
                return label;
              },
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { family: 'Geist', size: 12 }, color: textColor },
          },
          y: {
            grid: { color: gridColor, drawBorder: false },
            ticks: {
              font: { family: 'Geist', size: 12 },
              color: textColor,
              callback: function (value) { return '$' + value / 1000 + 'k'; },
            },
          },
        },
      };
    }

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Income',
            data: [7200, 7500, 8200, 8000, 8200, 8500],
            borderColor: '#0050cb',
            backgroundColor: gradientIncome,
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: '#ffffff',
            pointHoverBorderColor: '#0050cb',
            pointHoverBorderWidth: 2,
          },
          {
            label: 'Expenses',
            data: [3100, 4200, 3800, 3200, 3450, 3100],
            borderColor: '#a33200',
            backgroundColor: gradientExpenses,
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: '#ffffff',
            pointHoverBorderColor: '#a33200',
            pointHoverBorderWidth: 2,
          },
        ],
      },
      options: getChartOptions(dark),
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;
    const isDark = dark;
    const textColor = isDark ? '#c2c6d8' : '#727687';
    const gridColor = isDark ? 'rgba(194, 198, 216, 0.08)' : 'rgba(114, 118, 135, 0.1)';
    chartRef.current.options.scales.x.ticks.color = textColor;
    chartRef.current.options.scales.y.ticks.color = textColor;
    chartRef.current.options.scales.y.grid.color = gridColor;
    chartRef.current.update();
  }, [dark]);

  return <canvas ref={canvasRef} id="incomeExpensesChart" />;
}
