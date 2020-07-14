import React, { Component } from 'react';
import './Footer.css';
import getRessources from './../../utils/getRessources';

import { NavLink } from 'react-router-dom';

class Footer extends Component {
  constructor(props){
    super(props);
    this.state = {
      footer:[]
    }
  }

  getTextToList(data) {
    //variable objet qui servira à accueillir les données
    let objet = data;
    //variable array_description qui servira a convertir le contenu description en tableau grace au slash
    let array_description = data.description.split('/');
    //on remplace le contenu description de l'objet.description par la nouvelle description
    objet.description = array_description;
    //on met a jour le state avec la nouvelle valeur [specialisation=state:[...this.state.specialisation=state actuel,objet=variable objet qui contient les nouvelles données]]
    this.setState({ footer: [...this.state.specialisation, objet] });
  } 

   componentDidMount = async () => {
    const { locale } = this.props;
    //on récupère les données depuis la fonction externe getRessources de maniere aysnchrone
    let data = await getRessources('homepage', 'footer',locale);
    //console.log("data footer : ",data);
    //une boucle qui permettra d'itérer chaque objet et de l'envoyer dans la fonction getTextToList
     for (let i = 0; i < data.length; i++) {
      this.getTextToList(data[i]);
    }
  }

  render(){
    
    return (
      <div className="bg-dark">
        <div className="footer container pt-5 mt-5">
          <div className="d-flex1 " >
            <div className="mb-4">
              <img src="/images/logo.png" alt="logo" />
            </div>
            <div className="test203 d-flex1">
              <div className="all-lien">
                <div >
                  <NavLink to="/Contact" className=""><p className="lien link-nav text-white">Contact</p></NavLink>
                </div>
                <div>
                  <NavLink to="/partenaire" className=""><p className="lien link-nav text-white">partenaire</p></NavLink>
                </div>
                <div>
                  <NavLink to="/Mention" className=""><p className="lien link-nav text-white">mention</p></NavLink>
                </div>
              </div>
              <div className="all no p-5">
                <div>
                  <a href="test"><span style={{color:"white"}}><i className="fab fa-instagram fa-2x"></i></span></a>
                </div>
                <div>
                  <a href="test"><span style={{color:"white"}}><i className="fab fa-twitter-square pl-4 pr-4 fa-2x"></i></span></a>
                </div>
                <div>
                  <a href="test"><span style={{color:"white"}}><i className="fab fa-facebook fa-2x"></i></span></a>
                </div>
              </div>
            </div>
          </div>
        </div>
  
      </div>
    );
  }

}

export default Footer;
