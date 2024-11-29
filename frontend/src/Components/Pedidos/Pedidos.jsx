import React, { useState, useEffect } from "react";
import "./Pedidos.css";
import Sidebar from "../Sidebar/sidebar";
import PedidoModal from "./PedidoModal";

const Pedidos = () => {
  //Armazena pedidos
  const [pedidos, setPedidos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState(null);

  useEffect(() => {
    //Carrega pedidos do banco de dados (Estoque)
    const fetchPedidos = async () => {
      try {
        const response = await fetch("http://localhost:3000/pedidos");  // A URL deve ser a do seu endpoint para pedidos
        const pedidosData = await response.json();
        setPedidos(pedidosData);  //Atualiza useState com os pedidos recebidos
      } catch (error) {
        console.error("Erro ao carregar os pedidos:", error);
      }
    };

    fetchPedidos();  //Chama a função para buscar pedidos
  }, []);

  const openModal = (pedido) => {
    setSelectedPedido(pedido);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //Adiciona novo pedido
  const adicionarPedido = (novoPedido) => {
    setPedidos([...pedidos, novoPedido]);
    closeModal();
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      <div className="container">
        <h1>Pedidos</h1>
        <div className="button-container">
          <button onClick={() => openModal(null)}>
            Novo<i className="fas fa-shopping-cart"></i>
          </button>
          <div className="search-container">
            <input type="text" placeholder="Procurar..." />
            {/*<button>
              <i className="fas fa-filter"></i> Filtrar
            </button>*/}
          </div>
        </div>
        <div className="divider"></div>

        <table>
          <thead>
            <tr>
              <th>Nº do Pedido</th>
              <th>Cliente</th>
              <th>Data</th>
              <th>Total</th>
              <th>Detalhes</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{pedido.cliente}</td>
                <td>{new Date(pedido.data).toLocaleDateString('pt-BR')}</td>
                <td>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(pedido.total)}
                </td>
                <td>
                  <div className="exibir-btn">
                    <button onClick={() => openModal(pedido)}>Exibir</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}
        {isModalOpen && (
          <PedidoModal
            closeModal={closeModal}
            adicionarPedido={adicionarPedido}
            selectedPedido={selectedPedido}
          />
        )}
      </div>
    </div>
  );
};

export default Pedidos;