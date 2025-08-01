import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const MonthlyBarChart = ({ yearlyData, yearlyLabels }) => {
  const maxYearlyData = Math.max(...yearlyData.filter(value => value !== null)) + 5;

  const getGradient = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, '#A78F74');
    gradient.addColorStop(0.2, '#A78F74');
    gradient.addColorStop(1, '#6D3710');
    return gradient;
  };

  const data = {
    labels: yearlyLabels,
    datasets: [
      {
        label: 'Lessons Completed',
        data: yearlyData,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          return getGradient(ctx);
        },
        borderColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          return getGradient(ctx);
        },
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          color: '#A78F74'
        }
      },
      title: {
        display: true,
        align: 'center',
        font: {
          size: 21,
          weight: 'bold',
        },
        color: '#A78F74',
        text: "This Year",
      }
    },
    scales: {
      x: {
        beginAtZero: false,
        min: 0,
        ticks: {
          color: '#A78F74',
             font: {
          size: 14,
          weight: 'bold',
        },
        },
        border: {
          display: true,
          color: '#A78F74',
          width: 1.3
        },
        grid: {
          display: false,
        },
      },
      y: {
        display: true,
        beginAtZero: true,
        min: 0,
        max: maxYearlyData,
        ticks: {
          color: '#A78F74',
             font: {
          size: 14,
          weight: 'bold',
        },
        },
        border: {
          display: true,
          color: '#A78F74',
          width: 1.3
        },
        grid: {
          display: false,
        },
      }
    }
  };

  return (
    <div style={{ width: '90%', height: '100%' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MonthlyBarChart;