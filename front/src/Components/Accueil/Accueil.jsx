import React, { Component } from 'react';
import './Accueil.css';

import SpecialisationAccueil from './Specialisation/Specialisation';
import HeaderAccueil from './Header/Header';
import SolutionAccueil from './SolutionsAccueil/SolutionAccueil';
import DemonstrationAccueil from './DemonstrationAccueil/Demonstration';
import ReferenceAccueil from './ReferencesAccueil/Reference'
import Footer from "./../Footer/Footer"
//import "animate.css/animate.min.css";

//import ScrollAnimation from 'react-animate-on-scroll';
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

  getAllLang = async () => {
    let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/language';
    let data = await (await (fetch(url))).json();
    let language_id = null;

    for (let i = 0; i < data.length; i++) {
      for (let [, value] of Object.entries(data[i])) {
        if (this.state.locale === value) {
          language_id = data[i].id;
        }
      }
    }

    this.setState({
      arrayLang: data,
      idLang: language_id
    });
  }


  componentDidMount = () => {
    this.getAllLang();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.idLang !== this.state.idLang) {
      this.getAllLang();
    }
  }



  render() {

    const { locale, num_lang, handleClickSolution } = this.props;
    const { solution, idLang } = this.state;

    return (
      <div className="sticky-wrap">


        <div className="vignets">
          <HeaderAccueil locale={locale} idLang={idLang} />
        </div>


        <div className="special">
          <SpecialisationAccueil locale={locale} idLang={idLang} />
        </div>

        <div className="">
          <SolutionAccueil handleClickSolution={handleClickSolution} solution={solution} num_lang={num_lang} locale={locale} idLang={idLang} />
        </div>

        <div className="section-demonstration-accueil">
          <DemonstrationAccueil locale={locale} idLang={idLang} />
        </div>

        <div className="">
          <ReferenceAccueil locale={locale} idLang={idLang} />
        </div>

        <div className="sticky-footer">
          <Footer locale={locale} idLang={idLang} />
        </div>
      </div>
    );
  }

}

export default Accueil;
