import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return(
        <div className="nav">
            <div className="hamburger">
                <i className="fas fa-bars"></i>
            </div>
            <div className="search">
                <i className="fas fa-search"></i>
            </div>
            <div className="logo">
                <h1>Trova</h1>
            </div>
            <div className="comment">
                <i className="far fa-comment"></i>
            </div>
            <div className="notification">
                <i className="far fa-bell"></i>
            </div>
        </div>
    )
}

export default Navbar;