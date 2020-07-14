import React, { Component } from "react";
import "./Demonstration.css";
import getRessources from "../../../utils/getRessources";



class DemonstrationAccueil extends Component {
  constructor() {
    super();
    this.state = {
      demonstration: []
    };
  }
  componentDidMount = async () => {
    const { locale } = this.props;
    let data = await getRessources("homepage", "demonstration", locale);

    this.setState({
      demonstration: data
    });
  };
  render() {
    return (
      <div className="center p-5 ">
        {this.state.demonstration.length > 0 && <div className="demo-title"
          data-aos="fade-up"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"><h2 className="demo-title-text">{this.state.demonstration[0].title}</h2></div>}
        {this.state.demonstration.map((demonstration, index) => {
          return (
            <div key={index}
              data-aos="fade-up"
              data-aos-duration="500"
              data-aos-easing="ease-in-out">

              <div className="container all-demo">
                <div className="demo-img pt-5">
                  <img className="img-demonstration" src={demonstration.url} alt={demonstration.alt} />
                </div>
                <div className="demo-text pt-4">
                  <div>
                    <h5 className="text-subtitle-demonstration">{demonstration.subtitle}</h5>
                  </div>
                  <div>
                    <p>{demonstration.description}</p>
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

export default DemonstrationAccueil;
