import React, { Component } from 'react';
import './Accueil.css';

import SpecialisationAccueil from './Specialisation/Specialisation';
import HeaderAccueil from './Header/Header';
import SolutionAccueil from './SolutionsAccueil/SolutionAccueil';
import DemonstrationAccueil from './DemonstrationAccueil/Demonstration';
import ReferenceAccueil from './ReferencesAccueil/Reference'
import Footer from "./../Footer/Footer"

const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;


class Accueil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solution: [],
      locale: "FR",
      idLang: null,
      arrayLang: []
    }
  }


  render() {

    const { locale, num_lang, handleClickSolution, language_id } = this.props;
    const { solution } = this.state;
   

    return (
      <div className="sticky-wrap">


        <div className="vignets">
          <HeaderAccueil locale={locale}  language_id={language_id}/>
        </div>


        <div className="special">
          <SpecialisationAccueil locale={locale} language_id={language_id} />
        </div>

        <div className="">
          <SolutionAccueil handleClickSolution={handleClickSolution} solution={solution} num_lang={num_lang} locale={locale} language_id={language_id} />
        </div>

        <div className="section-demonstration-accueil">
          <DemonstrationAccueil locale={locale} language_id={language_id} />
        </div>

        <div className="">
          <ReferenceAccueil locale={locale} language_id={language_id} />
        </div>

        <div className="sticky-footer">
          <Footer locale={locale} language_id={language_id} />
        </div>
      </div>
    );
  }

}

export default Accueil;
