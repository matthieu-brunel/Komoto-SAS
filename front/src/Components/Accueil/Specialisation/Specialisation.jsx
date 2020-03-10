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

getTextToList(data){
  let objet = data;
  let array_description = data.description.split('/');
  objet.description = array_description;
  this.setState({specialisation:[...this.state.specialisation, objet]});
}

componentDidMount = async () => {

  let data2 = await getRessources('homepage','specialisation');
  for(let i = 0; i < data2.length ; i++){
    this.getTextToList(data2[i]);
  }
}

render(){
  console.log("this.state.specialisation : ", this.state.specialisation);
  return (
    <div className="container container-specialisation">
      <h2 className="text-specialisation text-left p-4">Nos spécialisations</h2>
      <div className="container-specialisation-card row">
        {this.state.specialisation.map((specialisation, index) => {
          return (
            <div className="div-container-specialisation col col-lg-6 col-12 mb-5" key={index}>
              <div className="div-img-specialisation"><img className="img-specialisation" src={specialisation.url} alt={specialisation.alt}/></div>
              <div className="div-titre-specialisation"><h6>{this.state.specialisation[index].title}</h6></div>
              <div className="div-text-specialisation">
                {specialisation.description.map((list, index) => ( <div key={index}><ul><li>{list}</li></ul></div>))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
}

export default SpecialisationAccueil