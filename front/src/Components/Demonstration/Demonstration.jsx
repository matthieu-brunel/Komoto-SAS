import React from 'react';
import './Demonstration.css';
import DemoTexte from './DemonstrationTexte/DemoTexte';
import DemoModel from './DemonstrationModel/DemoModel';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';




function Demonstration() {
  return (
    <div className="">
      <NavBar />
      <DemoTexte/>
      <DemoModel/>
      <Footer />
    </div>
  );
}

export default Demonstration;