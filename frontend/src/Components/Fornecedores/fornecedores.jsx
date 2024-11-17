import { useEffect, useState } from 'react';
import axios from 'axios';
import './fornecedores.css';
import AdicionarFornecedor from '../adicionarFornecedores/cadastroFornecedor';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaPlus, /*FaHome, FaListUl, FaClipboard, FaCog,*/ FaTrash, FaEdit, FaChevronDown } from 'react-icons/fa'; 
//import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/sidebar';

const Fornecedores = () => {
  const [supplier, setSupplier] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [supplierToEdit, setSupplierToEdit] = useState(null);
  //const [isPopupVisible, setIsPopupVisible] = useState(false);

  //const navigate = useNavigate();

  // Função para abrir o modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
/*
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
    navigate('/estoque');  // Redireciona para a página de estoque
  };
*/
  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await axios.get('http://localhost:3000/fornecedores');
        setSupplier(response.data);
      } catch (error) {
        console.error('Erro ao buscar fornecedores:', error);
      }
    };

    fetchSupplier();
  }, []);

  const handleEditSupplier = () => {
    if (selectedSupplier.length === 1) {
      const supplierToEdit = supplier.find((supplier) => supplier.id === selectedSupplier[0]);
      if (supplierToEdit) {
        setSupplierToEdit(supplierToEdit);
        setIsEditing(true);
        openModal();
      }
    } else {
      alert('Selecione apenas um fornecedor para editar.');
    }
  };

  const handleUpdateSupplier = async (fornecedorAtualizado) => {
    try {
      await axios.put(`http://localhost:3000/fornecedores/${fornecedorAtualizado.id}`, fornecedorAtualizado);
      setSupplier((prevSupplier) =>
        prevSupplier.map((supplier) =>
          supplier.id === fornecedorAtualizado.id ? fornecedorAtualizado : supplier
        )
      );

      setSelectedSupplier((prevSelectedSupplier) =>
        prevSelectedSupplier.filter((id) => id !== fornecedorAtualizado.id)
      );

      closeModal();
      setIsEditing(false);
      setSupplierToEdit(null);
    } catch (error) {
      console.error('Erro ao atualizar o fornecedor:', error);
      if(isEditing) {
        alert('Erro ao atualizar o fornecedor. Tente novamente.');
      }
    }
  };

  const handleDeleteSupplier = async () => {
    if (selectedSupplier.length === 0) {
      alert('Selecione pelo menos um fornecedor para excluir.');
      return;
    }
    
    for (let id of selectedSupplier) {
      // Localiza fornecedor pelo ID
      const fornecedor = supplier.find((sup) => sup.id === id);
      const nomeFornecedor = fornecedor?.nome || 'Fornecedor desconhecido';
  
      // Confirmação de exclusão com o nome do fornecedor
      const confirmed = window.confirm(`Você tem certeza que deseja excluir o fornecedor "${nomeFornecedor}" com ID ${id}?`);
      if (confirmed) {
        try {
          await axios.delete(`http://localhost:3000/fornecedores/${id}`);
          setSupplier(supplier.filter((sup) => sup.id !== id));
        } catch (error) {
          console.error(`Erro ao excluir o fornecedor com ID ${id}:`, error);
        }
      }
    }
  
    // Limpa seleção após a exclusão
    setSelectedSupplier([]);
  };

  const handleCheckboxChange = (supplierId) => {
    setSelectedSupplier((prevSelected) =>
      prevSelected.includes(supplierId)
        ? prevSelected.filter((id) => id !== supplierId)
        : [...prevSelected, supplierId]
    );
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      
      <Sidebar />

      {/* Content */}
      <div className="content">
        <div className="header">
          <h1>Fornecedores</h1>
          <div className="buttons">
            <button onClick={openModal}>
              <FaPlus />
              Adicionar fornecedores
            </button>
            <button onClick={handleDeleteSupplier}>
              <FaTrash />
              Excluir fornecedores
            </button>
            <button onClick={handleEditSupplier}>
              <FaEdit />
              Editar fornecedores
            </button>
          </div>
          <div className="filter">
            <span>Filtrar</span>
            <FaChevronDown />
          </div>
        </div>
        <table className="fornecedor-table">
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Nome</th>
              <th>CNPJ</th>
              <th>Email</th>
              <th>Telefone</th>
            </tr>
          </thead>
          <tbody>
            {supplier.map((supplier) => (
              <tr key={supplier.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedSupplier.includes(supplier.id)}
                    onChange={() => handleCheckboxChange(supplier.id)}
                  />
                </td>
                {/*<td>
                  <img alt={supplier.nome} src={supplier.imagem} />
                </td>*/}
                <td>{supplier.id}</td>
                <td>{supplier.nome}</td>
                <td>{supplier.cnpj}</td>
                <td>{supplier.email}</td>
                <td>{supplier.telefone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay-fornecedores">
          <div className="modal-content-fornecedores">
            <AdicionarFornecedor
              supplier={isEditing ? supplierToEdit : null}
              isEditing={isEditing}
              onClose={closeModal}
              onSave={handleUpdateSupplier}
            />
            <button className="close-modal-btn-fornecedores" onClick={closeModal}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fornecedores;