import React, { Component } from 'react';
import './Specialisation.css';
import getRessources from '../../../utils/getRessources';
import "animate.css/animate.min.css";
import ScrollAnimation from 'react-animate-on-scroll';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();


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
      <div className="div-container-spec text-center pt-5">
        <div className="">
          <h2 className="div-title-specialisation title-specialisation pb-5">{specialisation.length > 0 && specialisation[0].title}</h2>
        </div>

        <div className="container cards"
          data-aos="fade-up"
          data-aos-duration="500"
          data-aos-easing="ease-in-out">

          {specialisation.map((specialisation, index) => {
            return (
              <div className="col-sm-6 p-3" key={index}
                data-aos="fade-up"
                data-aos-duration="500"
                data-aos-easing="ease-in-out">
                <div className="card">
                  <img src={specialisation.url} className="card-img-top" alt={specialisation.alt} />
                  <div className="card-body">
                    <h2 className="card-title font-weight-bold mb-4">{specialisation.subtitle}</h2>
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