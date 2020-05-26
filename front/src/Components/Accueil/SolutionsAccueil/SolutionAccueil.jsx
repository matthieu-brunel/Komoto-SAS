import React, { Component } from "react";
import "./SolutionAccueil.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import "animate.css/animate.min.css";
import ScrollAnimation from 'react-animate-on-scroll';
const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

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
        {solution.length > 0 && <div id="SolutionAccueil" className="sol-title mt-5"><h2 className="sol-title-text">{solution[0].title_section}</h2></div>}
        {solution.map((solution, index) => {
          return (
            <div key={index} className="sol-card-all">
              <div className="d-flex container p-5 solution  ">
              <ScrollAnimation animateIn='fadeIn'>
                <div className="sol-img pt-5 ">
                  <img  className="img-solution" src={REACT_APP_SERVER_ADDRESS_FULL + "/images/" + solution.url.split("/")[0]} alt={solution.alt.split("")[0]} />
                </div>
                </ScrollAnimation>
               
                <div className="sol-text pt-5  sol-body">
                 
                <ScrollAnimation animateIn='fadeIn'>
                  <div className="">
                    <h5 className="sol-title-card">{solution.name}</h5>
                  </div>
                 
                  <div className="pt-5" onClick={handleClickSolution}>
                    <NavLink to={`/solution/${solution.name.toLowerCase()}`} className="text-solution" id={solution.name}  >{solution.title}</NavLink>
                  </div>
                  </ScrollAnimation>
​
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
