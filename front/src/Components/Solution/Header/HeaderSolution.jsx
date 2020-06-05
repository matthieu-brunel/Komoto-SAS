import React, { Component } from 'react';
import './HeaderSolution.css';
const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;


class HeaderSolution extends Component {
  render() {
    const { header } = this.props;

    return (
      <div className="container container-header-solution mb-5">
       
        <div className="div-logo-solution p-3">
          {header.length > 0 && 
            <img  className="img-logo-page-solution" src={REACT_APP_SERVER_ADDRESS_FULL +'/images/'  + header[0].url.logoSolution[0].name} alt={header[0].url.logoSolution[0].alt} /> }
        </div>
        <div className="div-titre-page-solution p-3">
          {header.length > 0 &&
          <h2  className="titre-page-solution">{header[0].title}</h2>}
        </div>
      </div>
    );
  }

}

export default HeaderSolution;