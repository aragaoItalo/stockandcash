// src/Components/Login/Login.jsx
import { FaUser, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Swal from 'sweetalert2';
 
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
 
    const handleEmailLogin = async (e) => {
        e.preventDefault();
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();
 
        if (!trimmedEmail || !trimmedPassword) {
            //alert('Por favor, preencha todos os campos.');
            Swal.fire({
                text: 'Por favor, preencha todos os campos.',
                icon: 'warning',
                confirmButtonText: 'Fechar',
            });
            return;
        }
 
        try {
            const response = await fetch('http://localhost:3000/auth/signin', { //endpoint de login do backend
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword }),
            });
 
            if (!response.ok) {
                throw new Error('Falha ao realizar login');
            }
 
            const data = await response.json();
            localStorage.setItem('token', data.token); // Armazena o token JWT
            //alert('Login realizado com sucesso!');
            Swal.fire({
                text: 'Login realizado com sucesso!',
                icon: 'success',
                confirmButtonText: 'Fechar',
            });
            navigate('/dashboard');
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            //alert('Erro ao realizar login: ' + error.message);
            Swal.fire({
                text: 'Erro ao realizar login: ' + error.message,
                icon: 'error',
                confirmButtonText: 'Fechar',
            });
        }
    };
 
    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-form">
                    <img src="src/assets/logo.png" alt="Stock&Cash" />
                    <h1 className="login-header">STOCK&CASH</h1>
                    <form onSubmit={handleEmailLogin}>
                        <div className="input-field">
                            <input
                                type="email"
                                placeholder="Usuário"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <FaUser className="icon" />
                        </div>
                        <div className="input-field">
                            <input
                                type="password"
                                placeholder="Senha"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <FaLock className="icon" />
                        </div>
                        <button className='button-login'>Login</button>
                    </form>
                    <div className="signup-link">
                        <p>Não tem uma conta? <a href="/register">Registre-se!</a></p>
                    </div>
                </div>
            </div>      
        </div>
    );
};
 
export default Login;