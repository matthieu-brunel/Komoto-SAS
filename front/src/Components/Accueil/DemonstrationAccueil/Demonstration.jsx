import React, { Component } from "react";
import "./Demonstration.css";
import getRessources from "../../../utils/getRessources";
import { Link } from "react-router-dom";



class DemonstrationAccueil extends Component {
  constructor() {
    super();
    this.state = {
      demonstration: []
    };
  }
  componentDidMount = async () => {
    let data = await getRessources("homepage", "demonstration");

    this.setState({
      demonstration: data
    });
  };
  render() {
    return (
      <div className="center mb-5">
        {this.state.demonstration.length > 0 && <div className="demo-title"><h2 className="demo-title-text">{this.state.demonstration[0].title}</h2></div>}
        {this.state.demonstration.map((demonstration, index) => {
          return (
            <div key={index}>

              <div className="container all-demo">
                <div className="demo-img pt-5">
                  <img className="img-demonstration" src={demonstration.url} alt={demonstration.alt} />
                </div>
                <div className="demo-text pt-5">
                  <div>
                    <h5>{demonstration.subtitle}</h5>
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
