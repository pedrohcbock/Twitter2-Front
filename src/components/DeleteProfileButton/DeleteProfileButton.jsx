import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./DeleteProfileButton.css";

const DeleteProfileButton = () => {
    const navigate = useNavigate();

    const handleDeleteUser = async () => {
        try {
            const user_id = localStorage.getItem("user_id");
            await api.delete(`/user/delete/${user_id}`);
            navigate('/');
        } catch (error) {
            console.error('Erro ao excluir o usuário:', error);
        }
    };

    return (
        <button className="delete-button" onClick={handleDeleteUser}>
            Excluir conta
        </button>
    );
};

export default DeleteProfileButton;
