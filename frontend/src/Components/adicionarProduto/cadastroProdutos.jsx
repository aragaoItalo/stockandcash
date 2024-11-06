import React from 'react';
import './cadastroProdutos.css'; // Certifique-se de que o arquivo CSS está no caminho correto

function AdicionarProduto() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados ou fazer algo com os dados do formulário
    alert('Produto cadastrado com sucesso!');
  };

  return (
    <div className="adicionar-produto">
      <h2>Adicionar Produto</h2>

      <form className="produto-form" onSubmit={handleSubmit}>
        <div className="left-section">
          <div className="upload-box">
            <i className="fas fa-upload"></i>
          </div>
          <div className="upload-buttons">
            <button><i className="fas fa-upload"></i></button>
            <button><i className="fas fa-upload"></i></button>
            <button><i className="fas fa-upload"></i></button>
          </div>
        </div>

        <div className="right-section">
          <div className="input-group">
            <label>Nome do Produto</label>
            <input type="text" placeholder="Nome do Produto" />
          </div>

          <div className="input-group-row">
            <div className="input-group">
              <label>Preço: R$</label>
              <input type="text" placeholder="Preço" />
            </div>
            <div className="input-group">
              <label>Desconto: %</label>
              <input type="text" placeholder="Desconto" />
            </div>
          </div>

          <div className="input-group-row">
            <div className="input-group">
              <label>Quantidade</label>
              <input type="text" placeholder="Quantidade" />
            </div>
          </div>

          <div className="input-group">
            <label>Categoria</label>
            <select>
              <option value="">Selecione a Categoria</option>
              <option value="1">Categoria 1</option>
              <option value="2">Categoria 2</option>
            </select>
          </div>

          <div className="input-group">
            <label>Descrição</label>
            <textarea placeholder="Descrição do Produto"></textarea>
          </div>

          <button type="submit" className="confirm-button">Confirmar Cadastro</button>
        </div>
      </form>
    </div>
  );
}

export default AdicionarProduto;
