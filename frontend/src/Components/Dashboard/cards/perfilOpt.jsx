import React, { useState, useEffect } from "react";
import "./perfilOpt.css";
import { FaUser } from "react-icons/fa";
import axios from "axios";

const PerfilOpt = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    console.log(`Você clicou em ${option}`);
    // Adicione as ações desejadas, como redirecionar ou abrir modais
  };

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem("token"); // Supondo que o token está armazenado no localStorage
        const response = await axios.get("http://localhost:3000/auth/user", {
          headers: {
            Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
          },
        });
        setUserName(response.data.firstName); // Ajuste para o campo correto do backend
      } catch (error) {
        console.error("Erro ao buscar o nome do usuário:", error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <div className="dashboard-perfil-container">
      <button className="dashboard-perfil" onClick={toggleDropdown}>
        <FaUser /> {userName || "Carregando..."}
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <button onClick={() => handleOptionClick("editar")}>Editar</button>
          <button onClick={() => handleOptionClick("sair")}>Sair</button>
        </div>
      )}
    </div>
  );
};

export default PerfilOpt;
