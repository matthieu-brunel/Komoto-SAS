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
    console.log("savoirfaire : ", data);
    this.setState({
      SavoirFaire: data
    });
  };
  render() {
    return (
      <div>
        {this.state.SavoirFaire.length > 0 && (
          <h2>{this.state.SavoirFaire[0].title}</h2>
        )}
        {this.state.SavoirFaire.map((SavoirFaire, index) => {
          return (
            <div key={index}>
              <div>
                <div>
                  <img src={SavoirFaire.url} alt={SavoirFaire.alt} />
                  <div>
                    <p>{SavoirFaire.description}</p>
                  </div>
                  <div>
                    <h2>{SavoirFaire.title}</h2>
                  </div>
                </div>
                <div>
                  <div>
                    <img src={SavoirFaire.url} alt={SavoirFaire.alt} />
                  </div>
                  <div>
                    <h4>{SavoirFaire.subtitle}</h4>
                  </div>
                  <div>
                    <p>{SavoirFaire.description}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
export default SavoirFaireAccueil;
