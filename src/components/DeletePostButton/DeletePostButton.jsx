import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./DeletePostButton.css";

const DeletePostButton = () => {
    const navigate = useNavigate();

    const handleDeletePost = async () => {
        try {
            await api.delete('/post/delete/{post}');

            navigate('/feed');
        } catch (error) {
            console.error('Erro ao excluir a postagem:', error);
        }
    };

    return (
        <button className="delete-button" onClick={handleDeletePost}>
            Excluir postagem
        </button>
    );
};

export default DeletePostButton;
