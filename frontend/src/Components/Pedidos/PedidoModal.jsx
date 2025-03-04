import React, { useState, useEffect } from "react";
import "./PedidoModal.css";

let idCounter = 1;

const PedidoModal = ({ closeModal, adicionarPedido, selectedPedido }) => {
  const [cliente, setCliente] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [produtosDisponiveis, setProdutosDisponiveis] = useState([]);
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);
  const [total, setTotal] = useState(0);

  //Carrega produtos do estoque
  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch("http://localhost:3000/produtos");
        const produtos = await response.json();
        setProdutosDisponiveis(produtos); // Atualiza a lista de produtos
      } catch (error) {
        console.error("Erro ao carregar os produtos:", error);
      }
    };

    fetchProdutos();
  }, []);

  //Atualiza total sempre que a lista de produtos selecionados for alterada
  useEffect(() => {
    calcularTotal();
  }, [produtosSelecionados]);

  //Calcula o total do pedido
  const calcularTotal = () => {
    let total = 0;
    produtosSelecionados.forEach((produto) => {
      total += produto.preco * produto.quantidade;
    });
    setTotal(total.toFixed(2));
  };

  //Adiciona ou remove produto da lista
  const handleProdutoChange = (produto, selecionado) => {
    if (selecionado) {
      //Adiciona produto na lista de selecionados
      setProdutosSelecionados((prev) => [
        ...prev,
        { ...produto, quantidade: 1 },
      ]);
    } else {
      //Remove produto na lista de selecionados
      setProdutosSelecionados((prev) =>
        prev.filter((item) => item.id !== produto.id)
      );
    }
  };

  //Altera quantidade no Resumo da compra
  const handleQuantidadeChange = (produtoId, novaQuantidade) => {
    if (novaQuantidade < 1) return; //Impede quantidade negativa

    const updatedProdutos = produtosSelecionados.map((produto) =>
      produto.id === produtoId
        ? { ...produto, quantidade: novaQuantidade }
        : produto
    );
    setProdutosSelecionados(updatedProdutos);
  };

  //Exclui um produto do pedido
  const excluirProduto = (produtoId) => {
    setProdutosSelecionados((prev) =>
      prev.filter((produto) => produto.id !== produtoId)
    );
  };

  const handleSubmit = async () => {

    // Verifica se o cliente foi preenchido e ao menos um produto foi selecionado
    if (!cliente || produtosSelecionados.length === 0) {
      alert("É necessário cadastrar um cliente e selecionar ao menos um produto.");
      return;
    }

    const novoPedido = {
      id: idCounter++,
      cliente,
      telefone,
      endereco,
      produtos: produtosSelecionados.map((produto) => ({
        id: produto.id,
        quantidade: produto.quantidade,
      })),
      total: parseFloat(total),
      data: new Date().toLocaleDateString(),
    };

    adicionarPedido(novoPedido);
    
    try {
      const response = await fetch("http://localhost:3000/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoPedido),
      });
      if (!response.ok) {
        throw new Error("Erro ao criar o pedido no backend");
      }
    } catch (error) {
      console.error("Erro ao enviar o pedido para o backend:", error);
    }

    closeModal();
  };

  const produtos = selectedPedido?.produtos || []

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{selectedPedido  ? "Detalhes do Pedido" : "Cadastrar Novo Pedido"}</h2>

        {selectedPedido  ? (
          <>
            <p><strong>Número do Pedido:</strong> {selectedPedido .id}</p>
            <p><strong>Cliente:</strong> {selectedPedido .cliente}</p>
            <p><strong>Telefone:</strong> {selectedPedido.telefone}</p>
            <p><strong>Endereço:</strong> {selectedPedido.endereco}</p>
            <p><strong>Data:</strong> {new Date(selectedPedido.data).toLocaleDateString('pt-BR')}</p>
            <p><strong>Total:</strong> R$ {selectedPedido.total}</p>
            <h3>Resumo do Pedido</h3>
            <ul>
              {produtos.map((produto) => (
                <li key={produto.id}>
                  {produto.nome} - Quantidade: {produto.quantidade} - Preço Total: R$ {produto.ItemPedido?.valorTotal?.toFixed(2)}
                </li>
              ))}
            </ul>
            <button onClick={closeModal}>Fechar</button>
          </>
        ) : (
          <>
            <div className="form-group">
              <input
                type="text"
                placeholder="Nome do Cliente"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
              />
              <input
                type="text"
                placeholder="Telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
              <input
                type="text"
                placeholder="Endereço"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />
            </div>

            <h3 className="selecionar-produtos'">Selecionar Produtos</h3>
            <div className="produto-container">
              {produtosDisponiveis.map((produto) => (
                <div key={produto.id} className="produto">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleProdutoChange(produto, e.target.checked)
                    }
                  />
                  <span>{produto.nome}</span>
                  <span>R$ {produto.preco.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <h3 className="resumo-pedido-text">Resumo do Pedido</h3>
            <div className="pedido-resumo">
              <table>
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Preço Unitário</th>
                    <th>Preço Total</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {produtosSelecionados.map((produto) => (
                    <tr key={produto.id}>
                      <td>{produto.nome}</td>
                      <td>
                        <input
                          type="number"
                          value={produto.quantidade}
                          min="1"
                          onChange={(e) =>
                            handleQuantidadeChange(
                              produto.id,
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </td>
                      <td>{produto.preco.toFixed(2)}</td>
                      <td>
                        {produto.ItemPedido?.valorTotal?.toFixed(2)}
                      </td>
                      <td>
                        <button onClick={() => excluirProduto(produto.id)}>
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="total">Total: R$ {total}</div>

            <div className="modal-buttons">
              <button onClick={handleSubmit}>Confirmar Pedido</button>
              <button onClick={closeModal}>Cancelar</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PedidoModal;