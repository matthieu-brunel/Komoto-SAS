import React, { Component } from 'react';
import './Specialisation.css';
import getRessources from '../../../utils/getRessources';
import { NavLink } from 'react-router-dom';
import "animate.css/animate.min.css";
import ScrollAnimation from 'react-animate-on-scroll';

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
      <div className="">
        <div className="">
          <h2 className="div-title-specialisation title-specialisation">{this.state.specialisation.length > 0 ? this.state.specialisation[0].title : "Titre 1"}</h2>
        </div>

        <div className="container test1">
          {this.state.specialisation.map((specialisation, index) => {
            return (






              <div class="card p-2 mb-5 mr-5 tl-card" key={index} >
                <ScrollAnimation animateIn='fadeIn'>
                  <div className="div-img-spe container ">
                    <img src={specialisation.url} class="card-img-top size-img " alt={specialisation.alt} />
                  </div>
                </ScrollAnimation>
                <div class="card-body">
                  <ScrollAnimation animateIn='fadeIn'>
                    <div className="">
                      <h5 class="card-title">{this.state.specialisation[index].title}</h5>
                    </div>
                  </ScrollAnimation>

                  <ScrollAnimation animateIn='fadeIn'>
                  <div className=" card-text">
                    {specialisation.description.map((list, index) => (<div key={index}><ul><li>{list}</li></ul></div>))}
                  </div>
                  </ScrollAnimation>
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