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
              {this.state.specialisation.length > 0 && 
              <h2>{this.state.specialisation[0].title}</h2>}
             <NavLink  to="/"> {specialisation.id}</NavLink> 
          </div>
        )
      })}
    </div>
  );
}
}

export default SpecialisationAccueil