import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./LogoutButton.css";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await api.post("/logout");
            localStorage.removeItem("user_id")
            localStorage.removeItem("token")
            navigate("/");
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    };

    return (
        <button className="logout-button" onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;
