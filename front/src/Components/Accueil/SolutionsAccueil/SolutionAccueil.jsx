import React, { Component } from "react";
import "./SolutionAccueil.css";
import getRessources from "../../../utils/getRessources";
import { Link } from "react-router-dom";
import "animate.css/animate.min.css";
import ScrollAnimation from 'react-animate-on-scroll';


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
      <div className=" ">
        {this.state.solution.length > 0 && <div id="SolutionAccueil" className="sol-title"><h2 className="sol-title-text">{this.state.solution[0].title}</h2></div>}
        {this.state.solution.map((solution, index) => {
          return (
            <div key={index} className="sol-card-all">
              <div className="d-flex container p-5 solution  ">
              <ScrollAnimation animateIn='fadeIn'>
                <div className="sol-img pt-5 ">
                  <img  className="img-solution" src={solution.url} alt={solution.alt} />
                </div>
                </ScrollAnimation>
               
                <div className="sol-text pt-5  sol-body">
                 
                <ScrollAnimation animateIn='fadeIn'>
                  <div className="">
                    <h5 className="sol-title-card">{solution.subtitle}</h5>
                  </div>
                  </ScrollAnimation>
                  <ScrollAnimation animateIn='fadeIn'>
                  <div className="">
                    <a className="text-solution" href="solution">{solution.description}</a>
                  </div>
                  </ScrollAnimation>
               
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
