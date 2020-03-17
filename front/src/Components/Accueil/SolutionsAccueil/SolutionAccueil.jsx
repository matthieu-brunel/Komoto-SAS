import React, { Component } from "react";
import "./SolutionAccueil.css";
import getRessources from "../../../utils/getRessources";
import { Link } from "react-router-dom";

class SolutionAccueil extends Component {
  constructor() {
    super();
    this.state = {
      solution: []
    };
  }

  componentDidMount = async () => {
    let data = await getRessources("homepage", "solution");
    console.log(data);
    this.setState({
      solution: data
    });
  };
  
  render() {

    return (
      <div>
        {this.state.solution.length > 0 && <div className="sol-title"><h2 className="sol-title-text">{this.state.solution[0].title}</h2></div>}
        {this.state.solution.map((solution, index) => {
          return (
            <div key={index}>
              <div className="d-flex ">
                <div className="sol-img pt-5">
                  <img  className="img-solution" src={solution.url} alt={solution.alt} />
                </div>
                <div className="sol-text pt-5">
                  <div className="pt-5">
                    <h5>{solution.subtitle}</h5>
                  </div>
                  <div className="pt-5">
                    <a className="text-solution" href={`/solution-${solution.subtitle.toLowerCase()}`}>{solution.description}</a>
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

export default SolutionAccueil;
