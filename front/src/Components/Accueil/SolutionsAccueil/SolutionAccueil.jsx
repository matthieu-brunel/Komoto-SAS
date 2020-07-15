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
    return (
      <div className="div-container-solution text-center">
        {this.state.solution.length > 0 && <div id="SolutionAccueil" className="sol-title mt-5 mb-5"
          data-aos="fade-up"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"><h2 className="sol-title-text">{this.state.solution[0].title_section}</h2></div>}
        {this.state.solution.map((solution, index) => {
          return (
            <div className="container div-card-solution mb-2" key={index}
              data-aos="fade-up"
              data-aos-duration="500"
              data-aos-easing="ease-in-out">
              <div className="solution-card">
                <div className="div-image-solution-accueil">
                  <img className="img-solution" src={REACT_APP_SERVER_ADDRESS_FULL + "/images/" + solution.url.logoSolution[0].name} alt={solution.url.logoSolution[0].alt} />
                </div>
                <div className="sol-text">
                  <div className="card-text" onClick={handleClickSolution}>
                    <p className="text-solution">{solution.title}</p>
                  </div>
                  <div className="div-btn-solution-accueil p-3">
                    <button className="btn btn-primary">
                      <NavLink to={`/solution/${solution.name.toLowerCase()}`} className="text-solution text-white" id={solution.name}>en savoir plus</NavLink>
                    </button>
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

const mapStateToProps = state => ({
  data_store: state
});

/* export default connect(mapStateToProps)(SolutionAccueil);
 */
export default SolutionAccueil;
