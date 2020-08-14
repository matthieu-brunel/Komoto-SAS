import React from 'react';
import './Demonstration.css';
import DemoModel from './DemonstrationModel/DemoModel';

import Footer from '../Footer/Footer';




function Demonstration(props) {
  const { locale, language_id } = props;
  return (
    <div className="sticky-wrap">
     <div className="pt-5"><DemoModel locale={locale} language_id={language_id}/></div> 
      <div className="sticky-footer">
      <Footer />
      </div>
    </div>
  );
}

export default Demonstration;