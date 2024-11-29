import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ultimoProduto.css';

const UltimoProduto = () => {
  const [products, setProducts] = useState([]);

  // Mapeamento de categorias
  const categoriasMap = {
    1: 'Bebidas',
    2: 'Comidas',
    3: 'Outros',
  };

  // Função para limitar o tamanho do nome do produto
  const limitarNome = (nome, limite = 10) => {
    if (nome.length > limite) {
      return nome.substring(0, limite) + '...'; // Limita a 10 caracteres e adiciona '...'
    }
    return nome;
  };

  // Fazer a requisição para pegar os produtos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/produtos'); // Substitua pela URL da sua API
        // Pegando os 4 últimos produtos da lista
        setProducts(response.data.slice(-4)); // Limita os produtos para os últimos 4
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, []); // O array vazio [] significa que a requisição será feita apenas uma vez, quando o componente for montado.

  // Função para formatar o preço para o formato brasileiro
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price); // Formata o preço como moeda
  };

  return (
    <div className="ultimo-produto-card">
      <h5>Últimos Produtos</h5>
      <div className="ultimo-produto-content">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Preço</th>
            </tr>
          </thead>
          <tbody>
            {/* Mapeia os 4 últimos produtos e exibe as linhas da tabela */}
            {products.map((product) => (
              <tr key={product.id}>
                <td>{limitarNome(product.nome, 10)}</td> {/* Limita o nome do produto */}
                <td>{categoriasMap[product.categoria] || 'Categoria não definida'}</td> {/* Exibe o nome da categoria */}
                <td>{formatPrice(product.preco)}</td> {/* Exibe o preço formatado */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UltimoProduto;
