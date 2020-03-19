 import React, { Component } from 'react';
import './Header.css';
import SavoirFaireAccueil from './../Savoir-faire/Savoir-faire';
import getRessources from '../../../utils/getRessources';

class HeaderAccueil extends Component {
  constructor(){
    super()
    this.state = {
      header:[]
    }
}

 componentDidMount = async () => {

  let data2 = await getRessources('homepage','header');
  console.log(data2);
   this.setState({
    header:data2
  }) 
} 

  render(){
    return (
      <div className="container-div-img">
        <div className="" style={{ 'backgroundImage': `linear-gradient( rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0.45)), url(${this.state.header.length > 0 && this.state.header[0].url})` }}>
          <div className="container div-description-header d-flex justify-content-center">
            {this.state.header.length > 0 && <h1 className="text-center mt-5 pt-5">{this.state.header[0].description}</h1>}
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