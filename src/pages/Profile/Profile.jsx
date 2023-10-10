import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import Header from "../../components/Header/Header";
import DeleteProfileButton from "../../components/DeleteProfileButton/DeleteProfileButton";
import "./Profile.css";
import DeletePostButton from "../../components/DeletePostButton/DeletePostButton";


function UserProfile() {
    const { userId } = useParams();
    const [userData, setUserData] = useState({});
    const [userPosts, setUserPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/user/${userId}')
            .then((response) => {
                setUserData(response.data);
            })
            .catch((error) => {
                console.error('Erro ao buscar informações do usuário:', error);
            });

        api.get('/post/showMy')
            .then((response) => {
                setUserPosts(response.data);
            })
            .catch((error) => {
                console.error('Erro ao buscar postagens do usuário:', error);
            });
    }, [userId]);

    return (
        <div>
            <Header />

            <div className="user-profile-container">
                <div className="user-profile-left">
                    <div className="user-profile-pic">
                        <img src={userData.profilePic} alt="Foto de Perfil" />
                    </div>
                    <div className="user-profile-info">
                        <h2>{userData.username}</h2>
                        <p>{userData.biography}</p>
                        <p>Nome Real: {userData.name}</p>
                    </div>
                    <button onClick={() => navigate('/editprofile')}>Editar perfil</button>
                    <br />
                    <DeleteProfileButton />
                </div>

                <div className="user-profile-right">
                    <h1>Minhas Postagens</h1>
                    <ul>
                        {userPosts.map((post) => (
                            <li key={post.id}>
                                <h2>{post.title}</h2>
                                <p>{post.content}</p>
                                <button onClick={() => navigate('/editpost')}>Editar postagem</button>
                                <br />
                                <DeletePostButton />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;