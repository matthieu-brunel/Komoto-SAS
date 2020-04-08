 import React, { Component } from 'react';
import './Header.css';
import SavoirFaireAccueil from './../Savoir-faire/Savoir-faire';
import getRessources from '../../../utils/getRessources';
import {FormattedMessage, FormattedDate } from "react-intl";


class HeaderAccueil extends Component {
  constructor(props){
    super(props)
    this.state = {
      header:[]
    }
    
}

  componentDidMount = async () => {
    const { locale } = this.props;

    let data = await getRessources('homepage','header',locale);
  
    this.setState({
      header:data
  }) 
} 

  render(){
    const { locale } = this.props;
    const { header } = this.state;
    //console.log("langue selectionnée : ", locale);


    return (
      <div className="container-div-img">
        <div className="" style={{ 'backgroundImage': `linear-gradient( rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0.45)), url(${header.length > 0 ? header[0].url : ""})` }}>
          <div className="container div-description-header d-flex justify-content-center">
    <h1 className="text-center mt-5 pt-5">{header.length > 0 ? header[0].description : ""}</h1>
          </div>
          <div className="test44 ">
          <SavoirFaireAccueil locale={locale}/>
          </div>
        </div>
        <div className="div-vide-savoirFaire">

        </div>
      </div>

    
    )
  }
}

export default HeaderAccueil;