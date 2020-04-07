import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import './NavBar.css';
import { HashLink as NavLink } from "react-router-hash-link";
import {FormattedMessage, FormattedDate } from "react-intl";



const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen); // navbar
  const { handleChangeLang } = props;
  //console.log("Fonction :",handleChangeLang);

  return (
    <div className="test3">
      <Navbar color="white" light expand="xl">
        <NavbarBrand className="pl-3" href="/"><img className="" src="" alt="logo" /></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="all pr-5" >

          <Nav className="  " navbar>
            <NavItem >
              <NavLink to="/" className=""><li className="link-nav pr-5"><FormattedMessage id="homepage.navbar.accueil" defaultMessage="Accueil"/></li></NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/#SolutionAccueil" className=""><li className="link-nav pr-5"><FormattedMessage id="homepage.navbar.solution" defaultMessage="Solution"/></li></NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/#ReferenceAccueil" className=""><li className="link-nav pr-5"><FormattedMessage id="homepage.navbar.références" defaultMessage="Références"/></li></NavLink>
            </NavItem>

            <NavItem>
              <NavLink to="/Contact" className=""><li className="link-nav pr-5"><FormattedMessage id="homepage.navbar.contact" defaultMessage="Contact"/></li></NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/Demonstration" className=""><li className="link-nav pr-5"><FormattedMessage id="homepage.navbar.showroom" defaultMessage="Showroom"/></li></NavLink>
            </NavItem>

          </Nav>

        </Collapse>
        <div class="form-group" onChange={handleChangeLang}>
          <select class="form-control" id="exampleFormControlSelect1">
            <option id="fr" value="0">fr</option>
            <option id="en" value="1">en</option>
          </select>
        </div>
      </Navbar>

    </div>
  );
}





export default NavBar;
