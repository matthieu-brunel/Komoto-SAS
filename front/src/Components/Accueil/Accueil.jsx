import React from 'react';
import './Accueil.css';
import NavBar from './../NavBar/NavBar'
import SpecialisationAccueil from './Specialisation/Specialisation';
import HeaderAccueil from './Header/Header';
/* import SavoirFaireAccueil from './Savoir-faire/Savoir-faire'; */
import SolutionAccueil from './SolutionsAccueil/SolutionAccueil';
import DemonstrationAccueil from './DemonstrationAccueil/Demonstration';
import ReferenceAccueil from './ReferencesAccueil/Reference'
import Footer from "./../Footer/Footer"
import "animate.css/animate.min.css";
import ScrollAnimation from 'react-animate-on-scroll';

function Accueil() {
  return (
    <div className="">

      
     <div className="vignets">
       
        <NavBar />
       
      </div>
    
     
      <div className="vignets">
        <HeaderAccueil />
      </div> 
      
      
  {/*     <ScrollAnimation animateIn='fadeIn'>
      <div className="">
        <SavoirFaireAccueil />
      </div>
    </ScrollAnimation> */}
   
     
    <ScrollAnimation animateIn='fadeIn'>
      <div className="special">
        <SpecialisationAccueil />
      </div>
      </ScrollAnimation>
      <ScrollAnimation animateIn='fadeIn'>
      <div className="">
        <SolutionAccueil />
      </div>
     </ScrollAnimation>
      <ScrollAnimation animateIn='fadeIn'>
      <div className="">
        <DemonstrationAccueil />
      </div>
     </ScrollAnimation>
      <ScrollAnimation animateIn='fadeIn'>
      <div className="">
        <ReferenceAccueil />
      </div>
    </ScrollAnimation>
      <ScrollAnimation animateIn='fadeIn'>
      <div className="">
        <Footer />
      </div>
      </ScrollAnimation>

    </div>
  );
}

export default Accueil;
