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
        {this.state.solution.length > 0 && <h2>{this.state.solution[0].title}</h2>}
        {this.state.solution.map((solution, index) => {
          return (
            <div key={index}>
               <Link to={`/Reference`}><img className="img-reference" src={solution.alt} alt={solution.alt}/></Link> 
            </div>
          );
        })}
      </div>
    );
  }
}

export default SolutionAccueil;
