// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Dashboard from './Components/Dashboard/dashboard'; // Componente Dashboard original
import AdicionarProduto from './Components/adicionarProduto/cadastroProdutos'; // Renomeie para evitar conflito

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} /> {/* Rota para o Dashboard */}
                <Route path="/adicionar-produto" element={<AdicionarProduto />} /> {/* Rota para Adicionar Produto */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
};

export default App;
