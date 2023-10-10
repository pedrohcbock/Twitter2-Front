import React, { useEffect, useState } from "react";
import api from "../../api/api";
import "./Feed.css";
import Header from "../../components/Header/Header";
import LikeButton from "../../components/LikeButton/LikeButton";

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.get('http://localhost:3001/users')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.log('Erro ao buscar usuários', error);
            });

        api.get('http://localhost:3001/post')
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => {
                console.log('Erro ao buscar postagens', error);
            });
    }, []);

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
                                <h2 className="post-author">{getUserNameById(post.userId)}</h2>
                            </div>
                            <div className="post-content">
                                <h1 className="post-title">{post.title}</h1>
                                <p>{post.content}</p>
                                <LikeButton />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Feed;




//Código sem a API falsa

//port React, { useEffect, useState } from "react";
//port api from "../../api/api";
//port './Feed.css';
//port Header from "../../components/Header/Header";
//port LikeButton from "../../components/LikeButton/LikeButton";
//
//const Feed = () => {
//    const [posts, setPosts] = useState([]);
//    const [users, setUsers] = useState([]);
//
//    useEffect(() => {
//        api.get('/users')
//            .then((response) => {
//                setUsers(response.data);
//            })
//            .catch((error) => {
//                console.log('Erro ao buscar usuários', error);
//            });
//
//        api.get('/posts')
//            .then((response) => {
//                setPosts(response.data);
//            })
//            .catch((error) => {
//                console.log('Erro ao buscar postagens', error);
//            });
//    }, []);
//
//    const getUserNameById = (userId) => {
//        const user = users.find((user) => user.id === userId);
//        return user ? user.name : 'Usuário Desconhecido';
//    };
//
//    return (
//        <div className="feed-container">
//            <h1 className="feed-title">Feed de Postagens</h1>
//            <ul className="feed-list">
//                {posts.map((post) => (
//                    <li key={post.id} className="feed-item">
//                        <div className="user-info">
//                            <h2 className="post-author">{getUserNameById(post.userId)}</h2>
//                        </div>
//                        <div className="post-content">
//                            <h1 className="post-title">{post.title}</h1>
//                            <p>{post.content}</p>
//                        </div>
//                    </li>
//                ))}
//            </ul>
//        </div>
//    );
//}
//
//export default Feed;