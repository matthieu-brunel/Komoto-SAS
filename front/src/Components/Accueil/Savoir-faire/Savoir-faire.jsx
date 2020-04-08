import React, { Component } from "react";
import "./Savoir-faire.css";
import getRessources from "../../../utils/getRessources";
import { NavLink } from "react-router-dom";
import "animate.css/animate.min.css";
import ScrollAnimation from 'react-animate-on-scroll';


class SavoirFaireAccueil extends Component {
  constructor() {
    super();
    this.state = {
      SavoirFaire: [],
      Header: []
    };
  }
  componentDidMount = async () => {
    const { locale } = this.props;
    let savoirFaire = await getRessources("homepage", "SavoirFaire", locale);
    console.log("savoirfaire : ", savoirFaire);
    this.setState({ SavoirFaire: savoirFaire });
  };

  render() {
    return (
      <div className="container-header-savoirFaire">
        <div className="container-savoirFaire ">
          {this.state.SavoirFaire.length > 0 && (

            <div className="div-title-savoirFaire ">
             <ScrollAnimation animateIn='fadeIn'>
              <h2 className="title-savoirFaire">{this.state.SavoirFaire[0].title}</h2>
              </ScrollAnimation>
              <div className="container-savoirFaire-card test55 justify-content-around">


                {this.state.SavoirFaire.map((SavoirFaire, index) => {
                  return (
                    <div className="card-savoirfaire col-lg-3 mb-5" key={index}>
                      <div>
                        <ScrollAnimation animateIn='fadeIn'>
                          <div>
                            <img className="img-savoirfaire" src={SavoirFaire.url} alt={SavoirFaire.alt} />
                            <div>
                              <p>{SavoirFaire.description}</p>
                            </div>
                          </div>
                        </ScrollAnimation>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>)}
        </div>
      </div>
    );
  }
}
export default SavoirFaireAccueil;
