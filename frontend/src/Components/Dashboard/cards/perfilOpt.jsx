import React, { useState, useEffect } from "react";
import "./perfilOpt.css";
import { FaUser } from "react-icons/fa";

const PerfilOpt = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    console.log(`Você clicou em ${option}`);
    // Adicione ações desejadas para as opções "editar" e "sair"
  };

  useEffect(() => {
    // Supondo que o nome do usuário tenha sido salvo no localStorage após o login
    const savedUserName = localStorage.getItem("firstName");
    
    if (savedUserName) {
      setUserName(savedUserName);  // Configura o nome no estado
    } else {
      setUserName("Nome não encontrado");  // Caso não haja nome salvo
    }
  }, []); // O useEffect é executado apenas uma vez após o componente ser montado

  return (
    <div className="dashboard-perfil-container">
      <button className="dashboard-perfil" onClick={toggleDropdown}>
        <FaUser /> {userName || "Carregando..."}  {/* Exibe o nome ou 'Carregando...' */}
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
