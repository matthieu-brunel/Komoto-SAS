import React, { Component } from 'react';
import './Specialisation.css';
import getRessources from '../../../utils/getRessources';
import { NavLink } from 'react-router-dom';

class SpecialisationAccueil extends Component {
  constructor(){
    super()
    this.state = {
      specialisation:[]
    }
}

componentDidMount = async () => {

  let data2 = await getRessources('homepage','specialisation');
   this.setState({
    specialisation:data2
  })
  
}

render(){
  return (
    <div className="">
      {this.state.specialisation.map((specialisation, index) => {
        return (
          <div key={index}>
             <NavLink  to="/">specialisation {specialisation.id}</NavLink>
          </div>
        )
      })}
    </div>
  );
}
}

export default SpecialisationAccueil