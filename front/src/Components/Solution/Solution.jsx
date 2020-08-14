import React, { Component } from 'react';
import './Solution.css';
import HeaderSolution from './Header/HeaderSolution';
import SolutionText from './SolutionText/SolutionText';
import SolutionImage from './SolutionImage/SolutionImage';
import Footer from '../Footer/Footer';
import { connect } from "react-redux";

const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;
class Solution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solution: [],
      idLang: "",
      srcSelected: "",
      altSelected: "",
      displayModal: false,
      modalBlur: false
    }

  }


  handleClickImg = (event) => {

    let src = event.target.src;
    let alt = event.target.alt;
    this.setState({ srcSelected: src, altSelected: alt, displayModal: true });
  }

  getSolution = async () => {

    const { idLang, language_id } = this.props;

    let section = this.props.match.params.id;
    let url = REACT_APP_SERVER_ADDRESS_FULL + "/api/solution/name?language_id=" + language_id + "&name=" + section;
    let data = await (await (fetch(url))).json();


    let arraySolution = [];

    console.log(data);

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

  handleClickClose = () => {
    this.setState({ displayModal: false });
  }


  render() {

    return (
      <div className="sticky-wrap">
        <HeaderSolution header={this.state.solution} />
        <SolutionText texte={this.state.solution} />
        {
          this.state.solution.length > 0 &&
          <SolutionImage
            image={this.state.solution[0].url.imageCaroussel}
            handleClickImg={this.handleClickImg}
          />
        }

        {
          this.state.displayModal &&
          <div className="container-imagePreview-solution">
            <div className="div-element-previewImage">
              <div className="div-close-btn-image-selected">
                <button type="button" className="btn btn-danger btn-sm" onClick={this.handleClickClose}><span aria-hidden="true">&times;</span><span></span></button>
              </div>
              <div className="div-image-selected">
                <img src={this.state.srcSelected} className="imagepreview" alt={this.state.altSelected} />
                <p className="alt-image-selected">{this.state.altSelected}</p>
              </div>
            </div>


          </div>
        }

        <div className="sticky-footer">
          <Footer />
        </div>
      </div>
    );
  }

}

export default Solution;
