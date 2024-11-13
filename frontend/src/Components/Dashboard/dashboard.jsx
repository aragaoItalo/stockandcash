import { useState } from 'react';
import { FaPlus, FaHome, FaListUl, FaClipboard, FaCog } from 'react-icons/fa';  // Usando os mesmos ícones
import { useNavigate } from 'react-router-dom'; // Importando useNavigate
import AdicionarProduto from '../adicionarProduto/cadastroProdutos';  // Importar o componente de AdicionarProduto
import ResumoEstoque from './cards/resumoEstoque';
import './Dashboard.css';
import Sidebar from '../Sidebar/sidebar';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);  // Controla a exibição do modal
  const [isPopupVisible, setPopupVisible] = useState(false); // Controlar o popup de logout
  const [isEditing, setIsEditing] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const navigate = useNavigate(); // Hook para navegação

  // Função para abrir o modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Função para alternar a visibilidade do popup de logout
  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  // Função para logout
  const handleLogout = () => {
    window.location.href = "/login"; // Redireciona para a tela de login
  };

  // Função para navegar até a página de estoque
  const handleGoToEstoque = () => {
    navigate('/estoque'); // Redireciona para a página de estoque
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard')
  }

  return (
    <div className="dashboard">
      <div className="">
        <Sidebar />
      </div>
          <div className="dashboard-main-content">
            <ResumoEstoque />
      </div>
        
    </div>
  );
};

export default Dashboard;
