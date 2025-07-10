import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const WeeklyLineChart = ({ weeklyData, weeklyLabels }) => {
  const maxWeeklyData = Math.max(...weeklyData.filter(value => value !== null)) + 5;
  
  const data = {
    labels: weeklyLabels,
    datasets: [
      {
        label: 'Lessons completed',
        data: weeklyData,
        backgroundColor: '#E3E0C0',
        borderColor: '#E3E0C0',
        borderWidth: 1,
        spanGaps: true,
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
          color: '#E3E0C0'
        }
      },
      title: {
        display: true,
        align: 'center',
        font: {
          size: 21,
          weight: 'bold',
        },
        color: '#E3E0C0',
        text: "This Week",
      }
    },
    scales: {
      x: {
        beginAtZero: false,
        min: 0,
        ticks: {
          color: '#E3E0C0'
        },
        grid: {
          color: '#a38e8e'
        }
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: maxWeeklyData,
        ticks: {
          color: '#E3E0C0'
        },
        grid: {
          display: false,
        },
      }
    }
  };

  return (
    <div style={{ width: '90%', height: '100%' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default WeeklyLineChart;