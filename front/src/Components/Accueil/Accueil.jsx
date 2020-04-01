import React, { Component} from 'react';
import './Accueil.css';
import NavBar from './../NavBar/NavBar'
import SpecialisationAccueil from './Specialisation/Specialisation';
import HeaderAccueil from './Header/Header';
import SavoirFaireAccueil from './Savoir-faire/Savoir-faire';
import SolutionAccueil from './SolutionsAccueil/SolutionAccueil';
import DemonstrationAccueil from './DemonstrationAccueil/Demonstration';
import ReferenceAccueil from './ReferencesAccueil/Reference'
import Footer from "./../Footer/Footer"
import "animate.css/animate.min.css";
import ScrollAnimation from 'react-animate-on-scroll';

class Accueil extends Component {
  render(){

    return (
      <div className="sticky-wrap">
       <div className="">
          <NavBar />
        </div>
  {/*       <div className="vignets">
          <HeaderAccueil />
        </div> */}
        
        
{/*         <ScrollAnimation animateIn='fadeIn'>
          <div className="">
            <SavoirFaireAccueil />
          </div>
        </ScrollAnimation> */}
      
  
      <div className="vignets">
        <HeaderAccueil />
      </div> 
      
      
 
    

     
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
      <div className="special">
      <DemonstrationAccueil/>
      </div>
    </ScrollAnimation>

    <ScrollAnimation animateIn='fadeIn'>
      <div className="">
        <ReferenceAccueil />
      </div>
    </ScrollAnimation>

   
      <div className="sticky-footer">
        <Footer />
      </div>
   
  
      </div>
    );
  }

}

export default Accueil;
