import React, { Component} from 'react';
import './Reference.css';
import ReferenceComponents from './ReferenceComponents/ReferenceComponents';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import getRessources from "./../../utils/getRessources";



class Reference extends Component {
  constructor(props){
    super(props);
    this.state = {
      reference:[]
    }
  }

  componentDidMount = async () => {
    let data = await getRessources("reference", "reference");
    for (let i = 0; i < data.length; i++) {
      this.getTextToList(data[i]);
    } 
    
  };


  getTextToList(data) {
    //variable objet qui servira à accueillir les données
    let objet = data;
    
    //variable array_description qui servira a convertir le contenu description en tableau grace au slash
    let array_url = data.url.split('|');
    let array_alt = data.alt.split('|');
    let array_description = data.description.split('|');


    //on remplace le contenu description de l'objet.description par la nouvelle description
    objet.url = array_url;
    objet.alt = array_alt;
    objet.description = array_description;

    let description_array = [];
    for(let i in data.description){
      if(data.description[i] !== undefined){
        if(data.description[i].includes('|')){
          description_array.push(data.description[i].split('|'));
          if(data.description.length === description_array.length){
            objet.description = description_array;
          }
        }
      }
    }
    //on met a jour le state avec la nouvelle valeur [reference=state:[...this.state.specialisation=state actuel,objet=variable objet qui contient les nouvelles données]]
    this.setState({ reference: [...this.state.reference, objet] });
  }
  

  render(){
    const { reference } = this.state; 
    
    return (
      <div className="">
        <NavBar />
       { <ReferenceComponents reference={this.state.reference}/>}
        <Footer />
      </div>
    );
  }

}

export default Reference;