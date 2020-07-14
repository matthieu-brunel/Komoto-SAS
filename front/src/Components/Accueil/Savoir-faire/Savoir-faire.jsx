import React, { Component } from "react";
import "./Savoir-faire.css";
import getRessources from "../../../utils/getRessources";
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

    this.setState({ SavoirFaire: savoirFaire });
  };

  render() {
    return (
      <div className="container-header-savoirFaire mb-5">
        <div className="container-savoirFaire ">
          {this.state.SavoirFaire.length > 0 && (

            <div className="div-title-savoirFaire"
              data-aos="fade-up"
              data-aos-duration="500"
              data-aos-easing="ease-in-out">
              <ScrollAnimation animateIn='fadeIn'>
                <h2 className="title-savoirFaire pb-5">{this.state.SavoirFaire[0].title}</h2>
              </ScrollAnimation>
              <div className="container-savoirFaire-card test55 justify-content-around">

                {this.state.SavoirFaire.map((SavoirFaire, index) => {
                  return (
                    <div className="card-savoirfaire col-lg-2 mb-5" key={index}
                      data-aos="fade-up"
                      data-aos-duration="500"
                      data-aos-easing="ease-in-out">
                      <div>
                        <ScrollAnimation animateIn='fadeIn'>
                          <div>
                            <img className="img-savoirfaire" src={SavoirFaire.url} alt={SavoirFaire.alt} />
                            <div>
                              <h4 className="pt-3">{SavoirFaire.subtitle}</h4>
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
