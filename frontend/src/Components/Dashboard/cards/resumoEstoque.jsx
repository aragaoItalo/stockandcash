import React from 'react';
import './ResumoEstoque.css';

const ResumoEstoque = () => {
  return (
    <div className="resumo-estoque-card">
      <h5>Resumo de Estoque</h5>
      <div className="resumo-conteudo">
        <p><strong>Total de Produtos:</strong> 150</p>
        <p><strong>Itens em Falta:</strong> 5</p>
        <p><strong>Última Atualização:</strong> 10/11/2024</p>
      </div>
    </div>
  );
};

export default ResumoEstoque;
