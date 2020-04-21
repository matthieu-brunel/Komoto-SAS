import React from 'react';
import './NavBar.css'
import { Link } from "react-router-dom";



function NavBarAdmin() {
  return (
    <div className="">
      <div className="nav">
      <Link to="/user" className=""> Utilisateur </Link>
      <Link to="/SolutionAdmin"> Solution </Link>
      <Link to="/ContactAdmin"> Contact </Link>
      <Link to="/ReferenceAdmin">Réference </Link>
      <Link to="/DemonstrationAdmin"> Showroom</Link>
      <Link to="/Mail"> Historique des mails </Link>
    </div>
    </div>
  );
}

export default NavBarAdmin;