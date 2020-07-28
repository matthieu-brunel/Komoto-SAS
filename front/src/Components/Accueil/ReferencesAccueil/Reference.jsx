import React, { Component } from "react";
import "./Reference.css";
import { HashLink as NavLink } from "react-router-hash-link";
const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;


class ReferenceAccueil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reference: []
    };
  }

  getStartedData = async () => {
    const { locale, idLang } = this.props;

    let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/reference?section=reference&language_id=' + idLang;
    console.log("****************** : ", url);
    const data = await (await (fetch(url))).json();

    let arrayReference = [];

    for (let obj of data) {
      let url = JSON.parse(obj.url);
      let description = JSON.parse(obj.description);
      obj.url = url;
      obj.description = description;
      arrayReference.push(obj);
    }

    this.setState({ reference: arrayReference });
  }
  
  componentDidMount = () => {
    this.getStartedData();
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.idLang !== this.props.idLang) {
      this.getStartedData();
    }
  }






  render() {
    return (
      <div id="ReferenceAccueil" className="container-reference text-center mt-5">
        <div className="div-title-reference pt-3 pb-3"
          data-aos="fade-up"
          data-aos-duration="500"
          data-aos-easing="ease-in-out">
          <h2 className="title-reference p-4">
            {this.state.reference.length > 0
              ? this.state.reference[0].title_section
              : "Titre 1"}
          </h2>
        </div>
        <div className="container-div-img mb-5">
          {this.state.reference.map((element, index) => (
            <div className="div-reference" key={index}
              data-aos="fade-up"
              data-aos-duration="500"
              data-aos-easing="ease-in-out">
              <NavLink to={`/Reference/#${element.name}`}>
                <img
                  className="img-reference"
                  src={REACT_APP_SERVER_ADDRESS_FULL + "/images/" + element.url.logoRef[0].name}
                  alt={element.url.logoRef[0].alt}
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
