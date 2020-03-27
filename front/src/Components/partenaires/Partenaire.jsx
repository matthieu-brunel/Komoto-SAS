import React from 'react';
import './Partenaire.css';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';




function Partenaire() {
  return (
    <div className="sticky-wrap">
      <NavBar />
      
      <div className="sticky-wrap">
      <Footer />
      </div>
    </div>
  );
}

export default Partenaire;