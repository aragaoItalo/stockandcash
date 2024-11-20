import { useState } from 'react';
import PropTypes from 'prop-types';
import './cadastroProdutos.css';
import Swal from 'sweetalert2';


function AdicionarProduto( { product, isEditing, onClose, onSave } ) {
  const [nome, setNome] = useState(product?.nome || '');
  const [preco, setPreco] = useState(product?.preco || '');
  const [desconto, setDesconto] = useState(product?.desconto || '');
  const [quantidade, setQuantidade] = useState(product?.quantidade || '');
  const [categoria, setCategoria] = useState(product?.categoria || '');
  const [descricao, setDescricao] = useState(product?.descricao || '');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome || !preco || !quantidade || !descricao) {
      //alert('Por favor, preencha todos os campos obrigatórios.');
      Swal.fire({
        text: 'Por favor, preencha todos os campos obrigatórios.',
        icon: 'warning',
        confirmButtonText: 'Fechar',
    });
      return;
    }
    
    const produtoAtualizado = {
      id: product?.id,
      nome,
      preco: parseFloat(preco),
      desconto: parseFloat(desconto) || 0,
      quantidade: parseInt(quantidade, 10),
      categoria,
      descricao,
    };

    if (isEditing) {
      onSave(produtoAtualizado);
      Swal.fire({
        text: `Produto "${produtoAtualizado.nome}" atualizado com sucesso!`,
        icon: 'success',
        confirmButtonText: 'Fechar',
    });
      onClose();
    } else {
      // Adicionando produto
      fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(produtoAtualizado),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro ao cadastrar o produto');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Produto cadastrado:', data);
          //alert(`Produto "${data.nome}" cadastrado com sucesso!`);
          Swal.fire({
            text: `Produto "${data.nome}" cadastrado com sucesso!`,
            icon: 'success',
            confirmButtonText: 'Fechar',
        });

          setNome('');
          setPreco('');
          setDesconto('');
          setQuantidade('');
          setCategoria('');
          setDescricao('');

          onClose();
        })
        .catch((error) => {
          console.error('Erro ao cadastrar o produto:', error);
          //alert('Erro ao cadastrar o produto. Tente novamente!');
          Swal.fire({
            text: 'Erro ao cadastrar o produto. Tente novamente!',
            icon: 'error',
            confirmButtonText: 'Fechar',
        });
        });
    }
  };
  
  return (
    <div className="adicionar-produto">
      <h2>{isEditing ? 'Editar Produto' : 'Adicionar Produto'}</h2>

      <form className="produto-form" onSubmit={handleSubmit}>
        <div className="left-section">
          <div className="upload-box">
            <i className="faz fa-upload"></i>
          </div>
        </div>

        <div className="right-section">
          <div className="input-group">
            <label>Nome do Produto</label>
            <input
              type="text"
              placeholder="Nome do Produto"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="input-group-row">
            <div className="input-group">
              <label>Preço: R$</label>
              <input
                type="text"
                placeholder="Preço"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Desconto: %</label>
              <input
                type="text"
                placeholder="Desconto"
                value={desconto}
                onChange={(e) => setDesconto(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group-row">
            <div className="input-group">
              <label>Quantidade</label>
              <input
                type="text"
                placeholder="Quantidade"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Categoria</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Selecione a Categoria</option>
              <option value="1">Bebida</option>
              <option value="2">Comida</option>
              <option value="3">Outros</option>
            </select>
          </div>

          <div className="input-group">
            <label>Descrição</label>
            <textarea
              placeholder="Descrição do Produto"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            ></textarea>
          </div>

          <button type="submit" className="confirm-button">
            {isEditing ? 'Salvar Alterações' : 'Registrar Produto'}
          </button>
        </div>
      </form>
    </div>
  );
};

// Validação das props
AdicionarProduto.propTypes = {
  product: PropTypes.object,
  isEditing: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
};

export default AdicionarProduto;