import React, { Component } from 'react';
import './HeaderSolution.css';



class HeaderSolution extends Component {
  render(){
    const { header } = this.props;
    console.log(header);
    return (
      <div className="container container-header-solution mb-5">
        <div className="div-logo-solution">
        {header.length > 0 && header[0].url.map((element, index) => element === 'logo.png' ? <img key={index} className="img-logo-page-solution" src={'/images/' + element} alt={element} /> : "")}
        </div>
        <div className="div-titre-page-solution">
          {header.filter(elementHeader => elementHeader.subtitle === 'header').map((element, index) => (<h2 key={index} className="titre-page-solution">{element.title}</h2>))}
        </div>
      </div>
    );
  }

}

export default HeaderSolution;