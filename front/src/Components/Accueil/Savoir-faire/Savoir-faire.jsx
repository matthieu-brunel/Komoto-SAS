import React, { Component } from "react";
import "./Savoir-faire.css";
import getRessources from "../../../utils/getRessources";
import { NavLink } from "react-router-dom";

class SavoirFaireAccueil extends Component {
  constructor() {
    super();
    this.state = {
      SavoirFaire: []
    };
  }
  componentDidMount = async () => {
    let data = await getRessources("homepage", "SavoirFaire");
    console.log("savoirfaire : ",data);
    this.setState({
      SavoirFaire: data
    });
  };
  render() {
    return (
      <div>
        {this.state.SavoirFaire.length > 0 && <h2>{this.state.SavoirFaire[0].title}</h2>}
        {this.state.SavoirFaire.map((SavoirFaire, index) => {
          return (
            <div key={index}>
              <NavLink to="/SavoirFaire">{SavoirFaire.title}</NavLink>
            </div>
          );
        })}
      </div>
    );
  }
}
export default SavoirFaireAccueil;
