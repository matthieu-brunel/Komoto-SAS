import React, { Component } from "react";
import "./Demonstration.css";
import getRessources from "../../../utils/getRessources";
import { NavLink } from "react-router-dom";

const SERVER_ADDRESS = process.env.SERVER_ADDRESS;

class DemonstrationAccueil extends Component {
  constructor() {
    super();
    this.state = {
      demonstration: []
    };
  }
  componentDidMount = async () => {
    let data = await getRessources("homepage", "demonstration");
    console.log(data);
    this.setState({
      demonstration: data
    });
  };
  render() {
    return (
      <div>
        {this.state.demonstration.map((demonstration, index) => {
          return (
            <div key={index}>
              <NavLink to="/demonstration">{demonstration.title}</NavLink>
            </div>
          );
        })}
      </div>
    );
  }
}

export default DemonstrationAccueil;
