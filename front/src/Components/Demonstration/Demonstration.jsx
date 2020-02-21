import React from 'react';
import './Demonstration.css';
import DemoTexte from './DemonstrationTexte/DemoTexte';
import DemoModel from './DemonstrationModel/DemoModel';




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