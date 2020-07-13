import React, { Component } from 'react';
import './Specialisation.css';
import getRessources from '../../../utils/getRessources';
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
    const { locale } = this.props;
    //on récupère les données depuis la fonction externe getRessources de maniere aysnchrone
    let data = await getRessources('homepage', 'specialisation', locale);

    //une boucle qui permettra d'itérer chaque objet et de l'envoyer dans la fonction getTextToList
    for (let i = 0; i < data.length; i++) {
      this.getTextToList(data[i]);
    }
  }


  render() {
    const { specialisation } = this.state;

    return (
      <div className="div-container-spec pt-5">
        <div className="">
          <h2 className="div-title-specialisation title-specialisation pb-5">{specialisation.length > 0 && specialisation[0].title}</h2>
        </div>

        <div className="row align-items-flex-start">
          {specialisation.map((specialisation, index) => {
            return (

              /*               <div className="card p-2 mb-3" key={index} >
                              <ScrollAnimation animateIn='fadeIn'>
                                <div className="div-img-spe">
                                  <img src={specialisation.url} className="card-img-top" alt={specialisation.alt} />
                                </div>
              
                              </ScrollAnimation>
                              <div className="card-body">
                                <ScrollAnimation animateIn='fadeIn'>
                                  <div className="">
                                    <h5 className="card-title p-2">{specialisation.subtitle}</h5>
                                  </div>
                                </ScrollAnimation>
              
                                <ScrollAnimation animateIn='fadeIn'>
                                  <div className="text-left card-text">
                                    {specialisation.description.map((list, index) => (<div key={index}><ul><li className="checkList-spec-accueil">{list}</li></ul></div>))}
                                  </div>
                                </ScrollAnimation>
                              </div>
                            </div> */
              <div className="col-sm-6 p-3" key={index}>
                <div className="card">
                  <img src={specialisation.url} className="card-img-top" alt={specialisation.alt} />
                  <div className="card-body">
                    <h5 className="card-title">{specialisation.subtitle}</h5>
                    <div className="card-text text-left">
                      {specialisation.description.map((list, index2) => (<div key={index2}><ul><li className="checkList-spec-accueil">{list}</li></ul></div>))}
                    </div>
                  </div>
                </div>
              </div>

            )
          })}
        </div>
        <div className="div-vide-spec">

        </div>

      </div>
    );
  }
}

export default SpecialisationAccueil