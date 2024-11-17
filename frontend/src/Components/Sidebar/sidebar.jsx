import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaBox, FaListUl, FaClipboard, FaCog } from 'react-icons/fa';
import './sidebar.css';
import AdicionarProduto from '../adicionarProduto/cadastroProdutos';
import AdicionarFornecedor from '../adicionarFornecedores/cadastroFornecedor';

const Sidebar = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const navigate = useNavigate();

  // abre o modal com tipo especifico
  const openModal = (type, data = null) => {
    setModalType(type);
    setDataToEdit(data);
    setIsEditing(!!data);
    setIsModalOpen(true);
  };

  // fecha o modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setDataToEdit(null);
  };

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleLogout = () => {
    console.log('Logout');
    navigate('/login');
  };

  const handleGoToEstoque = () => navigate('/estoque');
  const handleGoToDashboard = () => navigate('/dashboard');

  return (
    <div>
      <div className="dashboard-sidebar">
        <div className="dashboard-items">
          <ul className="dash-list">
            <li>
              <button onClick={handleGoToDashboard} className="sidebar-btn">
                <img src="src/assets/logo.png" alt="Logo" className="sidebar-logo" />
              </button>
            </li>
            <li>
              <button className="sidebar-button" onClick={() => openModal('product')}>
                <FaPlus className="fa-plus-icon" /> {/* Ícone de Adicionar Produto */}
              </button>
            </li>
            <li>
              <button className="sidebar-button" onClick={handleGoToEstoque}>
                <FaBox />
              </button>
            </li>
            <li>
              <button className="sidebar-button">
                <FaListUl />
              </button>
            </li>
            <li>
              <button className="sidebar-button">
                <FaClipboard />
              </button>
            </li>
          </ul>
        </div>
        <div className="dashboard-footer">
          <button className="sidebar-button" onClick={togglePopup}>
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
            {modalType === 'product' && (
              <AdicionarProduto
                product={isEditing ? dataToEdit : null}
                isEditing={isEditing}
                onClose={closeModal}
              />
            )}
            {modalType === 'supplier' && (
              <AdicionarFornecedor
                supplier={isEditing ? dataToEdit : null}
                isEditing={isEditing}
                onClose={closeModal}
              />
            )}
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
