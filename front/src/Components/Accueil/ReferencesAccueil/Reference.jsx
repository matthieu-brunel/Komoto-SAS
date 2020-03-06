import React, { Component } from 'react';
import './Reference.css';
import { Link } from 'react-router-dom';

import getRessources from '../../../utils/getRessources';

class ReferenceAccueil extends Component {
  constructor(){
    super()
    this.state = {
      reference:[]
    }
}

componentDidMount = async () => {

  let data2 = await getRessources('homepage','reference');
   this.setState({
    reference:data2
  }) 
}

  render(){
    return (
      <div className="container">
        {this.state.reference.length > 0 && <h2>{this.state.reference[0].title}</h2>}
        <div className="container-div-img">
        {this.state.reference.map((element, index) => (
          <div className="div-reference" key={index}>
            <Link to={`/Reference`}><img className="img-reference" src={element.alt} alt={element.alt}/></Link>
          </div>
        )

        )}
        </div>

      </div>

    
    )
  }
}

export default ReferenceAccueil;