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

  /*   getAllLang = async () => {
      let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/language';
      let data = await (await (fetch(url))).json();
      let language_id = null;
  
      for (let i = 0; i < data.length; i++) {
        for (let [, value] of Object.entries(data[i])) {
          if (this.state.locale === value) {
            language_id = data[i].id;
          }
        }
      } */

 /*  getAllLang() {
    let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/language';
    fetch(url)
      .then(response => response.json())
      .then(response => {
        let language_id = null;
        for (let i = 0; i < response.length; i++) {
          for (let [, value] of Object.entries(response[i])) {
            if (this.state.locale === value) {
              language_id = response[i].id;
            }
          }
        }

        this.setState({
          arrayLang: response,
          idLang: language_id
        });
      })
  }


  componentDidMount = () => {
    this.getAllLang();
  } */
 
/*   componentDidUpdate(prevProps, prevState) {
    if (prevState.language_id !== this.state.language_id) {
      this.getAllLang();
    }
  }  */


  render() {

    const { locale, num_lang, handleClickSolution, language_id } = this.props;
    const { solution } = this.state;
    console.log("LOCALE : ", locale, "     ", "LANGUAGE_ID : ", language_id);

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
