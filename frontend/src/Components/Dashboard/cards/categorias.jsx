import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './categorias.css';

// Registrar componentes necessários do ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Categorias = () => {
  const [graficoData] = useState({
    labels: ['Bebidas', 'Comidas', 'Outros'], // Rótulos do eixo X
    datasets: [
      {
        label: 'Produtos por Categoria',
        data: [15, 25, 10], // Dados do gráfico
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF'], // Cores das barras
        borderColor: ['#FF5733', '#33FF57', '#3357FF'], // Cores da borda das barras
        borderWidth: 1, // Largura da borda
      },
    ],
  });

  const graficoOptions = {
    responsive: true, // Torna o gráfico responsivo
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw} produtos`,
        },
      },
      legend: {
        display: false, // Esconde a legenda
      },
    },
    scales: {
      x: {
        beginAtZero: true, // Começar o eixo X no zero
      },
      y: {
        beginAtZero: true, // Começar o eixo Y no zero
      },
    },
  };

  return (
    <div className="grafico-categoria-container">
        <h5 className="categoria-title">Demanda:</h5>
      <Bar data={graficoData} options={graficoOptions} />
    </div>
  );
};

export default Categorias;
