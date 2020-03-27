import React from 'react';
import './Footer.css';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

function Footer() {
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

export default Footer;
