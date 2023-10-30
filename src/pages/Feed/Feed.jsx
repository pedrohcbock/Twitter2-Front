import React, { useEffect, useState } from "react";
import api from "../../api/api";
import "./Feed.css";
import Header from "../../components/Header/Header";
import LikeButton from "../../components/LikeButton/LikeButton";
import { useNavigate } from 'react-router-dom';

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/")
        }
    }, [])

    useEffect(() => {
        api.get('/user/show')
            .then((response) => {
                setUsers(response.data[0]);
            })
            .catch((error) => {
                console.log('Erro ao buscar usuários', error);
            });

        api.get('/post/showAll')
            .then((response) => {
                setPosts(response.data[0]);
            })
            .catch((error) => {
                console.log('Erro ao buscar postagens', error); w
            });
    }, []);

    console.log(posts);
    const getUserNameById = (userId) => {
        const user = users.find((user) => user.id === userId);
        return user ? user.name : 'Usuário Desconhecido';
    };

    return (
        <div>
            <Header />
            <div className="feed-container">
                <h1 className="feed-title">Feed de Postagens</h1>
                <ul className="feed-list">
                    {posts.map((post) => (
                        <li key={post.id} className="feed-item">
                            <div className="user-info">
                                <h2 className="post-author">{post.user.name}</h2>
                            </div>
                            <div className="post-content">
                                <h1 className="post-title">{post.title}</h1>
                                <p>{post.content}</p>
                                <LikeButton postId={post.id} />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Feed;