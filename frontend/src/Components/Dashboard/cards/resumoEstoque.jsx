import React from 'react';
import './ResumoEstoque.css';

const ResumoEstoque = () => {
  return (
    <div className="resumo-estoque-card">
      <h5>Resumo de Estoque</h5>
      <div className="resumo-conteudo">
        
        <p><strong>Lucros: </strong>null</p>
        <p><strong>Venda Diária: </strong> null</p>
        <p><strong>Venda semanal: </strong>null</p>
        <p><strong>Venda mensal: </strong>null</p>
        <p><strong>Ult. Atualização:</strong> 29/11/2024</p>
        <p><strong>Ult. Pedido: </strong>null</p>
        <p><strong>Total de Produtos: </strong> 150</p>
        <p><strong>Itens em Falta:</strong> 5</p>

      </div>
    </div>
  );
};

export default ResumoEstoque;
