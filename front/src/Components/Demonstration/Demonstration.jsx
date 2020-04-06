import React from 'react';
import './Demonstration.css';
import DemoModel from './DemonstrationModel/DemoModel';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';




function Demonstration() {
  return (
    <div className="sticky-wrap">
      
      <div><NavBar /></div>
     
     <div className="pt-5"><DemoModel/></div> 
      <div className="sticky-footer">
      <Footer />
      </div>
    </div>
  );
}

export default Demonstration;