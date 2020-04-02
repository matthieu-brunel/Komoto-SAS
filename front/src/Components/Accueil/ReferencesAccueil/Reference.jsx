import React, { Component } from "react";
import "./Reference.css";
import { HashLink as NavLink } from "react-router-hash-link";

import getRessources from "../../../utils/getRessources";

class ReferenceAccueil extends Component {
  constructor() {
    super();
    this.state = {
      reference: []
    };
  }

  componentDidMount = async () => {
    let data = await getRessources("homepage", "reference");
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
    //on remplace le contenu description de l'objet.description par la nouvelle description
    objet.url = array_url;
    objet.alt = array_alt;

    //on met a jour le state avec la nouvelle valeur [reference=state:[...this.state.specialisation=state actuel,objet=variable objet qui contient les nouvelles données]]
    this.setState({ reference: [...this.state.reference, objet] });
  }


  render() {
    return (
      <div  className="container-reference">
        <div className="div-title-reference mb-5">
          <h2 className="title-reference text-left">
            {this.state.reference.length > 0
              ? this.state.reference[0].title
              : "Titre 1"}
          </h2>
        </div>
        <div className="container-div-img">
          {this.state.reference.map((element, index) => (
            <div id="ReferenceAccueil" className="div-reference" key={index}>
              <NavLink to={`/Reference/#${element.url[index]}`}>
                <img
                  className="img-reference"
                  src={element.url[0]}
                  alt={element.alt[0]}
                />
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ReferenceAccueil;
