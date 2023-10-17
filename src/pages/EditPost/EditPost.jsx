import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./EditPost.css";
import Header from "../../components/Header/Header";

const EditPost = () => {
    const { postId } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem("token")){
            navigate("/")
        }
    }, [])

    useEffect(() => {
        api.get('/post/${postId}')
            .then((response) => {
                const post = response.data.post;
                setTitle(post.title);
                setContent(post.content);
            })
            .catch((error) => {
                console.error("Erro ao buscar os dados do post:", error);
                setError("Erro ao buscar os dados do post. Tente novamente mais tarde.");
            });
    }, [postId]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        setError("");
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.put(`/post/update/${postId}`, {
                title,
                content,
            });

            navigate('/profile');
        } catch (error) {
            console.error("Erro ao atualizar o post:", error);
            setError(error.response.data.message);
        }
    };

    return (
        <div>
            <Header />
            <div className="edit-post-container">
                <img className="icon" src="https://static-prod.adweek.com/wp-content/uploads/2022/11/FuzzyBlue2.jpg" alt="Twitter Icon" />
                <h2>Editar Post</h2>
                <form onSubmit={handleSubmit} className="edit-post-form">
                    <div className="form-group">
                        <label htmlFor="title">Título:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={handleTitleChange}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Conteúdo:</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={handleContentChange}
                            required
                            className="form-input"
                        />
                    </div>
                    <button type="submit" className="create-button">Salvar</button>
                    <Link to={'/profile'} className="cancel-link">Cancelar</Link>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default EditPost;
