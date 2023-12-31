import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import "./EditPost.css";
import Header from "../../components/Header/Header";

const EditPost = () => {
    const { postId } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/");
        }

        api.get(`post/postData/${postId}`)
            .then((response) => {
                const post = response.data.user;
                if (post) {
                    console.log(post)
                    setTitle(post.title);
                    setContent(post.content);
                } else {
                    setError("Post não encontrado.");
                }
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

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post(`/post/update/${postId}`, {
                title,
                content,
            });

            navigate(`/profile`);
        } catch (error) {
            console.error("Erro ao atualizar o post:", error);
            setError(error.response.data.message);
        }
    };

    console.log(title)
    return (
        <div>
            <Header />
            <div className="edit-profile-container">
                <img
                    className="icon"
                    src="https://static-prod.adweek.com/wp-content/uploads/2022/11/FuzzyBlue2.jpg"
                    alt="Twitter Icon"
                />
                <h2>Editar Post</h2>
                <form onSubmit={handleFormSubmit} className="edit-profile-form">
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
                    <button type="submit" className="update-button">Salvar</button>
                    <Link to={"/profile"} className="cancel-link">Cancelar</Link>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
}

export default EditPost;
