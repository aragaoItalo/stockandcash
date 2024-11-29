import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/sidebar'; // Componente Sidebar
import ResumoEstoque from './cards/resumoEstoque'; // Card de Resumo de Estoque
import Grafico from './cards/grafico'; // Card de Gráfico
import './Dashboard.css'; // Estilos
import UltimoProduto from './cards/ultimosProdutos';
import Categorias from './cards/categorias';
import PerfilOpt from './cards/perfilOpt';
import Balanco from './cards/balanco';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-main-content">
          <div className="storeName">
            <h1>Nome da sua loja</h1>
          </div>
        <div className="dashboard-opt">
          <PerfilOpt />
        </div>
        <div className="dashboard-cards">
          <Balanco />
          <ResumoEstoque />
          <Grafico />
          <UltimoProduto />
          <Categorias />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
