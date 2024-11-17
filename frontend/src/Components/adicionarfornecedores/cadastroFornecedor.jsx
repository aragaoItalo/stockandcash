import { useState } from 'react';
import PropTypes from 'prop-types';
import './cadastroFornecedor.css';

function AdicionarFornecedor({ supplier, isEditing, onClose, onSave }) {
  const [nome, setNome] = useState(supplier?.nome || '');
  const [endereco, setEndereco] = useState(supplier?.endereco || '');
  const [cnpj, setCnpj] = useState(supplier?.cnpj || '');
  const [email, setEmail] = useState(supplier?.email || '');
  const [telefone, setTelefone] = useState(supplier?.telefone || '');
  const [produtos, setProdutos] = useState(supplier?.produtos || []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome || !endereco || !cnpj || !email || !telefone) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const fornecedorAtualizado = {
      id: supplier?.id,
      nome,
      endereco,
      cnpj,
      email,
      telefone,
      produtos,
    };

    if (isEditing) {
      onSave(fornecedorAtualizado);
      alert(`Fornecedor "${nome}" atualizado com sucesso!`);
      onClose();
    } else {
      // Adicionando fornecedor
      fetch('http://localhost:3000/fornecedores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fornecedorAtualizado),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro ao cadastrar o fornecedor');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Fornecedor cadastrado:', data);
          alert(`Fornecedor "${data.nome}" cadastrado com sucesso!`);
        })
        .catch((error) => {
          console.error('Erro ao cadastrar o fornecedor:', error);
          alert('Erro ao cadastrar o fornecedor. Tente novamente!');
        });
    }

    setNome('');
    setEndereco('');
    setCnpj('');
    setEmail('');
    setTelefone('');
    setProdutos([]);
    
    onClose();

  };

  return (
    <div className="adicionar-fornecedor">
      <h2>{isEditing ? 'Editar Fornecedor' : 'Adicionar Fornecedor'}</h2>

      <form className="fornecedor-form" onSubmit={handleSubmit}>
        <div className="input-group-fornecedor">
          <label>Nome</label>
          <input
            type="text"
            placeholder="Nome do Fornecedor"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          
        </div>
        
        <div className="input-group-fornecedor">
          <label>Endereço</label>
          <input
            type="text"
            placeholder="Endereço"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
        </div>

        <div className="input-group-fornecedor">
          <label>CNPJ</label>
          <input
            type="text"
            placeholder="CNPJ"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
          />
        </div>

        <div className="input-group-fornecedor">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group-fornecedor">
          <label>Telefone</label>
          <input
            type="text"
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>

        
        <button type="submit" className="confirm-button-fornecedor">
          {isEditing ? 'Salvar Alterações' : 'Registrar Fornecedor'}
        </button>
      </form>
    </div>
  );
};

// Validação das props
AdicionarFornecedor.propTypes = {
  supplier: PropTypes.shape({
    id: PropTypes.number,
    nome: PropTypes.string,
    endereco: PropTypes.string,
    cnpj: PropTypes.string,
    email: PropTypes.string,
    telefone: PropTypes.string,
    produtos: PropTypes.string, // ou array se for um array de produtos
    /*produtos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      nome: PropTypes.string,
    })),*/
  }),
  isEditing: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default AdicionarFornecedor;