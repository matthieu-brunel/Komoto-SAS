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

  let data2 = await getRessources('homepage','header');
  console.log(data2);
   this.setState({
    url:data2[0].url
  }) 
} 

  render(){
   
    const { url } = this.state;
    console.log(url);
    return (
      <div className="container-div-img">
        <div className="" style={{ 'backgroundImage': `linear-gradient( rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0.45)), url(${url})` }}>
          <div className="container div-description-header d-flex justify-content-center">
            <h1 className="text-center mt-5 pt-5"><FormattedMessage id="homepage.header.description" defaultMessage="Préparation de commandes pour la logistique du e-commerce, le réassort de détail et la gestion des retours "/></h1>
          </div>
          <div className="test44 ">
          <SavoirFaireAccueil />
          </div>
        </div>
        <div className="div-vide-savoirFaire">

        </div>
      </div>

    
    )
  }
}

export default HeaderAccueil;