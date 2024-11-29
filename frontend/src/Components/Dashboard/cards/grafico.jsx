import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './Grafico.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const Grafico = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#6a0dad', '#D51EDC', '#248CD8', '#2830DC'], // Ajuste de cores para 4 itens
      },
    ],
  });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/produtos'); // Endpoint para buscar os produtos
        const produtos = response.data;

        // Ordenar produtos pela quantidade e selecionar os 4 maiores
        const topProdutos = produtos
          .sort((a, b) => b.quantidade - a.quantidade)
          .slice(0, 4);

        // Atualizar dados do gráfico
        setData({
          labels: topProdutos.map((produto) => produto.nome),
          datasets: [
            {
              data: topProdutos.map((produto) => produto.quantidade),
              backgroundColor: ['#6a0dad', '#D51EDC', '#248CD8', '#2830DC'], // Cores ajustadas
            },
          ],
        });
      } catch (error) {
        console.error('Erro ao buscar os dados dos produtos:', error);
      }
    };

    fetchProductData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
      legend: {
        display: false, // Oculta legenda embutida
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
            {label}: {data.datasets[0].data[index]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grafico;
