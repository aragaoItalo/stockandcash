import React, { useState } from "react";
/*import "./Fechamento.css";*/

const Fechamento = () => {
  const [products, setProducts] = useState([
    { name: "Tanqueray", price: 25.9, quantity: 1 },
    { name: "51 ICE Limão", price: 6.5, quantity: 2 },
    { name: "Heineken Long Neck", price: 36.8, quantity: 1 },
  ]);

  const handleQuantityChange = (index, operation) => {
    const updatedProducts = [...products];
    if (operation === "increment") {
      updatedProducts[index].quantity += 1;
    } else if (operation === "decrement" && updatedProducts[index].quantity > 0) {
      updatedProducts[index].quantity -= 1;
    }
    setProducts(updatedProducts);
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
  };

  return (
    <div className="container">
      <h1>Concluir Venda</h1>
      <div className="form-group">
        <input placeholder="Nome do Cliente" type="text" />
        <input placeholder="Telefone" type="text" />
      </div>
      <div className="form-group">
        <input placeholder="Endereço" type="text" />
        <input placeholder="Número" type="text" />
      </div>
      <div className="product-list">
        <h2>Produtos Selecionados</h2>
        <table>
          <thead>
            <tr>
              <th>Nome do Produto</th>
              <th>Preço</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.price.toFixed(2)}</td>
                <td className="quantity-control">
                  <button onClick={() => handleQuantityChange(index, "decrement")}>-</button>
                  <span>{product.quantity}</span>
                  <button onClick={() => handleQuantityChange(index, "increment")}>+</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="total">Total: R$ {calculateTotal()}</div>
      <div className="conclude-button">
        <button>
          Concluir
          <i className="fas fa-shopping-cart"></i>
        </button>
      </div>
    </div>
  );
};

export default Fechamento;