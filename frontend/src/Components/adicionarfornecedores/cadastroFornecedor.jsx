import { useState } from 'react';
import './cadastroFornecedor.css';

function AdicionarFornecedor({ fornecedor, isEditing, onClose, onSave }) {
  const [nome, setNome] = useState(fornecedor?.nome || '');
  const [endereco, setEndereco] = useState(fornecedor?.endereco || '');
  const [cnpj, setCnpj] = useState(fornecedor?.cnpj || '');
  const [email, setEmail] = useState(fornecedor?.email || '');
  const [telefone, setTelefone] = useState(fornecedor?.telefone || '');
  const [produtos, setProdutos] = useState(fornecedor?.produtos || '');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome || !endereco || !cnpj || !email || !telefone) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const fornecedorAtualizado = {
      id: fornecedor?.id,
      nome,
      endereco,
      cnpj,
      email,
      telefone,
      produtos,
    };

    if (isEditing) {
      onSave(fornecedorAtualizado);
      onClose();
    } else {
      // adicionando fornecedor
      fetch('http://localhost:3000/Stockandcash/backend/src/models/fornecedor.js', {
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
          setNome('');
          setEndereco('');
          setCnpj('');
          setEmail('');
          setTelefone('');
          setProdutos('');
          onClose();
        })
        .catch((error) => {
          console.error('Erro ao cadastrar o fornecedor:', error);
          alert('Erro ao cadastrar o fornecedor. Tente novamente!');
        });
    }
  };

  return (
    <div className="adicionar-fornecedor">
      <h2>{isEditing ? 'Editar Fornecedor' : 'Adicionar Fornecedor'}</h2>
      <form className="fornecedor-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Nome</label>
          <input
            type="text"
            placeholder="Nome do Fornecedor"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        
        <div className="input-group">
          <label>Endereço</label>
          <input
            type="text"
            placeholder="Endereço"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>CNPJ</label>
          <input
            type="text"
            placeholder="CNPJ"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Telefone</label>
          <input
            type="text"
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Produtos</label>
          <input
            type="text"
            placeholder="Produtos fornecidos"
            value={produtos}
            onChange={(e) => setProdutos(e.target.value)}
          />
        </div>

        <button type="submit" className="confirm-button">
          {isEditing ? 'Salvar Alterações' : 'Registrar Fornecedor'}
        </button>
      </form>
    </div>
  );
}

export default AdicionarFornecedor;
