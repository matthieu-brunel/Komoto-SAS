import React, { Component } from 'react';
import './Solution.css';
import HeaderSolution from './Header/HeaderSolution';
import SolutionText from './SolutionText/SolutionText';
import SolutionImage from './SolutionImage/SolutionImage';
import getRessources from './../../utils/getRessources';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { connect } from "react-redux";


class Solution extends Component{
  constructor(props){
    super(props);
    this.state = {
      solution:[]
    }
   
  }

  getTextToList(data) {
    //variable objet qui servira à accueillir les données
    let objet = data;
    //variable array_description qui servira a convertir le contenu description en tableau grace au slash
    let array_description = data.description.split('/');
    let array_image = data.url.split('/');
    //on remplace le contenu description de l'objet.description par la nouvelle description
    objet.description = array_description;
    objet.url = array_image;
    //on met a jour le state avec la nouvelle valeur [specialisation=state:[...this.state.specialisation=state actuel,objet=variable objet qui contient les nouvelles données]]
    this.setState({ solution: [...this.state.solution, objet] });
  }

  componentDidMount = async () => {
    const {locale } = this.props;
    let get_data_store = await JSON.parse((await localStorage.getItem('data_store')));
   //et get_data_lang = await JSON.parse((await localStorage.getItem('data_lang')));
    //console.log(get_data_lang);
    let data = await getRessources("solution", get_data_store.solutionSelected, locale);
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      this.getTextToList(data[i]);
    }
  };

  render(){
    const {locale, handleChangeLang } = this.props;
    console.log("locale solution :",locale);
      return (
          <div className="mt-5 sticky-wrap">
            <NavBar locale={locale} handleChangeLang={handleChangeLang}/>
            <HeaderSolution header={this.state.solution}/>
            <SolutionText texte={this.state.solution}/>
            { this.state.solution.length > 0 && <SolutionImage image={this.state.solution[0].url}/>}
            <div className="sticky-footer">
            <Footer />
            </div>
          </div>
        );
  }

}


export default connect()(Solution);