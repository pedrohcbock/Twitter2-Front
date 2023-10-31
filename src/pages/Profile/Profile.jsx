import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import Header from "../../components/Header/Header";
import DeleteProfileButton from "../../components/DeleteProfileButton/DeleteProfileButton";
import "./Profile.css";
import DeletePostButton from "../../components/DeletePostButton/DeletePostButton";


function UserProfile() {
    const [userPosts, setUserPosts] = useState([]);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [biography, setBiography] = useState('');
    const [profile_pic, setProfile_pic] = useState(null);

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/")
        }
        api.get(`/user/userData/${user_id}`).then((response) => {
            console.log(response)
            setName(response.data.user.name)
            setEmail(response.data.user.email)
            setUsername(response.data.user.username)
            setBiography(response.data.user.biography)
            setProfile_pic(response.data.user.profile_pic)
        }).catch(err => {
            console.log(err)
        })

    }, [])

    const user_id = localStorage.getItem("user_id")

    useEffect(() => {


        api.get('/post/showMy')
            .then((response) => {
                setUserPosts(response.data);
            })
            .catch((error) => {
                console.error('Erro ao buscar postagens do usuário:', error);
            });
    }, [user_id]);

    return (
        <div>
            <Header />

            <div className="user-profile-container">
                <div className="user-profile-left">
                    <div className="user-profile-pic">
                        <img src={profile_pic} alt="Foto de Perfil" />
                    </div>
                    <div className="user-profile-info">
                        <h2>{username}</h2>
                        <p>{biography}</p>
                        <p>Nome Real: {name}</p>
                    </div>
                    <button onClick={() => navigate('/editprofile')}>Editar perfil</button>
                    <br />
                    <DeleteProfileButton user_id={user_id} />
                </div>

                <div className="user-profile-right">
                    <h1>Minhas Postagens</h1>
                    <ul>
                        {userPosts.map((post) => (
                            <li key={post.id}>
                                <h2>{post.title}</h2>
                                <p>{post.content}</p>
                                <button onClick={() => navigate(`/editpost/${post.id}`)}>Editar postagem</button>
                                <br />
                                <DeletePostButton postId={post.id} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;