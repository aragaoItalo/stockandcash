import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './Grafico.css'; 

ChartJS.register(ArcElement, Tooltip, Legend);

const Grafico = () => {
  const [data, setData] = useState({
    labels: ['Produto A', 'Produto B', 'Produto C', 'Produto D'],
    datasets: [
      {
        data: [10, 20, 30, 40],
        backgroundColor: ['#6a0dad', '#D51EDC', '#248CD8', '#2830DC'],
      },
    ],
  });

  useEffect(() => {
    setTimeout(() => {
      setData(prevData => ({
        ...prevData,
        datasets: [
          {
            ...prevData.datasets[0],
            data: [25, 15, 40, 20],
          },
        ],
      }));
    }, 3000);
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: tooltipItem => `${tooltipItem.label}: ${tooltipItem.raw}%`,
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="grafico-container">
      <div className="grafico-card">
        <Pie data={data} options={options} />
      </div>
      <div className="grafico-legend">
        {data.labels.map((label, index) => (
          <div key={index}>
            <div
              className="color-box"
              style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
            ></div>
            Produto {label.split(' ')[1]}: <span>{data.datasets[0].data[index]}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grafico;
