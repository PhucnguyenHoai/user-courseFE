import React from "react";
import '../assests/css/nav.css';
import { NavLink } from "react-router-dom";

function Nav() {
    return (
        <ul>
            <li><NavLink to="/" exact>Home</NavLink></li>
            <li><NavLink to="/covid">Covid</NavLink></li>
            <li><NavLink to="/course">User Course</NavLink></li>
        </ul>
    )
}

export default Nav;