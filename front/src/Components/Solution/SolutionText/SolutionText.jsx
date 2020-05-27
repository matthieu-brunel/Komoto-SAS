import React, { Component } from 'react';
import './SolutionText.css';



class SolutionText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      texte: []
    }
  }


  render() {
    const { texte } = this.props;
    console.log("descriptiontexte", texte.length > 0 ? texte[0].description : "")
    return (
      <div className="container container-solution text-left">
        {texte.length > 0 ? texte[0].description.map((element, index) => (
          <div className="div-solution mb-5" key={index}>
            <div className="div-title-solution">
              <h3 className="title-solution">{element.title}</h3>
            </div>
            <div className="div-texte-solution">
              {element.description.map((description, index) => (
                <p className="mb-3" key={index}>{description}</p>
              ))
              }
            </div>
          </div>
        )) : ""}
      </div>

    );
  }

}

export default SolutionText;