import React, { Component } from "react";
import "./Savoir-faire.css";
import getRessources from "../../../utils/getRessources";
import { NavLink } from "react-router-dom";

class SavoirFaireAccueil extends Component {
  constructor() {
    super();
    this.state = {
      SavoirFaire: [],
      Header:[]
    };
  }
  componentDidMount = async () => {
    let savoirFaire = await getRessources("homepage", "SavoirFaire");
    console.log("savoirfaire : ", savoirFaire);
    this.setState({SavoirFaire: savoirFaire});

    let header = await getRessources("homepage", "header");
    console.log(" header : ",  header);
    this.setState({Header:  header});
  };
  render() {
    return (
      <div className="container-header-savoirFaire">
        <div className="div-header-savoirFaire" style={{ 'backgroundImage': `linear-gradient( rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0.45)), url(${this.state.Header.length > 0 && this.state.Header[0].url})` }}>
          <div className="container div-description-header d-flex justify-content-center">
            {this.state.Header.length > 0 && <h1 className="text-center mt-5">{this.state.Header[0].description}</h1>}
          </div>
          
        </div>
          <div className="container-savoirFaire">
            {this.state.SavoirFaire.length > 0 && (
              <div className="div-title-savoirFaire">
                <h2 className="title-savoirFaire">{this.state.SavoirFaire[0].title}</h2>
                <div className="container-savoirFaire-card row d-flex justify-content-around">
                  {this.state.SavoirFaire.map((SavoirFaire, index) => {
                  return (
                    <div className="card-savoirfaire col-lg-3 mb-5" key={index}>
                      <div>
                        <div>
                          <img className="img-savoirfaire" src={SavoirFaire.url} alt={SavoirFaire.alt} />
                          <div>
                            <p>{SavoirFaire.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                </div>
              </div>)}
          </div>
          <div className="div-vide-savoirFaire">

          </div>
      </div>
    );
  }
}
export default SavoirFaireAccueil;
