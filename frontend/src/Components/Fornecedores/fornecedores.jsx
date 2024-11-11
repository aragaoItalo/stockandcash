import { useEffect, useState } from 'react';
import axios from 'axios';
import './fornecedores.css';
import AdicionarProduto from '../adicionarProduto/cadastroProdutos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaPlus, FaHome, FaListUl, FaClipboard, FaCog, FaTrash, FaEdit, FaChevronDown } from 'react-icons/fa';  // Usando os mesmos ícones
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/sidebar';

const Fornecedores = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

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
    navigate('/estoque');  // Redireciona para a página de estoque
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/produtos');
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleEditProduct = () => {
    if (selectedProducts.length === 1) {
      const productToEdit = products.find((product) => product.id === selectedProducts[0]);
      if (productToEdit) {
        setProductToEdit(productToEdit);
        setIsEditing(true);
        openModal();
      }
    } else {
      alert('Selecione apenas um produto para editar.');
    }
  };

  const handleDeleteProduct = async () => {
    if (selectedProducts.length === 0) {
      alert('Selecione pelo menos um produto para excluir.');
      return;
    }
    // Confirmação de exclusão
    for (let id of selectedProducts) {
      const confirmed = window.confirm(`Você tem certeza que deseja excluir o produto com ID ${id}?`);
      if (confirmed) {
        try {
          await axios.delete(`http://localhost:3000/produtos/${id}`);
          setProducts(products.filter((product) => product.id !== id));
        } catch (error) {
          console.error(`Erro ao excluir o produto com ID ${id}:`, error);
        }
      }
    }
    // Limpa seleção após a exclusão
    setSelectedProducts([]);
  };

  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
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
            <button onClick={handleDeleteProduct}>
              <FaTrash />
              Excluir fornecedores
            </button>
            <button onClick={handleEditProduct}>
              <FaEdit />
              Editar fornecedores
            </button>
          </div>
          <div className="filter">
            <span>Filtrar</span>
            <FaChevronDown />
          </div>
        </div>
        <table className="product-table">
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Nome</th>
              <th>Contato</th>
              <th>Telefone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleCheckboxChange(product.id)}
                  />
                </td>
                {/*<td>
                  <img alt={product.nome} src={product.imagem} />
                </td>*/}
                <td>{product.id}</td>
                <td>{product.nome}</td>
                <td>{product.categoria}</td>
                <td>{product.preco}</td>
                <td>{product.quantidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <AdicionarProduto 
              product={isEditing ? productToEdit : null}
              isEditing={isEditing}
              onClose={closeModal}
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

export default Fornecedores;