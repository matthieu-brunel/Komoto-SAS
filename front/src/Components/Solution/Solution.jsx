import React, { Component } from 'react';
import './Solution.css';
import HeaderSolution from './Header/HeaderSolution';
import SolutionText from './SolutionText/SolutionText';
import SolutionImage from './SolutionImage/SolutionImage';
import getRessources from './../../utils/getRessources';
import Footer from '../Footer/Footer';
import { connect } from "react-redux";

const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;
class Solution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solution: [],
      idLang: ""
    }

  }




  getSolution = async () => {

    const { idLang } = this.props;


    let section = this.props.match.params.id;


    let url = REACT_APP_SERVER_ADDRESS_FULL + "/api/solution/name?section=solution&locale=" + idLang + "&name=" + section;
    console.log("Accueil", url)
    let data = await (await (fetch(url))).json();
    console.log("solution.JSX", data)
    console.log("SECTION", section)

    let arraySolution = [];

    for (let obj of data) {

      let url = JSON.parse(obj.url);
      let description = JSON.parse(obj.description);
      obj.url = url;
      obj.description = description;
      arraySolution.push(obj);
    }
    this.setState({ solution: arraySolution });
  }

  componentDidMount = () => {
    this.getSolution();
  };


  render() {

    return (
      <div className="mt-5 sticky-wrap">
        <div>
          <HeaderSolution header={this.state.solution} />
          <SolutionText texte={this.state.solution} />
          {this.state.solution.length > 0 && <SolutionImage image={this.state.solution[0].url.imageCaroussel} />}
          <div className="sticky-footer">
            <Footer />
          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  data_store: state
});

export default connect(mapStateToProps)(Solution);
