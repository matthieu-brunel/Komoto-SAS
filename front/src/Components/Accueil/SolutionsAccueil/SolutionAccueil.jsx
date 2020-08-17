import React, { Component } from "react";
import "./SolutionAccueil.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import "animate.css/animate.min.css";
import ScrollAnimation from 'react-animate-on-scroll';
import { motion } from "framer-motion"
const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

class SolutionAccueil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solution: [],
      solutionName: "",
      labelBtn: ""
    }
  }


  componentDidMount = () => {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.idLang !== this.props.idLang) {
      this.getData();
    }
  }

  getData() {

    const { locale, language_id } = this.props;

    let url = REACT_APP_SERVER_ADDRESS_FULL + "/api/solution?section=solution&language_id=" + language_id;
    fetch(url).then(response => response.json()).then(response => {



      let arraySolution = [];
      for (let obj of response) {

        let description = JSON.parse(obj.description);
        let url = response.length > 0 && JSON.parse(obj.url);
        let subtitle = response.length > 0 && JSON.parse(obj.subtitle)

        obj.description = description;
        obj.url = url;
        obj.subtitle = subtitle;
        arraySolution.push(obj);
      }


      const solutionName = arraySolution.length > 0 && arraySolution[0].subtitle[0];
      const labelBtn = arraySolution.length > 0 && arraySolution[0].subtitle[1];

      this.setState({ solution: arraySolution, solutionName, labelBtn });

    })
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }



  render() {

    const { handleClickSolution } = this.props;
    return (
      <div id="SolutionAccueil" className="div-container-solution text-center">
        {this.state.solution.length > 0 && <div className="sol-title mt-5 mb-5"
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
                  <img className="img-solution-accueil" src={REACT_APP_SERVER_ADDRESS_FULL + "/images/" + solution.url.logoSolution[0].name} alt={solution.url.logoSolution[0].alt} />
                </div>
                <div className="sol-text">
                  <div className="card-text" onClick={handleClickSolution}>
                    <p className="text-solution">{solution.title}</p>
                  </div>
                  <div className="div-btn-solution-accueil p-3">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.9 }} className="btn btn-primary">
                      <NavLink to={`/solution/${solution.name.toLowerCase()}`} className="text-solution text-white" id={solution.name}>{this.state.labelBtn}</NavLink>
                    </motion.button>
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
