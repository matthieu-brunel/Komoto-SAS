import React, { Component } from "react";
import "./SolutionAccueil.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import "animate.css/animate.min.css";
import ScrollAnimation from 'react-animate-on-scroll';


class SolutionAccueil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locale:""
    }
  }


  
  render() {
    
    const { solution, handleClickSolution } = this.props;
   
    return (
      <div className=" ">
        {solution.length > 0 && <div id="SolutionAccueil" className="sol-title mt-5"><h2 className="sol-title-text">{solution[0].title}</h2></div>}
        {solution.map((solution, index) => {
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
                 
                  <div className="pt-5" onClick={handleClickSolution}>
                    <NavLink to={`/solution/${solution.subtitle.toLowerCase()}`} className="text-solution" id={solution.subtitle}  >{solution.description}</NavLink>
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

const mapStateToProps = state => ({
  data_store: state
});

export default connect(mapStateToProps)(SolutionAccueil);
