import React, { Component } from 'react';
import './NavBar.css'
import { Link } from "react-router-dom";
import { Redirect} from 'react-router-dom';

const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

class NavBarAdmin extends React.Component {
  constructor() {
      super();
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

  logOut = () => {
      this.setState({ redirectLogOut: true })
      localStorage.setItem('token', "")
    }

  render() {
      return (


          <div>
              <div className="header">
                  <a className="nav-trigger " onClick={this.openMenu} href="/" target="_blank"><span></span></a>
              </div>
              <div className="side-nav">
                  <div className="logo align-admin">
                      <span>Komoto SAS</span>
                  </div>
                  <nav>
                      <ul>
                          <li>
                              <Link to="/user">
                       {/*            <span><i className="fa fa-user"></i></span> */}
                                  <span>Utilisateurs</span>
                              </Link>
                          </li>
                          <li>
                              <Link to="/HomepageAdmin">
                                {/*   <span><i className="fa fa-home"></i></span> */}
                                  <span>Homepage</span>
                              </Link>
                          </li>
                          <li>
                              <Link to="/SolutionAdmin">
                              {/*     <span><i className="fa fa-archive"></i></span> */}
                                  <span>Solution</span>
                              </Link>
                          </li>
                          <li>
                              <Link to="/Langues">
                                {/*   <span><i className="fa fa-calendar"></i></span> */}
                                  <span>Langues</span>
                              </Link>
                          </li>
                          <li>
                              <Link to="/ContactAdmin">
                         {/*          <span><i className="fa fa-calendar"></i></span> */}
                                  <span>Contact</span>
                              </Link>
                          </li>


                          <li>
                              <Link to="/ReferenceAdmin">
                               {/*    <span><i className="fa fa-chess-bishop"></i></span> */}
                                  <span>Réference</span>
                              </Link>
                          </li>
                          <li>
                              <Link to="/HomeShowroom">
                              {/*     <span><i className="fas fa-utensils"></i></span> */}
                                  <span>Showroom</span>
                              </Link>
                          </li>
                          <li>
                              <Link to="/Mail">
                             {/*      <span></span> */}
                                  <span>Historique des mails</span>
                              </Link>
                          </li>
                          <li>
                              <Link to="/Seo">
                               {/*    <span></span> */}
                                  <span>SEO</span>
                              </Link>
                          </li>
                          <li className="align-admin">
                              {this.state.redirectLogOut ? <Redirect to="/login" /> : ""}
                              <button type="button" className="btn btn-danger " onClick={this.logOut}>Déconnexion</button>
                          </li>
                      </ul>
                  </nav>
              </div>
              
          </div>

      );
  }
}


export default NavBarAdmin;