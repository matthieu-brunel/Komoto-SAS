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



const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen); // navbar


  return (
    <div className="">
      <Navbar color="white" light expand="xl">
        <NavbarBrand className="pl-3" href="/"><img className="" src="" alt="logo" /></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="all pr-5" >

          <Nav className="  " navbar>
            <NavItem >
              <NavLink to="/" className=""><li className="link-nav pr-5">Accueil</li></NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/#SolutionAccueil" className=""><li className="link-nav pr-5">Solution</li></NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/Reference" className=""><li className="link-nav pr-5">Reference</li></NavLink>
            </NavItem>

            <NavItem>
              <NavLink to="/Contact" className=""><li className="link-nav pr-5">Contact</li></NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/Demonstration" className=""><li className="link-nav pr-5">Showroom</li></NavLink>
            </NavItem>

          </Nav>

        </Collapse>

      </Navbar>

    </div>
  );
}





export default NavBar;
