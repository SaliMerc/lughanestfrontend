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
        backgroundColor: '#8B7A58',
        borderColor: '#8B7A58',
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
          color: '#8B7A58'
        }
      },
      title: {
        display: true,
        align: 'center',
        font: {
          size: 21,
          weight: 'bold',
        },
        color: '#8B7A58',
        text: "This Week",
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
          color: '#8B7A58',
          width: 1.3,
          font: {
          size: 21,
          weight: 'bold',
        },
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
          color: '#A78F74',
          font: {
          size: 16,
          weight: 'bold',
        },
        },
        border: {
          display: true,
          color: '#A78F74',
          width: 1.3,
          font: {
          size: 21,
          weight: 'bold',
        },
        },
        grid: {
          display: true,
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