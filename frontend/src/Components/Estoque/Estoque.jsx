import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Estoque.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faHome, faList, faClipboard, faCalendarAlt, faCog, faPlus, faTrash, faEdit, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Estoque = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/produtos');
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    navigate('/adicionarProduto');
  };

  const handleEditProduct = () => {
    if (selectedProducts.length === 1) {
      const productToEdit = products.find((product) => product.id === selectedProducts[0]);
      if (productToEdit) {
        navigate(`/adicionarProduto/${productToEdit.id}`);
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
          await axios.delete(`http://localhost:3000/api/produtos/${id}`);
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
      <div className="sidebar">
        <FontAwesomeIcon icon={faDollarSign} className="plus-icon" />
        <FontAwesomeIcon icon={faHome} />
        <FontAwesomeIcon icon={faList} />
        <FontAwesomeIcon icon={faClipboard} />
        <FontAwesomeIcon icon={faCalendarAlt} />
        <FontAwesomeIcon icon={faCog} />
      </div>
      <div className="content">
        <div className="header">
          <h1>Gerenciamento de Produtos</h1>
          <div className="buttons">
            <button onClick={handleAddProduct}>
              <FontAwesomeIcon icon={faPlus} />
              Adicionar produtos
            </button>
            <button onClick={handleDeleteProduct}>
              <FontAwesomeIcon icon={faTrash} />
              Excluir produtos
            </button>
            <button onClick={handleEditProduct}>
              <FontAwesomeIcon icon={faEdit} />
              Editar produtos
            </button>
          </div>
          <div className="filter">
            <span>Filtrar</span>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>
        <table className="product-table">
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Nome do Produto</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Estoque</th>
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
                <td>
                  <img alt={product.nome} src={product.imagem} />
                </td>
                <td>{product.id}</td>
                <td>{product.nome}</td>
                <td>{product.categoria}</td>
                <td>{product.preco}</td>
                <td>{product.estoque}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Estoque;