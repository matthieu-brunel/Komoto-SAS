import React, { Component } from 'react';
import './Solutionkroco.css';
import HeaderSolutionkroco from './Header/HeaderSolutionKroco';
import SolutionTextkroco from './SolutionText/SolutionTextkroco';
import SolutionImagekroco from './SolutionImage/SolutionImageKroco';
import getRessources from '../../../utils/getRessources';
import NavBar from '../../NavBar/NavBar';
import Footer from '../../Footer/Footer';


class Solutionkroco extends Component{
  constructor(props){
    super(props);
    this.state = {
      kroco:[]
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
    this.setState({ kroco: [...this.state.kroco, objet] });
  }

  componentDidMount = async () => {
    let data = await getRessources("solution", "kroco");
    for (let i = 0; i < data.length; i++) {
      this.getTextToList(data[i]);
    }
  };

  render(){

      return (
          <div className="">
            <NavBar />
            <HeaderSolutionkroco header={this.state.kroco}/>
            <SolutionTextkroco texte={this.state.kroco}/>
            { this.state.kroco.length > 0 && <SolutionImagekroco image={this.state.kroco[0].url}/>}
            <Footer />
          </div>
        );
  }

}

export default Solutionkroco;