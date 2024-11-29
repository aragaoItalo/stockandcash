import { useEffect, useState } from 'react';
import axios from 'axios';
import './fornecedores.css';
import AdicionarFornecedor from '../adicionarFornecedores/cadastroFornecedor';
import { FaPlus, FaTrash, FaEdit, /*FaChevronDown*/ } from 'react-icons/fa'; 
import Sidebar from '../Sidebar/sidebar';
import Swal from 'sweetalert2';


const Fornecedores = () => {
  const [supplier, setSupplier] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [supplierToEdit, setSupplierToEdit] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
      Swal.fire({
        text: 'Selecione apenas um fornecedor para editar.',
        icon: 'warning',
        confirmButtonText: 'Fechar',
    });
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
        Swal.fire({
          text: 'Erro ao atualizar o fornecedor. Tente novamente.',
          icon: 'error',
          confirmButtonText: 'Fechar',
      });
    }
  };

  const handleDeleteSupplier = async () => {
    if (selectedSupplier.length === 0) {
      Swal.fire({
        text: 'Selecione pelo menos um fornecedor para excluir.',
        icon: 'warning',
        confirmButtonText: 'Fechar',
      });
      return;
    }
  
    for (let id of selectedSupplier) {
      const fornecedor = supplier.find((sup) => sup.id === id);
      const nomeFornecedor = fornecedor?.nome || 'Fornecedor desconhecido';
      const result = await Swal.fire({
        text: `Você tem certeza que deseja excluir o fornecedor "${nomeFornecedor}" com ID ${id}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Excluir',
        cancelButtonText: 'Cancelar',
      });
  
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3000/fornecedores/${id}`);
          setSupplier(supplier.filter((sup) => sup.id !== id));
        } catch (error) {
          Swal.fire({
            text: `Erro ao excluir o fornecedor "${nomeFornecedor}" com ID ${id}. Tente novamente mais tarde.`,
            icon: 'error',
            confirmButtonText: 'Fechar',
          });
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
      <div className="content-fornecedores">
        <div className="header-fornecedores">
          <h1>Fornecedores</h1>
          <div className="buttons-fornecedores">
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
          {/*</div>
            
            <div className="filter">
            <span>Filtrar</span>
            <FaChevronDown />
            */}
          </div>
        </div>
        <table className="fornecedor-table">
          <thead>
            <tr className="teste-table">
              <th></th>
              <th>ID</th>
              <th>Nome</th>
              <th>CNPJ</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Produtos</th>
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
                <td>{supplier.id}</td>
                <td>{supplier.nome}</td>
                <td>{supplier.cnpj}</td>
                <td>{supplier.email}</td>
                <td>{supplier.telefone}</td>
                <td>
                  {supplier.produtos && supplier.produtos.length > 0 ? (
                    <ul>
                      {supplier.produtos.map((product) => (
                        <li key={product.id}>
                          {product.nome} {/*- {product.preco.toFixed(2)}*/}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span>Não há produtos registrados</span>
                  )}
                </td>
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