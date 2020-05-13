import React, { Component } from 'react';
import './Solution.css';
import HeaderSolution from './Header/HeaderSolution';
import SolutionText from './SolutionText/SolutionText';
import SolutionImage from './SolutionImage/SolutionImage';
import getRessources from './../../utils/getRessources';
import Footer from '../Footer/Footer';
import { connect } from "react-redux";


class Solution extends Component{
  constructor(props){
    super(props);
    this.state = {
      solution:[],
      idLang:""
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


  getSolution = async() => {
   
   const { idLang } = this.props;
    /*
    let section = this.props.match.params.id;
    let data = await getRessources("solution", section, idLang);
  
    for (let i = 0; i < data.length; i++) {
      this.getTextToList(data[i]);
    } */
    let section = this.props.match.params.id;
    let data = await getRessources("test", section, idLang);
    console.log("TEST TEST :",data);
  }

  componentDidMount = () => {
    this.getSolution(); 
  }; 


  render(){
    
      return (
          <div className="mt-5 sticky-wrap">
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

const mapStateToProps = state => ({
  data_store: state
});

export default connect(mapStateToProps)(Solution);
