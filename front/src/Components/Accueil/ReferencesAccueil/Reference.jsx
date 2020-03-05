import React, { Component } from 'react';
import './Reference.css';
import { NavLink } from 'react-router-dom';

import getRessources from '../../../utils/getRessources';

class ReferenceAccueil extends Component {
  constructor(){
    super()
    this.state = {
      reference:[]
    }
}

/* componentDidMount(){
  this.getReference();
}

getReference(){

  fetch(REACT_APP_SERVER_ADDRESS_FULL+"/api/homepage",
  {
      headers: new Headers({
          'Content-Type': 'application/json'
      }),
  })
  .then(
  (res) => res.json()
  )
  .then(
  (res) => 
      {
         this.setState({ reference: res }, () => {
          })
      }
  )
} */

componentDidMount = async () => {

  let data2 = await getRessources('homepage','reference');
   this.setState({
    reference:data2
  }) 
}

  render(){
    return (
      <div className="">
        {this.state.reference.map((reference, index) => {
          return (
            <div key={index}>
              <NavLink  to="/Reference">référence {reference.id}</NavLink>
            </div>
          )
        })}
      </div>
    );
  }
}

export default ReferenceAccueil;