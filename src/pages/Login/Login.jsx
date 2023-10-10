import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        setUsernameError('');
        setError(null);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError('');
        setError(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username) {
            setUsernameError('O usuário é obrigatório.');
            return;
        }

        if (!password) {
            setPasswordError('A senha é obrigatória.');
            return;
        }

        try {
            const response = await api.post('/login', {
                username,
                password,
            });

            const token = response.data.authorization.token;

            localStorage.setItem('token', token);

            console.log(response.data);

            navigate('/feed');
        } catch (error) {
            console.error('Erro ao fazer login', error);
            setError(error.response.data.message);
        }
    }

    return (
        <div className="login-container">
            <img className="icon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPZcF_tMtJWWr-gcfeANFTYufEoT6yMDc7_O7rw0iKbWBVvGl4oZBxAU5p6vi2EL5yyN8&usqp=CAU"/>
            <h2>Entrar no Twitter 2</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="username">Usuário:</label> {usernameError && <span className="error-message">{usernameError}</span>}
                    <input
                        type="text"
                        id="username"
                        value={username}
                        placeholder='Digite o usuário'
                        onChange={handleUsernameChange}
                        className={`form-input ${usernameError ? 'error' : ''}`}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Senha:</label>  {passwordError && <span className="error-message">{passwordError}</span>}
                    <input
                        type="password"
                        id="password"
                        value={password}
                        placeholder='Digite a senha'
                        onChange={handlePasswordChange}
                        className={`form-input ${passwordError ? 'error' : ''}`}
                    />
                </div>

                <button type="submit" className="login-button">Login</button>
                <p>Não possui uma conta? <Link to="/register">Registra-se agora</Link></p>
            </form>

            {error && <p className="error-message">{error}</p>}

        </div>
    );
}

export default Login;
