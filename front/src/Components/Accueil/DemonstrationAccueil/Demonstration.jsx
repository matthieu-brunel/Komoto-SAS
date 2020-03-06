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
    console.log("demonstration : ",data);
    this.setState({
      demonstration: data
    });
  };
  render() {
    return (
      <div>
        {this.state.demonstration.length > 0 && <h2>{this.state.demonstration[0].title}</h2>}
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
