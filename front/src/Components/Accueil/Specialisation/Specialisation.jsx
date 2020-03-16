import React, { Component } from 'react';
import './Specialisation.css';
import getRessources from '../../../utils/getRessources';
import { NavLink } from 'react-router-dom';

class SpecialisationAccueil extends Component {
  constructor() {
    super()
    this.state = {
      specialisation: []
    }
  }

  getTextToList(data) {
    //variable objet qui servira à accueillir les données
    let objet = data;
    //variable array_description qui servira a convertir le contenu description en tableau grace au slash
    let array_description = data.description.split('/');
    //on remplace le contenu description de l'objet.description par la nouvelle description
    objet.description = array_description;
    //on met a jour le state avec la nouvelle valeur [specialisation=state:[...this.state.specialisation=state actuel,objet=variable objet qui contient les nouvelles données]]
    this.setState({ specialisation: [...this.state.specialisation, objet] });
  }

  componentDidMount = async () => {
    //on récupère les données depuis la fonction externe getRessources de maniere aysnchrone
    let data2 = await getRessources('homepage', 'specialisation');
    //une boucle qui permettra d'itérer chaque objet et de l'envoyer dans la fonction getTextToList
    for (let i = 0; i < data2.length; i++) {
      this.getTextToList(data2[i]);
    }
  }

  render() {
    console.log("this.state.specialisation : ", this.state.specialisation);
    return (
      <div className="container-specialisation">
        <div className="div-title-specialisation mb-5">
          <h2 className="title-reference text-left">{this.state.specialisation.length > 0 ? this.state.specialisation[0].title : "Titre 1"}</h2>
        </div>
        <div className="container-specialisation-card row">
          {this.state.specialisation.map((specialisation, index) => {
            return (
             
             
             
             <div className="div-container-specialisation " key={index}>
              
               
                <div class="card ffff" >
                   <div className="div-img-specialisation">
                  <img  src={specialisation.url} class="card-img-top img-specialisation" alt={specialisation.alt} />
                  </div>
                  <div class="card-body">
                   
                  <div className="div-titre-specialisation">
                    <h6 class="card-title">{this.state.specialisation[index].title}</h6>
                  </div>
                  
                    <div className="div-text-specialisation card-text">
                  {specialisation.description.map((list, index) => (<div key={index}><ul><li>{list}</li></ul></div>))}
                </div>
                  </div>
               
                </div>


             </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default SpecialisationAccueil