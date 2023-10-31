import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import "./EditProfile.css";
import Header from "../../components/Header/Header";

const EditProfile = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [biography, setBiography] = useState('');
    const [profile_pic, setProfile_pic] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/")
        }

        const user_id = localStorage.getItem("user_id")

        api.get(`/user/userData/${user_id}`).then((response) => {
            console.log(response)
            setName(response.data.user.name)
            setEmail(response.data.user.email)
            setUsername(response.data.user.username)
            setBiography(response.data.user.biography)
        }).catch(err => {
            console.log(err)
        })

    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('username', username);
            formData.append('biography', biography);

            if (profile_pic) {
                formData.append('profile_pic', profile_pic);
            }

            const user_id = localStorage.getItem("user_id")

            const response = await api.post(`/user/update/${user_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data);

            setError('');
            navigate(`/profile`);

        } catch (error) {
            console.error('Erro ao atualizar o perfil:', error);
            setError(error.response.data.message);
        }
    };

    return (
        <div>
            <Header />
            <div className="edit-profile-container">
                <img className="icon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPZcF_tMtJWWr-gcfeANFTYufEoT6yMDc7_O7rw0iKbWBVvGl4oZBxAU5p6vi2EL5yyN8&usqp=CAU" alt="Twitter Icon" />
                <h2>Editar Perfil</h2>
                <form onSubmit={handleFormSubmit} className="edit-profile-form">
                    <div className="form-group">
                        <label htmlFor="name">Nome:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            placeholder='Digite o nome'
                            onChange={(e) => setName(e.target.value)}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            placeholder='Digite o email'
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Usuário:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            placeholder='Digite o usuário'
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="profile_pic">Foto de Perfil:</label>
                        <input
                            type="file"
                            id="profile_pic"
                            accept="image/*"
                            onChange={(e) => setProfile_pic(e.target.files[0])}
                            className="form-input"
                        />
                        {profile_pic && (
                            <div className="image-preview">
                                <img className="preview-image" src={URL.createObjectURL(profile_pic)} alt="Preview" />
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="biography">Biografia:</label>
                        <input
                            type="text"
                            id="biography"
                            value={biography}
                            placeholder='Digite a biografia'
                            onChange={(e) => setBiography(e.target.value)}
                            className="form-input"
                        />
                    </div>
                    <button type="submit" className="update-button">Atualizar Perfil</button>
                    <Link to={'/profile'} className="cancel-link">Cancelar</Link>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
}

export default EditProfile;
