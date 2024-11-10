import { useState } from 'react';
import { FaPlus, FaHome, FaListUl, FaClipboard, FaCog } from 'react-icons/fa';  // Usando os mesmos ícones
import { useNavigate } from 'react-router-dom'; // Importando useNavigate
import AdicionarProduto from '../adicionarProduto/cadastroProdutos';  // Importar o componente de AdicionarProduto
import './Dashboard.css';

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

  return (
    <div className="dashboard">
      <div className="dashboard-sidebar">
        <div className="dashboard-items">
          <ul className='dash-list'>
            <li>
              <a href="#!">
                <img src="src/assets/logo.png" alt="Logo" className='sidebar-logo' />
              </a>
            </li>
            <li>
              <button className="sidebar-button" onClick={openModal}>
                <FaPlus className="fa-plus-icon" /> {/* Ícone de Adicionar Produto */}
              </button>
            </li>
            <li>
              <button className='sidebar-button' onClick={handleGoToEstoque}>
                <FaHome /> {/* Ícone para voltar para o Estoque */}
              </button>
            </li>
            <li>
              <button className='sidebar-button'>
                <FaListUl />
              </button>
            </li>
            <li>
              <button className='sidebar-button'>
                <FaClipboard />
              </button>
            </li>
          </ul>
        </div>
        <div className="dashboard-footer">
          <button className='sidebar-button' onClick={togglePopup}>
            <FaCog className="fa-cog-icon" />
          </button>
          <div className={`popup ${isPopupVisible ? 'show' : 'hide'}`}>
            <p onClick={handleLogout}>Sair da Conta</p>
          </div>
        </div>
      </div>

      {/* Modal Adicionar Produto */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <AdicionarProduto 
              product={isEditing ? productToEdit : null}
              isEditing={isEditing}
              onClose={closeModal}
            />  {/* Exibe o formulário de Adicionar Produto */}
            <button className="close-modal-btn" onClick={closeModal}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
