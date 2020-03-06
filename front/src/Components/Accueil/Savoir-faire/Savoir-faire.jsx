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
    console.log(data);
    this.setState({
      SavoirFaire: data
    });
  };
  render() {
    return (
      <div>
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
