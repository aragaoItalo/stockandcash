import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/sidebar'; // Componente Sidebar
import ResumoEstoque from './cards/resumoEstoque'; // Card de Resumo de Estoque
import Grafico from './cards/grafico'; // Card de Gráfico
import './Dashboard.css'; // Estilos

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-main-content">
        <div className="dashboard-cards">
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
