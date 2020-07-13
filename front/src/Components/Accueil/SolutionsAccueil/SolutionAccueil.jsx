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
      solution: [],
    }
  }
  componentDidMount = async () => {


    const { locale } = this.props;

    let url = REACT_APP_SERVER_ADDRESS_FULL + "/api/solution?section=solution&locale=" + locale;
    console.log("Accueil", url)
    let data = await (await (fetch(url))).json();
    console.log("solution:", data)

    let arraySolution = [];

    for (let obj of data) {

      let url = JSON.parse(obj.url);
      let description = JSON.parse(obj.description);
      obj.url = url;
      obj.description = description;
      arraySolution.push(obj);
    }
    this.setState({ solution: arraySolution });
  };




  render() {

    const { handleClickSolution } = this.props;

    /*     return (
          <div className="div-container-solution">
            {this.state.solution.length > 0 && <div id="SolutionAccueil" className="sol-title mt-5"><h2 className="sol-title-text">{this.state.solution[0].title_section}</h2></div>}
            {this.state.solution.map((solution, index) => {
              return (
                 <div key={index} className="sol-card-all">
                  <div className="d-flex container p-5 solution  ">
                    <ScrollAnimation animateIn='fadeIn'>
                      <div className="sol-img pt-5 ">
                        <img className="img-solution" src={REACT_APP_SERVER_ADDRESS_FULL + "/images/" + solution.url.logoSolution[0].name} alt={solution.url.logoSolution[0].alt} />
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
        ); */

    return (
      <div className="div-container-solution">
        {this.state.solution.length > 0 && <div id="SolutionAccueil" className="sol-title mt-5 mb-5"><h2 className="sol-title-text">{this.state.solution[0].title_section}</h2></div>}
        {this.state.solution.map((solution, index) => {
          return (
            <div key={index}>
              <div className="card d-flex container p-5 solution">
                <ScrollAnimation animateIn='fadeIn'>
                  <img className="card-img-top img-solution" src={REACT_APP_SERVER_ADDRESS_FULL + "/images/" + solution.url.logoSolution[0].name} alt={solution.url.logoSolution[0].alt} />
                </ScrollAnimation>

                <div className="card-body sol-text">
                  <ScrollAnimation animateIn='fadeIn'>
                    <div className="card-title">

                    </div>
                    <div className="card-text" onClick={handleClickSolution}>
                      <p className="text-solution">{solution.title}</p>
                    </div>
                    <div className="div-btn-solution-accueil p-3">
                      <button className="btn btn-primary">
                        <NavLink to={`/solution/${solution.name.toLowerCase()}`} className="text-solution text-white" id={solution.name}>en savoir plus</NavLink>
                      </button>
                    </div>
                  </ScrollAnimation>
                </div>
              </div>
            </div>
            /*             <div class="card">
                          <img class="card-img-top" src="https://s2.qwant.com/thumbr/0x380/c/3/dc9deeecc40297c2ff66d1999232eacf2d5b38980667644572570b77656e5b/placeholder_600x400.svg.jpg?u=https%3A%2F%2Fgetuikit.com%2Fv2%2Fdocs%2Fimages%2Fplaceholder_600x400.svg&q=0&b=1&p=0&a=1" alt="Card image cap" />
                          <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                          </div>
                        </div> */
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data_store: state
});

/* export default connect(mapStateToProps)(SolutionAccueil);
 */
export default SolutionAccueil;
