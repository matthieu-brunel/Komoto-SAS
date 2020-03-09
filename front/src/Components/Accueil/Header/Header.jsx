import React, { Component } from 'react';
import './Header.css';

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
        <div className="div-header">
          {this.state.header.length > 0 && <img className="img-header" src={this.state.header[0].url} alt={this.state.header[0].alt}/>}
        </div>
      </div>

    
    )
  }
}

export default HeaderAccueil;