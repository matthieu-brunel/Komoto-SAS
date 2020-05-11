import React, { Component } from 'react';
import './NavBar.css'
import { Link } from "react-router-dom";

const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;


class NavBarAdmin extends Component {
  constructor(props){
    super(props);
    this.state = {
        countMail:0
    }
    
}

getMail =  async () => {

    const options = {
      method:'GET',
      headers: new Headers({
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + localStorage.getItem('token')
      }),
  }

  let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/mail';
  const data = await (await (fetch(url, options))).json();
  this.setState({countMail:data.length});
}

componentDidMount(){
    this.getMail();
}

  render(){
    return (
      <div className="">
        <div className="nav">
          <Link to="/user" className=""> Utilisateur </Link>
          <Link to="/HomepageAdmin"> Homepage </Link>
          <Link to="/SolutionAdmin"> Solution </Link>
          <Link to="/Langues"> Langues</Link>
          <Link to="/ContactAdmin"> Contact </Link>
          <Link to="/ReferenceAdmin">Réference </Link>
          <Link to="/DemonstrationAdmin"> Showroom</Link>
          <Link to="/Mail"> Historique des mails <span class="badge badge-primary">{this.state.countMail}</span> </Link>
        </div>
      </div>
    );
  }

}

export default NavBarAdmin;