import { useState } from 'react';
import PropTypes from 'prop-types';
import './cadastroFornecedor.css';
import Swal from 'sweetalert2';


function AdicionarFornecedor({ supplier, isEditing, onClose, onSave }) {
  const [nome, setNome] = useState(supplier?.nome || '');
  const [endereco, setEndereco] = useState(supplier?.endereco || '');
  const [cnpj, setCnpj] = useState(supplier?.cnpj || '');
  const [email, setEmail] = useState(supplier?.email || '');
  const [telefone, setTelefone] = useState(supplier?.telefone || '');
  //const [produtos, setProdutos] = useState(supplier?.produtos || []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome || !endereco || !cnpj || !email || !telefone) {
      //alert('Por favor, preencha todos os campos obrigatórios.');
      Swal.fire({
        text: 'Por favor, preencha todos os campos obrigatórios.',
        icon: 'warning',
        confirmButtonText: 'Fechar',
    });
      return;
    }

    const fornecedorAtualizado = {
      id: supplier?.id,
      nome,
      endereco,
      cnpj,
      email,
      telefone,
      //produtos,
    };

    if (isEditing) {
      onSave(fornecedorAtualizado);
      //alert(`Fornecedor "${nome}" atualizado com sucesso!`);
      Swal.fire({
        text: `Fornecedor "${nome}" atualizado com sucesso!`,
        icon: 'success',
        confirmButtonText: 'Fechar',
    });
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
        .then( async (response) => {
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao cadastrar o fornecedor');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Fornecedor cadastrado:', data);
          //alert(`Fornecedor "${data.nome}" cadastrado com sucesso!`);
          Swal.fire({
            text: `Fornecedor "${data.nome}" cadastrado com sucesso!`,
            icon: 'success',
            confirmButtonText: 'Fechar',
        });
          
          setNome('');
          setEndereco('');
          setCnpj('');
          setEmail('');
          setTelefone('');
          //setProdutos([]);
          
          onClose();
        })
        .catch((error) => {
          console.error('Erro ao cadastrar o fornecedor:', error);
          //alert(error.message || 'Erro ao cadastrar o fornecedor. Tente novamente!');
          Swal.fire({
            text: 'Erro ao cadastrar o fornecedor. Tente novamente!',
            icon: 'error',
            confirmButtonText: 'Fechar',
        });
        });
    }
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
  supplier: PropTypes.object,
  isEditing: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
};


export default AdicionarFornecedor;