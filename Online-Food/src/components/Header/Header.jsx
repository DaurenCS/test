import React from 'react';
import './Header.css';
import { useAuth } from "hooks/use-auth"
import { Link, useNavigate } from "react-router-dom";

function Header() {
    const { isAuth, name, surname, handleLogout } = useAuth();
    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="logo">
                <Link to={"/"}>
                    <div className="logo-container">
                        <div className="logo-icon">
                           <img src="https://www.kfc.kz/admin/files/3190.svg" alt="" />                                
                        </div>
                    </div>
                </Link>
            </div>

            <div className="user-info">
                {isAuth && <div className="user-name"><p>Welcome {name} {surname}!</p></div>}
                {isAuth && <button className="cart-button" onClick={() => { navigate("/cart") }}>Cart</button>}
                {!isAuth && <img className="log" src="https://cdn-icons-png.flaticon.com/128/4240/4240674.png" onClick={() => { navigate("/") }}/>}               
                {!isAuth && <img className="log" src="https://cdn-icons-png.flaticon.com/128/5585/5585562.png" onClick={() => { navigate("/") }}/>}
                {!isAuth && <img className="log" src="https://cdn-icons-png.flaticon.com/128/3106/3106921.png" onClick={() => { navigate("/login") }}/>}
                {isAuth && <button className="logout-button" onClick={handleLogout}>Logout</button>}
            </div>
        </header>
    );
}

export default Header;