import React, { useState } from "react";  // Importando useState
import "./Pedidos.css";
import Sidebar from '../Sidebar/sidebar';
import Fechamento from "../Fechamento/Fechamento";

const Pedidos = () => {
  // Estado para controlar a visibilidade do modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para abrir o modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar />

      <div className="container">
        <h1>Pedidos</h1>
        <div className="button-container">
          <button onClick={openModal}>
            Concluir <i className="fas fa-shopping-cart"></i>
          </button>
          <div className="search-container">
            <input type="text" placeholder="Procurar..." />
            <button>
              <i className="fas fa-filter"></i> Filtrar
            </button>
          </div>
        </div>
        <div className="divider"></div>

        <table>
          <thead>
            <tr>
              <th className="checkbox"></th>
              <th>ID</th>
              <th>Nome do Produto</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Estoque</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="checkbox">
                <input type="checkbox" />
              </td>
              <td>1</td>
              <td>Heineken Long Neck</td>
              <td>Cerveja</td>
              <td>36,80</td>
              <td>22</td>
            </tr>
            <tr>
              <td className="checkbox">
                <input type="checkbox" />
              </td>
              <td>2</td>
              <td>Tanqueray</td>
              <td>Gin</td>
              <td>25,90</td>
              <td>8</td>
            </tr>
            <tr>
              <td className="checkbox">
                <input type="checkbox" />
              </td>
              <td>3</td>
              <td>51 ICE Limão</td>
              <td>Vodka</td>
              <td>6,50</td>
              <td>36</td>
            </tr>
            <tr>
              <td className="checkbox">
                <input type="checkbox" />
              </td>
              <td>4</td>
              <td>CanelaZinha</td>
              <td>Cachaça</td>
              <td>59,70</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>

        
      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content-fechamento">
            <Fechamento
             
            />
            <button className="close-modal-btn" onClick={closeModal}>
              Fechar
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Pedidos;
