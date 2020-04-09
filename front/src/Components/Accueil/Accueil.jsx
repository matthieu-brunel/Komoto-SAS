import React, { Component} from 'react';
import './Accueil.css';

import SpecialisationAccueil from './Specialisation/Specialisation';
import HeaderAccueil from './Header/Header';
import SolutionAccueil from './SolutionsAccueil/SolutionAccueil';
import DemonstrationAccueil from './DemonstrationAccueil/Demonstration';
import ReferenceAccueil from './ReferencesAccueil/Reference'
import Footer from "./../Footer/Footer"
import "animate.css/animate.min.css";
import getRessources from "./../../utils/getRessources";
//import ScrollAnimation from 'react-animate-on-scroll';

class Accueil extends Component {
    constructor(props) {
      super(props);
      this.state = {
        solution:[],
        locale:""
      }
    }

  componentDidMount = async () => {
    const { locale } = this.props;
    let data = await getRessources("homepage", "solution", locale);
    //console.log(data);
    this.setState({
      solution: data
    });
  };

  render(){
    //console.log("je suis dans accueil");
    const { locale, num_lang, handleClickSolution } = this.props;
    const { solution } = this.state;

    return (
      <div className="sticky-wrap">

        
        <div className="vignets">
          <HeaderAccueil locale={locale} />
        </div> 
        
    
        <div className="special">
          <SpecialisationAccueil locale={locale}/>
        </div>

        <div className="">
          <SolutionAccueil handleClickSolution={handleClickSolution} solution={solution} num_lang={num_lang} locale={locale}/>
        </div>

        <div className="special">
        <DemonstrationAccueil locale={locale}/>
        </div>

        <div className="">
          <ReferenceAccueil locale={locale}/>
        </div>

        <div className="sticky-footer">
          <Footer locale={locale}/>
        </div>
      </div>
    );
  }

}

export default Accueil;
