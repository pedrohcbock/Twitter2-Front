import React, { useState } from 'react';
import api from '../../routes/routes';

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.prevenDefault();
        console.log(username, password);
        try {
            const response = await api.post('/login', {
                username,
                password,
            });
            console.log(response.data);
        } catch (error) {
            console.error('Erro ao fazer login', error);
        }
    }

    return (
        <div>
            <h2>Formulário de Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Usuário:</label>
                    <input
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login