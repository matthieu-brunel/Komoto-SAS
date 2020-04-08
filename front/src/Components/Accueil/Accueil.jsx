import React, { Component} from 'react';
import './Accueil.css';

import SpecialisationAccueil from './Specialisation/Specialisation';
import HeaderAccueil from './Header/Header';
import SavoirFaireAccueil from './Savoir-faire/Savoir-faire';
import SolutionAccueil from './SolutionsAccueil/SolutionAccueil';
import DemonstrationAccueil from './DemonstrationAccueil/Demonstration';
import ReferenceAccueil from './ReferencesAccueil/Reference'
import Footer from "./../Footer/Footer"
import "animate.css/animate.min.css";
//import ScrollAnimation from 'react-animate-on-scroll';

class Accueil extends Component {
  constructor(props){
    super(props);
    //console.log("CLASS ACCUEIL : ",props);
  }
  render(){
    const { locale } = this.props;
    return (
      <div className="sticky-wrap">
  {/*        <div className="">
            <NavBar handleChangeLang={handleChangeLang}/>
          </div> */}
    {/*       <div className="vignets">
            <HeaderAccueil />
          </div> */}
          
          
  {/*         <ScrollAnimation animateIn='fadeIn'>
            <div className="">
              <SavoirFaireAccueil />
            </div>
          </ScrollAnimation> */}
        
    
        <div className="vignets">
          <HeaderAccueil locale={locale} />
        </div> 
        
    
        <div className="special">
          <SpecialisationAccueil locale={locale}/>
        </div>

        <div className="">
          <SolutionAccueil locale={locale}/>
        </div>

        <div className="special">
        <DemonstrationAccueil/>
        </div>

        <div className="">
          <ReferenceAccueil />
        </div>

        <div className="sticky-footer">
          <Footer />
        </div>
      </div>
    );
  }

}

export default Accueil;
