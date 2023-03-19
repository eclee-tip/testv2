import React from 'react';
import './App.css';
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
)

function App() {
  const data = {
    labels: ['1','2','3'],
    datasets: [{
      label: 'Numbers',
      data: [10,6,9],
      backgroundColor: 'red',
      borderColor: 'black',
      pointBorderColor: 'aqua',
      fill: true,
      tension: 0.4
      }
    ]
  }

  const options = {
    plugins: {
      legend: true
    },
    scales: {
      y: {
        // min: 3,
        // max: 50
      }
    }
  }

  return (
    <div>
      <h1>Temperature Readings</h1>
      <div style={
        {
        width: '600px',
        height: '300px',
        padding: '20px'
        }
      }>
      <Line
        data={data}
        options={options}
      ></Line>
      </div>
    </div>
  );
}

export default App;
