// src/App.js
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Dashboard from './Components/Dashboard/dashboard';
import AdicionarProduto from './Components/adicionarProduto/cadastroProdutos';
import Estoque from './Components/Estoque/Estoque';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/adicionarProduto" element={<AdicionarProduto />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
                <Route path="/Estoque" element={<Estoque />} />
            </Routes>
        </Router>
    );
};

export default App;
