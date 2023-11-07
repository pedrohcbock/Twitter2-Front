import React, { useState } from 'react';
import api from '../../api/api';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [profile_pic, setProfile_pic] = useState(null);
    const [biography, setBiography] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [profile_picError, setProfile_picError] = useState('');
    const [biographyError, setBiographyError] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleNameChange = (e) => {
        setName(e.target.value);
        setNameError('');
        setError('');
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError('');
        setError('');
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        setUsernameError('');
        setError('');
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError('');
        setError('');
    }

    const handleProfile_picChange = (e) => {
        const selectedFile = e.target.files[0];
        setProfile_pic(selectedFile);
        setProfile_picError('');
        setError('');
    }

    const handleBiographyChange = (e) => {
        setBiography(e.target.value);
        setBiographyError('');
        setError('');
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!name) {
            setNameError('O nome é obrigatório.');
            return;
        }

        if (!email) {
            setEmailError('O email é obrigatório.');
            return;
        }

        if (!username) {
            setUsernameError('O usuário é obrigatório.');
            return;
        }

        if (!password) {
            setPasswordError('A senha é obrigatória.');
            return;
        }

        if (!profile_pic) {
            setProfile_picError('A foto de perfil é obrigatória.');
            return;
        }

        if (!biography) {
            setBiographyError('A biografia é obrigatória.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('username', username);
            formData.append('password', password);
            formData.append('biography', biography);

            if (profile_pic) {
                formData.append('profile_pic', profile_pic);
            }

            const response = await api.post('/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data);

            setError('');
            navigate('/');

        } catch (error) {
            console.error('Erro ao cadastrar', error);
            setError(error.response.data.message);
        }
    };

    return (
        <div className="register-container">
            <img className="icon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPZcF_tMtJWWr-gcfeANFTYufEoT6yMDc7_O7rw0iKbWBVvGl4oZBxAU5p6vi2EL5yyN8&usqp=CAU" alt="Twitter Icon" />
            <h2>Registre-se no Twitter 2</h2>
            <form onSubmit={handleFormSubmit} className="register-form">
                <div className="form-group">
                    <label htmlFor="name">Nome:</label> {nameError && <span className="error-message">{nameError}</span>}
                    <input
                        type="text"
                        id="name"
                        value={name}
                        placeholder='Digite o nome'
                        onChange={handleNameChange}
                        className={`form-input ${nameError ? 'error' : ''}`}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label> {emailError && <span className="error-message">{emailError}</span>}
                    <input
                        type="email"
                        id="email"
                        value={email}
                        placeholder='Digite o email'
                        onChange={handleEmailChange}
                        className={`form-input ${emailError ? 'error' : ''}`}
                    />
                </div>
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
                    <label htmlFor="password">Senha:</label> {passwordError && <span className="error-message">{passwordError}</span>}
                    <input
                        type="password"
                        id="password"
                        value={password}
                        placeholder='Digite a senha'
                        onChange={handlePasswordChange}
                        className={`form-input ${passwordError ? 'error' : ''}`}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="profile_pic">Foto de Perfil:</label> {profile_picError && <span className="error-message">{profile_picError}</span>}
                    <input
                        type="file"
                        id="profile_pic"
                        accept="image/*"
                        onChange={handleProfile_picChange}
                        className={`form-input ${profile_picError ? 'error' : ''}`}
                    />
                    {profile_pic && (
                        <div className="image-preview">
                            <img className="preview-image" src={URL.createObjectURL(profile_pic)} alt="Preview" />
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="biography">Biografia:</label> {biographyError && <span className="error-message">{biographyError}</span>}
                    <input
                        type="text"
                        id="biography"
                        value={biography}
                        placeholder='Digite a biografia'
                        onChange={handleBiographyChange}
                        className={`form-input ${biographyError ? 'error' : ''}`}
                    />
                </div>
                <button type="submit" className="login-button">Registrar</button>
                <p>Já tem uma conta? <Link to="/">Faça o login</Link></p>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Register;
