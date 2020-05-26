import React, { Component } from "react";
import "./Reference.css";
import { HashLink as NavLink } from "react-router-hash-link";
import getRessources from "../../../utils/getRessources";
const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;


class ReferenceAccueil extends Component {
  constructor() {
    super();
    this.state = {
      reference: []
    };
  }

  componentDidMount = async () => {
    const { locale } = this.props;
    console.log(locale);
    let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/reference?section=reference&locale=' + locale;
    const data = await (await (fetch(url))).json();
    
    let arrayReference = [];

    for(let obj of data){
      let url = JSON.parse(obj.url);
      let description = JSON.parse(obj.description);
      obj.url = url;
      obj.description = description;
      arrayReference.push(obj);
    }

    this.setState({reference:arrayReference});
  };




  render() {
    return (
      <div  className="container-reference">
        <div className="div-title-reference mb-5">
          <h2 className="title-reference text-left">
            {this.state.reference.length > 0
              ? this.state.reference[0].title
              : "Titre 1"}
          </h2>
        </div>
        <div className="container-div-img">
          {this.state.reference.map((element, index) => (
            <div id="ReferenceAccueil" className="div-reference" key={index}>
              <NavLink to={`/Reference/#${element.name}`}>
                <img
                  className="img-reference"
                  src={REACT_APP_SERVER_ADDRESS_FULL+"/images/" + element.url.logoRef[0].name}
                  alt={element.alt}
                />
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ReferenceAccueil;
