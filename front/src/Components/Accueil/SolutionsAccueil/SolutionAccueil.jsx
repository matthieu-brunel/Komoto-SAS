import React, { Component } from "react";
import "./SolutionAccueil.css";
import getRessources from "../../../utils/getRessources";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { GET_NAME_SOLUTION_SELECTED} from './../../actionTypes';

class SolutionAccueil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solution:[]
    };
  }

  componentDidMount = async () => {
    let data = await getRessources("homepage", "solution");
    //console.log(data);
    this.setState({
      solution: data
    });
  };

  handleClickSolution = (event) => {
    const { data_store } = this.props;
    let name_solution = event.target.id.toLowerCase();
    let link_solution = `/solution-${name_solution.toLowerCase()}`;
    this.props.dispatch({type: GET_NAME_SOLUTION_SELECTED.type, name_solution,link_solution});
    localStorage.setItem('data_store', JSON.stringify(data_store));
  }
  
  render() {
  

    return (
      <div>
        {this.state.solution.length > 0 && <div className="sol-title"><h2 className="sol-title-text">{this.state.solution[0].title}</h2></div>}
        {this.state.solution.map((solution, index) => {
          return (
            <div key={index}>
              <div className="d-flex ">
                <div className="sol-img pt-5">
                  <img  className="img-solution" src={solution.url} alt={solution.alt} />
                </div>
                <div className="sol-text pt-5">
                  <div className="pt-5">
                    <h5>{solution.subtitle}</h5>
                  </div>
                  <div className="pt-5">
                    <NavLink to={`/solution-${solution.subtitle.toLowerCase()}`} className="text-solution" id={solution.subtitle} onClick={ this.handleClickSolution}  /* href={`/solution-${solution.subtitle.toLowerCase()}`} */ >{solution.description}</NavLink>

{/*                       <button className="btn btn-primary" type="button" id={solution.subtitle} onClick={solutionSelected}>en savoir plus</button>
 */}                  </div>
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
