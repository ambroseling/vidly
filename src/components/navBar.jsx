import React, { Component } from 'react';
import { NavLink,Link } from 'react-router-dom';
import '../App.css'
import LogOut from './logout';

const NavBar = (props) => {
    return ( 
        <nav className="navbar navbar-expand-lg bg-light">
    <Link className="navbar-brand" to="/">Vidly</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <div className="navbar-nav">
          <li><NavLink className="nav-item nav-link" to="/movies">Movies</NavLink></li>
          

        <li><NavLink className="nav-item nav-link" to="/customers">Customers</NavLink></li>
         
        <li><NavLink className="nav-item nav-link" to="/rentals">Rentals</NavLink></li>
        {!props.user && 
        <React.Fragment>
        <li><NavLink className="nav-item nav-link" to="/login">Login</NavLink></li>
        <li><NavLink className="nav-item nav-link" to="/register">Register</NavLink></li>
        </React.Fragment>
        }
        {props.user && 
        <React.Fragment>
        <li><NavLink className="nav-item nav-link" to='/logout'>Log Out</NavLink></li>
        <li><NavLink className="nav-item nav-link btn-primary name_badge tool" to="/profile">{props.user['name']}</NavLink></li>

        </React.Fragment>
        }

      </div>
    </div>
  
</nav>
     );
}
 
export default (NavBar);