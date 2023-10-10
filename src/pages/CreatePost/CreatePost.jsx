import React, { useState } from "react";
import api from "../../api/api";
import { useNavigate, Link } from "react-router-dom";
import "./CreatePost.css"
import Header from "../../components/Header/Header";

const CreatePost = ({ userId }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [contentError, setContentError] = useState("");
    const [titleError, setTitleError] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        setTitleError("");
        setError("");
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
        setContentError("");
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title) {
            setTitleError('O título é obrigatório.');
            return;
        }

        if (!content) {
            setContentError('O contéudo é obrigatório.');
            return;
        }

        try {
            await api.post("/post/create", {
                user: userId,
                title,
                content,
            });

            navigate('/feed')
        } catch (error) {
            console.error("Erro ao criar o post:", error);
            setError(error.response.data.message);
        }
    };

    return (
        <div>
            <Header />
            <div className="create-post-container">
                <img className="icon" src="https://static-prod.adweek.com/wp-content/uploads/2022/11/FuzzyBlue2.jpg" alt="Twitter Icon" />
                <h2>Criar um novo post</h2>
                <form onSubmit={handleSubmit} className="create-post-form">
                    <div className="form-group">
                        <label htmlFor="title">Título:</label> {titleError && <span className="error-message">{titleError}</span>}
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={handleTitleChange}
                            className={`form-input ${titleError ? 'error' : ''}`}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Conteúdo:</label> {contentError && <span className="error-message">{contentError}</span>}
                        <textarea
                            id="content"
                            value={content}
                            onChange={handleContentChange}
                            className={`form-input ${contentError ? 'error' : ''}`}
                        />
                    </div>
                    <button type="submit" className="create-button">Criar Post</button>
                    <Link to={'/feed'} className="cancel-link">Cancelar</Link>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default CreatePost;
