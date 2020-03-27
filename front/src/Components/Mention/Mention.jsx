import React from 'react';
import './Mention.css';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';




function Mention() {
  return (
    <div className="sticky-wrap">
      <NavBar />
      
      <div className="sticky-footer">
      <Footer />
      </div>
    </div>
  );
}

export default Mention;