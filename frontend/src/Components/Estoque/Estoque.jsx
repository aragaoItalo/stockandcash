import React from 'react';
import './Estoque.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faHome, faList, faClipboard, faCalendarAlt, faCog, faPlus, faTrash, faEdit, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Estoque = () => {
  const products = [
    {
      id: 1,
      name: 'Heineken Long Neck',
      category: 'Cerveja',
      price: '36,80',
      stock: 22,
      image: 'https://placehold.co/50x50',
    },
    {
      id: 2,
      name: 'Tanqueray',
      category: 'Gin',
      price: '25,90',
      stock: 8,
      image: 'https://placehold.co/50x50',
    },
    {
      id: 3,
      name: '51 ICE Limão',
      category: 'Vodka',
      price: '6,50',
      stock: 36,
      image: 'https://placehold.co/50x50',
    },
    {
      id: 4,
      name: 'CanelaZinha',
      category: 'Cachaça',
      price: '59,70',
      stock: 3,
      image: 'https://placehold.co/50x50',
    },
  ];

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
            <button>
              <FontAwesomeIcon icon={faPlus} />
              Adicionar produtos
            </button>
            <button>
              <FontAwesomeIcon icon={faTrash} />
              Excluir produtos
            </button>
            <button>
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
                  <input type="checkbox" />
                </td>
                <td>
                  <img alt={product.name} src={product.image} />
                </td>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Estoque;