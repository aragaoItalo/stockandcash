import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaBox, FaListUl, FaClipboard, FaCog, } from 'react-icons/fa';
import './sidebar.css';
import AdicionarProduto from '../adicionarProduto/cadastroProdutos';

const Sidebar = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const navigate = useNavigate();

  // Função para abrir o modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Função para exibir ou esconder o popup
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  // Função de logout
  const handleLogout = () => {
    console.log('Logout');
    navigate('/login');
  };

  // Função para navegar até a página de estoque
  const handleGoToEstoque = () => {
    navigate('/estoque'); // Redireciona para a página de estoque
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard')
  }

  return (
    <div>
      <div className="dashboard-sidebar">
        <div className="dashboard-items">
          <ul className='dash-list'>
            <li>
              <button  onClick={handleGoToDashboard} className='sidebar-btn'>
                <img src="src/assets/logo.png" alt="Logo" className='sidebar-logo' />
              </button>
            </li>
            <li>
              <button className="sidebar-button" onClick={openModal}>
                <FaPlus className="fa-plus-icon" /> {/* Ícone de Adicionar Produto */}
              </button>
            </li>
            <li>
              <button className='sidebar-button' onClick={handleGoToEstoque}>
                <FaBox />
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

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <AdicionarProduto 
              product={isEditing ? productToEdit : null}
              isEditing={isEditing}
              onClose={closeModal}
              onSave={handleUpdateProduct}
            />
            <button className="close-modal-btn" onClick={closeModal}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
