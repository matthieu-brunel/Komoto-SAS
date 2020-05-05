import React, { Component } from 'react';
import './NavBar.css'
import { Link } from "react-router-dom";



class NavBarAdmin extends Component {
  render(){
    return (
      <div className="">
        <div className="nav">
          <Link to="/user" className=""> Utilisateur </Link>
          <Link to="/HomepageAdmin"> Homepage </Link>
          <Link to="/SolutionAdmin"> Solution </Link>
          <Link to="/Langues"> Langues</Link>
          <Link to="/ContactAdmin"> Contact </Link>
          <Link to="/ReferenceAdmin">Réference </Link>
          <Link to="/DemonstrationAdmin"> Showroom</Link>
          <Link to="/Mail"> Historique des mails </Link>
        </div>
      </div>
    );
  }

}

export default NavBarAdmin;