import { useState } from 'react';
import './cadastroProdutos.css';

function AdicionarProduto() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [desconto, setDesconto] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome || !preco || !quantidade || !descricao) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const novoProduto = {
      nome,
      preco:parseFloat(preco),
      desconto:parseFloat(desconto),
      quantidade:parseInt(quantidade,10),
      categoria,
      descricao
    };

    fetch('http://localhost/3000/produtos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novoProduto),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao cadastrar o produto');
        }
        return response.json();
    })
      .then((data) => {
        console.log('Produto cadastrado:', data);
        alert(`Produto "${data.nome}" cadastrado com sucesso!`);
        // Limpar os campos do formulário
        setNome('');
        setPreco('');
        setDesconto('');
        setQuantidade('');
        setCategoria('');
        setDescricao('');
      })
      .catch((error) => {
        console.error('Erro ao cadastrar o produto:', error);
        alert('Erro ao cadastrar o produto. Tente novamente!');
      });
  };

  return (
    <div className="adicionar-produto">
      <h2>Adicionar Produto</h2>

      <form className="produto-form" onSubmit={handleSubmit}>
        <div className="left-section">
          <div className="upload-box">
            <i className="faz fa-upload"></i>
          </div>
          <div className="upload-buttons">
            <button><i className="faz fa-upload"></i></button>
            <button><i className="faz fa-upload"></i></button>
            <button><i className="faz fa-upload"></i></button>
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

          <button type="submit" className="confirm-button">Registrar Produto</button>
        </div>
      </form>
    </div>
  );
}

export default AdicionarProduto;