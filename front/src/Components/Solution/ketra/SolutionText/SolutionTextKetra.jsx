import React, { Component } from 'react';
import './SolutionTextKetra.css';



class SolutionText extends Component {
  render(){
    const { texte } = this.props;
    return (
        <div className="container container-solution-ketra text-left">
        {texte.map((element, index) => (
          <div className="div-solution-ketra mb-5" key={index}>
            <div className="div-title-solution-ketra"><h3 className="title-solution-ketra">{element.title}</h3></div>
            <div className="div-texte-solution-ketra">{element.description.map((description, index) => (
              <ul><li>{description}</li></ul>
            ))}</div>
          </div>
        ))}
        </div>

    );
  }

}

export default SolutionText;