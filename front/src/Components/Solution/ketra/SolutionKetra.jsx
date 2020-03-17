import React, { Component } from 'react';
import './SolutionKetra.css';
import HeaderSolutionKetra from './Header/HeaderSolutionKetra';
import SolutionTextKetra from './SolutionText/SolutionTextKetra';
import SolutionImageKetra from './SolutionImage/SolutionImageKetra';
import getRessources from './../../../utils/getRessources';
import NavBar from '../../NavBar/NavBar';
import Footer from '../../Footer/Footer';


class SolutionKetra extends Component{
  constructor(props){
    super(props);
    this.state = {
      ketra:[]
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
    this.setState({ ketra: [...this.state.ketra, objet] });
  }

  componentDidMount = async () => {
    let data = await getRessources("solution", "ketra");
    console.log("SolutionKetra : ",data);
    for (let i = 0; i < data.length; i++) {
      this.getTextToList(data[i]);
    }
  };

  render(){

      return (
          <div className="">
            <NavBar />
            <HeaderSolutionKetra header={this.state.ketra}/>
            <SolutionTextKetra texte={this.state.ketra}/>
            { this.state.ketra.length > 0 && <SolutionImageKetra image={this.state.ketra[0].url}/>}
            <Footer />
          </div>
        );
  }

}

export default SolutionKetra;