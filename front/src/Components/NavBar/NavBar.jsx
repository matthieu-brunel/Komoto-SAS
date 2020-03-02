import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';




const NavBar = (props) => {
const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen); // navbar
  
  
    return (
<div className="">
      <Navbar color="white" light expand="xl">
        <NavbarBrand href="/"><img className="" src="" alt="logo" /></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="" navbar>
            <NavItem>
              <NavLink href="/" className="">Accueil</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Solution" className="">Solution</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Reference" className="">Reference</NavLink>
            </NavItem>
            
            <NavItem>
              <NavLink href="/Contact" className="">Contact</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Demonstration" className="">Demonstration</NavLink>
            </NavItem>
         
          </Nav>
        </Collapse>

      </Navbar>

    </div>
    );
  }
  




export default NavBar;
