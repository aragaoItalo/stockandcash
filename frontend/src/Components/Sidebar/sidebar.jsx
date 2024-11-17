import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaBox, FaListUl, FaClipboard, FaCog } from 'react-icons/fa';
import './sidebar.css';
import AdicionarProduto from '../adicionarProduto/cadastroProdutos';
import AdicionarFornecedor from '../adicionarFornecedores/cadastroFornecedor';

const Sidebar = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const navigate = useNavigate();

    // Abrir o seletor para escolher Produto ou Fornecedor
    const openSelector = () => {
      setIsSelectorOpen(true);
    };
  
    // Fechar o seletor
    const closeSelector = () => {
      setIsSelectorOpen(false);
    };
  
    // Abrir o modal correto após a seleção
    const handleSelectType = (type) => {
      setModalType(type);
      setIsEditing(false); // Garantir que não estamos editando
      setDataToEdit(null); // Resetar dados anteriores
      setIsSelectorOpen(false); // Fechar o seletor
      setIsModalOpen(true); // Abrir o modal
    };

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
              <button className="sidebar-button" onClick={openSelector}>
                <FaPlus className="fa-plus-icon" /> {/* Ícone de Adicionar*/}
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

      {/* Janela de seleção */}
      {isSelectorOpen && (
        <div className="modal-overlay">
          <div className="selector-modal">
            <h3>Escolha uma opção</h3>
            <button onClick={() => handleSelectType('product')} className="selector-button">
              Adicionar Produto
            </button>
            <button onClick={() => handleSelectType('supplier')} className="selector-button">
              Adicionar Fornecedor
            </button>
            <button onClick={closeSelector} className="close-selector-btn">
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal para Produto ou Fornecedor */}
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