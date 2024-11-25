import { useEffect, useState } from 'react';
import axios from 'axios';
import './Estoque.css';
import AdicionarProduto from '../adicionarProduto/cadastroProdutos';
import { FaPlus, FaTrash, FaEdit, /*FaChevronDown*/ } from 'react-icons/fa';
import Sidebar from '../Sidebar/sidebar';
import Swal from 'sweetalert2';


const Estoque = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const categoriasMap = {
    1: 'Bebidas',
    2: 'Comidas',
    3: 'Outros',
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
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
      Swal.fire({
        text: 'Selecione apenas um produto para editar.',
        icon: 'warning',
        confirmButtonText: 'Fechar',
    });
    }
  };

  const handleUpdateProduct = async (produtoAtualizado) => {
    try {
      await axios.put(`http://localhost:3000/produtos/${produtoAtualizado.id}`, produtoAtualizado);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === produtoAtualizado.id ? produtoAtualizado : product
        )
      );

      setSelectedProducts((prevSelectedProducts) =>
        prevSelectedProducts.filter((id) => id !== produtoAtualizado.id)
      );

      closeModal();
      setIsEditing(false);
      setProductToEdit(null);
    } catch (error) {
      console.error('Erro ao atualizar o produto:', error);
      if(isEditing) {
        Swal.fire({
          text: 'Erro ao atualizar o produto. Tente novamente.',
          icon: 'error',
          confirmButtonText: 'Fechar',
      });
      }
    }
  };

  const handleDeleteProduct = async () => {
    if (selectedProducts.length === 0) {
      Swal.fire({
        text: 'Selecione pelo menos um produto para excluir.',
        icon: 'warning',
        confirmButtonText: 'Fechar',
      });
      return;
    }
  
    for (let id of selectedProducts) {
      const productToDelete = products.find((product) => product.id === id);
      if (productToDelete) {
        const result = await Swal.fire({
          text: `Você tem certeza que deseja excluir o produto "${productToDelete.nome}" com ID ${id}?`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Excluir',
          cancelButtonText: 'Cancelar',
        });
  
        if (result.isConfirmed) {
          try {
            await axios.delete(`http://localhost:3000/produtos/${id}`);
            setProducts(products.filter((product) => product.id !== id));
          } catch (error) {
            console.error(`Erro ao excluir o produto com ID ${id}:`, error);
          }
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
          <h1>Estoque</h1>
          <div className="buttons">
            <button onClick={openModal}>
              <FaPlus />
              Adicionar produtos
            </button>
            <button onClick={handleDeleteProduct}>
              <FaTrash />
              Excluir produtos
            </button>
            <button onClick={handleEditProduct}>
              <FaEdit />
              Editar produtos
            </button>
          {/*</div>
          <div className="filter">
            <span>Filtrar</span>
            <FaChevronDown />
            */}
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
              <th>Quantidade</th>
              <th>Fornecedor</th>
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
                <td>{product.id}</td>
                <td>{product.nome}</td>
                <td>{categoriasMap[product.categoria] || 'Categoria não definida'}</td>
                <td>{formatPrice(product.preco)}</td>
                <td>{product.quantidade}</td>
                <td>{product.fornecedor?.nome || 'Fornecedor não definido'}</td>
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

export default Estoque;