import React from "react";
import './Menubar.css';
import {Link, NavLink} from 'react-router-dom';

const Menubar = () => {
    return(
        <div className="menu">
            <div className="previous">
                <i className="fas fa-chevron-left"></i>
            </div>
            <ul className="menuLinks">
                <li><NavLink exact to="/" activeClassName="activeLink">Requests</NavLink></li>
                <li><NavLink to="/service" activeClassName="activeLink">Services</NavLink></li>
                <li><NavLink to="/payment" activeClassName="activeLink">Payments</NavLink></li>
            </ul>
        </div>
    )
}

export default Menubar;