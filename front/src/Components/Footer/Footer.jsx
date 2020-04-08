import React, { Component } from 'react';
import './Footer.css';
import getRessources from './../../utils/getRessources';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
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
    const { locale } = this.state;
    //console.log(locale);

    return (
      <div >
        <div className="footer container pt-5 mt-5">
          <div className="d-flex1 " >
            <div className="">
              <img src="" alt="logo" />
            </div>
            <div className="test203 d-flex1">
              <div className="all-lien ">
                <div >
                  <NavLink to="/Contact" className=""><p className="lien link-nav  ">Contact</p></NavLink>
                </div>
                <div>
                  <NavLink to="/partenaire" className=""><p className="lien link-nav  ">partenaire</p></NavLink>
                </div>
                <div>
                  <NavLink to="/Mention" className=""><p className="lien link-nav  ">mention</p></NavLink>
                </div>
              </div>
              <div className="  all no ">
                <div>
                  <a ><img src="" alt="logo rs" /></a>
                </div>
                <div>
                  <a ><img src="" alt="logo rs" /></a>
                </div>
                <div>
                  <a ><img src="" alt="logo rs" /></a>
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
