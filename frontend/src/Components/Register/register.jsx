// src/Components/Register/Register.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaStore, FaLock } from 'react-icons/fa';
import './Register.css';
import Swal from 'sweetalert2';

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [storeName, setStoreName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (email !== confirmEmail) {
            //alert("Os emails não coincidem.");
            Swal.fire({
                text: 'Os emails não coincidem.',
                icon: 'warning',
                confirmButtonText: 'Fechar',
            });
            return;
        }

        if (password !== confirmPassword) {
            //alert("As senhas não coincidem.");
            Swal.fire({
                text: 'As senhas não coincidem.',
                icon: 'warning',
                confirmButtonText: 'Fechar',
            });
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/auth/signup', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    storeName,
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao realizar registro');
            }

            const data = await response.json();
            //alert("Registro realizado com sucesso!");
            Swal.fire({
                text: 'Registro realizado com sucesso!',
                icon: 'success',
                confirmButtonText: 'Fechar',
            });

            navigate('/login');
        } catch (error) {
            console.error('Erro ao realizar registro:', error);
            //alert('Erro ao realizar registro: ' + error.message);
            Swal.fire({
                text: 'Erro ao realizar registro: ' + error.message,
                icon: 'error',
                confirmButtonText: 'Fechar',
            });
        }
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <h1 className="register-header">STOCK&CASH</h1>
                <form onSubmit={handleRegister}>
                    <div className="input-field">
                        <FaUser className="icon" />
                        <input
                            type="text"
                            placeholder="Nome"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                        <div className='input-sobrenome'>
                        <FaUser className="icon" />
                        <input 
                            type="text"
                            placeholder="Sobrenome"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                        </div>
                    </div>

                    <div className="input-field">
                        <FaEnvelope className="icon" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-field">
                        <FaEnvelope className="icon" />
                        <input
                            type="email"
                            placeholder="Confirmar Email"
                            value={confirmEmail}
                            onChange={(e) => setConfirmEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-field">
                        <FaStore className="icon" />
                        <input
                            type="text"
                            placeholder="Nome da Loja"
                            value={storeName}
                            onChange={(e) => setStoreName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-field">
                        <FaLock className="icon" />
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-field">
                        <FaLock className="icon" />
                        <input
                            type="password"
                            placeholder="Confirmar Senha"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="register-btn">Registrar</button>
                </form>

                <div className="register-link">
                    <p>Já tem uma conta? <a href="/login">Faça login!</a></p>
                </div>
            </div>

        </div>
    );
};

export default Register;
