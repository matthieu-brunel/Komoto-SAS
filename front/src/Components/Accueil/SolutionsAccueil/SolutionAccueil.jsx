import React, { Component } from "react";
import "./SolutionAccueil.css";
import getRessources from "../../../utils/getRessources";
import { NavLink } from "react-router-dom";

class SolutionAccueil extends Component {
  constructor() {
    super();
    this.state = {
      Solution: []
    };
  }
  componentDidMount = async () => {
    let data = await getRessources("homepage", "Solution");
    console.log(data);
    this.setState({
      Solution: data
    });
  };
  render() {
    return (
      <div>
        {this.state.Solution.map((Solution, index) => {
          return (
            <div key={index}>
              <NavLink to="/Solution">{Solution.title}</NavLink>
            </div>
          );
        })}
      </div>
    );
  }
}

export default SolutionAccueil;
