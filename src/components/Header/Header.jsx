import React from "react";
import './Header.css';
import LogoutButton from "../LogoutButton/LogoutButton";

const Header = () => {
    return (
        <header className="header-container">
            <h1 className="header-title">Twitter 2</h1>
            <nav className="header-nav">
                <ul className="nav-list">
                    <li className="nav-item"><a href="/feed">Feed</a></li>
                    <li className="nav-item"><a href="/profile">Meu perfil</a></li>
                    <li className="nav-item"><a href="/newpost">Nova postagem</a></li>
                    <LogoutButton />
                </ul>
            </nav>
        </header>
    );
}


export default Header;
